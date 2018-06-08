import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { Customer } from '../../core/interfaces/customer.interface';
import { Product } from '../../core/interfaces/product.interface';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceItem } from '../../core/interfaces/invoice-item.interface';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { LoaderService } from '../../core/services/loader.service';
import { ModalMessageTypes } from '../../shared/modal/modal-message-types';
import { unsubscribeAll } from '../../shared/unsubscribe';
import { openDialog } from '../../shared/open-dialog';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

	editMode: boolean;
	invoiceForm: FormGroup;

	invoice$: Observable<Invoice>;
	productsList$: Observable<Product[]>;
	customersList$: Observable<Customer[]>;

	addInvoiceItem$: Subject<InvoiceItem> = new Subject();
	deleteInvoiceItem$: Subject<number> = new Subject();
	saveInvoice$: Subject<Invoice> = new Subject();

	subscriptions: {[property: string]: Subscription} = {};

	constructor(
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private loader: LoaderService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.editMode = this.route.snapshot.data.mode === 'edit';
		this.createInvoiceForm();
  }

  get customer(): FormControl {
		return this.invoiceForm.get('customer_id') as FormControl;
	}

	get discount(): FormControl {
		return this.invoiceForm.get('discount') as FormControl;
	}

	get total(): FormControl {
		return this.invoiceForm.get('total') as FormControl;
	}

	get items(): FormArray {
		return this.invoiceForm.get('items') as FormArray;
	}

	createInvoiceForm(invoice = {}) {
		return this.invoiceForm = new FormGroup({
			id: new FormControl(invoice['id'] || 0),
			customer_id: new FormControl(invoice['customer_id'] || 0, [Validators.required, Validators.min(1)]),
			discount: new FormControl(invoice['discount'] || 0, [Validators.required, Validators.min(0), Validators.max(50)]),
			items: new FormArray([], Validators.required),
			total: new FormControl(invoice['total'] || 0),
		});
	}

	createItemForm(invoiceItem) {
		return new FormGroup({
			id: new FormControl(invoiceItem.id),
			invoice_id: new FormControl(invoiceItem.invoice_id),
			product_id: new FormControl(invoiceItem.product_id, [Validators.required, Validators.min(1)]),
			quantity: new FormControl(invoiceItem.quantity, [Validators.required, Validators.min(1)]),
			product: new FormGroup({
				name: new FormControl(invoiceItem.product.name),
				price: new FormControl(invoiceItem.product.price)
			})
		});
	}

	ngOnInit() {
		this.productsList$ = this.productService.allProducts$;
		this.customersList$ = this.customerService.allCustomers$;

		if (this.editMode) {

			/**
			 * EDIT MODE: invoice for editing
			 */
			this.invoice$ = this.route.snapshot.data.invoice.take(1);
			this.subscriptions.invoice = this.invoice$
				.subscribe(invoice => {
					invoice.items.forEach(item => this.items.push(this.createItemForm(item)));
					this.invoiceForm.patchValue(invoice);
				});

			/**
			 * EDIT MODE: update invoice on change customer, discount or total price
			 * @type {Subscription}
			 */
			this.subscriptions.updateInvoice = Observable.merge(
					this.customer.valueChanges,
					this.discount.valueChanges,
					this.total.valueChanges
				)
				.debounceTime(300)
				// .distinctUntilChanged((prev, curr) => prev.sort().toString() === curr.sort().toString())
				.filter(() => this.invoiceForm.valid)
				.switchMap(() => this.invoiceService.updateInvoice(this.invoiceForm.value).take(1))
				.subscribe(
					() => this.loader.hide(),
					() => openDialog(this.dialog, {message: ModalMessageTypes.ERROR_INVOICE_UPDATE})
				);

			/**
			 * EDIT MODE: add item to existing invoice
			 * @type {Subscription}
			 */
			this.subscriptions.addInvoiceItem = this.addInvoiceItem$
				.switchMap((item: InvoiceItem) => this.invoiceItemsService.addInvoiceItem(this.invoiceForm.value.id, item).take(1))
				.withLatestFrom(this.productsList$)
				.map(([newItem, products]) => ({...newItem, product: products.find(product => product.id === newItem.product_id)}))
				.subscribe(
					(newItem: InvoiceItem) => this.items.push(this.createItemForm(newItem)),
					() => openDialog(this.dialog, {message: ModalMessageTypes.ERROR_INVOICEITEM_ADD})
				);

			/**
			 * EDIT MODE: delete item from existing invoice
			 * @type {Subscription}
			 */
			this.subscriptions.deleteInvoiceItem = this.deleteInvoiceItem$
				.switchMap(itemId => this.invoiceItemsService.deleteInvoiceItem(this.invoiceForm.value.id, itemId).take(1))
				.subscribe(
					() => this.loader.hide(),
					() => openDialog(this.dialog, {message: ModalMessageTypes.ERROR_INVOICEITEM_DELETE})
				);

			/**
			 * Enabling loader on form changes
			 * @type {Subscription}
			 */
			this.subscriptions.loader = this.invoiceForm.valueChanges
				.debounceTime(300)
				.subscribe(() => this.loader.show());

		} else {

			/**
			 * NEW MODE: save new invoice
			 * @type {Subscription}
			 */
			this.subscriptions.saveInvoice = this.saveInvoice$
				.debounceTime(300)
				.filter(() => this.invoiceForm.valid)
				.switchMap(invoice => this.invoiceService.addInvoice(invoice).take(1))
				.subscribe((invoice) => {
					const dialogRef = openDialog(this.dialog, {id: invoice.id, message: ModalMessageTypes.INFO_INVOICE_CREATED});
					this.subscriptions.modalDialog = dialogRef.afterClosed()
						.subscribe(() => {
							this.router.navigate(['/invoices']);
							this.subscriptions.modalDialog.unsubscribe();
						});
				});

			/**
			 * NEW MODE: add item to items form array
			 * @type {Subscription}
			 */
			this.subscriptions.addInvoiceItem = this.addInvoiceItem$
				.withLatestFrom(this.productsList$)
				.map(([item, products]) => ({...item, product: products.find(product => product.id === item.product_id)}))
				.subscribe((newItem: InvoiceItem) => this.items.push(this.createItemForm(newItem)));

		}

		/**
		 * Calc total price
		 * @type {Subscription}
		 */
		this.subscriptions.totalPrice = Observable.merge(
				this.items.valueChanges,
				this.discount.valueChanges,
				this.addInvoiceItem$,
				this.deleteInvoiceItem$
			)
			.delay(10)
			.filter(() => this.invoiceForm.valid)
			.map(() => this.items.length ? this.items.value.map(item => item.product.price * item.quantity).reduce((acc, itemTotal) => acc + itemTotal) : 0)
			.map(total => +(total - total * this.discount.value * 0.01).toFixed(2))
			.subscribe((total: number) => this.total.patchValue(total));

	}

	ngOnDestroy() {
		unsubscribeAll(this.subscriptions);
	}

	saveInvoice() {
		this.saveInvoice$.next(this.invoiceForm.value);
	}

	addInvoiceItem(form: FormGroup) {
		this.addInvoiceItem$.next(<InvoiceItem>{...form.value, invoice_id: this.invoiceForm.value.id});
	}

	deleteInvoiceItem(index: number, item: InvoiceItem) {
		this.items.removeAt(index);
		this.deleteInvoiceItem$.next(item.id);
	}

}

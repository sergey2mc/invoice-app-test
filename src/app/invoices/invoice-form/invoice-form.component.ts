import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/of';

import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Customer } from '../../core/interfaces/customer.interface';
import { Product } from '../../core/interfaces/product.interface';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceItem } from '../../core/interfaces/invoiceItem.interface';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

	editMode: boolean;
	controlsForm: FormGroup;
	invoiceForm: FormGroup;
	itemForm: FormGroup;

	invoice$: Observable<Invoice>;
	productsList$: Observable<Product[]>;
	customersList$: Observable<Customer[]>;

	addInvoiceItem$: Subject<InvoiceItem> = new Subject();
	deleteInvoiceItem$: Subject<number> = new Subject();
	newItemPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
	saveInvoice$: Subject<Invoice> = new Subject();

	addInvoiceItemSubscription: Subscription;
	deleteInvoiceItemSubscription: Subscription;
	newItemPriceSubscription: Subscription;
	saveInvoiceSubscription: Subscription;
	updateInvoiceSubscription: Subscription;
	totalPriceSubscription: Subscription;
	modalDialogSubscription: Subscription;

	constructor(
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.editMode = this.route.snapshot.data.mode === 'edit';
		this.createControlsForm();
		this.createInvoiceForm();
  }

  get customer(): FormControl {
		return this.invoiceForm.get('customer_id') as FormControl;
	}

	get discount(): FormControl {
		return this.invoiceForm.get('discount') as FormControl;
	}

	get items(): FormArray {
		return this.invoiceForm.get('items') as FormArray;
	}

	get total(): FormControl {
		return this.invoiceForm.get('total') as FormControl;
	}

	get product(): FormControl {
		return this.controlsForm.get('product_id') as FormControl;
	}

	private openDialog(data) {
		return this.dialog.open(ModalDialogComponent, {
			width: '235px',
			data: data
		});
	}

	private validateForms(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateForms(control);
			} else if (control instanceof FormArray) {
				control.controls.forEach((item: FormGroup) => this.validateForms(item));
			}
		});
	}

	createInvoiceForm(invoice = {}) {
		return this.invoiceForm = new FormGroup({
			id: new FormControl(invoice['id'] || 0),
			customer_id: new FormControl(invoice['customer_id'] || 0, [Validators.required, Validators.min(1)]),
			discount: new FormControl(invoice['discount'] || 0, [Validators.required, Validators.min(0), Validators.max(50)]),
			items: new FormArray([], Validators.required),
			total: new FormControl(invoice['total'] || 0),
		})
	}

	createControlsForm() {
		return this.controlsForm = new FormGroup({
			id: new FormControl(0),
			invoice_id: new FormControl(0),
			product_id: new FormControl( 0, [Validators.required, Validators.min(1)]),
			quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
			product: new FormGroup({
				name: new FormControl(null),
				price: new FormControl({value: 0, disabled: true})
			})
		});
	}

	createItemForm(invoiceItem) {
		return this.itemForm = new FormGroup({
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

		this.productsList$ = this.route.snapshot.data.products;
		this.customersList$ = this.route.snapshot.data.customers;

		if (this.editMode) {
			this.invoice$ = this.route.snapshot.data.invoice
				.map(invoice => {
					invoice.items.forEach(item => this.items.push(this.createItemForm(item)));
					this.invoiceForm.patchValue(invoice);
					return invoice;
				})
				.share();

			this.updateInvoiceSubscription = combineLatest(
					this.customer.valueChanges,
					this.discount.valueChanges,
					this.total.valueChanges
				)
				.debounceTime(100)
				.skip(1)
				.distinctUntilChanged()
				.filter(() => {
					this.validateForms(this.invoiceForm);
					return this.invoiceForm.valid;
				})
				.mergeMap(() => this.invoiceService.updateInvoice(this.invoiceForm.value))
				.subscribe(() => this.invoiceService.getInvoices());
		}

		this.totalPriceSubscription = merge(
				this.items.valueChanges,
				this.discount.valueChanges,
				this.addInvoiceItem$,
				this.deleteInvoiceItem$
			)
			.delay(10)
			.debounceTime(10)
			.map(() => {
				return this.items.length ?
					this.items.value
						.map(item => item.product.price * item.quantity)
						.reduce((acc, itemTotal) => acc + itemTotal) :
					0;
			})
			.map(total => total - total * this.discount.value * 0.01)
			.map(total => +total.toFixed(2))
			.subscribe((total: number) => this.total.patchValue(total));

		this.addInvoiceItemSubscription = combineLatest(
				this.addInvoiceItem$,
				this.productsList$,
			)
			.filter(() => {
				this.validateForms(this.controlsForm);
				return this.controlsForm.valid;
			})
			.map(([item, products]) => {
				this.items.push(this.createItemForm({
					...item,
					product: products.find(productItem => productItem.id === item.product_id)
				}));
				return item;
			})
			.mergeMap((item: InvoiceItem) => this.invoiceItemsService.addInvoiceItem(this.invoiceForm.value.id, item))
			.subscribe(() => {
					this.controlsForm.reset({quantity: 0});
					this.newItemPrice$.next(0)
			});

		this.deleteInvoiceItemSubscription = this.deleteInvoiceItem$
			.mergeMap(itemId => this.invoiceItemsService.deleteInvoiceItem(this.invoiceForm.value.id, itemId))
			.subscribe();

		this.newItemPriceSubscription = combineLatest(
				this.product.valueChanges,
				this.productsList$
			)
			.map(([product_id, products]) => products.find((product: Product) => product.id === product_id))
			.map(product => product !== undefined ? product.price : 0)
			.subscribe(price => this.newItemPrice$.next(price));

		this.saveInvoiceSubscription = this.saveInvoice$
			.debounceTime(500)
			.filter(() => {
				this.validateForms(this.invoiceForm);
				return this.invoiceForm.valid;
			})
			.mergeMap(invoice => this.invoiceService.addInvoice(invoice))
			.subscribe((invoice) => {
				this.invoiceService.getInvoices();
				const dialogRef = this.openDialog({id: invoice.id, mode: 'invoiceCreated'});
				this.modalDialogSubscription = dialogRef.afterClosed()
					.subscribe(result => {
						if (result) {
							this.router.navigate(['/invoices']);
						}
						this.modalDialogSubscription.unsubscribe();
					});
			});

	}

	ngOnDestroy() {
		this.addInvoiceItemSubscription.unsubscribe();
		this.totalPriceSubscription.unsubscribe();
		this.newItemPriceSubscription.unsubscribe();
		this.saveInvoiceSubscription.unsubscribe();
		if (this.editMode) this.updateInvoiceSubscription.unsubscribe();
	}

	saveInvoice() {
		this.saveInvoice$.next(this.invoiceForm.value);
	}

	addInvoiceItem() {
		this.addInvoiceItem$.next(this.controlsForm.value);
	}

	deleteInvoiceItem(index: number, item: InvoiceItem) {
		this.items.removeAt(index);
		this.deleteInvoiceItem$.next(item.id);
	}

}

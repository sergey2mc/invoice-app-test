import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../../core/interfaces/customer.interface';
import { Product } from '../../core/interfaces/product.interface';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceItem } from '../../core/interfaces/invoiceItem.interface';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


import {combineLatest} from 'rxjs/observable/combineLatest';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/toArray';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {zip} from 'rxjs/observable/zip';
import {merge} from 'rxjs/observable/merge';
import 'rxjs/add/observable/merge';
import {mergeAll} from 'rxjs/operator/mergeAll';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import {ProductService} from '../../core/services/product.service';
import {CustomerService} from '../../core/services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceService} from '../../core/services/invoice.service';
import {ModalDialogComponent} from '../../core/modal-dialog/modal-dialog.component';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

	editMode: boolean;
	invoice: Invoice;
	controlsForm: FormGroup;
	invoiceForm: FormGroup;
	itemForm: FormGroup;

	productsList$: Observable<Product[]> = this.productService.allProducts$;
	customersList$: Observable<Customer[]> = this.customerService.allCustomers$;




	addInvoiceItem$: Subject<InvoiceItem>;
	addInvoiceItemSubscription: Subscription;

	deleteInvoiceItem$: Subject<number>;
	deleteInvoiceItemSubscription: Subscription;

	newItemPrice$: BehaviorSubject<number>;
	newItemPriceSubscription: Subscription;

	customerSubscription: Subscription;
	totalPriceSubscription: Subscription;

	formValuesSubscription: Subscription;

	saveInvoice$: Subject<Invoice>;
	saveInvoiceRequest$: Observable<Invoice>;
	saveInvoiceSubscription: Subscription;

	modalDialogSubscription: Subscription;

	tableDataSource: MatTableDataSource<InvoiceItem>;
	displayedColumns = ['name', 'quantity', 'price', 'actions'];

	constructor(
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceService: InvoiceService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.editMode = this.route.snapshot.data.mode === 'edit';
		this.invoice = {
			id: 0,
			customer_id: 0,
			discount: 0,
			items: [],
			total: 0
		};

		this.productService.getProducts();
		this.customerService.getCustomers();

		// this.saveInvoice$ = new Subject<Invoice>();
		this.newItemPrice$ = new BehaviorSubject(0);
		// this.tableDataSource = new MatTableDataSource();
		this.addInvoiceItem$ = new Subject<InvoiceItem>();
		this.deleteInvoiceItem$ = new Subject<number>();
		this.createInvoiceForm();
		this.createControlsForm();
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

	// get quantity(): FormControl {
	// 	return this.itemForm.get('quantity') as FormControl;
	// }
	// get price(): FormControl {
	// 	return this.itemForm.get('product')['controls'].price as FormControl;
	// }

	private openDialog(data) {
		return this.dialog.open(ModalDialogComponent, {
			width: '235px',
			data: data
		});
	}

	createInvoiceForm() {
		return this.invoiceForm = new FormGroup({
			id: new FormControl(0),
			customer_id: new FormControl(0, [Validators.required, Validators.min(0)]),
			discount: new FormControl(0, [Validators.min(0), Validators.max(50)]),
			items: new FormArray([], [Validators.required, Validators.minLength(1)]),
			total: new FormControl({value: null, disabled: true}),
		})
	}

	createControlsForm() {
		return this.controlsForm = new FormGroup({
			id: new FormControl(0),
			invoice_id: new FormControl(0, Validators.required),
			product_id: new FormControl( 0, Validators.required),
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
			invoice_id: new FormControl(invoiceItem.invoice_id, Validators.required),
			product_id: new FormControl(invoiceItem.product_id, Validators.required),
			quantity: new FormControl(invoiceItem.quantity, [Validators.required, Validators.min(1)]),
			product: new FormGroup({
				name: new FormControl(invoiceItem.product.name),
				price: new FormControl(invoiceItem.product.price)
			})
		});
	}

	ngOnInit() {

		this.customerSubscription = this.customer.valueChanges
			.subscribe((id: number) => this.updateInvoice({customer_id: id}));

		this.totalPriceSubscription = merge(
				this.discount.valueChanges,
				this.addInvoiceItem$,
				this.deleteInvoiceItem$
		)
			.delay(10)
			.map(() => {
				return this.items.length ?
					this.items.value
						.map(item => item.value.product.price * item.value.quantity)
						.reduce((acc, itemTotal) => acc + itemTotal) :
					0;
			})
			.map(total => total - total * this.discount.value * 0.01)
			.subscribe((total: number) => this.total.patchValue(total));

		this.addInvoiceItemSubscription = combineLatest(
				this.addInvoiceItem$,
				this.productsList$)
			.subscribe(([item, products]) => {
				// if (this.itemForm.valid) {
					const product = products.find(productItem => productItem.id === item.product_id);
					this.items.value.push(this.createItemForm({...item, product: product}));
					this.controlsForm.reset({quantity: 0});
					this.newItemPrice$.next(0)

					// this.updateInvoice({items});
				// } else {
				// 	this.validateForms(this.itemForm);
				// }
			});

		// this.deleteInvoiceItemSubscription = this.deleteInvoiceItem$
		// 	.map(id => {
		//
		// 		this.items.value.filter((item: FormGroup) => item.value.product_id !== id);
		// 		console.log(this.items.value)
		// 	})
		// 	.subscribe();

		this.newItemPriceSubscription = combineLatest(
				this.product.valueChanges,
				this.productsList$)
			.map(([product_id, products]) => products.find((product: Product) => product.id === product_id))
			.map(product => product !== undefined ? product.price : 0)
			.subscribe(price => this.newItemPrice$.next(price));



		// this.saveInvoiceRequest$ = combineLatest(
		// 	this.saveInvoice$,
		// 	this.formValid$)
		// 	.distinctUntilChanged()
		// 	.debounceTime(500)
		// 	.filter(([invoice, formValid]) => formValid === true && invoice.items.length > 0)
		// 	.mergeMap(([invoice, formValid]) => this.invoiceService.addInvoice(invoice));

		// this.saveInvoiceSubscription = this.saveInvoiceRequest$
		// 	.subscribe((invoice) => {
		// 		const dialogRef = this.openDialog({id: invoice.id, mode: 'invoiceCreated'});
		// 		this.modalDialogSubscription = dialogRef.afterClosed()
		// 			.subscribe(result => {
		// 				if (result) {
		// 					this.invoiceService.clearCache();
		// 					this.router.navigate(['/invoices']);
		// 				}
		// 				this.modalDialogSubscription.unsubscribe();
		// 			});
		//
		// 	});

	}

	ngOnDestroy() {
		this.formValuesSubscription.unsubscribe();
		// this.formUpdatesSubscription.unsubscribe();
		this.addInvoiceItemSubscription.unsubscribe();
		this.deleteInvoiceItemSubscription.unsubscribe();
		this.totalPriceSubscription.unsubscribe();
		this.newItemPriceSubscription.unsubscribe();
		this.saveInvoiceSubscription.unsubscribe();
	}

	saveInvoice() {
		console.log(this.items.value)
		// this.saveInvoice$.next(this.invoice$.getValue());
	}

	updateInvoice(data) {

		// return this.invoice$.next({...this.invoice$.getValue(), ...data});
	}

	addInvoiceItem() {
		this.addInvoiceItem$.next(this.controlsForm.value);
	}

	deleteInvoiceItem(id: number) {
		// this.deleteInvoiceItem$.next(id);
		console.log(id)
		this.items.removeAt(id);
	}

	validateForms(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateForms(control);
			}
		});
	}

}

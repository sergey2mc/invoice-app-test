import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../interfaces/customer.interface';
import { Product } from '../interfaces/product.interface';
import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceItem } from '../interfaces/invoiceItem.interface';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


import {combineLatest} from 'rxjs/observable/combineLatest';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/toArray';
import {MatTableDataSource} from '@angular/material';
import {zip} from 'rxjs/observable/zip';
import {merge} from 'rxjs/observable/merge';
import 'rxjs/add/observable/merge';
import {mergeAll} from 'rxjs/operator/mergeAll';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';


function ValidateNumber(control: AbstractControl) {
	if (!control.value.startsWith('https') || !control.value.includes('.io')) {
		return { validUrl: true };
	}
	return null;
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

	addInvoiceItem$: Subject<InvoiceItem>;
	addInvoiceItemSubsctiption: Subscription;

	deleteInvoiceItem$: Subject<number>;
	deleteInvoiceItemSubsctiption: Subscription;

	newItemPrice$: BehaviorSubject<number>;
	newItemPriceSubscription: Subscription;

	customerSubscription: Subscription;
	totalPriceSubscription: Subscription;

	invoiceForm: FormGroup;
	itemForm: FormGroup;

	tableDataSource: MatTableDataSource<InvoiceItem>;
	displayedColumns = ['name', 'quantity', 'price', 'actions'];

  @Input() mode;
	@Input() customersList$;
	@Input() productsList$;
	@Input() invoice$;

	invoice: Invoice = {
		id: 0,
		customer_id: -1,
		discount: 0,
		total: 0,
		items: []
	};


	constructor() {
		this.newItemPrice$ = new BehaviorSubject(0);
		this.tableDataSource = new MatTableDataSource();
		this.addInvoiceItem$ = new Subject<InvoiceItem>();
		this.deleteInvoiceItem$ = new Subject<number>();
		this.createInvoiceForm();
  }

  get customer(): FormControl {
		return this.invoiceForm.get('customer_id') as FormControl;
	}
	get discount(): FormControl {
		return this.invoiceForm.get('discount') as FormControl;
	}
	get product(): FormControl {
		return this.itemForm.get('product_id') as FormControl;
	}
	get quantity(): FormControl {
		return this.itemForm.get('quantity') as FormControl;
	}
	get price(): FormControl {
		return this.itemForm.get('price') as FormControl;
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
				let total = this.invoice$.getValue().items.length ? this.invoice$.getValue().items
					.map(item => item.product.price * item.quantity)
					.reduce((acc, itemTotal) => acc + itemTotal) : 0;
				total -= total * this.discount.value * 0.01;
				return total;
			}).subscribe((total: number) => {
				this.updateInvoice({total: total});
			});

		this.addInvoiceItemSubsctiption = combineLatest(
				this.addInvoiceItem$,
				this.productsList$
			).subscribe(([item, products]) => {
				if (this.itemForm.valid) {
					const product: Product = products.find(productItem => productItem.id === item.product_id);
					const items = this.invoice$.getValue().items;
					items.push({...item, product: product});
					this.updateInvoice({items});
					this.tableDataSource.data = items;
				} else {
					this.validateForms(this.itemForm);
				}
			});

		this.deleteInvoiceItemSubsctiption = this.deleteInvoiceItem$
			.subscribe((id: number) => {
				const items = this.invoice$.getValue().items.filter((item: InvoiceItem) => item.product_id !== id);
				this.updateInvoice({items});
				this.tableDataSource.data = items;
			});

		this.newItemPriceSubscription = combineLatest(
			this.product.valueChanges,
			this.productsList$
		).map(([product_id, products]) => {
			const currentProduct: Product = products.find((product: Product) => product.id === product_id);
			return currentProduct !== undefined ? currentProduct.price : 0;
		}).subscribe(price => this.newItemPrice$.next(price));

	}

	ngOnDestroy() {
		this.addInvoiceItemSubsctiption.unsubscribe();
		this.deleteInvoiceItemSubsctiption.unsubscribe();
		this.totalPriceSubscription.unsubscribe();
		this.newItemPriceSubscription.unsubscribe();
	}

  createInvoiceForm() {
		return this.invoiceForm = new FormGroup({
			customer_id: new FormControl(null, Validators.required),
			discount: new FormControl(0, [Validators.min(0), Validators.max(50)]),
			total: new FormControl(0),
			items: this.createItemForm()
		})
	}

	createItemForm() {
		return this.itemForm = new FormGroup({
			invoice_id: new FormControl(0, Validators.required),
			product_id: new FormControl(null, Validators.required),
			quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
			price: new FormControl({value: 0, disabled: true})
		});
	}

	updateInvoice(data) {
		return this.invoice$.next({...this.invoice$.getValue(), ...data});
	}

	addInvoiceItem() {
		this.addInvoiceItem$.next(this.itemForm.value);
	}

	deleteInvoiceItem(id: number) {
		this.deleteInvoiceItem$.next(id);
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

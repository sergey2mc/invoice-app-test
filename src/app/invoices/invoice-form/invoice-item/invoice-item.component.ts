import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';

import { ProductService } from '../../../core/services/product.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { InvoiceItemsService } from '../../../core/services/invoice-items.service';
import { LoaderService } from '../../../core/services/loader.service';
import { Product } from '../../../core/interfaces/product.interface';

import { ModalMessageTypes } from '../../../shared/modal/modal-message-types';
import { unsubscribeAll } from '../../../shared/unsubscribe';
import { openDialog } from '../../../shared/open-dialog';


@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
})
export class InvoiceItemComponent implements OnInit, OnDestroy {

	productsList$: Observable<Product[]>;

	addItem$: Subject<number> = new Subject();
	deleteItem$: Subject<number> = new Subject();

	subscriptions: {[property: string]: Subscription} = {};

	controlsForm: FormGroup;

  @Input() item;
	@Input() editMode;
	@Input() itemMode;
  @Output() deleteItem = new EventEmitter();
	@Output() addItem = new EventEmitter();

	@ViewChild(FormGroupDirective) form;

  constructor(
  	private productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private loader: LoaderService,
		public dialog: MatDialog
	) {
		this.createControlsForm();
		if (!this.item) {
  		this.item = this.controlsForm;
		}
	}

	get product_id(): FormControl {
		return this.item.get('product_id') as FormControl;
	}

	get quantity(): FormControl {
		return this.item.get('quantity') as FormControl;
	}

	get price(): FormControl {
		return this.item.controls.product.get('price') as FormControl;
	}

  ngOnInit() {

		this.productsList$ = this.productService.allProducts$;

		if (this.editMode && this.itemMode) {
			/**
			 * EDIT MODE: Update existing item
			 * @type {Subscription}
			 */
			this.subscriptions.updateInvoiceItem = Observable.merge(
					this.product_id.valueChanges,
					this.quantity.valueChanges
				)
				.debounceTime(500)
				.distinctUntilChanged()
				.filter(() => this.item.valid)
				.mergeMap(() => this.invoiceItemsService.updateInvoiceItem(this.item.value.invoice_id, this.item.value))
				.subscribe( undefined, (err) => openDialog(this.dialog, {message: ModalMessageTypes.ERROR_INVOICEITEM_UPDATE}));
		}

		/**
		 * Update item
		 * @type {Subscription}
		 */
		this.subscriptions.itemChanges = this.product_id.valueChanges
			.withLatestFrom(this.productsList$)
			.distinctUntilChanged()
			.subscribe(([product_id, products]) => this.item.controls.product.patchValue({...products.find(product => product.id === product_id)}));

		/**
		 * Delete item
		 * @type {Subscription}
		 */
		this.subscriptions.deleteItem = this.deleteItem$
			.subscribe(() => this.deleteItem.emit());

		/**
		 * Add item
		 * @type {Subscription}
		 */
		this.subscriptions.addItem = this.addItem$
			.subscribe(() => this.addItem.emit(this.item));
  }

	ngOnDestroy() {
		unsubscribeAll(this.subscriptions);
	}

	onDeleteItem() {
    this.deleteItem$.next(this.item.value);
  }

	onAddItem(form) {
  	if (this.controlsForm.valid) {
			this.addItem$.next(form.value);
			this.controlsForm.reset();
			this.form.resetForm();
		}
	}

	private createControlsForm() {
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

}

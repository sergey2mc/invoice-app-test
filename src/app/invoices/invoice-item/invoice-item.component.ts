import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

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

import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Product } from '../../core/interfaces/product.interface';


@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
})
export class InvoiceItemComponent implements OnInit, OnDestroy {

	productsList$: Observable<Product[]>;
	deleteItem$: Subject<number> = new Subject();
	deleteItemSubscription: Subscription;
	itemChangesSubscription: Subscription;
	updateInvoiceItemSubscription: Subscription;

  @Input() item;
	@Input() editMode;
  @Output() deleteItem = new EventEmitter();

  constructor(
  	private productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService
	) {}

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

		if (this.editMode) {
			this.updateInvoiceItemSubscription = Observable.merge(
					this.product_id.valueChanges,
					this.quantity.valueChanges
				)
				.debounceTime(100)
				.distinctUntilChanged()
				.filter(() => this.item.valid)
				.mergeMap(() => this.invoiceItemsService.updateInvoiceItem(this.item.value.invoice_id, this.item.value))
				.subscribe();
		}

		this.itemChangesSubscription = Observable.combineLatest(
				this.product_id.valueChanges,
				this.productsList$
			)
			.distinctUntilChanged()
			.map(([product_id, products]) => products.find(product => product.id === product_id))
			.map(product => this.item.controls.product.patchValue({...product}))
			.subscribe();

		this.deleteItemSubscription = this.deleteItem$
			.subscribe(() => this.deleteItem.emit())
  }

  ngOnDestroy() {
		this.itemChangesSubscription.unsubscribe();
		this.deleteItemSubscription.unsubscribe();
		if (this.editMode) this.updateInvoiceItemSubscription.unsubscribe();
	}

	onDeleteItem() {
    this.deleteItem$.next(this.item.value);
  }

}

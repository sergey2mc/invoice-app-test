import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { Product } from '../../core/interfaces/product.interface';
import { ProductService } from '../../core/services/product.service';


@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
})
export class InvoiceItemComponent implements OnInit, OnDestroy {

	productsList$: Observable<Product[]>;

	itemChangesSubscription: Subscription;

	deleteItem$: Subject<number> = new Subject();
	deleteItemSubscription: Subscription;

  @Input() item;
  @Output() deleteItem = new EventEmitter();

  constructor(private productService: ProductService) {}

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

		this.itemChangesSubscription = combineLatest(
				this.product_id.valueChanges,
				this.productsList$
			)
			.distinctUntilChanged()
			.map(([product_id, products]) => products.find(product => product.id === product_id))
			.map(product => this.item.controls.product.patchValue({...product}))
			.subscribe();

		this.deleteItemSubscription = this.deleteItem$
			.map(item => console.log(item))
			.subscribe(() => this.deleteItem.emit())
  }

  ngOnDestroy() {
		this.itemChangesSubscription.unsubscribe();
		this.deleteItemSubscription.unsubscribe();
	}

	onDeleteItem() {
    this.deleteItem$.next(this.item.value);
  }

}

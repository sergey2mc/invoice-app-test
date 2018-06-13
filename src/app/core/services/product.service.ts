import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';
import { AppState } from '../../ngrx/app-state';

import * as products from '../../ngrx/products/actions';
import * as productsGetterState from '../../ngrx/products/states/products-getter.state';
import * as productsRequestsGetterState from '../../ngrx/requests/nested-states/products/nested-states/products-get/states/products-get-getter.state';
import * as productRequestsGetterState from '../../ngrx/requests/nested-states/products/nested-states/product-get/states/product-get-getter.state';


@Injectable()
export class ProductService {

	dataLoaded$: Observable<boolean>;
	allProducts$: Observable<Product[]>;
	product$: Observable<Product>;

	constructor(
		private http: HttpClient,
		private store: Store<AppState>
	) {
		this.dataLoaded$ = this.store.select(productsRequestsGetterState.getIsLoadedProductsGetRequest)

		this.allProducts$ = this.store.select(productsGetterState.getProducts)
			.withLatestFrom(this.dataLoaded$)
			.filter(([products, loaded]) => loaded)
			.map(([products, loaded]) => products);

		this.product$ = this.store.select(productsGetterState.getProduct)
			.withLatestFrom(this.store.select(productRequestsGetterState.getIsLoadedProductGetRequest))
			.filter(([product, loaded]) => loaded)
			.map(([product, loaded]) => product);
	}

	getProducts() {
		this.store.dispatch(new products.GetProductsAction);
		return this.allProducts$;
	}

	getProductsRequest(): Observable<Product[]> {
		return this.http.get<Product[]>(`/products`);
	}

	getProduct(id: number) {
		this.store.dispatch(new products.GetProductAction(id));
		return this.product$;
	}

	getProductRequest(id: number): Observable<Product> {
		return this.http.get<Product>(`/products/${id}`);
	}
}

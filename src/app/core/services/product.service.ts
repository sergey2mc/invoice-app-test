import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';

import { Product } from '../interfaces/product.interface';


@Injectable()
export class ProductService {

	allProducts$: Observable<Product[]>;

	constructor(private http: HttpClient) {}

	getProducts(): Observable<Product[]> {
		if (this.allProducts$) {
			return this.allProducts$;
		} else {
			const data$: ConnectableObservable<Product[]> = this.http.get<Product[]>(`/products`).publishReplay() as ConnectableObservable<Product[]>;
			data$.connect();
			return this.allProducts$ = data$;
		}
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(`/products/${id}`);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../interfaces/product.interface';


@Injectable()
export class ProductService {

	allProducts$: Observable<Product[]>;
	allProductsEmitter$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

	constructor(private http: HttpClient) {
		this.allProducts$ = this.allProductsEmitter$.asObservable();
		this.getProducts();
	}

	getProducts() {
		this.http.get<Product[]>(`/products`)
			.subscribe(products => this.allProductsEmitter$.next(products));
	}
}

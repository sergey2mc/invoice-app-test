import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../interfaces/product.interface';


@Injectable()
export class ProductService {

	allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

	constructor(private http: HttpClient) {
		this.getProducts();
	}

	getProducts() {
		this.http.get<Product[]>(`/products`)
			.subscribe(products => this.allProducts$.next(products));
	}
}

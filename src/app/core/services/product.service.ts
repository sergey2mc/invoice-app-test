import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../interfaces/product.interface';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/publish";


@Injectable()
export class ProductService {

  allProducts$: ConnectableObservable<Product[]>;
	allProducts: Product[];

  constructor(private http: HttpClient) {}

	getProducts(): Observable<Product[]> {
		if (this.allProducts) {
			return Observable.of(this.allProducts);
		} else if (this.allProducts$) {
			return this.allProducts$;
		} else {
			this.allProducts$ = this.http
				.get<Product[]>(`/products`, {observe: 'response'})
				.map(response => {
					this.allProducts$ = null;
					if (response.status === 400) {
						return [];
					} else if (response.status === 200) {
						this.allProducts = response.body;
						return this.allProducts;
					}
				})
				.publish();

			this.allProducts$.connect();
			return this.allProducts$;
		}
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(`/products/${id}`);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';

import { Product } from '../interfaces/product.interface';


@Injectable()
export class ProductService {

	allProducts$: ConnectableObservable<Product[]>;
	emitter$: Subject<Product[]> = new Subject();

  constructor(private http: HttpClient) {
  	this.allProducts$ = this.emitter$
			.switchMap(() => this.http.get<Product[]>(`/products`))
			.publishReplay(1);
		this.allProducts$.connect();
	}

	getProducts() {
  	this.emitter$.next();
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(`/products/${id}`);
	}
}

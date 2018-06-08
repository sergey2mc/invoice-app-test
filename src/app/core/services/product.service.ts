import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/scan';

import { Product } from '../interfaces/product.interface';
import { Actions, StateManagement } from '../../shared/state/state-management';


@Injectable()
export class ProductService {

	dataLoaded$: ConnectableObservable<boolean>;
	state: StateManagement<Product>;
	allProducts$: Observable<Product[]>;
	product$: Observable<Product>;

	constructor(private http: HttpClient) {
		this.state = new StateManagement<Product>();

		this.dataLoaded$ = this.state.request$
			.filter(({type}) => type === Actions.GetList)
			.scan(() => true, false)
			.publishBehavior(false);
		this.dataLoaded$.connect();

		this.allProducts$ = Observable.combineLatest(
				this.state.collectionIds$,
				this.state.entities$
			)
			.map(([ids, entities]) => ids.filter(id => entities[id]).map(id => entities[id]))
			.shareReplay(1);

		this.product$ = Observable.combineLatest(
				this.state.entityIdGet$,
				this.state.entities$
			)
			.map(([id, entities]) => entities[id])
			.shareReplay(1);
	}

	getProducts() {
		this.state.getList$.next(this.http.get<Product[]>(`/products`));
		return this.allProducts$;
	}

	getProduct(id: number): Observable<Product> {
		this.state.get$.next(this.http.get<Product>(`/products/${id}`));
		return this.product$;
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

import { Customer } from '../interfaces/customer.interface';
import { Actions, StateManagement } from '../../shared/state/state-management';


@Injectable()
export class CustomerService {

	dataLoaded$: ConnectableObservable<boolean>;
	state: StateManagement<Customer>;
	allCustomers$: Observable<Customer[]>;
	customer$: Observable<Customer>;

	constructor(private http: HttpClient) {
		this.state = new StateManagement<Customer>();

		this.dataLoaded$ = this.state.request$
			.filter(({type}) => type === Actions.GetList)
			.scan(() => true, false)
			// .do(status => console.log('Service', status))
			.publishBehavior(false);
		this.dataLoaded$.connect();

		this.allCustomers$ = Observable.combineLatest(
				this.state.collectionIds$,
				this.state.entities$
			)
			.map(([ids, entities]) => ids.filter(id => entities[id]).map(id => entities[id]))
			.shareReplay(1);

		this.customer$ = Observable.combineLatest(
				this.state.entityId$,
				this.state.entities$
			)
			.map(([id, entities]) => entities[id])
			.shareReplay(1);
	}

	getCustomers() {
		this.state.getList$.next(this.http.get<Customer[]>(`/customers`));
		return this.allCustomers$;
	}

	getCustomer(id: number): Observable<Customer> {
		this.state.get$.next(this.http.get<Customer>(`/customers/${id}`));
		return this.customer$;
	}

}

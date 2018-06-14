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
import { Customer } from '../interfaces/customer.interface';
import { AppState } from '../../ngrx/app-state';

import * as customers from '../../ngrx/customers/actions';
import * as customersGetterState from '../../ngrx/customers/states/customers-getter.state';
import * as customersRequestsGetterState from '../../ngrx/requests/nested-states/customers/nested-states/customers-get/states/customers-get-getter.state';


@Injectable()
export class CustomerService {

	dataLoaded$: Observable<boolean>;
	allCustomers$: Observable<Customer[]>;

	constructor(
		private http: HttpClient,
		private store: Store<AppState>
	) {
		this.dataLoaded$ = this.store.select(customersRequestsGetterState.getIsLoadedCustomersGetRequest);

		this.allCustomers$ = this.store.select(customersGetterState.getCustomers)
			.withLatestFrom(this.dataLoaded$)
			.filter(([customers, loaded]) => loaded)
			.map(([customers]) => customers);
	}

	getCustomers() {
		this.store.dispatch(new customers.GetCustomersAction);
		return this.allCustomers$;
	}

	getCustomersRequest(): Observable<Customer[]> {
		return this.http.get<Customer[]>(`/customers`);
	}

}

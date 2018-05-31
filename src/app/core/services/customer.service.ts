import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';

import { Customer } from '../interfaces/customer.interface';


@Injectable()
export class CustomerService {

	allCustomers$: Observable<Customer[]>;

	constructor(private http: HttpClient) {}

	getCustomers(): Observable<Customer[]> {
		if (this.allCustomers$) {
			return this.allCustomers$;
		} else {
			const data$: ConnectableObservable<Customer[]> = this.http.get<Customer[]>(`/customers`).publishReplay();
			data$.connect();
			return this.allCustomers$ = data$;
		}
	}

	getCustomer(id: number): Observable<Customer> {
		return this.http.get<Customer>(`/customers/${id}`);
	}

}

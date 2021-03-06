import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';

import { Customer } from '../interfaces/customer.interface';


@Injectable()
export class CustomerService {

	allCustomers$: Observable<Customer[]>;

	constructor(private http: HttpClient) {}

	getCustomers(): Observable<Customer[]> {
		if (this.allCustomers$) {
			return this.allCustomers$;
		} else {
			const data$: ConnectableObservable<Customer[]> = this.http.get<Customer[]>(`/customers`).publishReplay() as ConnectableObservable<Customer[]>;
			data$.connect();
			return this.allCustomers$ = data$;
		}
	}

	getCustomer(id: number): Observable<Customer> {
		if(this.allCustomers$) {
			return this.allCustomers$
				.map((customers: Customer[]) => customers.find((customer: Customer) => customer.id === id))
		} else {
			return this.http.get<Customer>(`/customers/${id}`);
		}
	}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Customer } from '../interfaces/customer.interface';


@Injectable()
export class CustomerService {

	allCustomers$: BehaviorSubject<Customer[]> = new BehaviorSubject([]);

	constructor(private http: HttpClient) {
		this.getCustomers();
	}

	getCustomers() {
		this.http.get<Customer[]>(`/customers`)
			.subscribe(customers => this.allCustomers$.next(customers));
	}

	getCustomer(id: number): Observable<Customer> {
		return this.http.get<Customer>(`/customers/${id}`);
	}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';

import { Customer } from '../interfaces/customer.interface';


@Injectable()
export class CustomerService {

	allCustomers$: ConnectableObservable<Customer[]>;
	emitter$: Subject<Customer[]> = new Subject();

	constructor(private http: HttpClient) {
		this.allCustomers$ = this.emitter$
			.switchMap(() => this.http.get<Customer[]>(`/customers`))
			.publishReplay(1);
		this.allCustomers$.connect();
	}

	getCustomers() {
		this.emitter$.next();
	}

	getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`/customers/${id}`);
	}

}

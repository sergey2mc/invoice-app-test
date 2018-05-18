import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../interfaces/customer.interface';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class CustomerService {

  allCustomers$: Observable<Customer[]>;

  constructor(private http: HttpClient) {}

	getCustomers(): Observable<Customer[]> {
    return this.allCustomers$ = this.allCustomers$ || this.http.get<Customer[]>(`/customers`).shareReplay(1);
	}

	getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`/customers/${id}`);
	}
}

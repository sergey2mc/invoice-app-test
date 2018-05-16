import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../shared/interfaces/customers.interface';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class CustomerService {

    allCustomers$: Observable<Customer[] | Customer>;

    constructor(private http: HttpClient) {}

    getCustomers(id: string | number = -1): Observable<Customer[] | Customer> {
        if (id > -1) {
            return this.http.get<Customer[] | Customer>(`/customers/${id}`);
        } else {
            return this.allCustomers$ = this.allCustomers$ || this.http.get<Customer[] | Customer>(`/customers`).shareReplay(1);
        }
    }
}

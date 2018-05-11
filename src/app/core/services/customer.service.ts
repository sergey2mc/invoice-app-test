import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../shared/interfaces/customers.interface';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) {}

    getCustomers(id: string | number = ''): Observable<Customer[] | Customer> {
        return this.http.get<Customer[] | Customer>(`/customers/${id}`);
    }
}

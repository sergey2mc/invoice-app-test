import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Customer } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';


@Injectable()
export class CustomersResolver implements Resolve<Observable<Customer[]>> {

  constructor(private customerService: CustomerService) {}

  resolve(): Observable<Observable<Customer[]>> {
    return this.customerService.allCustomers$
			.filter(customers => customers.length > 0)
      .take(1)
			.map((customer: Customer[]) => customer ? Observable.of(customer) : Observable.empty<Customer[]>())
			.catch(() => Observable.throw('Customer Resolver: sever error'));
  }
}

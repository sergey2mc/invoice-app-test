import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Customer } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';


@Injectable()
export class CustomersResolver implements Resolve<Customer[]> {

  constructor(private customerService: CustomerService) {}

  resolve(): Observable<Customer[]> {
    return this.customerService.getCustomers()
      .take(1)
			.catch(() => Observable.throw('Customer Resolver: sever error'));
  }
}

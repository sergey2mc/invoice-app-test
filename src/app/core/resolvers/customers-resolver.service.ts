import { Injectable } from '@angular/core';
import { Router, Resolve, NavigationEnd, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Customer } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class CustomersResolver implements Resolve<Observable<Customer[]>> {

<<<<<<< HEAD
  constructor(private customerService: CustomerService, private loader: LoaderService, private router: Router) {
=======
  constructor(
  	private customerService: CustomerService,
		private loader: LoaderService,
		private router: Router
	) {
>>>>>>> master
    this.customerService.getCustomers();
    router.events.subscribe(e => {
			if (e instanceof NavigationStart) {
				loader.show();
			} else if (e instanceof NavigationEnd) {
				loader.hide();
			}
    });
  }

  resolve(): Observable<Observable<Customer[]>> {
    return this.customerService.allCustomers$
      .take(1)
      .map(customer => {
        if (customer) {
          return Observable.of(customer);
        } else {
          return Observable.empty<Customer[]>();
        }
      })
      .catch(() => {
        this.router.navigate(['/']);
        return Observable.throw('Sever error');
      });
  }
}

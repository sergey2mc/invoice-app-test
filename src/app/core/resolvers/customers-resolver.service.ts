import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomersResolver implements Resolve<Customer | Customer[]> {
    constructor(private customerService: CustomerService, private router: Router) {}

    resolve(): Observable<Customer | Customer[]> {
        return this.customerService.getCustomers()
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

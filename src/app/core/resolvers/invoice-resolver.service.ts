import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceService } from '../services/invoice.service';


@Injectable()
export class InvoiceResolver implements Resolve<Observable<Invoice>> {

	constructor(private invoiceService: InvoiceService, private router: Router) {}

	resolve(route: ActivatedRouteSnapshot): Observable<Observable<Invoice>> {
		return this.invoiceService.getInvoice(+route.paramMap.get('id'))
			.take(1)
			.map(invoice => {
				if (invoice) {
					return Observable.of(invoice);
				} else {
					return Observable.empty<Invoice>();
				}
			})
			.catch(() => {
				this.router.navigate(['/']);
				return Observable.throw('Sever error');
			});
	}
}

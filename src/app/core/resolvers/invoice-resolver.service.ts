import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceService } from '../services/invoice.service';


@Injectable()
export class InvoiceResolverService implements Resolve<Observable<Invoice>> {

	constructor(private invoiceService: InvoiceService) {	}

	resolve(route: ActivatedRouteSnapshot): Observable<Observable<Invoice>> {
		return this.invoiceService.getInvoice(+route.paramMap.get('id'))
			.take(1)
			.map(invoice => Observable.of(invoice))
			.catch(() => Observable.empty<Observable<Invoice>>());
	}
}

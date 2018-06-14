import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { InvoiceItem } from '../interfaces/invoice-item.interface';
import { InvoiceItemsService } from '../services/invoice-items.service';


@Injectable()
export class InvoiceItemsResolverService implements Resolve<Observable<InvoiceItem[]>> {

	constructor(private invoiceItemsService: InvoiceItemsService) {	}

	resolve(route: ActivatedRouteSnapshot): Observable<Observable<InvoiceItem[]>> {
		return this.invoiceItemsService.getInvoiceItems(+route.paramMap.get('id'))
			.take(1)
			.map(invoiceItems => Observable.of(invoiceItems))
			.catch(() => Observable.empty<Observable<InvoiceItem[]>>());
	}
}

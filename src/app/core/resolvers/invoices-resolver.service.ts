import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

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
export class InvoicesResolver implements Resolve<Observable<Invoice[]>> {

  constructor(private invoiceService: InvoiceService) {
  	this.invoiceService.getInvoices();
	}

  resolve(): Observable<Observable<Invoice[]>> {
    return this.invoiceService.allInvoices$
      .take(1)
			.map((invoices: Invoice[]) => invoices ? Observable.of(invoices) : Observable.empty<Invoice[]>())
			.catch(() => Observable.throw('Invoices Resolver: sever error'));
    }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceService } from '../services/invoice.service';


@Injectable()
export class InvoicesResolver implements Resolve<Invoice[]> {

  constructor(private invoiceService: InvoiceService) {}

  resolve(): Observable<Invoice[]> {
		return this.invoiceService.dataLoaded$
			.do(status => console.log('Resolver', status))
			.switchMap(status => status ? this.invoiceService.allInvoices$ : this.invoiceService.getInvoices())
      .take(1)
			.catch(() => Observable.throw('Invoices Resolver: sever error'));
    }
}

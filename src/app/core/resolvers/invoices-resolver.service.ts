import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceService } from '../services/invoice.service';
import 'rxjs/add/operator/do';



@Injectable()
export class InvoicesResolver implements Resolve<Observable<Invoice[]>> {

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  resolve(): Observable<Observable<Invoice[]>> {
    return this.invoiceService.allInvoices$
      .filter(invoices => invoices.length > 0)
      .take(1)
      .map(invoices => {
        if (invoices) {
          return Observable.of(invoices);
        } else {
          return Observable.empty<Invoice[]>();
        }
      })
      .catch(() => {
        this.router.navigate(['/']);
        return Observable.throw('Sever error');
      });
    }
}

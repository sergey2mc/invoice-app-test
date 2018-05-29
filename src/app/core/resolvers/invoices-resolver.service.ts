import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Customer } from '../interfaces/customer.interface';
import { Invoice } from '../interfaces/invoice.interface';
import { CustomerService } from '../services/customer.service';
import { InvoiceService } from '../services/invoice.service';


@Injectable()
export class InvoicesResolver implements Resolve<Observable<Invoice[]>> {

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.invoiceService.getInvoices();
    this.customerService.getCustomers();
  }

  resolve(): Observable<Observable<Invoice[]>> {
    return combineLatest(
        this.invoiceService.allInvoices$,
        this.customerService.allCustomers$
      )
      .take(1)
      .map(([invoices, customers]: [Invoice[], Customer[]]) => {
        return invoices.map((invoice: Invoice) => ({...invoice, customer: customers.find(customer => customer.id === invoice.customer_id)}));
      })
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

///<reference path="../../../../node_modules/rxjs/Observable.d.ts"/>
import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { InvoiceService } from './invoice.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

@Injectable()
export class InvoicesResolver implements Resolve<Invoice | Invoice[]> {
    constructor(private invoiceService: InvoiceService, private router: Router) {}

    resolve(): Observable<Invoice | Invoice[]> {
        return this.invoiceService.getInvoices()
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class InvoiceService {

    allInvoices$: Observable<Invoice[] | Invoice>;

    constructor(private http: HttpClient) {}

    getInvoices(id: string | number = -1): Observable<Invoice[] | Invoice> {
        if (id > -1) {
            return this.http.get<Invoice[] | Invoice>(`/invoices/${id}`);
        } else {
            return this.allInvoices$ = this.allInvoices$ || this.http.get<Invoice[] | Invoice>(`/invoices`).shareReplay(1);
        }
    }

    addInvoice(newInvoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>('/invoices', newInvoice);
    }

    updateInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice);
    }

    deleteInvoice(id: string | number): Observable<Invoice> {
        return this.http.delete<Invoice>(`/invoices/${id}`);
    }

    clearCache() {
        this.allInvoices$ = null;
    }
}

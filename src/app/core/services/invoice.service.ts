import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { InvoiceItem } from '../../shared/interfaces/invoiceItem.interface';

@Injectable()
export class InvoiceService {

    constructor(private http: HttpClient) {}

    getInvoices(id: string | number = ''): Observable<Invoice[] | Invoice> {
        return this.http.get<Invoice[] | Invoice>(`/invoices/${id}`);
    }

    getInvoiceItems(id: string | number): Observable<InvoiceItem[]> {
        return this.http.get<InvoiceItem[]>(`/invoices/${id}/items`);
    }

    addInvoice(newInvoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>('/invoices', newInvoice);
    }

    editInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice);
    }

    deleteInvoice(id: string | number): Observable<Invoice> {
        return this.http.delete<Invoice>(`/invoices/${id}`);
    }
}

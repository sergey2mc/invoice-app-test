import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';

import { InvoiceItem } from '../interfaces/invoiceItem.interface';


@Injectable()
export class InvoiceItemsService {

	constructor(private http: HttpClient) {}

	getInvoiceItems(invoiceId: number): Observable<InvoiceItem[]> {
		return this.http.get<InvoiceItem[]>(`/invoices/${invoiceId}/items`);
	}

	addInvoiceItem(invoiceId: number, item: InvoiceItem): Observable<InvoiceItem> {
		return this.http.post<InvoiceItem>(`/invoices/${invoiceId}/items`, item);
	}

	updateInvoiceItem(invoiceId: number, invoiceItem: InvoiceItem): Observable<InvoiceItem> {
		return this.http.put<InvoiceItem>(`/invoices/${invoiceId}/items/${invoiceItem.id}`, invoiceItem);
	}

	deleteInvoiceItem(invoiceId: number, itemId: number): Observable<InvoiceItem> {
		return this.http.delete<InvoiceItem>(`/invoices/${invoiceId}/items/${itemId}`);
	}
}

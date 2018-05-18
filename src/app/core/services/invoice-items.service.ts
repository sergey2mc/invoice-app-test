import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { InvoiceItem } from '../interfaces/invoiceItem.interface';

@Injectable()
export class InvoiceItemsService {

	constructor(private http: HttpClient) {}

	getInvoiceItems(id: number): Observable<InvoiceItem[]> {
		return this.http.get<InvoiceItem[]>(`/invoices/${id}/items`);
	}

	updateInvoiceItem(invoiceId: number, invoiceItem: InvoiceItem): Observable<InvoiceItem> {
		if (invoiceItem.id === undefined) {
			return this.http.post<InvoiceItem>(`/invoices/${invoiceId}/items`, invoiceItem);
		} else {
			return this.http.put<InvoiceItem>(`/invoices/${invoiceId}/items/${invoiceItem.id}`, invoiceItem);
		}
	}

	deleteInvoiceItem(invoiceId: number, itemId: number): Observable<InvoiceItem> {
		return this.http.delete<InvoiceItem>(`/invoices/${invoiceId}/items/${itemId}`);
	}
}

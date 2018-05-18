import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../interfaces/invoice.interface';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class InvoiceService {

  allInvoices$: Observable<Invoice[]>;

  constructor(private http: HttpClient) {}

	getInvoices(): Observable<Invoice[]> {
    return this.allInvoices$ = this.allInvoices$ || this.http.get<Invoice[]>(`/invoices`).shareReplay(1);
	}

	getInvoice(id: number): Observable<Invoice> {
			return this.http.get<Invoice>(`/invoices/${id}`);
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

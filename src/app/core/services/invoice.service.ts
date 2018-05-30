import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/withLatestFrom';

import { Invoice } from '../interfaces/invoice.interface';


@Injectable()
export class InvoiceService {

	allInvoices$: Observable<Invoice[]>;
	allInvoicesEmitter$: BehaviorSubject<Invoice[]> = new BehaviorSubject([]);

	constructor(private http: HttpClient) {
		this.allInvoices$ = this.allInvoicesEmitter$.asObservable();
		this.getInvoices();
	}

	getInvoices() {
		this.http.get<Invoice[]>(`/invoices`)
			.subscribe(invoices => this.allInvoicesEmitter$.next(invoices))
	}

	getInvoice(id: number) {
		return this.http.get<Invoice>(`/invoices/${id}`);
	}

	addInvoice(newInvoice: Invoice) {
		return this.http.post<Invoice>('/invoices', newInvoice)
			.withLatestFrom(this.allInvoices$)
			.map(([newInvoice, invoices]) => {
				this.allInvoicesEmitter$.next([...invoices, newInvoice]);
				return newInvoice;
			});
	}

	updateInvoice(invoice: Invoice): Observable<Invoice> {
		return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice)
			.withLatestFrom(this.allInvoices$)
			.map(([editedInvoice, invoices]) => {
				this.allInvoicesEmitter$.next(invoices.map(invoice => invoice.id === editedInvoice.id ? editedInvoice : invoice));
				return editedInvoice;
			});
	}

	deleteInvoice(id: number): Observable<Invoice> {
		return this.http.delete<Invoice>(`/invoices/${id}`);
	}
}

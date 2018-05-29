import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';

import { Invoice } from '../interfaces/invoice.interface';


@Injectable()
export class InvoiceService {

	allInvoices$: ConnectableObservable<Invoice[]>;
	allInvoicesEmitter$: Subject<null> = new Subject();

	constructor(private http: HttpClient) {
		this.allInvoices$ = this.allInvoicesEmitter$
			.switchMap(() => this.http.get<Invoice[]>(`/invoices`))
			.publishReplay(1) as ConnectableObservable<Invoice[]>;
		this.allInvoices$.connect();
	}

	getInvoices() {
		this.allInvoicesEmitter$.next();
	}

	getInvoice(id: number) {
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
}

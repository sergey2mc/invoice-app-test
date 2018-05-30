import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

import { Invoice } from '../interfaces/invoice.interface';
import { LoaderService } from './loader.service';


@Injectable()
export class InvoiceService {

	allInvoices$: BehaviorSubject<Invoice[]> = new BehaviorSubject([]);

	constructor(private http: HttpClient, private loaderService: LoaderService,) {
		this.getInvoices();
	}

	getInvoices() {
		this.http.get<Invoice[]>(`/invoices`)
			.subscribe(invoices => this.allInvoices$.next(invoices))
	}

	getInvoice(id: number) {
		return this.http.get<Invoice>(`/invoices/${id}`);
	}

	addInvoice(newInvoice: Invoice) {
		return this.http.post<Invoice>('/invoices', newInvoice)
			.withLatestFrom(this.allInvoices$)
			.do(([newInvoice, invoices]) => this.allInvoices$.next([...invoices, newInvoice]))
			.map(([newInvoice, invoices]) => newInvoice);
	}

	updateInvoice(invoice: Invoice): Observable<Invoice> {
		return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice)
			.withLatestFrom(this.allInvoices$)
			.do(([editedInvoice, invoices]) => this.allInvoices$.next(invoices.map(invoice => invoice.id === editedInvoice.id ? editedInvoice : invoice)))
			.map(([editedInvoice, invoices]) => editedInvoice);
	}

	deleteInvoice(id: number): Observable<Invoice> {
		return this.http.delete<Invoice>(`/invoices/${id}`)
			.withLatestFrom(this.allInvoices$)
			.do(([deletedInvoice, invoices]) => this.allInvoices$.next(invoices.filter(invoice => invoice.id !== deletedInvoice.id)))
			.map(([deletedInvoice, invoices]) => deletedInvoice)
			.do(() => this.loaderService.hide());
	}
}

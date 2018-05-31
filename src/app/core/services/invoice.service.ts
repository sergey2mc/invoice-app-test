import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Invoice } from '../interfaces/invoice.interface';
import { LoaderService } from './loader.service';


@Injectable()
export class InvoiceService {

	allInvoices$: Observable<Invoice[]>;

	constructor(private http: HttpClient, private loaderService: LoaderService) {}

	getInvoices(): Observable<Invoice[]> {
		return this.allInvoices$ ? this.allInvoices$ : this.updateInvoicesList();
	}

	updateInvoicesList(invoices: Invoice[] = null): Observable<Invoice[]> {
		const source$ : Observable<Invoice[]> = invoices ? Observable.of(invoices) : this.http.get<Invoice[]>(`/invoices`);
		const data$: ConnectableObservable<Invoice[]> = source$.publishReplay() as ConnectableObservable<Invoice[]>;
		data$.connect();
		return this.allInvoices$ = data$;
	}

	getInvoice(id: number): Observable<Invoice> {
		if(this.allInvoices$) {
			return this.allInvoices$
				.map((invoices: Invoice[]) => invoices.find((invoice: Invoice) => invoice.id === id))
		} else {
			return this.http.get<Invoice>(`/invoices/${id}`);
		}
	}

	addInvoice(newInvoice: Invoice): Observable<Invoice> {
		return this.http.post<Invoice>('/invoices', newInvoice)
			.withLatestFrom(this.getInvoices())
			.map(([newInvoice, invoices]) => {
				this.updateInvoicesList([...invoices, newInvoice]);
				return newInvoice;
			});
	}

	updateInvoice(invoice: Invoice): Observable<Invoice[]> {
		return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice)
			.withLatestFrom(this.getInvoices())
			.map(([editedInvoice, invoices]) => invoices.map(invoice => invoice.id === editedInvoice.id ? editedInvoice : invoice))
			.do((invoices: Invoice[]) => this.updateInvoicesList(invoices))
	}

	deleteInvoice(id: number): Observable<Invoice> {
		return this.http.delete<Invoice>(`/invoices/${id}`)
			.withLatestFrom(this.getInvoices())
			.map(([deletedInvoice, invoices]) => {
				this.updateInvoicesList(invoices.filter(invoice => invoice.id !== deletedInvoice.id));
				return deletedInvoice;
			})
			.do(() => this.loaderService.hide());
	}
}

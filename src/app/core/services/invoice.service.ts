import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Invoice } from '../interfaces/invoice.interface';
import { LoaderService } from './loader.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state';

import * as invoices from '../../ngrx/invoices/actions';
import * as invoicesGetterState from '../../ngrx/invoices/states/invoices-getter.state';
import * as invoicesGetRequestGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoices-get/states/invoices-get-getter.state';
import * as invoiceGetRequestGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoice-get/states/invoice-get-getter.state';
import * as invoiceDeleteRequestGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoice-delete/states/invoice-delete-getter.state';
import * as invoiceAddRequestGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoice-add/states/invoice-add-getter.state';
import * as invoiceUpdateRequestGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoice-update/states/invoice-update-getter.state';

import * as customersGetterState from '../../ngrx/customers/states/customers-getter.state';
import * as invoiceItemsGetterState from '../../ngrx/invoice-items/states/invoice-items-getter.state';
import * as productsGetterState from '../../ngrx/products/states/products-getter.state';


@Injectable()
export class InvoiceService {

	dataLoaded$: Observable<boolean>;
	allInvoices$: Observable<Invoice[]>;
	invoice$: Observable<Invoice>;
	deletedInvoice$: Observable<Invoice>;
	addedInvoice$: Observable<Invoice>;
	updatedInvoice$: Observable<Invoice>;

	constructor(
		private http: HttpClient,
		private store: Store<AppState>,
		private loader: LoaderService,
	) {
		this.dataLoaded$ = this.store.select(invoicesGetRequestGetterState.getIsLoadedInvoicesGetRequest);

		this.allInvoices$ = this.store.select(invoicesGetterState.getInvoices)
			.withLatestFrom(this.dataLoaded$)
			.filter(([invoices, loaded]) => loaded)
			.map(([invoices]) => invoices)
			// customer
			.combineLatest(this.store.select(customersGetterState.getCustomersEntities))
			.map(([invoices, customersEntities]) => invoices.map(invoice => ({
				...invoice,
				customer: customersEntities[invoice.customer_id]
			})));

		this.invoice$ = this.store.select(invoicesGetterState.getInvoice)
			.withLatestFrom(this.store.select(invoiceGetRequestGetterState.getIsLoadedInvoiceGetRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice)
			// customer
			.combineLatest(this.store.select(customersGetterState.getCustomersEntities))
			.map(([invoice, customersEntities]) => ({
				...invoice,
				customer: customersEntities[invoice.customer_id]
			}))
			// invoice items
			.combineLatest(this.store.select(invoiceItemsGetterState.getInvoiceItems))
			.map(([invoice, invoiceItems]) => ({...invoice, items: invoiceItems.filter(item => item.invoice_id === invoice.id)}))
			// invoice items products
			.combineLatest(this.store.select(productsGetterState.getProductsEntities))
			.map(([invoice, productEntities]) => ({
				...invoice,
				items: invoice.items.map(item => ({...item, product: productEntities[item.product_id]}))
			}));
			// .do(res => console.log('Invoice Service', res));

		this.deletedInvoice$ = this.store.select(invoicesGetterState.getInvoice)
			.withLatestFrom(this.store.select(invoiceDeleteRequestGetterState.getIsLoadedInvoiceDeleteRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice);

		this.addedInvoice$ = this.store.select(invoicesGetterState.getInvoice)
			.withLatestFrom(this.store.select(invoiceAddRequestGetterState.getIsLoadedInvoiceAddRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice);

		this.updatedInvoice$ = this.store.select(invoicesGetterState.getInvoice)
			.withLatestFrom(this.store.select(invoiceUpdateRequestGetterState.getIsLoadedInvoiceUpdateRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice);
	}

	getInvoices() {
		this.store.dispatch(new invoices.GetInvoicesAction);
		return this.allInvoices$;
	}

	getInvoicesRequest(): Observable<Invoice[]> {
		return this.http.get<Invoice[]>(`/invoices`);
	}

	getInvoice(id: number) {
		this.store.dispatch(new invoices.GetInvoiceAction(id));
		return this.invoice$;
	}

	getInvoiceRequest(id: number): Observable<Invoice> {
		return this.http.get<Invoice>(`/invoices/${id}`);
	}

	deleteInvoiceRequest(id: number): Observable<Invoice> {
		return this.http.delete<Invoice>(`/invoices/${id}`);
	}

	deleteInvoice(id: number) {
		this.store.dispatch(new invoices.DeleteInvoiceAction(id));
		return this.deletedInvoice$;
	}

	addInvoiceRequest(newInvoice: Invoice): Observable<Invoice> {
		return this.http.post<Invoice>('/invoices', newInvoice);
	}

	addInvoice(newInvoice: Invoice) {
		this.store.dispatch(new invoices.AddInvoiceAction(newInvoice));
		return this.addedInvoice$;
	}

	updateInvoiceRequest(invoice: Invoice): Observable<Invoice> {
		return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice);
	}

	updateInvoice(invoice: Invoice): Observable<Invoice> {
		this.store.dispatch(new invoices.UpdateInvoiceAction(invoice));
		return this.updatedInvoice$;
	}

}

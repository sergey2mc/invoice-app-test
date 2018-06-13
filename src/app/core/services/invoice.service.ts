import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceItemsService } from './invoice-items.service';
import { ProductService } from './product.service';
import { CustomerService } from './customer.service';
import { LoaderService } from './loader.service';
import { ErrorHandlerService } from './error-handler.service';
import {Actions, StateManagement} from '../../shared/state/state-management';

import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state';

import * as invoices from '../../ngrx/invoices/actions';
import * as invoicesGetterState from '../../ngrx/invoices/states/invoices-getter.state';
import * as invoicesRequestsGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoices-get/states/invoices-get-getter.state';
import * as invoiceRequestsGetterState from '../../ngrx/requests/nested-states/invoices/nested-states/invoice-get/states/invoice-get-getter.state';


@Injectable()
export class InvoiceService {

	dataLoaded$: Observable<boolean>;
	state: StateManagement<Invoice>;
	allInvoices$: Observable<Invoice[]>;
	invoice$: Observable<Invoice>;
	invoiceAdded$: Observable<Invoice>;
	invoiceUpdated$: Observable<Invoice>;

	constructor(
		private http: HttpClient,
		private store: Store<AppState>,
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceItemsService: InvoiceItemsService,
		private loader: LoaderService,
		private errorService: ErrorHandlerService
	) {
		this.state = new StateManagement<Invoice>();

		this.dataLoaded$ = this.store.select(invoicesRequestsGetterState.getIsLoadedInvoicesGetRequest);

		this.allInvoices$ = this.store.select(invoicesGetterState.getInvoices)
			.withLatestFrom(this.dataLoaded$)
			.filter(([invoices, loaded]) => loaded)
			.map(([invoices, loaded]) => invoices);

		this.invoice$ = this.store.select(invoicesGetterState.getInvoice)
			.withLatestFrom(this.store.select(invoiceRequestsGetterState.getIsLoadedInvoiceGetRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice, loaded]) => invoice)
			.switchMap((invoice) => Observable.combineLatest(
				Observable.of(invoice),
				this.customerService.getCustomer(invoice.customer_id),
				this.invoiceItemsService.getInvoiceItems(invoice.id)
			))
			.map(([invoice, customer, items]) => ({...invoice, customer, items}))
			// .do(res => console.log('Invoice Service <invoice>', res));

		this.invoiceAdded$ = this.state.getResponseElement(Actions.Add);
		this.invoiceUpdated$ = this.state.getResponseElement(Actions.Update);
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




	addInvoice(newInvoice: Invoice): Observable<Invoice> {
		this.state.add$.next(this.http.post<Invoice>('/invoices', newInvoice).catch((error) => this.errorService.handleError<Invoice>(error)));
		return this.invoiceAdded$;
	}

	updateInvoice(invoice: Invoice): Observable<Invoice> {
		this.state.update$.next(this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice).catch((error) => this.errorService.handleError<Invoice>(error)));
		return this.invoiceUpdated$;
	}

	deleteInvoice(id: number): Observable<Invoice> {
		this.state.delete$.next(this.http.delete<Invoice>(`/invoices/${id}`).catch((error) => this.errorService.handleError<Invoice>(error)));
		return this.state.deleteData$;
	}

}

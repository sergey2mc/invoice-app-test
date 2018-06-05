import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Invoice } from '../interfaces/invoice.interface';
import { InvoiceItemsService } from './invoice-items.service';
import { ProductService } from './product.service';
import { CustomerService } from './customer.service';
import { Actions, StateManagement } from '../../shared/state/state-management';


@Injectable()
export class InvoiceService {

	dataLoaded$: ConnectableObservable<boolean>;
	state: StateManagement<Invoice>;
	allInvoices$: Observable<Invoice[]>;
	invoice$: Observable<Invoice>;

	constructor(
		private http: HttpClient,
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceItemsService: InvoiceItemsService
	) {
		this.state = new StateManagement<Invoice>();

		this.dataLoaded$ = this.state.request$
			.filter(({type}) => type === Actions.GetList)
			.scan(() => true, false)
			// .do(status => console.log('Invoice Service <dataLoaded>', status))
			.publishBehavior(false);
		this.dataLoaded$.connect();

		this.allInvoices$ = Observable.combineLatest(
				this.state.collectionIds$,
				this.state.entities$
			)
			.map(([ids, entities]) => ids.filter(id => entities[id]).map(id => entities[id]))
			.shareReplay(1);

		this.invoice$ = Observable.combineLatest(
				this.state.entityId$,
				this.state.entities$
			)
			.map(([id, entities]) => entities[id])
			.switchMap((invoice: Invoice) => Observable.combineLatest(  // combine invoice, (items + products) and customer
				Observable.of(invoice),
				this.invoiceItemsService.getInvoiceItems(invoice.id)
					.withLatestFrom(this.productService.allProducts$)
					.map(([items, products]) => items.map(item => ({...item, product: products.find(product => product.id === item.product_id)}))),
				this.customerService.getCustomer(invoice.customer_id)
			))
			.map(([invoice, items, customer]) => ({
				...invoice,
				items: items,
				customer: customer
			}))
			// .do(res => console.log('Invoice Service <invoice>', res))
			.share();
	}

	getInvoices(): Observable<Invoice[]> {
		this.state.getList$.next(this.http.get<Invoice[]>(`/invoices`));
		return this.allInvoices$;
	}

	getInvoice(id: number): Observable<Invoice> {
		this.state.get$.next(this.http.get<Invoice>(`/invoices/${id}`));
		return this.invoice$;
	}

	addInvoice(newInvoice: Invoice): Observable<Invoice> {
		this.state.add$.next(this.http.post<Invoice>('/invoices', newInvoice));
		return this.invoice$
	}

	updateInvoice(invoice: Invoice): Observable<Invoice> {
		this.state.update$.next(this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice));
		return this.state.updateData$;
	}

	deleteInvoice(id: number): Observable<Invoice> {
		this.state.delete$.next(this.http.delete<Invoice>(`/invoices/${id}`));
		return this.state.deleteData$;
	}
}

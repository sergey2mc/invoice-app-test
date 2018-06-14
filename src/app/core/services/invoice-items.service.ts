import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

import { InvoiceItem } from '../interfaces/invoice-item.interface';
import { ProductService } from './product.service';
import { LoaderService } from './loader.service';
import { Actions, StateManagement } from '../../shared/state/state-management';

import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state';
import * as invoiceItems from '../../ngrx/invoice-items/actions';
import * as invoiceItemsGetterState from '../../ngrx/invoice-items/states/invoice-items-getter.state';
import * as invoiceItemsRequestsGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-items-get/states/invoice-items-get-getter.state';


@Injectable()
export class InvoiceItemsService {

	dataLoaded$: Observable<boolean>;
	state: StateManagement<InvoiceItem>;
	invoiceItems$: Observable<InvoiceItem[]>;
	invoiceItemAdded$: Observable<InvoiceItem>;
	invoiceItemUpdated$: Observable<InvoiceItem>;

	constructor(
		private http: HttpClient,
		private store: Store<AppState>,
		private productService: ProductService,
		private loader: LoaderService
	) {
		this.state = new StateManagement<InvoiceItem>();

		this.dataLoaded$ = this.store.select(invoiceItemsRequestsGetterState.getIsLoadedInvoiceItemsGetRequest);

		this.invoiceItems$ = this.store.select(invoiceItemsGetterState.getInvoiceItemsEntities)
			.withLatestFrom(
				this.store.select(invoiceItemsGetterState.getInvoiceItemsCollectionIds),
				this.dataLoaded$
			)
			.filter(([entities, ids, loaded]) => loaded)
			.map(([entities, ids]) => ids.filter(id => entities[id]).map(id => entities[id]));
			// .do(res => console.log('Invoice Item', res));

		this.invoiceItemAdded$ = this.state.getResponseElement(Actions.Add);
		this.invoiceItemUpdated$ = this.state.getResponseElement(Actions.Update);
	}


	getInvoiceItems(invoiceId: number) {
		this.store.dispatch(new invoiceItems.GetInvoiceItemsAction(invoiceId));
		return this.invoiceItems$;
	}

	getInvoiceItemsRequest(invoiceId: number) {
		return this.http.get<InvoiceItem[]>(`/invoices/${invoiceId}/items`);
	}






	updateInvoiceItem(invoiceId: number, invoiceItem: InvoiceItem): Observable<InvoiceItem> {
		this.state.update$.next(this.http.put<InvoiceItem>(`/invoices/${invoiceId}/items/${invoiceItem.id}`, invoiceItem));
		return this.invoiceItemUpdated$;
	}

	addInvoiceItem(invoiceId: number, item: InvoiceItem): Observable<InvoiceItem> {
		this.state.add$.next(this.http.post<InvoiceItem>(`/invoices/${invoiceId}/items`, item));
		return this.invoiceItemAdded$;
	}


	deleteInvoiceItem(invoiceId: number, itemId: number): Observable<InvoiceItem> {
		this.loader.show();
		this.state.delete$.next(this.http.delete<InvoiceItem>(`/invoices/${invoiceId}/items/${itemId}`));
		return this.state.deleteData$;
	}
}

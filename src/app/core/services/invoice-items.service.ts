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
import { LoaderService } from './loader.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state';

import * as invoiceItems from '../../ngrx/invoice-items/actions';
import * as invoiceItemsGetterState from '../../ngrx/invoice-items/states/invoice-items-getter.state';
import * as invoiceItemsGetRequestGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-items-get/states/invoice-items-get-getter.state';
import * as invoiceItemDeleteRequestGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-item-delete/states/invoice-item-delete-getter.state';
import * as invoiceItemAddRequestGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-item-add/states/invoice-item-add-getter.state';
import * as invoiceItemUpdateRequestGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-item-update/states/invoice-item-update-getter.state';


@Injectable()
export class InvoiceItemsService {

	dataLoaded$: Observable<boolean>;

	invoiceItems$: Observable<InvoiceItem[]>;
	deletedInvoiceItem$: Observable<InvoiceItem>;
	addedInvoiceItem$: Observable<InvoiceItem>;
	updatedInvoiceItem$: Observable<InvoiceItem>;

	constructor(
		private http: HttpClient,
		private store: Store<AppState>,
		private loader: LoaderService
	) {

		this.dataLoaded$ = this.store.select(invoiceItemsGetRequestGetterState.getIsLoadedInvoiceItemsGetRequest);

		this.invoiceItems$ = this.store.select(invoiceItemsGetterState.getInvoiceItemsEntities)
			.withLatestFrom(
				this.store.select(invoiceItemsGetterState.getInvoiceItemsCollectionIds),
				this.dataLoaded$
			)
			.filter(([entities, ids, loaded]) => loaded)
			.map(([entities, ids]) => ids.filter(id => entities[id]).map(id => entities[id]));
			// .do(res => console.log('Invoice Item', res));

		this.deletedInvoiceItem$ = this.store.select(invoiceItemsGetterState.getInvoiceItem)
			.withLatestFrom(this.store.select(invoiceItemDeleteRequestGetterState.getIsLoadedInvoiceItemDeleteRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice);

		this.addedInvoiceItem$ = this.store.select(invoiceItemsGetterState.getInvoiceItem)
			.withLatestFrom(this.store.select(invoiceItemAddRequestGetterState.getIsLoadedInvoiceItemAddRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice);

		this.updatedInvoiceItem$ = this.store.select(invoiceItemsGetterState.getInvoiceItem)
			.withLatestFrom(this.store.select(invoiceItemUpdateRequestGetterState.getIsLoadedInvoiceItemUpdateRequest))
			.filter(([invoice, loaded]) => loaded)
			.map(([invoice]) => invoice);
	}

	getInvoiceItems(invoiceId: number) {
		this.store.dispatch(new invoiceItems.GetInvoiceItemsAction(invoiceId));
		return this.invoiceItems$;
	}

	getInvoiceItemsRequest(invoiceId: number) {
		return this.http.get<InvoiceItem[]>(`/invoices/${invoiceId}/items`);
	}

	deleteInvoiceItem(invoiceId: number, itemId: number): Observable<InvoiceItem> {
		this.store.dispatch(new invoiceItems.DeleteInvoiceItemAction({invoiceId, itemId}));
		return this.deletedInvoiceItem$;
	}

	deleteInvoiceItemRequest({invoiceId, itemId}) {
		return this.http.delete<InvoiceItem>(`/invoices/${invoiceId}/items/${itemId}`)
	}

	addInvoiceItem(invoiceId: number, invoiceItem: InvoiceItem): Observable<InvoiceItem> {
		this.store.dispatch(new invoiceItems.AddInvoiceItemAction({invoiceId, invoiceItem}));
		return this.addedInvoiceItem$;
	}

	addInvoiceItemRequest({invoiceId, invoiceItem}) {
		return this.http.post<InvoiceItem>(`/invoices/${invoiceId}/items`, invoiceItem);
	}

	updateInvoiceItem(invoiceId: number, invoiceItem: InvoiceItem): Observable<InvoiceItem> {
		this.store.dispatch(new invoiceItems.UpdateInvoiceItemAction({invoiceId, invoiceItem}));
		return this.updatedInvoiceItem$;
	}

	updateInvoiceItemRequest({invoiceId, invoiceItem}) {
		return this.http.put<InvoiceItem>(`/invoices/${invoiceId}/items/${invoiceItem.id}`, invoiceItem)
	}

}

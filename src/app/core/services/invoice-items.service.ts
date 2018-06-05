import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

import { InvoiceItem } from '../interfaces/invoiceItem.interface';
import { Actions, StateManagement } from '../../shared/state/state-management';


@Injectable()
export class InvoiceItemsService {

	dataLoaded$: ConnectableObservable<boolean>;
	state: StateManagement<InvoiceItem>;
	invoiceItems$: Observable<any>;

	constructor(private http: HttpClient) {
		this.state = new StateManagement<InvoiceItem>();

		this.dataLoaded$ = this.state.request$
			.filter(({type}) => type === Actions.GetList)
			.scan(() => true, false)
			// .do(status => console.log('Service', status))
			.publishBehavior(false);
		this.dataLoaded$.connect();

		this.invoiceItems$ = Observable.combineLatest(
				this.state.collectionIds$,
				this.state.entities$
			)
			.map(([ids, entities]) => ids.filter(id => entities[id]).map(id => entities[id]))
			.shareReplay(1);
	}


	getInvoiceItems(invoiceId: number): Observable<InvoiceItem[]> {
		this.state.getList$.next(this.http.get<InvoiceItem[]>(`/invoices/${invoiceId}/items`));
		return this.state.getListData$;
	}

	updateInvoiceItem(invoiceId: number, invoiceItem: InvoiceItem): Observable<InvoiceItem> {
		this.state.update$.next(this.http.put<InvoiceItem>(`/invoices/${invoiceId}/items/${invoiceItem.id}`, invoiceItem));
		return this.state.updateData$;
	}

	addInvoiceItem(invoiceId: number, item: InvoiceItem): Observable<InvoiceItem> {
		this.state.add$.next(this.http.post<InvoiceItem>(`/invoices/${invoiceId}/items`, item));
		return this.state.addData$;
	}


	deleteInvoiceItem(invoiceId: number, itemId: number): Observable<InvoiceItem> {
		this.state.delete$.next(this.http.delete<InvoiceItem>(`/invoices/${invoiceId}/items/${itemId}`));
		return this.state.deleteData$;
	}
}

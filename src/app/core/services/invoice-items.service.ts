import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

import { InvoiceItem } from '../interfaces/invoice-item.interface';
import { LoaderService } from './loader.service';
import { Actions, StateManagement } from '../../shared/state/state-management';


@Injectable()
export class InvoiceItemsService {

	dataLoaded$: ConnectableObservable<boolean>;
	state: StateManagement<InvoiceItem>;
	invoiceItemAdded$: Observable<InvoiceItem>;
	invoiceItemUpdated$: Observable<InvoiceItem>;

	constructor(private http: HttpClient, private loader: LoaderService) {
		this.state = new StateManagement<InvoiceItem>();

		this.dataLoaded$ = this.state.request$
			.filter(({type}) => type === Actions.GetList)
			.scan(() => true, false)
			.publishBehavior(false);
		this.dataLoaded$.connect();

		this.invoiceItemAdded$ = this.state.getResponseElement(Actions.Add);
		this.invoiceItemUpdated$ = this.state.getResponseElement(Actions.Update);
	}


	getInvoiceItems(invoiceId: number): Observable<InvoiceItem[]> {
		this.state.getList$.next(this.http.get<InvoiceItem[]>(`/invoices/${invoiceId}/items`));
		return this.state.getListData$;
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

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';
import { InvoiceItemsService } from '../../../../../../../core/services/invoice-items.service';
import { ActionTypes, DeleteInvoiceItemFailAction, DeleteInvoiceItemSuccessAction } from '../actions';



@Injectable()
export class InvoiceItemDeleteRequestsEffects {

	@Effect()
	invoiceItemDeleteRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.DELETE)
		.switchMap((action: Action) => this.invoiceItemsService.deleteInvoiceItemRequest(action['payload']))
		.map((invoice: InvoiceItem) => new DeleteInvoiceItemSuccessAction(invoice))
		.catch((error) => Observable.of(new DeleteInvoiceItemFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceItemsService: InvoiceItemsService
	) {}
}

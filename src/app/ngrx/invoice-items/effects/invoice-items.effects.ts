import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as invoiceItemsActions from '../actions';
import * as requestsActions from '../../requests/nested-states/invoice-items/actions';


@Injectable()
export class InvoiceItemsEffects {

	@Effect()
	invoiceItemsGetRequest: Observable<Action> = this.action$
		.ofType(invoiceItemsActions.ActionTypes.GET_LIST)
		.map((action) => new requestsActions.GetInvoiceItemsAction(action['payload']));

	@Effect()
	getInvoiceItems$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceItemsGetActionTypes.GET_LIST_SUCCESS)
		.map((action) => new invoiceItemsActions.GetInvoiceItemsSuccessAction(action['payload']));

	@Effect()
	invoiceItemDeleteRequest: Observable<Action> = this.action$
		.ofType(invoiceItemsActions.ActionTypes.DELETE)
		.map((action) => new requestsActions.DeleteInvoiceItemAction(action['payload']));

	@Effect()
	deleteInvoiceItem$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceItemDeleteActionTypes.DELETE_SUCCESS)
		.map((action) => new invoiceItemsActions.DeleteInvoiceItemSuccessAction(action['payload']));

	@Effect()
	invoiceItemAddRequest: Observable<Action> = this.action$
		.ofType(invoiceItemsActions.ActionTypes.ADD)
		.map((action) => new requestsActions.AddInvoiceItemAction(action['payload']));

	@Effect()
	addInvoiceItem$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceItemAddActionTypes.ADD_SUCCESS)
		.map((action) => new invoiceItemsActions.AddInvoiceItemSuccessAction(action['payload']));

	@Effect()
	invoiceItemUpdateRequest: Observable<Action> = this.action$
		.ofType(invoiceItemsActions.ActionTypes.UPDATE)
		.map((action) => new requestsActions.UpdateInvoiceItemAction(action['payload']));

	@Effect()
	updateInvoiceItem$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceItemUpdateActionTypes.UPDATE_SUCCESS)
		.map((action) => new invoiceItemsActions.UpdateInvoiceItemSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

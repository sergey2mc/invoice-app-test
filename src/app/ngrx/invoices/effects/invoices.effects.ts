import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as invoicesActions from '../actions';
import * as requestsActions from '../../requests/nested-states/invoices/actions';


@Injectable()
export class InvoicesEffects {

	@Effect()
	invoicesGetRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.GET_LIST)
		.map(() => new requestsActions.GetInvoicesAction);

	@Effect()
	getInvoices$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoicesGetActionTypes.GET_LIST_SUCCESS)
		.map((action) => new invoicesActions.GetInvoicesSuccessAction(action['payload']));

	@Effect()
	invoiceGetRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.GET)
		.map((action) => new requestsActions.GetInvoiceAction(action['payload']));

	@Effect()
	getInvoice$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceGetActionTypes.GET_SUCCESS)
		.map((action) => new invoicesActions.GetInvoiceSuccessAction(action['payload']));

	@Effect()
	invoiceAddRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.ADD)
		.map((action) => new requestsActions.AddInvoiceAction(action['payload']));

	@Effect()
	addInvoice$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceAddActionTypes.ADD_SUCCESS)
		.map((action) => new invoicesActions.AddInvoiceSuccessAction(action['payload']));

	@Effect()
	invoiceUpdateRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.UPDATE)
		.map((action) => new requestsActions.UpdateInvoiceAction(action['payload']));

	@Effect()
	updateInvoice$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceUpdateActionTypes.UPDATE_SUCCESS)
		.map((action) => new invoicesActions.UpdateInvoiceSuccessAction(action['payload']));

	@Effect()
	invoiceDeleteRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.DELETE)
		.map((action) => new requestsActions.DeleteInvoiceAction(action['payload']));

	@Effect()
	deleteInvoice$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceDeleteActionTypes.DELETE_SUCCESS)
		.map((action) => new invoicesActions.DeleteInvoiceSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

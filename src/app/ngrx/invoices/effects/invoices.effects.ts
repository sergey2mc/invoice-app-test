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
	invoiceDeleteRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.DELETE)
		.map((action) => new requestsActions.DeleteInvoiceAction(action['payload']));

	@Effect()
	deleteInvoice$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceDeleteActionTypes.DELETE_SUCCESS)
		.map((action) => new invoicesActions.DeleteInvoiceSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

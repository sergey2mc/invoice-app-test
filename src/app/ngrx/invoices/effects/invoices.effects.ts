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
	invoices$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoicesGetActionTypes.GET_LIST_SUCCESS)
		.map((action) => new invoicesActions.GetInvoicesSuccessAction(action['payload']));

	@Effect()
	invoiceGetRequest: Observable<Action> = this.action$
		.ofType(invoicesActions.ActionTypes.GET)
		.map((action) => new requestsActions.GetInvoiceAction(action['payload']));

	@Effect()
	invoice$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceGetActionTypes.GET_SUCCESS)
		.map((action) => new invoicesActions.GetInvoiceSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

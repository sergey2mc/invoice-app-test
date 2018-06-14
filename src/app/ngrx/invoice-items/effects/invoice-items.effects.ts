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
	invoiceItems$: Observable<Action> = this.action$
		.ofType(requestsActions.InvoiceItemsGetActionTypes.GET_LIST_SUCCESS)
		.map((action) => new invoiceItemsActions.GetInvoiceItemsSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

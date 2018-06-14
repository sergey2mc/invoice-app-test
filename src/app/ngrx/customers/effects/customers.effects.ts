import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as customersActions from '../actions';
import * as requestsActions from '../../requests/nested-states/customers/actions';


@Injectable()
export class CustomersEffects {

	@Effect()
	customersGetRequest: Observable<Action> = this.action$
		.ofType(customersActions.ActionTypes.GET_LIST)
		.map(() => new requestsActions.GetCustomersAction);

	@Effect()
	customers$: Observable<Action> = this.action$
		.ofType(requestsActions.CustomersActionTypes.GET_LIST_SUCCESS)
		.map((action) => new customersActions.GetCustomersSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

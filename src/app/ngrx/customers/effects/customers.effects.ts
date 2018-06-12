import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as customersActions from '../actions';
import * as requestsActions from '../../requests/nested-states/customers/actions';
import {Action} from '@ngrx/store';


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

	@Effect()
	customerGetRequest: Observable<Action> = this.action$
		.ofType(customersActions.ActionTypes.GET)
		.map((action) => new requestsActions.GetCustomerAction(action['payload']));

	@Effect()
	customer$: Observable<Action> = this.action$
		.ofType(requestsActions.CustomerActionTypes.GET_SUCCESS)
		.map((action) => new customersActions.GetCustomerSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

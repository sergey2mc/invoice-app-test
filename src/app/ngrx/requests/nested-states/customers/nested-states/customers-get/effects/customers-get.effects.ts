import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../../../../../../core/services/customer.service';
import { ActionTypes, GetCustomersFailAction, GetCustomersSuccessAction } from '../actions';


@Injectable()
export class CustomersRequestsEffects {

	@Effect()
	customersGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET_LIST)
		.switchMap(() => this.customerService.getCustomersRequest())
		.map((customers) => new GetCustomersSuccessAction(customers))
		.catch((error) => Observable.of(new GetCustomersFailAction(error)));

	constructor(
		private actions$: Actions,
		private customerService: CustomerService
	) {}
}

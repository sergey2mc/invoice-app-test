import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Customer } from '../../../../../../../core/interfaces/customer.interface';
import { CustomerService } from '../../../../../../../core/services/customer.service';
import { ActionTypes, GetCustomerFailAction, GetCustomerSuccessAction } from '../actions';


@Injectable()
export class CustomerRequestsEffects {

	@Effect()
	customerGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET)
		.switchMap((action: Action) => this.customerService.getCustomerRequest(action['payload']))
		.map((customer: Customer) => new GetCustomerSuccessAction(customer))
		.catch((error) => Observable.of(new GetCustomerFailAction(error)));

	constructor(
		private actions$: Actions,
		private customerService: CustomerService
	) {}
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as productsActions from '../actions';
import * as requestsActions from '../../requests/nested-states/products/actions';


@Injectable()
export class ProductsEffects {

	@Effect()
	productsGetRequest: Observable<Action> = this.action$
		.ofType(productsActions.ActionTypes.GET_LIST)
		.map(() => new requestsActions.GetProductsAction);

	@Effect()
	products$: Observable<Action> = this.action$
		.ofType(requestsActions.ProductsGetActionTypes.GET_LIST_SUCCESS)
		.map((action) => new productsActions.GetProductsSuccessAction(action['payload']));

	constructor(private action$: Actions) {}
}

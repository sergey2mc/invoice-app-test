import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ProductService } from '../../../../../../../core/services/product.service';
import { ActionTypes, GetProductsSuccessAction, GetProductsFailAction } from '../actions';


@Injectable()
export class ProductsRequestsEffects {

	@Effect()
	productsGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET_LIST)
		.switchMap(() => this.productService.getProductsRequest())
		.map((products) => new GetProductsSuccessAction(products))
		.catch((error) => Observable.of(new GetProductsFailAction(error)));

	constructor(
		private actions$: Actions,
		private productService: ProductService
	) {}
}

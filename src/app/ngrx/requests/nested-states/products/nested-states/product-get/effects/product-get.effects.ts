import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Product } from '../../../../../../../core/interfaces/product.interface';
import { ProductService } from '../../../../../../../core/services/product.service';
import { ActionTypes, GetProductFailAction, GetProductSuccessAction } from '../actions';


@Injectable()
export class ProductRequestsEffects {

	@Effect()
	productGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET)
		.switchMap((action: Action) => this.productService.getProductRequest(action['payload']))
		.map((product: Product) => new GetProductSuccessAction(product))
		.catch((error) => Observable.of(new GetProductFailAction(error)));

	constructor(
		private actions$: Actions,
		private productService: ProductService
	) {}
}

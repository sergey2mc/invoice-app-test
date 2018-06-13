import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Product } from '../../../../../../../core/interfaces/product.interface';


const ALIAS = 'PRODUCTS_REQUEST';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`),
	GET_LIST_FAIL: type(`[${ALIAS}] GET_LIST_FAIL`)
};

export class GetProductsAction implements Action {
	readonly type = ActionTypes.GET_LIST;

	constructor(public payload?: undefined) {}
}

export class GetProductsSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;

	constructor(public payload: Product[]) {}
}

export class GetProductsFailAction implements Action {
	readonly type = ActionTypes.GET_LIST_FAIL;

	constructor(public payload: any) {}
}

export type Actions = GetProductsAction | GetProductsSuccessAction | GetProductsFailAction;

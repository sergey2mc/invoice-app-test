import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { Product } from '../../../core/interfaces/product.interface';


const ALIAS = 'PRODUCTS';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`)
};

export class GetProductsAction implements Action {
	readonly type = ActionTypes.GET_LIST;

	constructor(public payload?: undefined) {}
}

export class GetProductsSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;

	constructor(public payload: Product[]) {}
}

export type Actions =
	GetProductsAction |
	GetProductsSuccessAction;

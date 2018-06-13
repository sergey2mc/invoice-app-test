import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Product } from '../../../../../../../core/interfaces/product.interface';


const ALIAS = 'PRODUCTS_REQUEST';

export const ActionTypes = {
	GET: type(`[${ALIAS}] GET`),
	GET_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`),
	GET_FAIL: type(`[${ALIAS}] GET_FAIL`)
};

export class GetProductAction implements Action {
	readonly type = ActionTypes.GET;

	constructor(public payload: number) {}
}

export class GetProductSuccessAction implements Action {
	readonly type = ActionTypes.GET_SUCCESS;

	constructor(public payload: Product) {}
}

export class GetProductFailAction implements Action {
	readonly type = ActionTypes.GET_FAIL;

	constructor(public payload: any) {}
}

export type Actions = GetProductAction | GetProductSuccessAction | GetProductFailAction;

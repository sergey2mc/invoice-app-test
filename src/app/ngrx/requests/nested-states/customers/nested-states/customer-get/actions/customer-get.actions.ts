import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Customer } from '../../../../../../../core/interfaces/customer.interface';


const ALIAS = 'CUSTOMERS_REQUEST';

export const ActionTypes = {
	GET: type(`[${ALIAS}] GET`),
	GET_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`),
	GET_FAIL: type(`[${ALIAS}] GET_FAIL`)
};

export class GetCustomerAction implements Action {
	readonly type = ActionTypes.GET;

	constructor(public payload: number) {}
}

export class GetCustomerSuccessAction implements Action {
	readonly type = ActionTypes.GET_SUCCESS;

	constructor(public payload: Customer) {}
}

export class GetCustomerFailAction implements Action {
	readonly type = ActionTypes.GET_FAIL;

	constructor(public payload: any) {}
}

export type Actions = GetCustomerAction | GetCustomerSuccessAction | GetCustomerFailAction;

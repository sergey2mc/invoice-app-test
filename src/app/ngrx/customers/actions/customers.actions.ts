import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { Customer } from '../../../core/interfaces/customer.interface';


const ALIAS = 'CUSTOMERS';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`),

	GET: type(`[${ALIAS}] GET`),
	GET_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`)
};

export class GetCustomersAction implements Action {
	readonly type = ActionTypes.GET_LIST;

	constructor(public payload?: undefined) {}
}

export class GetCustomersSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;

	constructor(public payload: Customer[]) {}
}

export class GetCustomerAction implements Action {
	readonly type = ActionTypes.GET;

	constructor(public payload: number) {}
}

export class GetCustomerSuccessAction implements Action {
	readonly type = ActionTypes.GET_SUCCESS;

	constructor(public payload: Customer) {}
}

export type Actions =
	GetCustomersAction |
	GetCustomersSuccessAction |
	GetCustomersAction |
	GetCustomersSuccessAction;

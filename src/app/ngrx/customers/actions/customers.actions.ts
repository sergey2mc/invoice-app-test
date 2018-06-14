import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { Customer } from '../../../core/interfaces/customer.interface';


const ALIAS = 'CUSTOMERS';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`)
};

export class GetCustomersAction implements Action {
	readonly type = ActionTypes.GET_LIST;

	constructor(public payload?: undefined) {}
}

export class GetCustomersSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;

	constructor(public payload: Customer[]) {}
}

export type Actions =
	GetCustomersAction |
	GetCustomersSuccessAction;

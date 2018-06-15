import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES_REQUEST';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`),
	GET_LIST_FAIL: type(`[${ALIAS}] GET_LIST_FAIL`)
};

export class GetInvoicesAction implements Action {
	readonly type = ActionTypes.GET_LIST;
	constructor(public payload?: undefined) {}
}

export class GetInvoicesSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;
	constructor(public payload: Invoice[]) {}
}

export class GetInvoicesFailAction implements Action {
	readonly type = ActionTypes.GET_LIST_FAIL;
	constructor(public payload: any) {}
}

export type Actions = GetInvoicesAction | GetInvoicesSuccessAction | GetInvoicesFailAction;

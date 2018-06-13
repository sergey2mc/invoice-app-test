import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { Invoice } from '../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`),

	GET: type(`[${ALIAS}] GET`),
	GET_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`)
};

export class GetInvoicesAction implements Action {
	readonly type = ActionTypes.GET_LIST;

	constructor(public payload?: undefined) {}
}

export class GetInvoicesSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;

	constructor(public payload: Invoice[]) {}
}

export class GetInvoiceAction implements Action {
	readonly type = ActionTypes.GET;

	constructor(public payload: number) {}
}

export class GetInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.GET_SUCCESS;

	constructor(public payload: Invoice) {}
}

export type Actions =
	GetInvoicesAction |
	GetInvoicesSuccessAction |
	GetInvoiceAction |
	GetInvoiceSuccessAction;

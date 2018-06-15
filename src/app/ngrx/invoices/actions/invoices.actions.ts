import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { Invoice } from '../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`),

	GET: type(`[${ALIAS}] GET`),
	GET_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`),

	DELETE: type(`[${ALIAS}] DELETE`),
	DELETE_SUCCESS: type(`[${ALIAS}] DELETE_SUCCESS`),

	ADD: type(`[${ALIAS}] ADD`),
	ADD_SUCCESS: type(`[${ALIAS}] ADD_SUCCESS`),

	UPDATE: type(`[${ALIAS}] UPDATE`),
	UPDATE_SUCCESS: type(`[${ALIAS}] UPDATE_SUCCESS`)
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

export class DeleteInvoiceAction implements Action {
	readonly type = ActionTypes.DELETE;
	constructor(public payload: number) {}
}

export class DeleteInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.DELETE_SUCCESS;
	constructor(public payload: Invoice) {}
}

export class AddInvoiceAction implements Action {
	readonly type = ActionTypes.ADD;
	constructor(public payload: Invoice) {}
}

export class AddInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: Invoice) {}
}

export class UpdateInvoiceAction implements Action {
	readonly type = ActionTypes.UPDATE;
	constructor(public payload: Invoice) {}
}

export class UpdateInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;
	constructor(public payload: Invoice) {}
}

export type Actions =
	GetInvoicesAction |
	GetInvoicesSuccessAction |
	GetInvoiceAction |
	GetInvoiceSuccessAction |
	DeleteInvoiceAction |
	DeleteInvoiceSuccessAction |
	AddInvoiceAction |
	AddInvoiceSuccessAction |
	UpdateInvoiceAction |
	UpdateInvoiceSuccessAction;

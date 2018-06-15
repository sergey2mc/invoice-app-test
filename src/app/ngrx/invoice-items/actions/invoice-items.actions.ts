import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { InvoiceItem } from '../../../core/interfaces/invoice-item.interface';


const ALIAS = 'INVOICE_ITEMS';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`),

	DELETE: type(`[${ALIAS}] DELETE`),
	DELETE_SUCCESS: type(`[${ALIAS}] DELETE_SUCCESS`),

	ADD: type(`[${ALIAS}] ADD`),
	ADD_SUCCESS: type(`[${ALIAS}] ADD_SUCCESS`),

	UPDATE: type(`[${ALIAS}] UPDATE`),
	UPDATE_SUCCESS: type(`[${ALIAS}] UPDATE_SUCCESS`)
};

export class GetInvoiceItemsAction implements Action {
	readonly type = ActionTypes.GET_LIST;
	constructor(public payload: number) {}
}

export class GetInvoiceItemsSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;
	constructor(public payload: InvoiceItem[]) {}
}

export class DeleteInvoiceItemAction implements Action {
	readonly type = ActionTypes.DELETE;
	constructor(public payload: {invoiceId: number, itemId: number}) {}
}

export class DeleteInvoiceItemSuccessAction implements Action {
	readonly type = ActionTypes.DELETE_SUCCESS;
	constructor(public payload: InvoiceItem) {}
}

export class AddInvoiceItemAction implements Action {
	readonly type = ActionTypes.ADD;
	constructor(public payload: {invoiceId: number, invoiceItem: InvoiceItem}) {}
}

export class AddInvoiceItemSuccessAction implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: InvoiceItem) {}
}

export class UpdateInvoiceItemAction implements Action {
	readonly type = ActionTypes.UPDATE;
	constructor(public payload: {invoiceId: number, invoiceItem: InvoiceItem}) {}
}

export class UpdateInvoiceItemSuccessAction implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;
	constructor(public payload: InvoiceItem) {}
}

export type Actions =
	GetInvoiceItemsAction |
	GetInvoiceItemsSuccessAction |
	DeleteInvoiceItemAction |
	DeleteInvoiceItemSuccessAction |
	AddInvoiceItemAction |
	AddInvoiceItemSuccessAction |
	UpdateInvoiceItemAction |
	UpdateInvoiceItemSuccessAction;

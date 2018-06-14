import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { InvoiceItem } from '../../../core/interfaces/invoice-item.interface';


const ALIAS = 'INVOICE_ITEMS';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET_LIST`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_LIST_SUCCESS`)
};

export class GetInvoiceItemsAction implements Action {
	readonly type = ActionTypes.GET_LIST;

	constructor(public payload: number) {}
}

export class GetInvoiceItemsSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;

	constructor(public payload: InvoiceItem[]) {}
}

export type Actions =
	GetInvoiceItemsAction |
	GetInvoiceItemsSuccessAction;

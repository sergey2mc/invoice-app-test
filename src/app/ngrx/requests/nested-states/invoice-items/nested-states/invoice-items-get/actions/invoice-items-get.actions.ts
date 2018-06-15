import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


const ALIAS = 'INVOICE_ITEMS_REQUEST';

export const ActionTypes = {
	GET_LIST: type(`[${ALIAS}] GET`),
	GET_LIST_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`),
	GET_LIST_FAIL: type(`[${ALIAS}] GET_FAIL`)
};

export class GetInvoiceItemsAction implements Action {
	readonly type = ActionTypes.GET_LIST;
	constructor(public payload: number) {}
}

export class GetInvoiceItemsSuccessAction implements Action {
	readonly type = ActionTypes.GET_LIST_SUCCESS;
	constructor(public payload: InvoiceItem[]) {}
}

export class GetInvoiceItemsFailAction implements Action {
	readonly type = ActionTypes.GET_LIST_FAIL;
	constructor(public payload: any) {}
}

export type Actions = GetInvoiceItemsAction | GetInvoiceItemsSuccessAction | GetInvoiceItemsFailAction;

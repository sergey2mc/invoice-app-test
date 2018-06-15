import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


const ALIAS = 'INVOICE_ITEMS_REQUEST';

export const ActionTypes = {
	DELETE: type(`[${ALIAS}] DELETE`),
	DELETE_SUCCESS: type(`[${ALIAS}] DELETE_SUCCESS`),
	DELETE_FAIL: type(`[${ALIAS}] DELETE_FAIL`)
};

export class DeleteInvoiceItemAction implements Action {
	readonly type = ActionTypes.DELETE;
	constructor(public payload: number) {}
}

export class DeleteInvoiceItemSuccessAction implements Action {
	readonly type = ActionTypes.DELETE_SUCCESS;
	constructor(public payload: InvoiceItem) {}
}

export class DeleteInvoiceItemFailAction implements Action {
	readonly type = ActionTypes.DELETE_FAIL;
	constructor(public payload: any) {}
}

export type Actions = DeleteInvoiceItemAction | DeleteInvoiceItemSuccessAction | DeleteInvoiceItemFailAction;

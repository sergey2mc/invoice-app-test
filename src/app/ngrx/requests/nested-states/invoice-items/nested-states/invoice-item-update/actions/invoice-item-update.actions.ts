import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


const ALIAS = 'INVOICE_ITEMS_REQUEST';

export const ActionTypes = {
	UPDATE: type(`[${ALIAS}] UPDATE`),
	UPDATE_SUCCESS: type(`[${ALIAS}] UPDATE_SUCCESS`),
	UPDATE_FAIL: type(`[${ALIAS}] UPDATE_FAIL`)
};

export class UpdateInvoiceItemAction implements Action {
	readonly type = ActionTypes.UPDATE;

	constructor(public payload: number) {}
}

export class UpdateInvoiceItemSuccessAction implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;

	constructor(public payload: InvoiceItem) {}
}

export class UpdateInvoiceItemFailAction implements Action {
	readonly type = ActionTypes.UPDATE_FAIL;

	constructor(public payload: any) {}
}

export type Actions = UpdateInvoiceItemAction | UpdateInvoiceItemSuccessAction | UpdateInvoiceItemFailAction;

import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


const ALIAS = 'INVOICE_ITEMS_REQUEST';

export const ActionTypes = {
	ADD: type(`[${ALIAS}] ADD`),
	ADD_SUCCESS: type(`[${ALIAS}] ADD_SUCCESS`),
	ADD_FAIL: type(`[${ALIAS}] ADD_FAIL`)
};

export class AddInvoiceItemAction implements Action {
	readonly type = ActionTypes.ADD;
	constructor(public payload: number) {}
}

export class AddInvoiceItemSuccessAction implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: InvoiceItem) {}
}

export class AddInvoiceItemFailAction implements Action {
	readonly type = ActionTypes.ADD_FAIL;
	constructor(public payload: any) {}
}

export type Actions = AddInvoiceItemAction | AddInvoiceItemSuccessAction | AddInvoiceItemFailAction;

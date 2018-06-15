import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES_REQUEST';

export const ActionTypes = {
	ADD: type(`[${ALIAS}] ADD`),
	ADD_SUCCESS: type(`[${ALIAS}] ADD_SUCCESS`),
	ADD_FAIL: type(`[${ALIAS}] ADD_FAIL`)
};

export class AddInvoiceAction implements Action {
	readonly type = ActionTypes.ADD;
	constructor(public payload: number) {}
}

export class AddInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.ADD_SUCCESS;
	constructor(public payload: Invoice) {}
}

export class AddInvoiceFailAction implements Action {
	readonly type = ActionTypes.ADD_FAIL;
	constructor(public payload: any) {}
}

export type Actions = AddInvoiceAction | AddInvoiceSuccessAction | AddInvoiceFailAction;

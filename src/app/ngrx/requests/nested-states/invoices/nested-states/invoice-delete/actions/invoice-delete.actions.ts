import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES_REQUEST';

export const ActionTypes = {
	DELETE: type(`[${ALIAS}] DELETE`),
	DELETE_SUCCESS: type(`[${ALIAS}] DELETE_SUCCESS`),
	DELETE_FAIL: type(`[${ALIAS}] DELETE_FAIL`)
};

export class DeleteInvoiceAction implements Action {
	readonly type = ActionTypes.DELETE;
	constructor(public payload: number) {}
}

export class DeleteInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.DELETE_SUCCESS;
	constructor(public payload: Invoice) {}
}

export class DeleteInvoiceFailAction implements Action {
	readonly type = ActionTypes.DELETE_FAIL;
	constructor(public payload: any) {}
}

export type Actions = DeleteInvoiceAction | DeleteInvoiceSuccessAction | DeleteInvoiceFailAction;

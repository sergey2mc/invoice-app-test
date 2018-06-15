import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES_REQUEST';

export const ActionTypes = {
	UPDATE: type(`[${ALIAS}] UPDATE`),
	UPDATE_SUCCESS: type(`[${ALIAS}] UPDATE_SUCCESS`),
	UPDATE_FAIL: type(`[${ALIAS}] UPDATE_FAIL`)
};

export class UpdateInvoiceAction implements Action {
	readonly type = ActionTypes.UPDATE;

	constructor(public payload: number) {}
}

export class UpdateInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.UPDATE_SUCCESS;

	constructor(public payload: Invoice) {}
}

export class UpdateInvoiceFailAction implements Action {
	readonly type = ActionTypes.UPDATE_FAIL;

	constructor(public payload: any) {}
}

export type Actions = UpdateInvoiceAction | UpdateInvoiceSuccessAction | UpdateInvoiceFailAction;

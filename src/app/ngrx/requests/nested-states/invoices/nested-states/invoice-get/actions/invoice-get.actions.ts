import { Action } from '@ngrx/store';

import { type } from '../../../../../../utils';
import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


const ALIAS = 'INVOICES_REQUEST';

export const ActionTypes = {
	GET: type(`[${ALIAS}] GET`),
	GET_SUCCESS: type(`[${ALIAS}] GET_SUCCESS`),
	GET_FAIL: type(`[${ALIAS}] GET_FAIL`)
};

export class GetInvoiceAction implements Action {
	readonly type = ActionTypes.GET;

	constructor(public payload: number) {}
}

export class GetInvoiceSuccessAction implements Action {
	readonly type = ActionTypes.GET_SUCCESS;

	constructor(public payload: Invoice) {}
}

export class GetInvoiceFailAction implements Action {
	readonly type = ActionTypes.GET_FAIL;

	constructor(public payload: any) {}
}

export type Actions = GetInvoiceAction | GetInvoiceSuccessAction | GetInvoiceFailAction;

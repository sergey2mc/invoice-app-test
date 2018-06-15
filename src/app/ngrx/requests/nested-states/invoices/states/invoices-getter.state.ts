import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';
import { IRequestsState } from '../../../states/requests.state';
import { IInvoicesState } from './invoices.state';


export const getInvoicesRequestState = createSelector(
	getRequestsState,
	(state: IRequestsState) => state.invoicesState
);

export const getInvoicesGetRequestState = createSelector(
	getInvoicesRequestState,
	(state: IInvoicesState) => state.invoicesGetState
);

export const getInvoiceGetRequestState = createSelector(
	getInvoicesRequestState,
	(state: IInvoicesState) => state.invoiceGetState
);

export const getInvoiceDeleteRequestState = createSelector(
	getInvoicesRequestState,
	(state: IInvoicesState) => state.invoiceDeleteState
);

export const getInvoiceAddRequestState = createSelector(
	getInvoicesRequestState,
	(state: IInvoicesState) => state.invoiceAddState
);

export const getInvoiceUpdateRequestState = createSelector(
	getInvoicesRequestState,
	(state: IInvoicesState) => state.invoiceUpdateState
);

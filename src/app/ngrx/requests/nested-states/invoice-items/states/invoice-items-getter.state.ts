import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';
import { IRequestsState } from '../../../states/requests.state';
import { IInvoiceItemsState } from './invoice-items.state';


export const getInvoiceItemsRequestState = createSelector(
	getRequestsState,
	(state: IRequestsState) => state.invoiceItemsState
);

export const getInvoiceItemsGetRequestState = createSelector(
	getInvoiceItemsRequestState,
	(state: IInvoiceItemsState) => state.invoiceItemsGetState
);

export const getInvoiceItemDeleteRequestState = createSelector(
	getInvoiceItemsRequestState,
	(state: IInvoiceItemsState) => state.invoiceItemDeleteState
);

export const getInvoiceItemAddRequestState = createSelector(
	getInvoiceItemsRequestState,
	(state: IInvoiceItemsState) => state.invoiceItemAddState
);

export const getInvoiceItemUpdateRequestState = createSelector(
	getInvoiceItemsRequestState,
	(state: IInvoiceItemsState) => state.invoiceItemUpdateState
);

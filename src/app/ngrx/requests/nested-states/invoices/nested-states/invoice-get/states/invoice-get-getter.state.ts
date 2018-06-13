import { createSelector } from '@ngrx/store';

import { IInvoiceGetState } from './invoice-get.state';
import { getInvoiceGetRequestState } from '../../../states/invoices-getter.state';


export const getIsLoadingInvoiceGetRequest = createSelector(
	getInvoiceGetRequestState,
	(state: IInvoiceGetState) => state.loading
);

export const getIsLoadedInvoiceGetRequest = createSelector(
	getInvoiceGetRequestState,
	(state: IInvoiceGetState) => state.loaded
);

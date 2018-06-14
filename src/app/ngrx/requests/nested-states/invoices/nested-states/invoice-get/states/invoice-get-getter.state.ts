import { createSelector } from '@ngrx/store';

import { IInvoiceGetState } from './invoice-get.state';
import { getInvoiceGetRequestState } from '../../../states/invoices-getter.state';


export const getIsLoadedInvoiceGetRequest = createSelector(
	getInvoiceGetRequestState,
	(state: IInvoiceGetState) => state.loaded
);

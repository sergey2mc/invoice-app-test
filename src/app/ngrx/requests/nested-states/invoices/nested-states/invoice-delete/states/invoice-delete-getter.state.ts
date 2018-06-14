import { createSelector } from '@ngrx/store';

import { IInvoiceDeleteState } from './invoice-delete.state';
import { getInvoiceDeleteRequestState } from '../../../states/invoices-getter.state';


export const getIsLoadedInvoiceDeleteRequest = createSelector(
	getInvoiceDeleteRequestState,
	(state: IInvoiceDeleteState) => state.loaded
);

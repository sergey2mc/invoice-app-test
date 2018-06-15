import { createSelector } from '@ngrx/store';

import { IInvoiceAddState } from './invoice-add.state';
import { getInvoiceAddRequestState } from '../../../states/invoices-getter.state';


export const getIsLoadedInvoiceAddRequest = createSelector(
	getInvoiceAddRequestState,
	(state: IInvoiceAddState) => state.loaded
);

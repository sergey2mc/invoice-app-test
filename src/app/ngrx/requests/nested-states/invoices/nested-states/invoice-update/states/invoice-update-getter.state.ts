import { createSelector } from '@ngrx/store';

import { IInvoiceUpdateState } from './invoice-update.state';
import { getInvoiceUpdateRequestState } from '../../../states/invoices-getter.state';


export const getIsLoadedInvoiceUpdateRequest = createSelector(
	getInvoiceUpdateRequestState,
	(state: IInvoiceUpdateState) => state.loaded
);

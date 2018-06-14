import { createSelector } from '@ngrx/store';

import { IInvoiceItemsGetState } from './invoice-items-get.state';
import { getInvoiceItemsGetRequestState } from '../../../states/invoice-items-getter.state';


export const getIsLoadedInvoiceItemsGetRequest = createSelector(
	getInvoiceItemsGetRequestState,
	(state: IInvoiceItemsGetState) => state.loaded
);

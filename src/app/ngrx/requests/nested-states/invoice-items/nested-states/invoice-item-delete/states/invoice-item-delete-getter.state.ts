import { createSelector } from '@ngrx/store';

import { IInvoiceItemDeleteState } from './invoice-item-delete.state';
import { getInvoiceItemDeleteRequestState } from '../../../states/invoice-items-getter.state';


export const getIsLoadedInvoiceItemDeleteRequest = createSelector(
	getInvoiceItemDeleteRequestState,
	(state: IInvoiceItemDeleteState) => state.loaded
);

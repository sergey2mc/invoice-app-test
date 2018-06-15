import { createSelector } from '@ngrx/store';

import { IInvoiceItemUpdateState } from './invoice-item-update.state';
import { getInvoiceItemUpdateRequestState } from '../../../states/invoice-items-getter.state';


export const getIsLoadedInvoiceItemUpdateRequest = createSelector(
	getInvoiceItemUpdateRequestState,
	(state: IInvoiceItemUpdateState) => state.loaded
);

import { createSelector } from '@ngrx/store';

import { IInvoiceItemAddState } from './invoice-item-add.state';
import { getInvoiceItemAddRequestState } from '../../../states/invoice-items-getter.state';


export const getIsLoadedInvoiceItemAddRequest = createSelector(
	getInvoiceItemAddRequestState,
	(state: IInvoiceItemAddState) => state.loaded
);

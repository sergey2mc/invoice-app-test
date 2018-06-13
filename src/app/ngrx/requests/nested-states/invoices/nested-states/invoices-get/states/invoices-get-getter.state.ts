import { createSelector } from '@ngrx/store';

import { IInvoicesGetState } from './invoices-get.state';
import { getInvoicesGetRequestState } from '../../../states/invoices-getter.state';


export const getIsLoadingInvoicesGetRequest = createSelector(
	getInvoicesGetRequestState,
	(state: IInvoicesGetState) => state.loading
);

export const getIsLoadedInvoicesGetRequest = createSelector(
	getInvoicesGetRequestState,
	(state: IInvoicesGetState) => state.loaded
);

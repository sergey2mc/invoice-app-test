import { createSelector } from '@ngrx/store';

import { ICustomerGetState } from './customer-get.state';
import { getCustomerGetRequestState } from '../../../states/customers-getter.state';


export const getIsLoadingCustomerGetRequest = createSelector(
	getCustomerGetRequestState,
	(state: ICustomerGetState) => state.loading
);

export const getIsLoadedCustomerGetRequest = createSelector(
	getCustomerGetRequestState,
	(state: ICustomerGetState) => state.loaded
);

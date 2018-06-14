import { createSelector } from '@ngrx/store';

import { ICustomersGetState } from './customers-get.state';
import { getCustomersGetRequestState } from '../../../states/customers-getter.state';


export const getIsLoadedCustomersGetRequest = createSelector(
	getCustomersGetRequestState,
	(state: ICustomersGetState) => state.loaded
);

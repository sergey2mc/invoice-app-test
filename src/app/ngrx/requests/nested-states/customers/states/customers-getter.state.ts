import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';
import { IRequestsState } from '../../../states/requests.state';
import { ICustomersState } from './customers.state';


export const getCustomersRequestState = createSelector(
	getRequestsState,
	(state: IRequestsState) => state.customersState
);

export const getCustomersGetRequestState = createSelector(
	getCustomersRequestState,
	(state: ICustomersState) => state.customersGetState
);

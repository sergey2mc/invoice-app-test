import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';
import { IRequestsState } from '../../../states/requests.state';
import { IProductsState } from './products.state';


export const getProductsRequestState = createSelector(
	getRequestsState,
	(state: IRequestsState) => state.productsState
);

export const getProductsGetRequestState = createSelector(
	getProductsRequestState,
	(state: IProductsState) => state.productsGetState
);

export const getProductGetRequestState = createSelector(
	getProductsRequestState,
	(state: IProductsState) => state.productGetState
);

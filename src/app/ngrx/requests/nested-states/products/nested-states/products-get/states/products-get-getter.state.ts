import { createSelector } from '@ngrx/store';

import { IProductsGetState } from './products-get.state';
import { getProductsGetRequestState } from '../../../states/products-getter.state';


export const getIsLoadingProductsGetRequest = createSelector(
	getProductsGetRequestState,
	(state: IProductsGetState) => state.loading
);

export const getIsLoadedProductsGetRequest = createSelector(
	getProductsGetRequestState,
	(state: IProductsGetState) => state.loaded
);

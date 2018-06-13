import { createSelector } from '@ngrx/store';

import { IProductGetState } from './product-get.state';
import { getProductGetRequestState } from '../../../states/products-getter.state';


export const getIsLoadingProductGetRequest = createSelector(
	getProductGetRequestState,
	(state: IProductGetState) => state.loading
);

export const getIsLoadedProductGetRequest = createSelector(
	getProductGetRequestState,
	(state: IProductGetState) => state.loaded
);

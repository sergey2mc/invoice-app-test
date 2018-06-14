import { createSelector } from '@ngrx/store';

import { IProductsGetState } from './products-get.state';
import { getProductsGetRequestState } from '../../../states/products-getter.state';


export const getIsLoadedProductsGetRequest = createSelector(
	getProductsGetRequestState,
	(state: IProductsGetState) => state.loaded
);

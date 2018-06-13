import { IProductGetState } from '../nested-states/product-get/states';
import { IProductsGetState } from '../nested-states/products-get/states';


export interface IProductsState {
	productGetState?: IProductGetState;
	productsGetState?: IProductsGetState;
}

export const initialState: IProductsState = {};

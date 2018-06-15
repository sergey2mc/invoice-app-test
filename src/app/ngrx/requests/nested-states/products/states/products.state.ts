import { IProductsGetState } from '../nested-states/products-get/states';


export interface IProductsState {
	productsGetState?: IProductsGetState;
}

export const productsInitialState: IProductsState = {};

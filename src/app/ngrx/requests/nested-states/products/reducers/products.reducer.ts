import { initialState, IProductsState } from '../states';
import { productGetReducer } from '../nested-states/product-get/reducers';
import { productsGetReducer } from '../nested-states/products-get/reducers';


export function productsReducer(state: IProductsState = initialState, action): IProductsState {
	return {
		productGetState: productGetReducer(state.productGetState, action),
		productsGetState: productsGetReducer(state.productsGetState, action)
	};
}

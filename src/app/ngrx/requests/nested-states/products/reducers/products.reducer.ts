import { initialState, IProductsState } from '../states';
import { productsGetReducer } from '../nested-states/products-get/reducers';


export function productsReducer(state: IProductsState = initialState, action): IProductsState {
	return {
		productsGetState: productsGetReducer(state.productsGetState, action)
	};
}

import { productsInitialState, IProductsState } from '../states';
import { productsGetReducer } from '../nested-states/products-get/reducers';


export function productsReducer(state: IProductsState = productsInitialState, action): IProductsState {
	return {
		productsGetState: productsGetReducer(state.productsGetState, action)
	};
}

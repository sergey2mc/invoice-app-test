import * as requestActions from '../actions';
import { productsInitialState, IProductsGetState } from '../states';

export function productsGetReducer(
		state: IProductsGetState = productsInitialState,
		{type, payload}: requestActions.Actions) {
	switch (type) {
		case requestActions.ActionTypes.GET_LIST: {
			return {
				...state,
				loading: true,
				loaded: false,
				status: '',
				data: null
			};
		}
		case requestActions.ActionTypes.GET_LIST_SUCCESS: {
			return {
				...state,
				loading: false,
				loaded: true,
				status: 'success',
				data: payload
			};
		}
		case requestActions.ActionTypes.GET_LIST_FAIL: {
			return {
				...state,
				loading: false,
				loaded: false,
				status: 'error',
				data: payload
			};
		}
		default: return state;
	}
}

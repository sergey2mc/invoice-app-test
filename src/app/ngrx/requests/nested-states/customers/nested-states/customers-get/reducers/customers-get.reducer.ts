import * as requestActions from '../actions';
import { customersInitialState, ICustomersGetState } from '../states';

export function customersGetReducer(
		state: ICustomersGetState = customersInitialState,
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

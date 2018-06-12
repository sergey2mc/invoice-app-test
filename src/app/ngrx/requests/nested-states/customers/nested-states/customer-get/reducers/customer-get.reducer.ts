import * as requestActions from '../actions';
import { customerInitialState, ICustomerGetState } from '../states';

export function customerGetReducer(
		state: ICustomerGetState = customerInitialState,
		{type, payload}: requestActions.Actions) {
	switch (type) {
		case requestActions.ActionTypes.GET: {
			return {
				...state,
				loading: true,
				loaded: false,
				status: '',
				data: null
			};
		}
		case requestActions.ActionTypes.GET_SUCCESS: {
			return {
				...state,
				loading: false,
				loaded: true,
				status: 'success',
				data: payload
			};
		}
		case requestActions.ActionTypes.GET_FAIL: {
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

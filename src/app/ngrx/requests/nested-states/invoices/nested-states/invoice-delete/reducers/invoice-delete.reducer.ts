import * as requestActions from '../actions';
import { invoiceInitialState, IInvoiceDeleteState } from '../states';

export function invoiceDeleteReducer(
		state: IInvoiceDeleteState = invoiceInitialState,
		{type, payload}: requestActions.Actions
) {
	switch (type) {
		case requestActions.ActionTypes.DELETE: {
			return {
				...state,
				loading: true,
				loaded: false,
				status: '',
				data: null
			};
		}
		case requestActions.ActionTypes.DELETE_SUCCESS: {
			return {
				...state,
				loading: false,
				loaded: true,
				status: 'success',
				data: payload
			};
		}
		case requestActions.ActionTypes.DELETE_FAIL: {
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

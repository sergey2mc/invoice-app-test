import * as requestActions from '../actions';
import { invoiceItemInitialState, IInvoiceItemDeleteState } from '../states';

export function invoiceItemDeleteReducer(
		state: IInvoiceItemDeleteState = invoiceItemInitialState,
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

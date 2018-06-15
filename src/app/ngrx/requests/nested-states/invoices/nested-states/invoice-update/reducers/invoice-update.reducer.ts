import * as requestActions from '../actions';
import { invoiceInitialState, IInvoiceUpdateState } from '../states';

export function invoiceUpdateReducer(
		state: IInvoiceUpdateState = invoiceInitialState,
		{type, payload}: requestActions.Actions
) {
	switch (type) {
		case requestActions.ActionTypes.UPDATE: {
			return {
				...state,
				loading: true,
				loaded: false,
				status: '',
				data: null
			};
		}
		case requestActions.ActionTypes.UPDATE_SUCCESS: {
			return {
				...state,
				loading: false,
				loaded: true,
				status: 'success',
				data: payload
			};
		}
		case requestActions.ActionTypes.UPDATE_FAIL: {
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

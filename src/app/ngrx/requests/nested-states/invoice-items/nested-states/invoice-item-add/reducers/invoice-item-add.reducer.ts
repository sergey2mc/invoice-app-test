import * as requestActions from '../actions';
import { invoiceItemInitialState, IInvoiceItemAddState } from '../states';

export function invoiceItemAddReducer(
		state: IInvoiceItemAddState = invoiceItemInitialState,
		{type, payload}: requestActions.Actions
) {
	switch (type) {
		case requestActions.ActionTypes.ADD: {
			return {
				...state,
				loading: true,
				loaded: false,
				status: '',
				data: null
			};
		}
		case requestActions.ActionTypes.ADD_SUCCESS: {
			return {
				...state,
				loading: false,
				loaded: true,
				status: 'success',
				data: payload
			};
		}
		case requestActions.ActionTypes.ADD_FAIL: {
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

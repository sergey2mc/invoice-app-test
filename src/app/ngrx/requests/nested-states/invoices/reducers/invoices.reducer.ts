import { initialState, IInvoicesState } from '../states';
import { invoiceGetReducer } from '../nested-states/invoice-get/reducers';
import { invoicesGetReducer } from '../nested-states/invoices-get/reducers';


export function invoicesReducer(state: IInvoicesState = initialState, action): IInvoicesState {
	return {
		invoiceGetState: invoiceGetReducer(state.invoiceGetState, action),
		invoicesGetState: invoicesGetReducer(state.invoicesGetState, action)
	};
}

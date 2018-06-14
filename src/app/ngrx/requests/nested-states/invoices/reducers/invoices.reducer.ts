import { initialState, IInvoicesState } from '../states';
import { invoiceGetReducer } from '../nested-states/invoice-get/reducers';
import { invoicesGetReducer } from '../nested-states/invoices-get/reducers';
import { invoiceDeleteReducer } from '../nested-states/invoice-delete/reducers';


export function invoicesReducer(state: IInvoicesState = initialState, action): IInvoicesState {
	return {
		invoiceGetState: invoiceGetReducer(state.invoiceGetState, action),
		invoicesGetState: invoicesGetReducer(state.invoicesGetState, action),
		invoiceDeleteState: invoiceDeleteReducer(state.invoiceDeleteState, action)
	};
}

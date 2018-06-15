import { invoicesInitialState, IInvoicesState } from '../states';
import { invoiceGetReducer } from '../nested-states/invoice-get/reducers';
import { invoicesGetReducer } from '../nested-states/invoices-get/reducers';
import { invoiceAddReducer } from '../nested-states/invoice-add/reducers';
import { invoiceUpdateReducer } from '../nested-states/invoice-update/reducers';
import { invoiceDeleteReducer } from '../nested-states/invoice-delete/reducers';


export function invoicesReducer(state: IInvoicesState = invoicesInitialState, action): IInvoicesState {
	return {
		invoiceGetState: invoiceGetReducer(state.invoiceGetState, action),
		invoicesGetState: invoicesGetReducer(state.invoicesGetState, action),
		invoiceAddState: invoiceAddReducer(state.invoiceAddState, action),
		invoiceUpdateState: invoiceUpdateReducer(state.invoiceUpdateState, action),
		invoiceDeleteState: invoiceDeleteReducer(state.invoiceDeleteState, action)
	};
}

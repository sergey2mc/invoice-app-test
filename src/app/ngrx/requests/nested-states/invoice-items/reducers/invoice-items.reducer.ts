import { initialState, IInvoiceItemsState } from '../states';
import { invoiceItemsGetReducer } from '../nested-states/invoice-items-get/reducers';


export function invoiceItemsReducer(state: IInvoiceItemsState = initialState, action): IInvoiceItemsState {
	return {
		invoiceItemsGetState: invoiceItemsGetReducer(state.invoiceItemsGetState, action)
	};
}

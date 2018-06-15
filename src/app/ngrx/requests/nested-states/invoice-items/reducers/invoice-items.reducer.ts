import { initialState, IInvoiceItemsState } from '../states';
import { invoiceItemsGetReducer } from '../nested-states/invoice-items-get/reducers';
import { invoiceItemDeleteReducer } from '../nested-states/invoice-item-delete/reducers';
import { invoiceItemAddReducer } from '../nested-states/invoice-item-add/reducers';
import { invoiceItemUpdateReducer } from '../nested-states/invoice-item-update/reducers';


export function invoiceItemsReducer(state: IInvoiceItemsState = initialState, action): IInvoiceItemsState {
	return {
		invoiceItemsGetState: invoiceItemsGetReducer(state.invoiceItemsGetState, action),
		invoiceItemDeleteState: invoiceItemDeleteReducer(state.invoiceItemDeleteState, action),
		invoiceItemAddState: invoiceItemAddReducer(state.invoiceItemAddState, action),
		invoiceItemUpdateState: invoiceItemUpdateReducer(state.invoiceItemUpdateState, action)
	};
}

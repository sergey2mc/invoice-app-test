import { invoiceItemsInitialState, IInvoiceItemsState } from '../states';
import { invoiceItemsGetReducer } from '../nested-states/invoice-items-get/reducers';
import { invoiceItemAddReducer } from '../nested-states/invoice-item-add/reducers';
import { invoiceItemUpdateReducer } from '../nested-states/invoice-item-update/reducers';
import { invoiceItemDeleteReducer } from '../nested-states/invoice-item-delete/reducers';


export function invoiceItemsReducer(state: IInvoiceItemsState = invoiceItemsInitialState, action): IInvoiceItemsState {
	return {
		invoiceItemsGetState: invoiceItemsGetReducer(state.invoiceItemsGetState, action),
		invoiceItemAddState: invoiceItemAddReducer(state.invoiceItemAddState, action),
		invoiceItemUpdateState: invoiceItemUpdateReducer(state.invoiceItemUpdateState, action),
		invoiceItemDeleteState: invoiceItemDeleteReducer(state.invoiceItemDeleteState, action)
	};
}

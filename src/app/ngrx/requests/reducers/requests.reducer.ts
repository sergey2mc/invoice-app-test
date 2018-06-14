import { IRequestsState, requestsInitialState } from '../states/requests.state';
import { customersReducer } from '../nested-states/customers/reducers';
import { productsReducer } from '../nested-states/products/reducers';
import { invoicesReducer } from '../nested-states/invoices/reducers';
import { invoiceItemsReducer } from '../nested-states/invoice-items/reducers';


export function requestsReducer(state: IRequestsState = requestsInitialState, action): IRequestsState {
	return {
		customersState: customersReducer(state.customersState, action),
		productsState: productsReducer(state.productsState, action),
		invoicesState: invoicesReducer(state.invoicesState, action),
		invoiceItemsState: invoiceItemsReducer(state.invoiceItemsState, action)
	};
}

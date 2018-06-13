import * as fromCustomers from '../customers/index';
import * as fromProducts from '../products/index';
import * as fromInvoices from '../invoices/index';
import * as fromRequests from '../requests/index';


export interface AppState {
	readonly customers: fromCustomers.ICustomerState;
	readonly products: fromProducts.IProductState;
	readonly invoices: fromInvoices.IInvoiceState;
	readonly requests: fromRequests.IRequestsState;
}

export const reducers = {
	customers: fromCustomers.customersReducer,
	products: fromProducts.productsReducer,
	invoices: fromInvoices.invoicesReducer,
	requests: fromRequests.requestsReducer
};

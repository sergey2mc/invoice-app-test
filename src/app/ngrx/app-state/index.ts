import * as fromCustomers from '../customers/index';
import * as fromProducts from '../products/index';
import * as fromInvoices from '../invoices/index';
import * as fromInvoiceItems from '../invoice-items/index';
import * as fromRequests from '../requests/index';


export interface AppState {
	readonly customers: fromCustomers.ICustomerState;
	readonly products: fromProducts.IProductState;
	readonly invoices: fromInvoices.IInvoiceState;
	readonly invoiceItems: fromInvoiceItems.IInvoiceItemState;
	readonly requests: fromRequests.IRequestsState;
}

export const reducers = {
	customers: fromCustomers.customersReducer,
	products: fromProducts.productsReducer,
	invoices: fromInvoices.invoicesReducer,
	invoiceItems: fromInvoiceItems.invoiceItemsReducer,
	requests: fromRequests.requestsReducer
};

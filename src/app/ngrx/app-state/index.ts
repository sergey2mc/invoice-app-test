import * as fromCustomers from '../customers/index';
import * as fromProducts from '../products/index';
import * as fromInvoices from '../invoices/index';
import * as fromInvoiceItems from '../invoice-items/index';
import * as fromRequests from '../requests/index';

import { CustomersRequestsEffects } from '../requests/nested-states/customers/nested-states/customers-get/effects';
import { ProductsRequestsEffects } from '../requests/nested-states/products/nested-states/products-get/effects';
import { InvoicesRequestsEffects } from '../requests/nested-states/invoices/nested-states/invoices-get/effects';
import { InvoiceGetRequestsEffects } from '../requests/nested-states/invoices/nested-states/invoice-get/effects';
import { InvoiceDeleteRequestsEffects } from '../requests/nested-states/invoices/nested-states/invoice-delete/effects';
import { InvoiceAddRequestsEffects } from '../requests/nested-states/invoices/nested-states/invoice-add/effects';
import { InvoiceUpdateRequestsEffects } from '../requests/nested-states/invoices/nested-states/invoice-update/effects';
import { InvoiceItemsRequestsEffects } from '../requests/nested-states/invoice-items/nested-states/invoice-items-get/effects';
import { InvoiceItemDeleteRequestsEffects } from '../requests/nested-states/invoice-items/nested-states/invoice-item-delete/effects';
import { InvoiceItemAddRequestsEffects } from '../requests/nested-states/invoice-items/nested-states/invoice-item-add/effects';
import { InvoiceItemUpdateRequestsEffects } from '../requests/nested-states/invoice-items/nested-states/invoice-item-update/effects';


export interface AppState {
	readonly customers: fromCustomers.ICustomerState;
	readonly products: fromProducts.IProductState;
	readonly invoices: fromInvoices.IInvoiceState;
	readonly invoiceItems: fromInvoiceItems.IInvoiceItemState;
	readonly requests: fromRequests.IRequestsState;
}

export const APP_REDUCERS = {
	customers: fromCustomers.customersReducer,
	products: fromProducts.productsReducer,
	invoices: fromInvoices.invoicesReducer,
	invoiceItems: fromInvoiceItems.invoiceItemsReducer,
	requests: fromRequests.requestsReducer
};

export const APP_EFFECTS = [
	fromCustomers.CustomersEffects,
	fromProducts.ProductsEffects,
	fromInvoices.InvoicesEffects,
	fromInvoiceItems.InvoiceItemsEffects,
	CustomersRequestsEffects,
	ProductsRequestsEffects,
	InvoicesRequestsEffects,
	InvoiceGetRequestsEffects,
	InvoiceDeleteRequestsEffects,
	InvoiceAddRequestsEffects,
	InvoiceUpdateRequestsEffects,
	InvoiceItemsRequestsEffects,
	InvoiceItemDeleteRequestsEffects,
	InvoiceItemAddRequestsEffects,
	InvoiceItemUpdateRequestsEffects
];
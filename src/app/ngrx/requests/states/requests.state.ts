import { ICustomersState } from '../nested-states/customers/states';
import { IProductsState } from '../nested-states/products/states';
import { IInvoicesState } from '../nested-states/invoices/states';
import { IInvoiceItemsState } from '../nested-states/invoice-items/states';


export interface IRequestsState {
	customersState?: ICustomersState;
	productsState?: IProductsState;
	invoicesState?: IInvoicesState;
	invoiceItemsState?: IInvoiceItemsState;
}

export const requestsInitialState: IRequestsState = {};

import { ICustomersState } from '../nested-states/customers/states';
import { IProductsState } from '../nested-states/products/states';
import { IInvoicesState } from '../nested-states/invoices/states';


export interface IRequestsState {
	customersState?: ICustomersState;
	productsState?: IProductsState;
	invoicesState?: IInvoicesState;
}

export const requestsInitialState: IRequestsState = {};

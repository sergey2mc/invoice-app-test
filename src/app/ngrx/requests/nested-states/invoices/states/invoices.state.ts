import { IInvoiceGetState } from '../nested-states/invoice-get/states';
import { IInvoicesGetState } from '../nested-states/invoices-get/states';


export interface IInvoicesState {
	invoiceGetState?: IInvoiceGetState;
	invoicesGetState?: IInvoicesGetState;
}

export const initialState: IInvoicesState = {};

import { IInvoiceGetState } from '../nested-states/invoice-get/states';
import { IInvoicesGetState } from '../nested-states/invoices-get/states';
import { IInvoiceDeleteState } from '../nested-states/invoice-delete/states';


export interface IInvoicesState {
	invoicesGetState?: IInvoicesGetState;
	invoiceGetState?: IInvoiceGetState;
	invoiceDeleteState?: IInvoiceDeleteState;
}

export const initialState: IInvoicesState = {};

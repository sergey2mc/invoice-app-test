import { IInvoiceGetState } from '../nested-states/invoice-get/states';
import { IInvoicesGetState } from '../nested-states/invoices-get/states';
import { IInvoiceDeleteState } from '../nested-states/invoice-delete/states';
import { IInvoiceAddState } from '../nested-states/invoice-add/states';
import { IInvoiceUpdateState } from '../nested-states/invoice-update/states';


export interface IInvoicesState {
	invoicesGetState?: IInvoicesGetState;
	invoiceGetState?: IInvoiceGetState;
	invoiceDeleteState?: IInvoiceDeleteState;
	invoiceAddState?: IInvoiceAddState;
	invoiceUpdateState?: IInvoiceUpdateState;
}

export const initialState: IInvoicesState = {};

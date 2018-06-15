import { IInvoiceGetState } from '../nested-states/invoice-get/states';
import { IInvoicesGetState } from '../nested-states/invoices-get/states';
import { IInvoiceAddState } from '../nested-states/invoice-add/states';
import { IInvoiceUpdateState } from '../nested-states/invoice-update/states';
import { IInvoiceDeleteState } from '../nested-states/invoice-delete/states';


export interface IInvoicesState {
	invoicesGetState?: IInvoicesGetState;
	invoiceGetState?: IInvoiceGetState;
	invoiceAddState?: IInvoiceAddState;
	invoiceUpdateState?: IInvoiceUpdateState;
	invoiceDeleteState?: IInvoiceDeleteState;
}

export const invoicesInitialState: IInvoicesState = {};

import { IInvoiceItemsGetState } from '../nested-states/invoice-items-get/states';
import { IInvoiceItemAddState } from '../nested-states/invoice-item-add/states';
import { IInvoiceItemUpdateState } from '../nested-states/invoice-item-update/states';
import { IInvoiceItemDeleteState } from '../nested-states/invoice-item-delete/states';


export interface IInvoiceItemsState {
	invoiceItemsGetState?: IInvoiceItemsGetState;
	invoiceItemAddState?: IInvoiceItemAddState;
	invoiceItemUpdateState?: IInvoiceItemUpdateState;
	invoiceItemDeleteState?: IInvoiceItemDeleteState;
}

export const invoiceItemsInitialState: IInvoiceItemsState = {};

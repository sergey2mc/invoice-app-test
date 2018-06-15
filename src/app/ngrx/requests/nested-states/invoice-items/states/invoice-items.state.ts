import { IInvoiceItemsGetState } from '../nested-states/invoice-items-get/states';
import { IInvoiceItemDeleteState } from '../nested-states/invoice-item-delete/states';
import { IInvoiceItemAddState } from '../nested-states/invoice-item-add/states';
import { IInvoiceItemUpdateState } from '../nested-states/invoice-item-update/states';


export interface IInvoiceItemsState {
	invoiceItemsGetState?: IInvoiceItemsGetState;
	invoiceItemDeleteState?: IInvoiceItemDeleteState;
	invoiceItemAddState?: IInvoiceItemAddState;
	invoiceItemUpdateState?: IInvoiceItemUpdateState;
}

export const initialState: IInvoiceItemsState = {};

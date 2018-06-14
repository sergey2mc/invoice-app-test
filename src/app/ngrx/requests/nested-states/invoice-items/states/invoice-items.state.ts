import { IInvoiceItemsGetState } from '../nested-states/invoice-items-get/states';


export interface IInvoiceItemsState {
	invoiceItemsGetState?: IInvoiceItemsGetState;
}

export const initialState: IInvoiceItemsState = {};

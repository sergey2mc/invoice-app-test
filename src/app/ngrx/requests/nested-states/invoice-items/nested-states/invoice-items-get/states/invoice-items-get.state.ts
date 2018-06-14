import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


export interface IInvoiceItemsGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: InvoiceItem;
}

export const invoiceItemsInitialState: IInvoiceItemsGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

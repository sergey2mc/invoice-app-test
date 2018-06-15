import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


export interface IInvoiceItemAddState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: InvoiceItem;
}

export const invoiceItemInitialState: IInvoiceItemAddState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

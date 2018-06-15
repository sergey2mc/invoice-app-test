import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


export interface IInvoiceItemDeleteState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: InvoiceItem;
}

export const invoiceItemInitialState: IInvoiceItemDeleteState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

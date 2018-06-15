import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';


export interface IInvoiceItemUpdateState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: InvoiceItem;
}

export const invoiceItemInitialState: IInvoiceItemUpdateState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

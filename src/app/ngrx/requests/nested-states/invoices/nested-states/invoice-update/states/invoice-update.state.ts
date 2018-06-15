import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


export interface IInvoiceUpdateState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Invoice;
}

export const invoiceUpdateInitialState: IInvoiceUpdateState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

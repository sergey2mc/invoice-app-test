import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


export interface IInvoiceGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Invoice;
}

export const invoiceGetInitialState: IInvoiceGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

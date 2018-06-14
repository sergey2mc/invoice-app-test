import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


export interface IInvoiceDeleteState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Invoice;
}

export const invoiceInitialState: IInvoiceDeleteState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

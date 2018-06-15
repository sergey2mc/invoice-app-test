import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


export interface IInvoiceAddState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Invoice;
}

export const invoiceInitialState: IInvoiceAddState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

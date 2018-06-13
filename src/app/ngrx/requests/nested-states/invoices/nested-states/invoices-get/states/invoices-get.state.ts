import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';


export interface IInvoicesGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Invoice[];
}

export const invoicesInitialState: IInvoicesGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

import { Invoice } from '../../../core/interfaces/invoice.interface';


export interface IInvoiceState {
	entities: {[index: number]: Invoice};
	collectionIds: number[];
	invoice: any;
}

export const initialState: IInvoiceState = {
	entities: {},
	collectionIds: [],
	invoice: null
};

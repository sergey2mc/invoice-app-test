import { InvoiceItem } from '../../../core/interfaces/invoice-item.interface';


export interface IInvoiceItemState {
	entities: {[index: number]: InvoiceItem};
	collectionIds: number[];
}

export const initialState: IInvoiceItemState = {
	entities: {},
	collectionIds: []
};

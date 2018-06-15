import { InvoiceItem } from '../../../core/interfaces/invoice-item.interface';


export interface IInvoiceItemState {
	entities: {[index: number]: InvoiceItem};
	collectionIds: number[];
	invoiceItem?: InvoiceItem;
}

export const initialState: IInvoiceItemState = {
	entities: {},
	collectionIds: [],
	invoiceItem: null
};

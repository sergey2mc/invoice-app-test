import { InvoiceItem } from './invoiceItem.interface';

export interface Invoice {
    id?: number;
    customer_id: number;
    discount: number;
    total: number;
    items?: InvoiceItem[];
    createdAt?: string;
    updatedAt?: string;
}

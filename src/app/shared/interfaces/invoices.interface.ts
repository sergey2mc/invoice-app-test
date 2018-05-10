import { InvoiceItems } from './invoiceItems.interface';

export interface Invoice {
    id?: number;
    customer_id: number;
    discount: number;
    total: number;
    items?: InvoiceItems[];
    createdAt?: string;
    updatedAt?: string;
}

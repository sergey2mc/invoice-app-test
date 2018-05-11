export interface InvoiceItem {
    id?: number;
    invoice_id?: number;
    product_id: number;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    price?: number;
}

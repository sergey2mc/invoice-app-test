import { Product } from './product.interface';


export interface InvoiceItem {
    id?: number;
    invoice_id: number;
    product_id: number;
    quantity: number;
    product?: Product;
}

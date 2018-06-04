import { Product } from './product.interface';
import { Customer } from './customer.interface';
import { Invoice } from './invoice.interface';

export interface State {
    products: Product[];
    customers: Customer[];
    invoices: Invoice[];
    invoice: Invoice;
    isLoading: boolean;
    hasError: boolean;
}

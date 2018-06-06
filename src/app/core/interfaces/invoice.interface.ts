import { InvoiceItem } from './invoiceItem.interface';
import { Customer } from './customer.interface';


export interface Invoice {
	id?: number;
	customer_id: number;
	discount: number;
	total: number;
	items?: InvoiceItem[];
	customer?: Customer;
}

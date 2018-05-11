import { CustomerService } from './customer.service';
import { ProductService } from './product.service';
import { InvoiceService } from './invoice.service';

export const APP_SERVICE_PROVIDERS = [
    CustomerService,
    ProductService,
    InvoiceService
];

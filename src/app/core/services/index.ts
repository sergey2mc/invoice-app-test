import { CustomerService } from './customer.service';
import { ProductService } from './product.service';
import { InvoiceService } from './invoice.service';
import { InvoiceItemsService } from './invoice-items.service';
import { LoaderService } from './loader.service';

export const APP_SERVICE_PROVIDERS = [
	CustomerService,
	ProductService,
	InvoiceService,
	InvoiceItemsService,
	LoaderService
];

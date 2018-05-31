import { InvoiceResolver } from './invoice-resolver.service';
import { InvoicesResolver } from './invoices-resolver.service';
import { CustomersResolver } from './customers-resolver.service';
import { ProductsResolver } from './products-resolver.service';

export const APP_RESOLVER_PROVIDERS = [
	InvoiceResolver,
	InvoicesResolver,
	CustomersResolver,
	ProductsResolver
];

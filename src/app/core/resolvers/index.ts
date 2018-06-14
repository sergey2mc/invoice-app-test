import { InvoiceResolverService } from './invoice-resolver.service';
import { InvoicesResolverService } from './invoices-resolver.service';
import { CustomersResolverService } from './customers-resolver.service';
import { ProductsResolverService } from './products-resolver.service';
import { InvoiceItemsResolverService } from './invoice-items-resolver.service';

export const APP_RESOLVER_PROVIDERS = [
	InvoiceResolverService,
	InvoicesResolverService,
	CustomersResolverService,
	ProductsResolverService,
	InvoiceItemsResolverService
];

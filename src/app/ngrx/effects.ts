import { CustomersEffects } from './customers/effects';
import { CustomersRequestsEffects } from './requests/nested-states/customers/effects';

import { ProductsEffects } from './products/effects';
import { ProductsRequestsEffects } from './requests/nested-states/products/nested-states/products-get/effects';

import { InvoicesEffects } from './invoices/effects';
import { InvoicesRequestsEffects } from './requests/nested-states/invoices/nested-states/invoices-get/effects';
import { InvoiceGetRequestsEffects } from './requests/nested-states/invoices/nested-states/invoice-get/effects';
import { InvoiceAddRequestsEffects } from './requests/nested-states/invoices/nested-states/invoice-add/effects';
import { InvoiceUpdateRequestsEffects } from './requests/nested-states/invoices/nested-states/invoice-update/effects';
import { InvoiceDeleteRequestsEffects } from './requests/nested-states/invoices/nested-states/invoice-delete/effects';

import { InvoiceItemsEffects } from './invoice-items/effects';
import { InvoiceItemsRequestsEffects } from './requests/nested-states/invoice-items/nested-states/invoice-items-get/effects';
import { InvoiceItemAddRequestsEffects } from './requests/nested-states/invoice-items/nested-states/invoice-item-add/effects';
import { InvoiceItemUpdateRequestsEffects } from './requests/nested-states/invoice-items/nested-states/invoice-item-update/effects';
import { InvoiceItemDeleteRequestsEffects } from './requests/nested-states/invoice-items/nested-states/invoice-item-delete/effects';


export const APP_EFFECTS = [
	CustomersEffects,
	CustomersRequestsEffects,
	ProductsEffects,
	ProductsRequestsEffects,
	InvoicesEffects,
	InvoicesRequestsEffects,
	InvoiceGetRequestsEffects,
	InvoiceDeleteRequestsEffects,
	InvoiceAddRequestsEffects,
	InvoiceUpdateRequestsEffects,
	InvoiceItemsEffects,
	InvoiceItemsRequestsEffects,
	InvoiceItemDeleteRequestsEffects,
	InvoiceItemAddRequestsEffects,
	InvoiceItemUpdateRequestsEffects
];
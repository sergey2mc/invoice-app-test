import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from '../ngrx';
import { CustomersEffects } from '../ngrx/customers/effects';
import { CustomersRequestsEffects } from '../ngrx/requests/nested-states/customers/effects';
import { ProductsEffects } from '../ngrx/products/effects';
import { ProductsRequestsEffects } from '../ngrx/requests/nested-states/products/nested-states/products-get/effects';
import { InvoicesEffects } from '../ngrx/invoices/effects';
import { InvoicesRequestsEffects } from '../ngrx/requests/nested-states/invoices/nested-states/invoices-get/effects';
import { InvoiceGetRequestsEffects } from '../ngrx/requests/nested-states/invoices/nested-states/invoice-get/effects';
import { InvoiceDeleteRequestsEffects } from '../ngrx/requests/nested-states/invoices/nested-states/invoice-delete/effects';
import { InvoiceItemsEffects } from '../ngrx/invoice-items/effects';
import { InvoiceItemsRequestsEffects } from '../ngrx/requests/nested-states/invoice-items/nested-states/invoice-items-get/effects';

import { NavbarModule } from '../shared/navbar/navbar.module';
import { APP_SERVICE_PROVIDERS } from './services';
import { APP_RESOLVER_PROVIDERS } from './resolvers';
import { APP_INTERCEPTOR_PROVIDERS } from './interceptors';
import { ModalMessageTypesModule } from '../shared/modal/messages/modal-messages.module';


@NgModule({
  exports: [ NavbarModule ],
  imports: [
		BrowserModule.withServerTransition({appId: 'my-app'}),
		BrowserAnimationsModule,
		TransferHttpCacheModule,
    HttpClientModule,
		ModalMessageTypesModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([
			CustomersEffects,
			CustomersRequestsEffects,
			ProductsEffects,
			ProductsRequestsEffects,
			InvoicesEffects,
			InvoicesRequestsEffects,
			InvoiceGetRequestsEffects,
			InvoiceDeleteRequestsEffects,
			InvoiceItemsEffects,
			InvoiceItemsRequestsEffects,
		]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
		}),
  ],
  providers: [
    APP_SERVICE_PROVIDERS,
		APP_RESOLVER_PROVIDERS,
		APP_INTERCEPTOR_PROVIDERS
  ]
})
export class CoreModule { }

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
import { CustomerRequestsEffects } from '../ngrx/requests/nested-states/customers/nested-states/customer-get/effects';
import { ProductsEffects } from '../ngrx/products/effects';
import { ProductsRequestsEffects } from '../ngrx/requests/nested-states/products/nested-states/products-get/effects';
import { ProductRequestsEffects } from '../ngrx/requests/nested-states/products/nested-states/product-get/effects';
import { InvoicesEffects } from '../ngrx/invoices/effects';
import { InvoicesRequestsEffects } from '../ngrx/requests/nested-states/invoices/nested-states/invoices-get/effects';
import { InvoiceRequestsEffects } from '../ngrx/requests/nested-states/invoices/nested-states/invoice-get/effects';

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
			CustomerRequestsEffects,
			ProductsEffects,
			ProductsRequestsEffects,
			ProductRequestsEffects,
			InvoicesEffects,
			InvoicesRequestsEffects,
			InvoiceRequestsEffects
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

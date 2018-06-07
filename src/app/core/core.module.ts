import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';

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
		ModalMessageTypesModule
  ],
  providers: [
    APP_SERVICE_PROVIDERS,
		APP_RESOLVER_PROVIDERS,
		APP_INTERCEPTOR_PROVIDERS
  ]
})
export class CoreModule { }

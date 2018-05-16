import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { InvoicesModule } from './invoices/invoices.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './core/http-interceptors';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    InvoicesModule,
    CoreModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    httpInterceptorProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

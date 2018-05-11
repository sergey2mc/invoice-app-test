import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './core/http-interceptors';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    MainModule,
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

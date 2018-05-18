import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule } from './navbar/navbar.module';
import { APP_SERVICE_PROVIDERS } from './services';

@NgModule({
  exports: [
    CommonModule,
    NavbarModule
  ],
  imports: [ HttpClientModule ],
  providers: [ APP_SERVICE_PROVIDERS ]
})
export class CoreModule { }

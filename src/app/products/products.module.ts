import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [ ProductsComponent ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  exports: [ ProductsComponent ]
})
export class ProductsModule { }

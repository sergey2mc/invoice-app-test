import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [ ProductsComponent ],
  imports: [
    SharedModule,
    MatTableModule,
    ProductsRoutingModule
  ],
  exports: [ ProductsComponent ]
})
export class ProductsModule { }

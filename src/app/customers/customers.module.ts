import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';


@NgModule({
  declarations: [ CustomersComponent ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ],
  exports: [ CustomersComponent ]
})
export class CustomersModule { }

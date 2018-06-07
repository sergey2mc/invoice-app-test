import { NgModule } from '@angular/core';

import { InvoicesComponent } from './invoices.component';
import { InvoicesListModule } from './invoices-list/invoices-list.module';
import { InvoicesRoutingModule } from './invoices-routing.module';


@NgModule({
  declarations: [ InvoicesComponent ],
  imports: [
    InvoicesListModule,
    InvoicesRoutingModule
  ],
  exports: [ InvoicesComponent ]
})
export class InvoicesModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceViewComponent } from './invoice-view.component';
import { InvoicesViewRoutingModule } from './invoice-view-routing.module';


@NgModule({
  declarations: [ InvoiceViewComponent ],
  imports: [
    SharedModule,
    FormsModule,
    MatInputModule,
    InvoicesViewRoutingModule
  ],
  exports: [ InvoiceViewComponent ]
})
export class InvoiceViewModule { }

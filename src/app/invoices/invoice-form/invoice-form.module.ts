import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { InvoiceFormComponent } from './invoice-form.component';
import { InvoicesFormRoutingModule } from './invoice-form-routing.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ InvoiceFormComponent ],
  imports: [
    SharedModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatInputModule,
		InvoiceItemModule,
		InvoicesFormRoutingModule
  ],
  exports: [ InvoiceFormComponent ]
})
export class InvoiceFormModule { }

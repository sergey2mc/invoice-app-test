import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceFormComponent } from './invoice-form.component';
import { InvoicesFormRoutingModule } from './invoice-form-routing.module';
import { InvoiceItemModule } from '../invoice-item/invoice-item.module';


@NgModule({
  declarations: [ InvoiceFormComponent ],
  imports: [
    SharedModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		InvoiceItemModule,
		InvoicesFormRoutingModule
  ],
  exports: [ InvoiceFormComponent ]
})
export class InvoiceFormModule { }

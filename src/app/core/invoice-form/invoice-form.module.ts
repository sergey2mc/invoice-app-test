import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceFormComponent } from './invoice-form.component';


@NgModule({
  declarations: [ InvoiceFormComponent ],
  imports: [
    SharedModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule
  ],
  exports: [ InvoiceFormComponent ]
})
export class InvoiceFormModule { }

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { InvoiceItemComponent } from './invoice-item.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ InvoiceItemComponent ],
  imports: [
    SharedModule,
		ReactiveFormsModule,
    MatButtonModule,
		MatSelectModule,
		MatInputModule
  ],
  exports: [ InvoiceItemComponent ]
})
export class InvoiceItemModule { }

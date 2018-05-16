import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { InvoiceFormComponent } from './invoice-form.component';

@NgModule({
  declarations: [ InvoiceFormComponent ],
  imports: [
    SharedModule,
    FormsModule
  ],
  exports: [ InvoiceFormComponent ]
})
export class InvoiceFormModule { }

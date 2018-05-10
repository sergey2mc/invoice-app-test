import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { InvoicesListComponent } from './invoices-list.component';

@NgModule({
  declarations: [ InvoicesListComponent ],
  imports: [
    SharedModule,
    MatTableModule
  ],
  exports: [ InvoicesListComponent ]
})
export class InvoicesListModule { }

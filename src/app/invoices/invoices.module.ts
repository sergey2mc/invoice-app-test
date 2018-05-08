import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  declarations: [ InvoicesComponent ],
  imports: [
    SharedModule,
    MatTableModule,
    MatButtonModule,
    InvoicesRoutingModule
  ],
  exports: [ InvoicesComponent ]
})
export class InvoicesModule { }

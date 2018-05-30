import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';
import { ModalDialogModule } from '../../shared/modal-dialog/modal-dialog.module';
import { InvoicesListComponent } from './invoices-list.component';


@NgModule({
  declarations: [ InvoicesListComponent ],
  imports: [
    SharedModule,
		MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ModalDialogModule
  ],
  exports: [ InvoicesListComponent ]
})
export class InvoicesListModule { }

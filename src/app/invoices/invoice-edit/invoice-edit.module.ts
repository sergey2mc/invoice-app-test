import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ModalDialogModule } from '../../core/modal-dialog/modal-dialog.module';
import { InvoiceEditComponent } from './invoice-edit.component';
import { InvoicesEditRoutingModule } from './invoice-edit-routing.module';

@NgModule({
  declarations: [ InvoiceEditComponent ],
  imports: [
    SharedModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ModalDialogModule,
    InvoicesEditRoutingModule
  ],
  exports: [ InvoiceEditComponent ]
})
export class InvoiceEditModule { }

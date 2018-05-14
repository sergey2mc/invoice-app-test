import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ModalDialogModule } from '../../core/modal-dialog/modal-dialog.module';
import { InvoiceNewComponent } from './invoice-new.component';
import { InvoicesNewRoutingModule } from './invoice-new-routing.module';

@NgModule({
  declarations: [ InvoiceNewComponent ],
  imports: [
    SharedModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ModalDialogModule,
    InvoicesNewRoutingModule
  ],
  exports: [ InvoiceNewComponent ]
})
export class InvoiceNewModule { }

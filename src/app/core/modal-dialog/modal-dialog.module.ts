import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ModalDialogComponent } from './modal-dialog.component';

@NgModule({
  declarations: [ ModalDialogComponent ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ ModalDialogComponent ],
  entryComponents: [ ModalDialogComponent ]
})
export class ModalDialogModule { }

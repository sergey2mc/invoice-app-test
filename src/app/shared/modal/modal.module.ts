import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared.module';
import { ModalComponent } from './modal.component';


@NgModule({
  declarations: [ ModalComponent ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ ModalComponent ],
  entryComponents: [ ModalComponent ]
})
export class ModalModule { }

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../../shared.module';
import { ErrorMessageComponent } from './error-message.component';


@NgModule({
  declarations: [ ErrorMessageComponent ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ ErrorMessageComponent ],
  entryComponents: [ ErrorMessageComponent ]
})
export class ErrorMessageModule { }

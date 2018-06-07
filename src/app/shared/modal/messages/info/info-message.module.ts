import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../../shared.module';
import { InfoMessageComponent } from './info-message.component';


@NgModule({
  declarations: [ InfoMessageComponent ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ InfoMessageComponent ],
  entryComponents: [ InfoMessageComponent ]
})
export class InfoMessageModule { }

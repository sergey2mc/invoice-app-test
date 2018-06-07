import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../../shared.module';
import { QuestionMessageComponent } from './question-message.component';


@NgModule({
  declarations: [ QuestionMessageComponent ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ QuestionMessageComponent ],
  entryComponents: [ QuestionMessageComponent ]
})
export class QuestionMessageModule { }

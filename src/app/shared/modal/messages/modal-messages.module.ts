import { NgModule } from '@angular/core';
import { QuestionMessageModule } from './question/question-message.module';
import { InfoMessageModule } from './info/info-message.module';
import { ErrorMessageModule } from './error/error-message.module';


@NgModule({
  exports: [
    QuestionMessageModule,
    InfoMessageModule,
    ErrorMessageModule
  ]
})
export class ModalMessageTypesModule { }

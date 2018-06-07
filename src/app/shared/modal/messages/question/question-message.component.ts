import { Component, Input } from '@angular/core';

import { ModalMessage } from '../../../../core/interfaces/modal-message.interface';


@Component({
  selector: 'app-question-message',
  templateUrl: './question-message.component.html',
  styleUrls: ['./question-message.component.scss'],
})
export class QuestionMessageComponent {

  @Input() data: ModalMessage;

  constructor() {}

}

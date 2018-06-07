import { Component, Input } from '@angular/core';

import { ModalMessage } from '../../../../core/interfaces/modal-message.interface';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {

	@Input() data: ModalMessage;

  constructor(  ) {}

}

import { Component, Input } from '@angular/core';

import { ModalMessage } from '../../../../core/interfaces/modal-message.interface';


@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent {

	@Input() data: ModalMessage;

  constructor() {}

}

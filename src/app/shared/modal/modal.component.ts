import { Component, ComponentFactoryResolver, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalMessageTypes } from './modal-message-types';
import { QuestionMessageComponent } from './messages/question/question-message.component';
import { InfoMessageComponent } from './messages/info/info-message.component';
import { ErrorMessageComponent } from './messages/error/error-message.component';


@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

	factoryResolver: ComponentFactoryResolver;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
		@Inject(ComponentFactoryResolver) factoryResolver
  ) {
		this.factoryResolver = factoryResolver;
  }

	@ViewChild('dynamic', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

	ngOnInit() {
    this.loadComponent(this.getComponent(this.data.message), this.data);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	private loadComponent(component, data: any): void {
		const componentFactory = this.factoryResolver.resolveComponentFactory(component);
		const componentRef = this.viewContainerRef.createComponent(componentFactory);
		componentRef.instance['data'] = data;
	}

	private getComponent(message) {
		switch (message) {
      case ModalMessageTypes.ASK_INVOICE_DELETE: return QuestionMessageComponent;
			case ModalMessageTypes.INFO_INVOICE_CREATED:
			case ModalMessageTypes.INFO_INVOICE_DELETED: return InfoMessageComponent;
			case ModalMessageTypes.ERROR_INVOICE_SAVE:
			case ModalMessageTypes.ERROR_INVOICE_UPDATE:
			case ModalMessageTypes.ERROR_INVOICE_DELETE:
			case ModalMessageTypes.ERROR_INVOICEITEM_ADD:
			case ModalMessageTypes.ERROR_INVOICEITEM_UPDATE:
			case ModalMessageTypes.ERROR_INVOICEITEM_DELETE: return ErrorMessageComponent;
      default: return InfoMessageComponent;
		}
  }
}

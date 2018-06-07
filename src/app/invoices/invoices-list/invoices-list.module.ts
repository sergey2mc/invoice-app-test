import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from '../../shared/modal/modal.module';
import { InvoicesListComponent } from './invoices-list.component';


@NgModule({
  declarations: [ InvoicesListComponent ],
  imports: [
    SharedModule,
		ModalModule
  ],
  exports: [ InvoicesListComponent ]
})
export class InvoicesListModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceNewComponent } from './invoice-new.component';

const invoiceNewRoutes: Routes = [
    {path: '', component: InvoiceNewComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(invoiceNewRoutes) ],
    exports: [ RouterModule ]
})
export class InvoicesNewRoutingModule { }

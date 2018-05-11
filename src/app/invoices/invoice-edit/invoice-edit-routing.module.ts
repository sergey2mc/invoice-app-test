import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceEditComponent } from './invoice-edit.component';

const invoiceEditRoutes: Routes = [
    {path: '', component: InvoiceEditComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(invoiceEditRoutes) ],
    exports: [ RouterModule ]
})
export class InvoicesEditRoutingModule { }

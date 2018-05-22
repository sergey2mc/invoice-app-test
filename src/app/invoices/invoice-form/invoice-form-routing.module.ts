import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFormComponent } from './invoice-form.component';

const invoiceFormRoutes: Routes = [
    {path: '', component: InvoiceFormComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(invoiceFormRoutes) ],
    exports: [ RouterModule ]
})
export class InvoicesFormRoutingModule { }

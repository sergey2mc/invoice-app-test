import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceViewComponent } from './invoice-view.component';

const invoiceViewRoutes: Routes = [
    {path: '', component: InvoiceViewComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(invoiceViewRoutes) ],
    exports: [ RouterModule ]
})
export class InvoicesViewRoutingModule { }

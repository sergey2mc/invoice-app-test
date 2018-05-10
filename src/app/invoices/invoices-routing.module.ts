import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

const invoicesRoutes: Routes = [
    {
        path: '',
        component: InvoicesComponent,
        children: [
            { path: '', component: InvoicesListComponent, pathMatch: 'full' },
            // { path: '', loadChildren: './invoices-list/invoices-list.module#InvoicesListModule' },
            { path: 'new', loadChildren: './invoice-new/invoice-new.module#InvoiceNewModule' }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(invoicesRoutes) ],
    exports: [ RouterModule ]
})
export class InvoicesRoutingModule { }

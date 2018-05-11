import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoicesResolver } from '../core/services/invoices-resolver.service';

const invoicesRoutes: Routes = [
    {
        path: '',
        component: InvoicesComponent,
        children: [
            { path: '', component: InvoicesListComponent, pathMatch: 'full', resolve: { invoices: InvoicesResolver } },
            // { path: '', loadChildren: './invoices-list/invoices-list.module#InvoicesListModule' },
            { path: 'new', loadChildren: './invoice-new/invoice-new.module#InvoiceNewModule' },
            { path: 'edit/:id', loadChildren: './invoice-edit/invoice-edit.module#InvoiceEditModule' }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(invoicesRoutes) ],
    exports: [ RouterModule ],
    providers: [ InvoicesResolver ]
})
export class InvoicesRoutingModule { }

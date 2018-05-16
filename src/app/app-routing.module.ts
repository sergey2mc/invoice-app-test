import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'products', loadChildren: './products/products.module#ProductsModule' },
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
    { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

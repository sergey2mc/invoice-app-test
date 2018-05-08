import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
    { path: '', component: MainComponent, pathMatch: 'full' },
    { path: 'products', loadChildren: './products/products.module#ProductsModule' },
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
    { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
    // { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule' },
    // { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from './core/resolvers/products-resolver.service';
import { CustomersResolver } from './core/resolvers/customers-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'products', loadChildren: './products/products.module#ProductsModule', resolve: {products: ProductsResolver} },
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule', resolve: {customers: CustomersResolver} },
    { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }) ],
    exports: [ RouterModule ],
    providers: [
        ProductsResolver,
        CustomersResolver
    ]
})
export class AppRoutingModule { }

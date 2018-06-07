import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';


const appRoutes: Routes = [
	{ path: 'products', loadChildren: './products/products.module#ProductsModule' },
	{ path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
	{ path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
	{ path: 'not-found', component: NotFoundComponent },
	{ path: '', redirectTo: 'invoices', pathMatch: 'full' },
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
	{ path: 'products', loadChildren: './products/products.module#ProductsModule' },
	{ path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
	{ path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
	{ path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
	{ path: '', redirectTo: 'invoices', pathMatch: 'full' },
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{ initialNavigation: 'enabled' }
		)
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }

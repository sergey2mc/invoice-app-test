import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceResolver } from '../core/resolvers/invoice-resolver.service';
import { InvoicesResolver } from '../core/resolvers/invoices-resolver.service';
import { CustomersResolver } from '../core/resolvers/customers-resolver.service';
import { ProductsResolver } from '../core/resolvers/products-resolver.service';


const invoicesRoutes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: '',
        component: InvoicesListComponent,
        pathMatch: 'full',
        resolve: {
          invoices: InvoicesResolver,
					customers: CustomersResolver
        }
      },
      {
        path: 'new',
        loadChildren: './invoice-form/invoice-form.module#InvoiceFormModule',
				resolve: {
					customers: CustomersResolver,
					products: ProductsResolver
				},
        data: {
          mode: 'new'
        }
      },
      {
        path: 'edit/:id',
        loadChildren: './invoice-form/invoice-form.module#InvoiceFormModule',
				resolve: {
					customers: CustomersResolver,
					products: ProductsResolver,
					invoice: InvoiceResolver
				},
        data: {
          mode: 'edit'
        }
      },
      {
        path: 'view/:id',
        loadChildren: './invoice-view/invoice-view.module#InvoiceViewModule',
				resolve: {
					customers: CustomersResolver,
        	products: ProductsResolver,
					invoice: InvoiceResolver
				}
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(invoicesRoutes) ],
  exports: [ RouterModule ],
  providers: [
  	InvoiceResolver,
    InvoicesResolver,
    CustomersResolver,
    ProductsResolver
  ]
})
export class InvoicesRoutingModule { }

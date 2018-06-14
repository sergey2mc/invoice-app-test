import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceResolverService } from '../core/resolvers/invoice-resolver.service';
import { InvoicesResolverService } from '../core/resolvers/invoices-resolver.service';
import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';
import { ProductsResolverService } from '../core/resolvers/products-resolver.service';
import {InvoiceItemsResolverService} from '../core/resolvers/invoice-items-resolver.service';


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
          invoices: InvoicesResolverService,
					customers: CustomersResolverService
        }
      },
      {
        path: 'new',
        loadChildren: './invoice-form/invoice-form.module#InvoiceFormModule',
				resolve: {
					customers: CustomersResolverService,
					products: ProductsResolverService
				},
        data: {
          mode: 'new'
        }
      },
      {
        path: 'edit/:id',
        loadChildren: './invoice-form/invoice-form.module#InvoiceFormModule',
				resolve: {
					customers: CustomersResolverService,
					products: ProductsResolverService,
					items: InvoiceItemsResolverService,
					invoice: InvoiceResolverService
				},
        data: {
          mode: 'edit'
        }
      },
      {
        path: 'view/:id',
        loadChildren: './invoice-view/invoice-view.module#InvoiceViewModule',
				resolve: {
					customers: CustomersResolverService,
        	products: ProductsResolverService,
					items: InvoiceItemsResolverService,
					invoice: InvoiceResolverService
				}
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(invoicesRoutes) ],
  exports: [ RouterModule ],
  providers: [
  	InvoiceResolverService,
    InvoicesResolverService,
    CustomersResolverService,
    ProductsResolverService
  ]
})
export class InvoicesRoutingModule { }

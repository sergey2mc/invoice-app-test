import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomersResolver } from '../core/resolvers/customers-resolver.service';


const customersRoutes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    pathMatch: 'full',
    resolve: {
      customers: CustomersResolver
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(customersRoutes) ],
  exports: [ RouterModule ],
	providers: [ CustomersResolver ]
})
export class CustomersRoutingModule { }

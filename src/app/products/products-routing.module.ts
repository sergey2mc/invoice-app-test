import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsResolver } from '../core/resolvers/products-resolver.service';


const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full',
    resolve: {
      products: ProductsResolver
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(productsRoutes) ],
  exports: [ RouterModule ],
	providers: [ ProductsResolver ]
})
export class ProductsRoutingModule { }

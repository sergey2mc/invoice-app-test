import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsResolverService } from '../core/resolvers/products-resolver.service';


const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full',
    resolve: {
      products: ProductsResolverService
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(productsRoutes) ],
  exports: [ RouterModule ],
	providers: [ ProductsResolverService ]
})
export class ProductsRoutingModule { }

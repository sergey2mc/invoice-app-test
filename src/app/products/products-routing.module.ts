import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const productsRoutes: Routes = [{ path: '', component: ProductsComponent, pathMatch: 'full'}];

@NgModule({
  imports: [ RouterModule.forChild(productsRoutes) ],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule { }

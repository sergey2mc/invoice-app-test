import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class ProductsResolver implements Resolve<Product[]> {

  constructor(private productService: ProductService) {}

  resolve(): Observable<Product[]> {
  	return this.productService.dataLoaded$
			.switchMap(status => status ? this.productService.allProducts$ : this.productService.getProducts())
			.take(1)
			.catch(() => Observable.throw('Products Resolver: sever error'));
  }
}

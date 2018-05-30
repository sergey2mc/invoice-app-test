import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class ProductsResolver implements Resolve< Observable<Product[]>> {

  constructor(
  	private productService: ProductService,
		private loader: LoaderService,
		private router: Router
	) { }

  resolve(): Observable<Observable<Product[]>> {
    return this.productService.allProducts$
			.filter(products => products.length > 0)
      .take(1)
      .map(products => {
        if (products) {
          return Observable.of(products);
        } else {
          return Observable.empty<Product[]>();
        }
      })
      .catch(() => {
        this.router.navigate(['/']);
        return Observable.throw('Sever error');
      });
  }
}

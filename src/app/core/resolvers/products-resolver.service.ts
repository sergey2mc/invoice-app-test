import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsResolver implements Resolve< Observable<Product[]>> {
    constructor(private productService: ProductService, private router: Router) {
			this.productService.getProducts();
    }

    resolve(): Observable<Observable<Product[]>> {
      return this.productService.allProducts$
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

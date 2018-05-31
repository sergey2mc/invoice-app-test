import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Product } from '../core/interfaces/product.interface';
import { ProductService } from '../core/services/product.service';
import { LoaderService } from '../core/services/loader.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

	loaderEnabled$: Observable<boolean>;
  products$: Observable<Product[]>;
  displayedColumns = ['name', 'price'];

  constructor(private loaderService: LoaderService, private productService: ProductService) {
    this.products$ = this.productService.allProducts$;
		this.loaderEnabled$ = loaderService.loaderEnabled$;
  }
}

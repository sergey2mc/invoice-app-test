import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Product } from '../core/interfaces/product.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  products$: Observable<Product[]>;
  displayedColumns = ['name', 'price'];

  constructor(private route: ActivatedRoute) {
    this.products$ = this.route.snapshot.data.products;
  }
}

import { Component } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { Product } from '../shared/interfaces/products.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  products$: Observable<Product | Product[]>;
  displayedColumns = ['name', 'price'];

  constructor(private productService: ProductService) {
      this.products$ = this.productService.getProducts();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {
    this.products$ = this.route.snapshot.data.products;
  }
}

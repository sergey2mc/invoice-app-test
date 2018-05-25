import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Product } from '../core/interfaces/product.interface';
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

  constructor(private loaderService: LoaderService, private route: ActivatedRoute) {
    this.products$ = this.route.snapshot.data.products;
		this.loaderEnabled$ = loaderService.loaderEnabled$;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { productsData } from '../mocks/products.mock';
import { Product } from '../shared/interfaces/products.interface';
import { ProductService } from '../core/services/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'price'];
  dataSource = new MatTableDataSource();
  subs: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log('Products-page');
    this.subs = this.productService.getProducts().subscribe(this.productsHandler.bind(this));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  productsHandler() {
    return (response: Product[]) => {
      console.log(response);
      this.dataSource.data = response;
    };
  }
}

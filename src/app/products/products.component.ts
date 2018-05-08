import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { productsData } from '../mocks/products.mock';
import { Product } from '../interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  displayedColumns = ['name', 'price'];
  dataSource: MatTableDataSource<Product>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(productsData);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { customersData } from '../mocks/customers.mock';
import { Customer } from '../interfaces/customers.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  displayedColumns = ['name', 'address', 'phone'];
  dataSource: MatTableDataSource<Customer>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(customersData);
  }
}

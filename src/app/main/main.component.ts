import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { invoicesData } from '../mocks/invoices.mock';
import { Invoice } from '../interfaces/invoices.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];
  dataSource: MatTableDataSource<Invoice>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(invoicesData);
  }
}

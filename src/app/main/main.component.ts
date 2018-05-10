import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { invoicesData } from '../mocks/invoices.mock';
import { Invoice } from '../shared/interfaces/invoices.interface';

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
    console.log('Main-page');
    this.dataSource = new MatTableDataSource(invoicesData);
  }
}

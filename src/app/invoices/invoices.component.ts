import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { invoicesData } from '../mocks/invoices.mock';
import { Invoice } from '../interfaces/invoices.interface';
import { Subscription } from 'rxjs';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];
  dataSource = new MatTableDataSource();
  subs: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.subs = this.api.getInvoices().subscribe(this.invoicesHandler.bind(this));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  invoicesHandler(response: Invoice[]) {
    console.log(response);
    this.dataSource.data = response;
  }
}

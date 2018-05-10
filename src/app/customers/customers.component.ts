import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { customersData } from '../mocks/customers.mock';
import { Customer } from '../shared/interfaces/customers.interface';
import { ApiService } from '../core/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'address', 'phone'];
  dataSource = new MatTableDataSource();
  subs: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit() {
      console.log('Customers-page');
      this.subs = this.api.customers.get().subscribe(this.customersHandler.bind(this));
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  customersHandler(response: Customer[]) {
      console.log(response);
      this.dataSource.data = response;
  }
}

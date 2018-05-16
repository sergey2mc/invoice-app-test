import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../shared/interfaces/customers.interface';
import { CustomerService } from '../core/services/customer.service';
import { Subscription } from 'rxjs/Subscription';
// import { customersData } from '../mocks/customers.mock';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'address', 'phone'];
  dataSource = new MatTableDataSource();
  subs: Subscription;

  constructor(private customerService: CustomerService) {}

  private getCustomersHandler() {
    return (response: Customer[]) => {
        this.dataSource.data = response;
    };
  }

  ngOnInit() {
    this.subs = this.customerService.getCustomers().subscribe(this.getCustomersHandler());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

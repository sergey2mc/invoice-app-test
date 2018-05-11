import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { customersData } from '../mocks/customers.mock';
import { Customer } from '../shared/interfaces/customers.interface';
import { CustomerService } from '../core/services/customer.service';
import { Subscription } from 'rxjs/Subscription';

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

  ngOnInit() {
      console.log('Customers-page');
      this.subs = this.customerService.getCustomers().subscribe(this.customersHandler());
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  customersHandler() {
      return (response: Customer[]) => {
          console.log(response);
          this.dataSource.data = response;
      };
  }
}

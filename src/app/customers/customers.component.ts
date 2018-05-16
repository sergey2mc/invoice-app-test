import { Component } from '@angular/core';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../shared/interfaces/customers.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {

  customers$: Observable<Customer | Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];

  constructor(private customerService: CustomerService) {
    this.customers$ = this.customerService.getCustomers();
  }
}

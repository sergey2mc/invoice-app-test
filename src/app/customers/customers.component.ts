import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../core/interfaces/customer.interface';
import { CustomerService } from '../core/services/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {

  customers$: Observable<Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];

	constructor(private customerService: CustomerService) {
		this.customers$ = this.customerService.allCustomers$;
	}
}

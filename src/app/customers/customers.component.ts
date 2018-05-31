import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../core/interfaces/customer.interface';
import { CustomerService } from '../core/services/customer.service';
import { LoaderService } from '../core/services/loader.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {

	loaderEnabled$: Observable<boolean>;
  customers$: Observable<Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];

	constructor(private loaderService: LoaderService, private customerService: CustomerService) {
		this.customers$ = this.customerService.allCustomers$;
		this.loaderEnabled$ = loaderService.loaderEnabled$;
	}
}

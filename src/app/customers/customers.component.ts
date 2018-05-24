import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../core/interfaces/customer.interface';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {

  customers$: Observable<Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];

	constructor(private route: ActivatedRoute) {
		this.customers$ = this.route.snapshot.data.customers;
	}
}

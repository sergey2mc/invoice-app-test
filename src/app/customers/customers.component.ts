import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

	constructor(private route: ActivatedRoute) {
		this.customers$ = this.route.snapshot.data.customers;
	}
}

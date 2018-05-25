import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../core/interfaces/customer.interface';
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

	constructor(private loaderService: LoaderService, private route: ActivatedRoute) {
		this.customers$ = this.route.snapshot.data.customers;
		this.loaderEnabled$ = loaderService.loaderEnabled$;
	}
}

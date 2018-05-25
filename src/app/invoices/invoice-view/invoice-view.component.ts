import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Invoice } from '../../core/interfaces/invoice.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import 'rxjs/add/operator/do';


@Component({
	selector: 'app-invoice-view',
	templateUrl: './invoice-view.component.html',
	styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {

	invoice$: Observable<Invoice>;

	constructor(
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.invoice$ = this.route.snapshot.data.invoice
			.share();
	}

	customerClickHandler() {
		this.router.navigate(['customers']);
	}
}

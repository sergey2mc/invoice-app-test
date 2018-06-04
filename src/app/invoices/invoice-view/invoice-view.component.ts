import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { Invoice } from '../../core/interfaces/invoice.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';


@Component({
	selector: 'app-invoice-view',
	templateUrl: './invoice-view.component.html',
	styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {

	invoice$: Observable<Invoice>;

	constructor(
		private customerService: CustomerService,
		public productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.invoice$ = this.invoiceService.invoice$
			// .do(i => console.log('RESULT INVOICE', i));
	}

	customerClickHandler() {
		this.router.navigate(['customers']);
	}
}

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
			.switchMap(invoice => combineLatest(
				Observable.of(invoice),
				this.customerService.getCustomer(invoice.customer_id),
				this.invoiceItemsService.getInvoiceItems(invoice.id)
			))
			.map(([invoice, customer, items]) => ({...invoice, customer: customer, items: items}))
			.switchMap(invoice => combineLatest(
				Observable.of(invoice),
				this.productService.allProducts$
			))
			.map(([invoice, products]) => ({
				...invoice,
				items: invoice.items.map(item => ({...item, product: products.find(prod => prod.id === item.product_id)}))
			}))
			.share();

	}

	customerClickHandler() {
		this.router.navigate(['customers']);
	}
}

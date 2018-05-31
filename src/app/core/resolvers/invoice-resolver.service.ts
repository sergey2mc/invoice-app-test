import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

import { InvoiceItem } from '../interfaces/invoiceItem.interface';
import { Invoice } from '../interfaces/invoice.interface';
import { Product } from '../interfaces/product.interface';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceItemsService } from '../services/invoice-items.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';


@Injectable()
export class InvoiceResolver implements Resolve<Observable<Invoice>> {

	constructor(
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private customerService: CustomerService,
		private productService: ProductService
	) {	}

	resolve(route: ActivatedRouteSnapshot): Observable<Observable<Invoice>> {
		return Observable.combineLatest(
				this.invoiceService.getInvoice(+route.paramMap.get('id')),
				this.invoiceItemsService.getInvoiceItems(+route.paramMap.get('id'))
			)
			.switchMap(([invoice, items]: [Invoice, InvoiceItem[]]) => Observable.combineLatest(
				Observable.of(invoice),
				Observable.of(items),
				this.customerService.getCustomer(invoice.customer_id),
				...items.map((item: InvoiceItem) => this.productService.getProduct(item.product_id))
			))
			.take(1)
			.map(([invoice, items, customer, ...products]) => Observable.of(
				{
					...invoice,
					customer: customer,
					items: items.map((item: InvoiceItem) => (
						{
							...item,
							product: products.find((product: Product) => product.id === item.product_id)
						}
					))
				}
			))
			.catch(() => Observable.throw('Invoice Resolver: sever error'));
	}
}

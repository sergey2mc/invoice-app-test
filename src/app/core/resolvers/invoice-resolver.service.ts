import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { InvoiceItem } from '../interfaces/invoiceItem.interface';
import { Invoice } from '../interfaces/invoice.interface';
import { Customer } from '../interfaces/customer.interface';
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
		return combineLatest(
				this.invoiceService.getInvoice(+route.paramMap.get('id')),
				this.invoiceItemsService.getInvoiceItems(+route.paramMap.get('id'))
			)
			.switchMap(([invoice, items]: [Invoice, InvoiceItem[]]) => combineLatest(
				Observable.of(invoice),
				Observable.of(items),
				this.customerService.getCustomer(invoice.customer_id),
				this.productService.allProducts$
			))
			.take(1)
			.map(([invoice, items, customer, products]: [Invoice, InvoiceItem[], Customer, Product[]]) => (
				{
					...invoice,
					customer: customer,
					items: items.map(item => ({...item, product: products.find(prod => prod.id === item.product_id)}))
				}
			))
			.map((invoice: Invoice) => invoice ? Observable.of(invoice) : Observable.empty<Invoice>())
			.catch(() => Observable.throw('Invoice Resolver: sever error'));
	}
}

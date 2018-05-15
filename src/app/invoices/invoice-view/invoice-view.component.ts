import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { InvoiceItem } from '../../shared/interfaces/invoiceItem.interface';
import { Product } from '../../shared/interfaces/products.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-invoice-view',
    templateUrl: './invoice-view.component.html',
    styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {

    getInvoiceSubscription: Subscription;
    getCustomersAndInvoiceItemsSubscription: Subscription;
    getProductsSubscription: Subscription;
    getProductsObservables: Observable<any>[] = [];
    getHttpParamsSubscription: Subscription;
    customer = '';
    invoice: Invoice = {
        id: 0,
        customer_id: 0,
        discount: 0,
        total: 0,
        items: []
    };

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        private invoiceItemsService: InvoiceItemsService,
        private route: ActivatedRoute
    ) {}

    private getHttpParamsHandler() {
        return (params) => {
            this.getInvoiceSubscription = this.invoiceService.getInvoices(params.get('id')).subscribe(this.getInvoiceHandler());
        };
    }

    private getInvoiceHandler() {
        return (res) => {
            this.invoice = res;
            this.getCustomersAndInvoiceItemsSubscription = zip(
                this.customerService.getCustomers(res.customer_id),
                this.invoiceItemsService.getInvoiceItems(res.id)
            ).subscribe(this.getCustomersAndInvoiceItemsHandler());
        };
    }

    private getCustomersAndInvoiceItemsHandler() {
        return (res) => { // [0] - customers array, [1] - invoice-items array
            this.customer = res[0].name;

            this.invoice.items = res[1];

            this.invoice.items.forEach((item: InvoiceItem) => {
                this.getProductsObservables.push(this.productService.getProducts(item.product_id));
            });
            const zip$ = (array$) => zip(...array$);
            this.getProductsSubscription = zip$(this.getProductsObservables).subscribe(prod => {
                if (prod && prod.length) {
                    this.invoice.items.forEach((item: InvoiceItem, index: number) => {
                        const currentProduct = prod.filter((product: Product) => item.product_id === product.id);
                        this.invoice.items[index]['name'] = currentProduct[0]['name'];
                        this.invoice.items[index]['price'] = currentProduct[0]['price'];
                    });
                }
                this.getProductsSubscription.unsubscribe();
            });

            this.getCustomersAndInvoiceItemsSubscription.unsubscribe();
        };
    }

    ngOnInit() {
        this.getHttpParamsSubscription = this.route.paramMap.subscribe(this.getHttpParamsHandler());
    }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Customer } from '../../shared/interfaces/customers.interface';
import { Product } from '../../shared/interfaces/products.interface';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/observable/zip';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-invoice-view',
    templateUrl: './invoice-view.component.html',
    styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {

    getDataSubscription: Subscription;
    getHttpParamsSubscription: Subscription;
    invoice: Invoice = {
        id: 0,
        customer_id: 0,
        discount: 0,
        total: 0,
        items: []
    };

    @ViewChild('customer') customer: ElementRef;
    @ViewChild('discount') discount: ElementRef;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        private invoiceItemsService: InvoiceItemsService,
        private route: ActivatedRoute
    ) {}

    private getHttpParamsHandler() {
        return (params) => {
            this.getDataSubscription = zip(
                this.invoiceService.getInvoices(params.get('id')),
                this.customerService.getCustomers(),
                this.productService.getProducts(),
                this.invoiceItemsService.getInvoiceItems(params.get('id'))
            ).subscribe(this.getDataHandler());
        };
    }

    private getDataHandler() {
        return (res) => { // [0] - invoice, [1] - customers array, [2] - products array, [3] - invoice-items array
            this.invoice = res[0];
            this.discount.nativeElement.value = this.invoice.discount;

            const customer = res[1].filter((cust: Customer) => cust.id === this.invoice.customer_id);
            this.customer.nativeElement.value = customer[0].name;

            this.invoice.items = res[3];
            this.invoice.items.forEach((item, index) => {
                const prod: Product[] = res[2].filter((product: Product) => product.id === item.product_id);
                this.invoice.items[index].name = prod.length ? prod[0].name : '';
                this.invoice.items[index].price = prod.length ? prod[0].price : 0;
            });

            this.getDataSubscription.unsubscribe();
        };
    }

    ngOnInit() {
        this.getHttpParamsSubscription = this.route.paramMap.subscribe(this.getHttpParamsHandler());
    }
}

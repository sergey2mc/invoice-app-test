import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Customer } from '../../shared/interfaces/customers.interface';
import { Product } from '../../shared/interfaces/products.interface';
import { InvoiceItems } from '../../shared/interfaces/invoiceItems.interface';
import { Basket } from '../../shared/interfaces/basket.interface';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-invoice-new',
    templateUrl: './invoice-new.component.html',
    styleUrls: ['./invoice-new.component.scss'],
})
export class InvoiceNewComponent implements OnInit, OnDestroy {

    subs: Subscription;
    customersList: Customer[];
    productsList: Product[];
    invoice: Invoice;
    invoiceItems: InvoiceItems[] = [];
    currentProducts: Basket[] = [];

    @ViewChild('customer') customer: ElementRef;
    @ViewChild('product') product: ElementRef;
    @ViewChild('quantity') quantity: ElementRef;
    @ViewChild('price') price: ElementRef;
    @ViewChild('discount') discount: ElementRef;
    total = 0;

    constructor(private api: ApiService) {}

    ngOnInit() {
        console.log('Invoices-new-page');

        this.subs = this.api.customers.get().mergeMap((res: Customer[]) => {
            this.getCustomersHandler(res);
            return this.api.products.get();
        }).subscribe(this.getProductsHandler.bind(this));
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    private checkInput() {
        return (
            this.customer.nativeElement.value !== '' &&
            this.product.nativeElement.value !== '' &&
            Number(this.quantity.nativeElement.value) > 0
        );
    }

    private getCustomersHandler(res: Customer[]) {
        console.log('Customers:', res);
        this.customersList = res;
    }

    private getProductsHandler(res: Product[]) {
        console.log('Products:', res);
        this.productsList = res;
    }

    private applyDiscount() {
        this.total = Number((this.total - this.total * this.discount.nativeElement.value * 0.01).toFixed(2));
    }

    inputProductHandler(e) {
        const product: Product[] = this.productsList.filter(item => item.id === Number(e.target.value));
        this.price.nativeElement.value = product[0].price;
        this.calcTotal();
    }

    calcTotal() {
        if (this.currentProducts.length === 0) {
            this.total = Number(this.price.nativeElement.value * this.quantity.nativeElement.value);
        } else if (this.currentProducts.length === 1) {
            this.total = Number(this.currentProducts[0].quantity) * Number(this.currentProducts[0].price);
        } else {
            this.total = 0;
            this.currentProducts.forEach(item => this.total += Number(item.quantity) * Number(item.price));
        }
        this.applyDiscount();
    }

    saveHandler() {
        if (this.currentProducts.length) {
            this.currentProducts.forEach(item => this.invoiceItems.push({product_id: item.id, quantity: item.quantity}));
            this.invoice = {
                customer_id: Number(this.customer.nativeElement.value),
                total: this.total,
                discount: Number(this.discount.nativeElement.value),
                items: this.invoiceItems
            };
            this.subs.add(this.api.invoices.add(this.invoice).subscribe(
                res => console.log(res),
                err => console.log(err))
            );
        }
    }

    addHandler() {
        if (this.checkInput()) {
            this.currentProducts.push({
                id: Number(this.product.nativeElement.value),
                product: this.product.nativeElement.options[this.product.nativeElement.selectedIndex].text,
                quantity: Number(this.quantity.nativeElement.value),
                price: Number(this.price.nativeElement.value)
            });
        }
        this.calcTotal();
    }

    removeHandler(productID) {
        const currentProductsFiltered = this.currentProducts.filter(item => item.id !== productID);
        this.currentProducts = currentProductsFiltered;
        this.calcTotal();
    }

    changeValuesHandler(event, operation) {
        const element = event.target.parentNode.children[0];
        if (operation === '++') {
            element.value++;
        } else if (operation === '--' && element.value > 0) {
            element.value--;
        }
        this.calcTotal();
    }
}

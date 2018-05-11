import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Subscription } from 'rxjs/Subscription';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Customer } from '../../shared/interfaces/customers.interface';
import { Product } from '../../shared/interfaces/products.interface';
import { InvoiceItem } from '../../shared/interfaces/invoiceItem.interface';
import { Basket } from '../../shared/interfaces/basket.interface';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.scss'],
})
export class InvoiceEditComponent implements OnInit, OnDestroy {

    getHttpParamsSubscription: Subscription;
    getInvoiceSubscription: Subscription;
    getInvoiceItemsSubscription: Subscription;
    editInvoiceSubscription: Subscription;
    customersList: Customer[];
    productsList: Product[];
    invoiceItems: InvoiceItem[] = [];
    currentProducts: Basket[] = [];
    invoice: Invoice = {
        id: 0,
        customer_id: 0,
        discount: 0,
        total: 0,
        items: []
    };
    @ViewChild('discount') discount: ElementRef;
    @ViewChild('customer') customer: ElementRef;
    @ViewChild('product') product: ElementRef;
    @ViewChild('quantity') quantity: ElementRef;
    @ViewChild('price') price: ElementRef;
    total = 0;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    private addFieldsToInvoiceItems() {
        this.invoice.items.forEach((item: InvoiceItem, index: number) => {
            const prod: Product[] = this.productsList.filter((product: Product) => product.id === item.product_id);
            this.invoice.items[index].name = prod.length ? prod[0].name : '';
            this.invoice.items[index].price = prod.length ? prod[0].price : 0;
        });
        this.calcTotal();
    }

    private checkInput() {
        return (
            this.customer.nativeElement.value !== '' &&
            this.product.nativeElement.value !== '' &&
            Number(this.quantity.nativeElement.value) > 0
        );
    }

    private getCustomersHandler() {
        return (res: Customer[]) => {
            console.log('Customers:', res);
            const currentCustomer = res.filter((customer: Customer) => customer.id === this.invoice.customer_id);
            this.customersList = res.filter((customer: Customer) => customer.id !== this.invoice.customer_id);
            this.customersList.unshift(currentCustomer[0]);
            this.getInvoiceSubscription.unsubscribe();
        };
    }

    private getProductsHandler() {
        return (res: Product[]) => {
            console.log('Products:', res);
            this.productsList = res;
            this.addFieldsToInvoiceItems();
        };
    }

    private getInvoiceHandler(res: Invoice) {
        console.log('Invoice:', res);
        this.invoice = res;
    }

    private getInvoiceItemsHandler(res: InvoiceItem[]) {
        console.log('Invoice items:', res);
        this.invoice.items = res;
    }

    private getHttpParamsHandler() {
        return (params) => {
            console.log('InvoiceID:', params.get('id'));

            this.getInvoiceSubscription = this.invoiceService.getInvoices(params.get('id')).mergeMap((res: Invoice) => {
                this.getInvoiceHandler(res);
                return this.customerService.getCustomers();
            }).subscribe(this.getCustomersHandler());

            this.getInvoiceItemsSubscription = this.invoiceService.getInvoiceItems(params.get('id')).mergeMap((res: InvoiceItem[]) => {
                this.getInvoiceItemsHandler(res);
                return this.productService.getProducts();
            }).subscribe(this.getProductsHandler());
        };
    }

    private applyDiscount() {
        this.total = +(this.total - this.total * this.invoice.discount * 0.01).toFixed(2);
    }

    ngOnInit() {
        console.log('Invoices-edit-page');
        this.getHttpParamsSubscription = this.route.paramMap.subscribe(this.getHttpParamsHandler());
    }

    ngOnDestroy() {
        this.getInvoiceItemsSubscription.unsubscribe();
        // this.addInvoiceSubscription.unsubscribe();
    }

    inputProductHandler(e) {
        const product: Product[] = this.productsList.filter(item => item.id === +e.target.value);
        this.price.nativeElement.value = product[0].price;
        this.calcTotal();
    }

    inputCustomerHandler(e) {
        const customer: Customer[] = this.customersList.filter(item => item.id === +e.target.value);
        this.invoice.customer_id = customer[0].id;
        console.log(this.invoice)
        this.calcTotal();
    }

    calcTotal() {
        if (this.invoice.items.length === 0) {
            this.total = +this.price.nativeElement.value * +this.quantity.nativeElement.value;
        } else if (this.invoice.items.length === 1) {
            this.total = +this.invoice.items[0].quantity * +this.invoice.items[0].price;
        } else {
            this.total = 0;
            this.invoice.items.forEach(item => this.total += Number(item.quantity) * Number(item.price));
        }
        this.applyDiscount();
    }

    saveButtonHandler() {
        if (this.invoice.items.length) {
            this.invoice.items.forEach((item, index) => {
                delete this.invoice.items[index]['name'];
                delete this.invoice.items[index]['price'];
            });
        }
        // this.invoice.discount = +this.discount.nativeElement.value;
        console.log(this.invoice)
        this.editInvoiceSubscription = this.invoiceService.editInvoice(this.invoice).subscribe(
            res => console.log(res),
            err => console.log(err)
        );
    }

    addButtonHandler() {
        if (this.checkInput()) {
            this.invoice.items.push({
                invoice_id: +this.invoice.id,
                product_id: +this.product.nativeElement.value,
                quantity: +this.quantity.nativeElement.value,
                name: this.product.nativeElement.options[this.product.nativeElement.selectedIndex].text,
                price: +this.price.nativeElement.value
            });
        }
        this.calcTotal();
    }

    removeButtonHandler(productID) {
        this.invoice.items = this.invoice.items.filter(item => item.id !== productID);
        this.calcTotal();
    }

    changeValuesButtonHandler(event, operation) {
        const element = event.target.parentNode.children[0];
        if (operation === '++') {
            element.value++;
        } else if (operation === '--' && element.value > 0) {
            element.value--;
        }
        this.calcTotal();
    }
}

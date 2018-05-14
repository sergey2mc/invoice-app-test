import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Customer } from '../../shared/interfaces/customers.interface';
import { Product } from '../../shared/interfaces/products.interface';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-invoice-new',
    templateUrl: './invoice-new.component.html',
    styleUrls: ['./invoice-new.component.scss'],
})
export class InvoiceNewComponent implements OnInit, OnDestroy {

    getProductsSubscription: Subscription;
    getCustomersSubscription: Subscription;
    addInvoiceSubscription: Subscription;
    modalDialogSubscription: Subscription;
    customersList: Customer[];
    productsList: Product[];
    invoice: Invoice = {
        id: 0,
        customer_id: 0,
        discount: 0,
        total: 0,
        items: []
    };

    @ViewChild('customer') customer: ElementRef;
    @ViewChild('product') product: ElementRef;
    @ViewChild('quantity') quantity: ElementRef;
    @ViewChild('price') price: ElementRef;
    @ViewChild('discount') discount: ElementRef;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        public dialog: MatDialog
    ) {}

    private checkInput() {
        return (
            this.customer.nativeElement.value !== '' &&
            this.product.nativeElement.value !== '' &&
            +this.quantity.nativeElement.value > 0
        );
    }

    private getCustomersHandler() {
        return (res: Customer[]) => {
            this.customersList = res;
        };
    }

    private getProductsHandler() {
        return (res: Product[]) => {
            this.productsList = res;
        };
    }

    private applyDiscount() {
        this.invoice.total = Number((this.invoice.total - this.invoice.total * this.discount.nativeElement.value * 0.01).toFixed(2));
    }

    ngOnInit() {
        this.getProductsSubscription = this.productService.getProducts().subscribe(this.getProductsHandler());
        this.getCustomersSubscription = this.customerService.getCustomers().subscribe(this.getCustomersHandler());
    }

    ngOnDestroy() {
        this.getProductsSubscription.unsubscribe();
        this.getCustomersSubscription.unsubscribe();
    }

    inputProductHandler(e) {
        const product: Product[] = this.productsList.filter(item => item.id === Number(e.target.value));
        this.price.nativeElement.value = product[0].price;
        this.calcTotal();
    }

    calcTotal() {
        if (this.invoice.items.length === 0) {
            this.invoice.total = Number(this.price.nativeElement.value * this.quantity.nativeElement.value);
        } else if (this.invoice.items.length === 1) {
            this.invoice.total = Number(this.invoice.items[0].quantity) * Number(this.invoice.items[0].price);
        } else {
            this.invoice.total = 0;
            this.invoice.items.forEach(item => this.invoice.total += Number(item.quantity) * Number(item.price));
        }
        this.applyDiscount();
    }

    inputDiscountHandler() {
        this.calcTotal();
    }

    saveButtonHandler() {
        if (this.invoice.items.length) {
            this.invoice.customer_id = +this.customer.nativeElement.value;
            this.invoice.discount = +this.discount.nativeElement.value;

            this.addInvoiceSubscription = this.invoiceService.addInvoice(this.invoice).subscribe(
                res => {
                    const dialogRef = this.openDialog({ id: res.id, mode: 'invoiceCreated'});
                    this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            this.invoice.id = res.id;
                            this.addInvoiceSubscription.unsubscribe();
                        }
                        this.modalDialogSubscription.unsubscribe();
                    });
                }
            );
        }
    }

    addButtonHandler() {
        if (this.checkInput()) {
            this.invoice.items.push({
                product_id: +this.product.nativeElement.value,
                name: this.product.nativeElement.options[this.product.nativeElement.selectedIndex].text,
                quantity: +this.quantity.nativeElement.value,
                price: +this.price.nativeElement.value
            });
        }
        this.calcTotal();
    }

    removeButtonHandler(productID) {
        this.invoice.items = this.invoice.items.filter(item => item.product_id !== productID);
        this.calcTotal();
    }

    changeValuesButtonHandler(event, operation) {
        // console.log(event.target.parentElement.children[0].value);
        const element = event.target.parentNode.children[0];
        if (operation === '++') {
            element.value++;
        } else if (operation === '--' && element.value > 0) {
            element.value--;
        }
        this.calcTotal();
    }

    openDialog(data) {
        return this.dialog.open(ModalDialogComponent, {
            width: '235px',
            data: data
        });
    }
}

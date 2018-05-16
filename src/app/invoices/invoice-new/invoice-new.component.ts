import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component';
import { InvoiceItem } from '../../shared/interfaces/invoiceItem.interface';
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
    tmpProduct: InvoiceItem = {
        name: 'Add Product',
        product_id: -1,
        quantity: 0,
        price: 0
    };
    invoice: Invoice = {
        id: 0,
        customer_id: 1,
        discount: 0,
        total: 0,
        items: []
    };


    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    private checkInput() {
        return (
            this.invoice.customer_id > -1 &&
            this.tmpProduct.product_id > -1 &&
            this.tmpProduct.quantity > 0
        );
    }

    private applyDiscount() {
        this.invoice.total = +((this.invoice.total - this.invoice.total * this.invoice.discount * 0.01).toFixed(2));
    }

    private getCustomersHandler() {
        return (res: Customer[]) => {
            this.customersList = res;
            if (this.customersList.length) {
                this.invoice.customer_id = this.customersList[0].id;
            }
        };
    }

    private getProductsHandler() {
        return (res: Product[]) => {
            this.productsList = res;
            if (this.productsList.length) {
                this.tmpProduct.product_id = this.productsList[0].id;
            }
        };
    }

    private openDialog(data) {
        return this.dialog.open(ModalDialogComponent, {
            width: '235px',
            data: data
        });
    }

    ngOnInit() {
        this.getProductsSubscription = this.productService.getProducts().subscribe(this.getProductsHandler());
        this.getCustomersSubscription = this.customerService.getCustomers().subscribe(this.getCustomersHandler());
    }

    ngOnDestroy() {
        this.getProductsSubscription.unsubscribe();
        this.getCustomersSubscription.unsubscribe();
    }

    selectProductHandler(event) {
        const product: Product[] = this.productsList.filter(item => item.id === Number(event.target.value));
        this.tmpProduct.price = product[0].price;
        this.tmpProduct.name = product[0].name;
        this.calcTotal();
    }

    calcTotal() {
        if (this.invoice.items.length === 0) {
            this.invoice.total = +this.tmpProduct.price * +this.tmpProduct.quantity;
        } else if (this.invoice.items.length === 1) {
            this.invoice.total = this.invoice.items[0].quantity * this.invoice.items[0].price;
        } else {
            this.invoice.total = 0;
            this.invoice.items.forEach(item => this.invoice.total += item.quantity * item.price);
        }
        this.applyDiscount();
    }

    inputDiscountHandler() {
        this.calcTotal();
    }

    saveInvoiceButtonHandler() {
        if (this.invoice.items.length) {
            this.addInvoiceSubscription = this.invoiceService.addInvoice(this.invoice).subscribe(
                res => {
                    const dialogRef = this.openDialog({ id: res.id, mode: 'invoiceCreated'});
                    this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            this.invoice.id = res.id;
                            this.addInvoiceSubscription.unsubscribe();
                            this.router.navigate(['invoices']);
                        }
                        this.modalDialogSubscription.unsubscribe();
                    });
                }
            );
        }
    }

    addInvoiceItemButtonHandler() {
        if (this.checkInput()) {
            this.invoice.items.push(this.tmpProduct);
            this.tmpProduct = {
                name: '',
                product_id: -1,
                quantity: 0,
                price: 0
            };
        }
        this.calcTotal();
    }

    removeInvoiceItemButtonHandler(productId) {
        this.invoice.items = this.invoice.items.filter(item => item.product_id !== productId);
        this.calcTotal();
    }

    changeQuantityHandler(operation) {
        if (operation === '++') {
            this.tmpProduct.quantity++;
        } else if (operation === '--' && this.tmpProduct.quantity > 0) {
            this.tmpProduct.quantity--;
        }
        this.calcTotal();
    }

    changeDiscountHandler(operation) {
        if (operation === '++' && this.invoice.discount < 50) {
            this.invoice.discount++;
        } else if (operation === '--' && this.invoice.discount > 0) {
            this.invoice.discount--;
        }
        this.calcTotal();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
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
        name: '',
        product_id: -1,
        quantity: 0,
        price: 0
    };

    invoice: Invoice = {
        id: 0,
        customer_id: -1,
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
}

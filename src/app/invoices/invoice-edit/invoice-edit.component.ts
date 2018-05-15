import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Customer } from '../../shared/interfaces/customers.interface';
import { Product } from '../../shared/interfaces/products.interface';
import { InvoiceItem } from '../../shared/interfaces/invoiceItem.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/observable/zip';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.scss'],
})
export class InvoiceEditComponent implements OnInit, OnDestroy {

    getHttpParamsSubscription: Subscription;
    getDataSubscription: Subscription;

    saveInvoiceSubscription: Subscription;

    saveInvoiceItemsObservables: Observable<InvoiceItem | InvoiceItem[]>[] = [];
    saveInvoiceItemsSubscription: Subscription;
    deleteInvoiceItemsSubscriptions: Subscription[] = [];

    modalDialogSubscription: Subscription;

    customersList: Customer[];
    productsList: Product[];
    invoiceItemsToRemove: InvoiceItem[] = [];
    invoice: Invoice = {
        id: 0,
        customer_id: 0,
        discount: 0,
        total: 0,
        items: []
    };
    tmpProduct: InvoiceItem = {
        name: 'Add Product',
        product_id: -1,
        quantity: 0,
        price: 0
    };

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        private invoiceItemsService: InvoiceItemsService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    private addFieldsToInvoiceItems() {
        if (this.invoice.items && this.invoice.items.length) {
            this.invoice.items.forEach((item: InvoiceItem, index: number) => {
                if (!this.invoice.items[index].name) {
                    const prod: Product[] = this.productsList.filter((product: Product) => product.id === item.product_id);
                    this.invoice.items[index].name = prod.length ? prod[0].name : '';
                    this.invoice.items[index].price = prod.length ? prod[0].price : 0;
                }
            });
        }
        this.calcTotal();
    }

    private applyDiscount() {
        this.invoice.total = +(this.invoice.total - this.invoice.total * this.invoice.discount * 0.01).toFixed(2);
    }

    private checkInput() {
        return (
            this.invoice.customer_id > -1 &&
            this.tmpProduct.product_id > -1 &&
            this.tmpProduct.quantity > 0
        );
    }

    private getCustomersAndProductsHandler() {
        return (res) => { // [0] - customers array, [1] - products array
            this.productsList = res[1];
            this.productsList.unshift({
                name: 'Add Product',
                id: -1,
                price: 0
            });

            const currentCustomer = res[0].filter((customer: Customer) => customer.id === this.invoice.customer_id);
            this.customersList = res[0].filter((customer: Customer) => customer.id !== this.invoice.customer_id);
            this.customersList.unshift(currentCustomer[0]);

            this.addFieldsToInvoiceItems();
        };
    }

    private getInvoiceHandler(res: Invoice) {
        this.invoice = {...this.invoice, ...res};
    }

    private getInvoiceItemsHandler(res: InvoiceItem[]) {
        this.invoice.items = [...this.invoice.items, ...res];
    }

    private getMergedInvoicesAndCustomers(id) {
        return this.invoiceService.getInvoices(id).mergeMap((res: Invoice) => {
            this.getInvoiceHandler(res);
            return this.customerService.getCustomers();
        });
    }

    private getMergedInvoiceItemsAndProducts(id) {
        return this.invoiceItemsService.getInvoiceItems(id).mergeMap((res: InvoiceItem[]) => {
            this.getInvoiceItemsHandler(res);
            return this.productService.getProducts();
        });
    }

    private getHttpParamsHandler() {
        return (params) => {
            this.getDataSubscription = zip(
                this.getMergedInvoicesAndCustomers(params.get('id')),
                this.getMergedInvoiceItemsAndProducts(params.get('id'))
            ).subscribe(this.getCustomersAndProductsHandler());
        };
    }

    private deleteInvoiceItems() {
        this.invoiceItemsToRemove.forEach(item => {
            this.deleteInvoiceItemsSubscriptions.push(this.invoiceItemsService.deleteInvoiceItem(this.invoice.id, item.id)
                .subscribe(res => console.log(res)));
        });
    }

    private saveInvoice() {
        if (this.invoiceItemsToRemove.length) {
            this.deleteInvoiceItems();
        }
        this.saveInvoiceSubscription = this.invoiceService.editInvoice(this.invoice).subscribe(res => {
            const dialogRef = this.openDialog({ id: this.invoice.id, mode: 'invoiceEdited'});
            this.modalDialogSubscription = dialogRef.afterClosed().subscribe(() => {
                this.saveInvoiceSubscription.unsubscribe();
                this.modalDialogSubscription.unsubscribe();
                this.router.navigate(['invoices']);
            });
        });
    }

    private openDialog(data) {
        return this.dialog.open(ModalDialogComponent, {
            width: '235px',
            data: data
        });
    }

    ngOnInit() {
        this.getHttpParamsSubscription = this.route.paramMap.subscribe(this.getHttpParamsHandler());
    }

    ngOnDestroy() {
        this.getDataSubscription.unsubscribe();
        if (this.deleteInvoiceItemsSubscriptions.length) {
            this.deleteInvoiceItemsSubscriptions.forEach(subscriptionItem => subscriptionItem.unsubscribe());
        }
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

    selectProductHandler(event) {
        const product: Product[] = this.productsList.filter(item => item.id === Number(event.target.value));
        this.tmpProduct.price = product[0].price;
        this.tmpProduct.name = product[0].name;
        this.calcTotal();
    }

    selectCustomerHandler(event) {
        const customer: Customer[] = this.customersList.filter(item => item.id === +event.target.value);
        this.invoice.customer_id = customer[0].id;
        this.calcTotal();
    }

    saveInvoiceButtonHandler() {
        if (this.invoice.items.length) {
            this.invoice.items.forEach((item: InvoiceItem) => {
                this.saveInvoiceItemsObservables.push(this.invoiceItemsService.updateInvoiceItem(this.invoice.id, item));
            });

            const zip$ = (array$) => zip(...array$);

            this.saveInvoiceItemsSubscription = zip$(this.saveInvoiceItemsObservables).subscribe(res => {
                this.saveInvoice();
                this.saveInvoiceItemsSubscription.unsubscribe();
            });
        } else {
            this.saveInvoice();
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

    removeInvoiceItemButtonHandler(itemId) {
        const dialogRef = this.openDialog({ id: this.invoice.id, mode: 'removeItemFromInvoiceItems'});
        this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const toRemove = this.invoice.items.filter(item => item.id === itemId);
                this.invoiceItemsToRemove.push(toRemove[0]);
                this.invoice.items = this.invoice.items.filter(item => item.id !== itemId);
                this.calcTotal();
            }
            this.modalDialogSubscription.unsubscribe();
        });
    }

    changeQuantityHandler(operation) {
        if (operation === '++') {
            this.tmpProduct.quantity++;
        } else if (operation === '--' && this.tmpProduct.quantity > 0) {
            this.tmpProduct.quantity--;
        }
        this.calcTotal();
    }
}

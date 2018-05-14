import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    editInvoiceSubscription: Subscription;

    setInvoiceItemsSubscription: Subscription;
    deleteInvoiceItemsSubscription: Subscription;

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
    @ViewChild('discount') discount: ElementRef;
    @ViewChild('customer') customer: ElementRef;
    @ViewChild('product') product: ElementRef;
    @ViewChild('quantity') quantity: ElementRef;
    @ViewChild('price') price: ElementRef;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private invoiceService: InvoiceService,
        private invoiceItemsService: InvoiceItemsService,
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
            this.customer.nativeElement.value !== '' &&
            this.product.nativeElement.value !== '' &&
            +this.quantity.nativeElement.value > 0
        );
    }

    private getCustomersAndProductsHandler() {
        return (res) => { // [0] - customers array, [1] - products array
            this.productsList = res[1];
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

    private getEditInvoiceResponseHandler() {
        return (res) => {
            const dialogRef = this.openDialog({ id: this.invoice.id, mode: 'invoiceEdited'});
            this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.editInvoiceSubscription.unsubscribe();
                }
                this.modalDialogSubscription.unsubscribe();
            });
        };
    }

    private updateInvoiceItems() {
        const invoiceItem = this.invoice.items[this.invoice.items.length - 1];
        delete invoiceItem['name'];
        delete invoiceItem['price'];
        this.setInvoiceItemsSubscription = this.invoiceItemsService.updateInvoiceItem(this.invoice.id, invoiceItem)
            .subscribe(res => {
                this.addFieldsToInvoiceItems();
                this.setInvoiceItemsSubscription.unsubscribe();
            });
    }

    private deleteInvoiceItems(itemID) {
        this.deleteInvoiceItemsSubscription = this.invoiceItemsService.deleteInvoiceItem(this.invoice.id, itemID)
            .subscribe(res => {
                this.deleteInvoiceItemsSubscription.unsubscribe();
            });
    }

    ngOnInit() {
        this.getHttpParamsSubscription = this.route.paramMap.subscribe(this.getHttpParamsHandler());
    }

    ngOnDestroy() {
        this.getDataSubscription.unsubscribe();
    }

    openDialog(data) {
        return this.dialog.open(ModalDialogComponent, {
            width: '235px',
            data: data
        });
    }

    selectProductHandler(e) {
        const product: Product[] = this.productsList.filter(item => item.id === +e.target.value);
        this.price.nativeElement.value = product[0].price;
        this.calcTotal();
    }

    selectCustomerHandler(e) {
        const customer: Customer[] = this.customersList.filter(item => item.id === +e.target.value);
        this.invoice.customer_id = customer[0].id;
        this.calcTotal();
    }

    calcTotal() {
        if (!this.invoice.items || this.invoice.items.length === 0) {
            this.invoice.total = +this.price.nativeElement.value * +this.quantity.nativeElement.value;
        } else if (this.invoice.items.length === 1) {
            this.invoice.total = +this.invoice.items[0].quantity * +this.invoice.items[0].price;
        } else {
            this.invoice.total = 0;
            this.invoice.items.forEach(item => this.invoice.total += +item.quantity * +item.price);
        }
        this.applyDiscount();
    }

    saveInvoiceButtonHandler() {
        this.editInvoiceSubscription = this.invoiceService.editInvoice(this.invoice).subscribe(this.getEditInvoiceResponseHandler());
    }

    addInvoiceItemButtonHandler() {
        if (this.checkInput()) {
            this.invoice.items.push({
                invoice_id: +this.invoice.id,
                product_id: +this.product.nativeElement.value,
                quantity: +this.quantity.nativeElement.value,
                name: this.product.nativeElement.options[this.product.nativeElement.selectedIndex].text,
                price: +this.price.nativeElement.value
            });
            this.updateInvoiceItems();
        }
        this.calcTotal();
    }

    removeInvoiceItemButtonHandler(itemID) {
        const dialogRef = this.openDialog({ id: this.invoice.id, mode: 'removeItemFromInvoiceItems'});
        this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.invoice.items = this.invoice.items.filter(item => item.id !== itemID);
                this.calcTotal();
                this.deleteInvoiceItems(itemID);
            }
            this.modalDialogSubscription.unsubscribe();
        });
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

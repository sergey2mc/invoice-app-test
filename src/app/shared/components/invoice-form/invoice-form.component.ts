import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { InvoiceItem } from '../../interfaces/invoiceItem.interface';
import { Invoice } from '../../interfaces/invoices.interface';
import { Customer } from '../../interfaces/customers.interface';
import { Product } from '../../interfaces/products.interface';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {

  getProductsSubscription: Subscription;
  getCustomersSubscription: Subscription;
  addInvoiceSubscription: Subscription;
  modalDialogSubscription: Subscription;

  @Input('mode') mode: string;
  @Input('customersList') customersList: Customer[];
  @Input('productsList') productsList: Product[];
  @Input('tmpProduct') tmpProduct: InvoiceItem;
  @Input('invoiceItemsToRemove') invoiceItemsToRemove: InvoiceItem[];
  @Input('invoice') invoice: Invoice;

  constructor(public dialog: MatDialog) {}

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

  private openDialog(data) {
    return this.dialog.open(ModalDialogComponent, {
      width: '235px',
      data: data
    });
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
    if (this.mode === 'new') {
      this.invoice.items = this.invoice.items.filter(item => item.product_id !== productId);
      this.calcTotal();
    } else if (this.mode === 'edit') {
      const dialogRef = this.openDialog({ id: this.invoice.id, mode: 'removeItemFromInvoiceItems'});
      this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const toRemove = this.invoice.items.filter(item => item.product_id === productId);
          this.invoiceItemsToRemove.push(toRemove[0]);
          this.invoice.items = this.invoice.items.filter(item => item.product_id !== productId);
          this.calcTotal();
        }
        this.modalDialogSubscription.unsubscribe();
      });
    }
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
    if (this.mode === 'new') {
      if (operation === '++' && this.invoice.discount < 50) {
        this.invoice.discount++;
      } else if (operation === '--' && this.invoice.discount > 0) {
        this.invoice.discount--;
      }
      this.calcTotal();
    }
  }
}

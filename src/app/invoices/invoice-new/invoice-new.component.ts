import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
import { InvoiceItem } from '../../shared/interfaces/invoiceItem.interface';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-invoice-new',
	templateUrl: './invoice-new.component.html',
	styleUrls: ['./invoice-new.component.scss'],
})
export class InvoiceNewComponent {

	productsList$;
	customersList$;
	addInvoiceSubscription: Subscription;
	modalDialogSubscription: Subscription;

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
	) {
		this.productsList$ = this.productService.getProducts();
		this.customersList$ = this.customerService.getCustomers();
	}

	private openDialog(data) {
		return this.dialog.open(ModalDialogComponent, {
			width: '235px',
			data: data
		});
	}

	saveInvoiceButtonHandler() {
		if (this.invoice.items.length) {
			this.addInvoiceSubscription = this.invoiceService.addInvoice(this.invoice).subscribe(
				(res: Invoice) => {
					this.invoice.id = res.id;
					const dialogRef = this.openDialog({id: res.id, mode: 'invoiceCreated'});
					this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
						if (result) {
							this.addInvoiceSubscription.unsubscribe();
							this.invoiceService.clearCache();
							this.router.navigate(['invoices']);
						}
						this.modalDialogSubscription.unsubscribe();
					});
				}
			);
		}
	}
}

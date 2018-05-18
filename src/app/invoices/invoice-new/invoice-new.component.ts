import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component';
import { InvoiceItem } from '../../core/interfaces/invoiceItem.interface';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { Product } from '../../core/interfaces/product.interface';
import { Customer } from '../../core/interfaces/customer.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/from';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-invoice-new',
	templateUrl: './invoice-new.component.html',
	styleUrls: ['./invoice-new.component.scss'],
})
export class InvoiceNewComponent implements OnInit{

	invoice$: BehaviorSubject<Invoice>;
	productsList$: Observable<Product[]>;
	customersList$: Observable<Customer[]>;

	invoiceData = {
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
		this.invoice$ = new BehaviorSubject(this.invoiceData);
		this.productsList$ = this.productService.getProducts();
		this.customersList$ = this.customerService.getCustomers();
	}

	ngOnInit() {

	}

	// private openDialog(data) {
	// 	return this.dialog.open(ModalDialogComponent, {
	// 		width: '235px',
	// 		data: data
	// 	});
	// }

	// saveInvoiceButtonHandler() {
	// 	if (this.invoice.items.length) {
	// 		this.addInvoiceSubscription = this.invoiceService.addInvoice(this.invoice).subscribe(
	// 			(res: Invoice) => {
	// 				this.invoice.id = res.id;
	// 				const dialogRef = this.openDialog({id: res.id, mode: 'invoiceCreated'});
	// 				this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
	// 					if (result) {
	// 						this.addInvoiceSubscription.unsubscribe();
	// 						this.invoiceService.clearCache();
	// 						this.router.navigate(['invoices']);
	// 					}
	// 					this.modalDialogSubscription.unsubscribe();
	// 				});
	// 			}
	// 		);
	// 	}
	// }
}

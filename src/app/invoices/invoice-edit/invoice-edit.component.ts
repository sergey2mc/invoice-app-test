import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { Customer } from '../../core/interfaces/customer.interface';
import { Product } from '../../core/interfaces/product.interface';
import { InvoiceItem } from '../../core/interfaces/invoiceItem.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';


@Component({
	selector: 'app-invoice-edit',
	templateUrl: './invoice-edit.component.html',
	styleUrls: ['./invoice-edit.component.scss'],
})
export class InvoiceEditComponent implements OnInit, OnDestroy {

	dataStream$;
	productsList$;
	customersList$;

	getHttpParamsSubscription: Subscription;
	getDataSubscription: Subscription;
	productsSubscriptions: Subscription[] = [];
	saveInvoiceSubscription: Subscription;

	saveInvoiceItemsObservables: Observable<InvoiceItem | InvoiceItem[]>[] = [];
	saveInvoiceItemsSubscription: Subscription;
	deleteInvoiceItemsSubscriptions: Subscription[] = [];

	modalDialogSubscription: Subscription;

	customersList: Customer[] = [];
	productsList: Product[] = [];
	invoiceItemsToRemove: InvoiceItem[] = [];

	invoice: Invoice = {
		id: 0,
		customer_id: 0,
		discount: 0,
		total: 0,
		items: []
	};

	tmpProduct: InvoiceItem = {
		invoice_id: 0,
		product_id: -1,
		quantity: 0,
		product: {
			name: '',
			price: 0
		}
	};

	constructor(
		private customerService: CustomerService,
		private productService: ProductService,
		private invoiceService: InvoiceService,
		private invoiceItemsService: InvoiceItemsService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.productsList$ = this.productService.getProducts();
		this.customersList$ = this.customerService.getCustomers();
	}

	private addFieldsToInvoiceItems() {
		return () => {
			if (this.invoice.items && this.invoice.items.length) {
				this.invoice.items.forEach((item: InvoiceItem, index: number) => {
					if (!this.invoice.items[index].product.name) {
						this.productsSubscriptions.push(this.productsList$
							.map((res: Product[]) => res.filter((product: Product) => product.id === item.product_id))
							.subscribe(
								(res: Product[]) => {
									this.invoice.items[index].product.name = res.length ? res[0].name : '';
									this.invoice.items[index].product.price = res.length ? res[0].price : 0;
								},
								console.error
							));
					}
				});
			}
		}
	}

	private invoiceHandler(res) {
		this.invoice = <Invoice>{...this.invoice, ...res};
	}

	private invoiceItemsHandler(res) {
		this.invoice.items = <InvoiceItem[]>[...this.invoice.items, ...res];
		console.log(this.invoice.items)
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
		this.saveInvoiceSubscription = this.invoiceService.updateInvoice(this.invoice).subscribe(res => {
			this.invoiceService.clearCache();
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
		this.getHttpParamsSubscription = this.route.params.pluck('id')
			.switchMap((id: number) => {
				return zip(
					this.invoiceService.getInvoice(id),
					this.invoiceItemsService.getInvoiceItems(id)
				)
			})
			.map(([invoices, invoiceItems]) => {
				this.invoiceHandler(invoices);
				this.invoiceItemsHandler(invoiceItems);
				return null;
			})
			.subscribe(
				this.addFieldsToInvoiceItems,
				console.error,
				() => this.getHttpParamsSubscription.unsubscribe()
			);
	}

	ngOnDestroy() {
		if (this.deleteInvoiceItemsSubscriptions.length) {
			this.deleteInvoiceItemsSubscriptions.forEach((item: Subscription) => item.unsubscribe());
		}
		if (this.productsSubscriptions.length) {
			this.productsSubscriptions.forEach((item: Subscription) => item.unsubscribe());
		}
	}

	saveInvoiceButtonHandler() {
		if (this.invoice.items.length) {
			this.invoice.items.forEach((item: InvoiceItem) => {
				this.saveInvoiceItemsObservables.push(this.invoiceItemsService.updateInvoiceItem(this.invoice.id, item));
			});

			const zip$ = (array$) => zip(...array$);

			this.saveInvoiceItemsSubscription = zip$(this.saveInvoiceItemsObservables).subscribe(
				() => this.saveInvoice(),
				console.error,
			() => this.saveInvoiceItemsSubscription.unsubscribe());
		} else {
			this.saveInvoice();
		}
	}
}

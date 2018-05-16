import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
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
import 'rxjs/add/operator/map';

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
		name: '',
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
	) {
		this.productsList$ = this.productService.getProducts();
		this.customersList$ = this.customerService.getCustomers();
	}

	private addFieldsToInvoiceItems() {
		if (this.invoice.items && this.invoice.items.length) {
			this.invoice.items.forEach((item: InvoiceItem, index: number) => {
				if (!this.invoice.items[index].name) {
					this.productsSubscriptions.push(this.productsList$
						.map((res: Product[]) => res.filter((product: Product) => product.id === item.product_id))
						.subscribe(
							(res: Product[]) => {
								this.invoice.items[index].name = res.length ? res[0].name : '';
								this.invoice.items[index].price = res.length ? res[0].price : 0;
							},
							console.error
						));
				}
			});
		}
	}

	private invoiceHandler(res) {
		this.invoice = <Invoice>{...this.invoice, ...res};
	}

	private invoiceItemsHandler(res) {
		this.invoice.items = <InvoiceItem[]>[...this.invoice.items, ...res];
	}

	private getHttpParamsHandler() {
		return (params) => {
			this.dataStream$ = zip(
				this.invoiceService.getInvoices(params.get('id')),
				this.invoiceItemsService.getInvoiceItems(params.get('id'))
			).map(res => {
				this.invoiceHandler(res[0]);
				this.invoiceItemsHandler(res[1]);
				return res;
			});

			this.getDataSubscription = this.dataStream$.subscribe(
				() => this.addFieldsToInvoiceItems(),
				console.error,
				() => this.getDataSubscription.unsubscribe());
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
		this.getHttpParamsSubscription = this.route.paramMap.subscribe(this.getHttpParamsHandler());
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

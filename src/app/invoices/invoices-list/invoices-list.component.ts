import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { ModalDialogComponent } from '../../shared/modal-dialog/modal-dialog.component';
import { Customer } from '../../core/interfaces/customer.interface';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { LoaderService } from '../../core/services/loader.service';


@Component({
	selector: 'app-invoices-list',
	templateUrl: './invoices-list.component.html',
	styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit, OnDestroy {

	loaderEnabled$: Observable<boolean>;
	invoicesList$: BehaviorSubject<Invoice[]> = new BehaviorSubject([]);
	deleteInvoice$: Subject<number> = new Subject();
	invoicesListSubscription: Subscription;
	deleteInvoicesSubscription: Subscription;
	modalDialogSubscription: Subscription;

	displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];

	constructor(
		private loaderService: LoaderService,
		private invoiceService: InvoiceService,
		private customerService: CustomerService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.loaderEnabled$ = loaderService.loaderEnabled$;
	}

	private openDialog(data) {
		return this.dialog.open(ModalDialogComponent, {
			width: '235px',
			data: data
		});
	}

	ngOnInit() {
		this.invoicesListSubscription = Observable.combineLatest(
				this.invoiceService.getInvoices(),
				this.customerService.getCustomers()
			)
			.map(([invoices, customers]: [Invoice[], Customer[]]) => {
				return invoices.map((invoice: Invoice) => ({...invoice, customer: customers.find(customer => customer.id === invoice.customer_id)}));
			})
			.subscribe((invoices: Invoice[]) => this.invoicesList$.next(invoices));

		this.deleteInvoicesSubscription = this.deleteInvoice$
			.switchMap(id => this.invoiceService.deleteInvoice(id))
			.withLatestFrom(this.invoicesList$)
			.map(([delInvoice, invoices]) => delInvoice ? invoices.filter(invoice => invoice.id !== delInvoice.id) : invoices)
			.subscribe((invoices: Invoice[]) => this.invoicesList$.next(invoices))
	}

	ngOnDestroy() {
		this.invoicesListSubscription.unsubscribe();
		this.deleteInvoicesSubscription.unsubscribe();
  }

	viewButtonHandler(invoice: Invoice) {
		this.router.navigate([`invoices/view/`, invoice.id]);
	}

	editButtonHandler(invoice: Invoice) {
		this.router.navigate([`invoices/edit/`, invoice.id]);
	}

	deleteButtonHandler(invoice: Invoice) {
		const dialogRef = this.openDialog({ id: invoice.id, mode: 'deleteInvoiceFromInvoicesList'});
		this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.loaderService.show();
				this.deleteInvoice$.next(invoice.id);
			}
			this.modalDialogSubscription.unsubscribe();
		});
	}
}

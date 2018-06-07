import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { Customer } from '../../core/interfaces/customer.interface';
import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';

import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalMessages } from '../../shared/modal/modal-messages';


@Component({
	selector: 'app-invoices-list',
	templateUrl: './invoices-list.component.html',
	styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit, OnDestroy {

	invoicesList$: Observable<Invoice[]>;
	deleteInvoice$: Subject<number> = new Subject();
	invoicesListSubscription: Subscription;
	deleteInvoicesSubscription: Subscription;
	modalDialogSubscription: Subscription;

	displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];

	constructor(
		private invoiceService: InvoiceService,
		private customerService: CustomerService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.invoicesList$ = Observable.combineLatest(
				this.invoiceService.allInvoices$,
				this.customerService.allCustomers$
			)
			.map(([invoices, customers]: [Invoice[], Customer[]]) => {
				return invoices.map((invoice: Invoice) => ({...invoice, customer: customers.find(customer => customer.id === invoice.customer_id)}));
			});

		this.deleteInvoicesSubscription = this.deleteInvoice$
			.switchMap(id => this.invoiceService.deleteInvoice(id))
			.subscribe(
				(delInvoice: Invoice) => this.openDialog({ id: delInvoice.id, message: ModalMessages.INFO_INVOICE_DELETED }),
				() => this.openDialog({ mode: ModalMessages.ERROR_INVOICE_DELETE })
			);
	}

	ngOnDestroy() {
		this.deleteInvoicesSubscription.unsubscribe();
  }

	viewButtonHandler(invoice: Invoice) {
		this.router.navigate([`invoices/view/`, invoice.id]);
	}

	editButtonHandler(invoice: Invoice) {
		this.router.navigate([`invoices/edit/`, invoice.id]);
	}

	deleteButtonHandler(invoice: Invoice) {
		const dialogRef = this.openDialog({ id: invoice.id, message: ModalMessages.ASK_INVOICE_DELETE});
		this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteInvoice$.next(invoice.id);
			}
			this.modalDialogSubscription.unsubscribe();
		});
	}

	private openDialog(data) {
		return this.dialog.open(ModalComponent, {
			width: '235px',
			data: data
		});
	}
}

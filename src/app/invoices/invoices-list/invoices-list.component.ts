import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceService } from '../../core/services/invoice.service';
import { LoaderService } from '../../core/services/loader.service';

import { ModalMessageTypes } from '../../shared/modal/modal-message-types';
import { openDialog } from '../../shared/open-dialog';


@Component({
	selector: 'app-invoices-list',
	templateUrl: './invoices-list.component.html',
	styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit, OnDestroy {

	invoicesList$: Observable<Invoice[]>;
	deleteInvoice$: Subject<number> = new Subject();
	deleteInvoicesSubscription: Subscription;
	modalDialogSubscription: Subscription;

	displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];

	constructor(
		private invoiceService: InvoiceService,
		private loader: LoaderService,
		private router: Router,
		public dialog: MatDialog
	) {}

	ngOnInit() {

		this.invoicesList$ = this.invoiceService.allInvoices$;

		this.deleteInvoicesSubscription = this.deleteInvoice$
			.switchMap(id => this.invoiceService.deleteInvoice(id))
			.subscribe(
				(delInvoice: Invoice) => {
					openDialog(this.dialog, {id: delInvoice.id, message: ModalMessageTypes.INFO_INVOICE_DELETED});
					this.loader.hide();
				},
				() => openDialog(this.dialog, {message: ModalMessageTypes.ERROR_INVOICE_DELETE})
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
		const dialogRef = openDialog(this.dialog, {id: invoice.id, message: ModalMessageTypes.ASK_INVOICE_DELETE});
		this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.loader.show();
				this.deleteInvoice$.next(invoice.id);
			}
			this.modalDialogSubscription.unsubscribe();
		});
	}
}

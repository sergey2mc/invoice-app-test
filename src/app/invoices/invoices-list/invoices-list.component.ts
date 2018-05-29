import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

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

	invoicesEmitter$: Subject<number> = new Subject();
	invoicesList$: ConnectableObservable<Invoice[]>;
	displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];

	deleteInvoice$: Subject<number> = new Subject();
	deleteInvoicesSubscription: Subscription;
	modalDialogSubscription: Subscription;

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
		this.invoicesList$ = this.invoicesEmitter$
			.switchMap((id: number) => {
				return combineLatest(
					this.route.snapshot.data.invoices,
					Observable.of(id)
				)
			})
			.map(([invoices, id]: [Invoice[], number]) => id ? invoices.filter((item: Invoice) => item.id !== id) : invoices)
			.publishReplay(1);
		this.invoicesList$.connect();
		this.invoicesEmitter$.next();

		this.deleteInvoicesSubscription = this.deleteInvoice$
      .switchMap(id => this.invoiceService.deleteInvoice(id))
      .subscribe(() => {
        this.invoiceService.getInvoices();
			})
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
		const dialogRef = this.openDialog({ id: invoice.id, mode: 'deleteInvoiceFromInvoicesList'});
		this.modalDialogSubscription = dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteInvoice$.next(invoice.id);
				this.invoicesEmitter$.next(invoice.id);
			}
			this.modalDialogSubscription.unsubscribe();
		});
	}
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Customer } from '../../shared/interfaces/customers.interface';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/observable/zip';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit {

    invoices$;
    displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];
    dataSource = new MatTableDataSource();
    deleteInvoicesSubscription: Subscription;
    modalDialogSubscription: Subscription;

    constructor(
        private invoiceService: InvoiceService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    private deleteInvoiceHandler() {
        return (response: Invoice) => {
            if (response['id']) {
                this.dataSource.data = this.dataSource.data.filter(item => item['id'] !== response.id);
                this.deleteInvoicesSubscription.unsubscribe();
            }
        };
    }

    private addCustomerNames(res) {
        const data = [];
        res[0].forEach((invoice: Invoice) => {
            data.push(invoice);
            const currentCustomer = res[1].filter((customer: Customer) => customer.id === invoice.customer_id);
            data[data.length - 1]['name'] = currentCustomer.length ? currentCustomer[0].name : '';
        });
        return data;
    }

    ngOnInit() {
        this.invoices$ = zip(
                this.route.snapshot.data.invoices,
                this.customerService.getCustomers()
            ).map(this.addCustomerNames);
    }

    openDialog(data) {
        return this.dialog.open(ModalDialogComponent, {
            width: '235px',
            data: data
        });
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
                this.deleteInvoicesSubscription = this.invoiceService.deleteInvoice(invoice.id).subscribe(this.deleteInvoiceHandler());
            }
            this.modalDialogSubscription.unsubscribe();
        });
    }
}

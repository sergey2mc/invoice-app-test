import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Customer } from '../../shared/interfaces/customers.interface';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
// import { invoicesData } from '../../mocks/invoices.mock';

@Component({
    selector: 'app-invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];
    dataSource = new MatTableDataSource();
    getInvoicesSubscription: Subscription;
    deleteInvoicesSubscription: Subscription;

    constructor(
        private invoiceService: InvoiceService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    private getInvoicesHandler(response: Invoice[]) {
        console.log(response);
        this.dataSource.data = response;
    }

    private getCustomersHandler() {
        return (response: Customer[]) => {
            console.log(response);
            this.dataSource.data.forEach((item: Invoice, index) => {
                const currentCustomer = response.filter(customer => customer.id === item.customer_id);
                this.dataSource.data[index]['name'] = currentCustomer.length ? currentCustomer[0].name : '';
            });
        };
    }

    private deleteInvoiceHandler() {
        return (response: Invoice) => {
            if (response['id']) {
                this.dataSource.data = this.dataSource.data.filter(item => item['id'] !== response.id);
                this.deleteInvoicesSubscription.unsubscribe();
            }
        };
    }

    ngOnInit() {
        console.log('Invoices-page');
        this.getInvoicesSubscription = this.route.snapshot.data.invoices.mergeMap((res: Invoice[]) => {
            this.getInvoicesHandler(res);
            return this.customerService.getCustomers();
        }).subscribe(this.getCustomersHandler());
    }

    ngOnDestroy() {
        this.getInvoicesSubscription.unsubscribe();
    }

    editButtonHandler(invoice: Invoice) {
        this.router.navigate([`invoices/edit/`, invoice.id]);
    }

    deleteButtonHandler(invoice: Invoice) {
        this.deleteInvoicesSubscription = this.invoiceService.deleteInvoice(invoice.id).subscribe(this.deleteInvoiceHandler());
    }
}

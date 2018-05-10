import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { invoicesData } from '../../mocks/invoices.mock';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Component({
    selector: 'app-invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];
    dataSource = new MatTableDataSource();
    subs: Subscription;

    constructor(private api: ApiService) {}

    ngOnInit() {
        console.log('Invoices-page');
        this.subs = this.api.invoices.get().subscribe(this.invoicesHandler.bind(this));
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    invoicesHandler(response: Invoice[]) {
        console.log(response);
        this.dataSource.data = response;
    }
}

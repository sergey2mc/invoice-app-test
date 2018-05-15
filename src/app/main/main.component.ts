import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../core/services/customer.service';
import { InvoiceService } from '../core/services/invoice.service';
import { Invoice } from '../shared/interfaces/invoices.interface';
import { Customer } from '../shared/interfaces/customers.interface';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
// import { invoicesData } from '../mocks/invoices.mock';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'discount', 'total', 'actions'];
  dataSource: MatTableDataSource<Invoice>;
  getInvoicesSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private invoicesService: InvoiceService,
    private router: Router
  ) {}

  private getInvoicesHandler(response: Invoice[]) {
    this.dataSource.data = response;
  }

  private getCustomersHandler() {
    return (response: Customer[]) => {
      if (this.dataSource.data) {
        this.dataSource.data.forEach((item: Invoice, index) => {
          const currentCustomer = response.filter(customer => customer.id === item.customer_id);
          this.dataSource.data[index]['name'] = currentCustomer.length ? currentCustomer[0].name : '';
        });
      }
    };
  }

  private formatResponse(res) {
      const data = [];
      res.forEach(item => {
          item.total = item.total.toFixed(2);
          data.push(item);
      });
      return data;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getInvoicesSubscription = this.invoicesService.getInvoices()
      .map(this.formatResponse)
      .mergeMap((res: Invoice[]) => {
        this.getInvoicesHandler(res);
        return this.customerService.getCustomers();
    }).subscribe(this.getCustomersHandler());
  }

  ngOnDestroy() {
    this.getInvoicesSubscription.unsubscribe();
  }

  viewButtonHandler(invoice: Invoice) {
    this.router.navigate([`invoices/view/`, invoice.id]);
  }
}

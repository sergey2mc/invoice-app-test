import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../interfaces/invoices.interface';
import { Customer } from '../../interfaces/customers.interface';
import { Product } from '../../interfaces/products.interface';

@Injectable()
export class ApiService {

    private url = 'http://api.invoice-app.2muchcoffee.com/api';

    constructor(private http: HttpClient) {}

    getInvoices(id: string | number = ''): Observable<Invoice[] | Invoice> {
        return this.http.get<Invoice[] | Invoice>(`${this.url}/invoices/${id}`);
    }

    getCustomers(id: string | number = ''): Observable<Customer[] | Customer> {
        return this.http.get<Customer[] | Customer>(`${this.url}/customers/${id}`);
    }

    getProducts(id: string | number = ''): Observable<Product[] | Product> {
        return this.http.get<Product[] | Product>(`${this.url}/products/${id}`);
    }

}

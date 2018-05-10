import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../shared/interfaces/invoices.interface';
import { Customer } from '../../shared/interfaces/customers.interface';
import { Product } from '../../shared/interfaces/products.interface';

@Injectable()
export class ApiService {

    private url = 'http://api.invoice-app.2muchcoffee.com/api';

    constructor(private http: HttpClient) {}

    customers = {
        get: (id: string | number = ''): Observable<Customer[] | Customer> => {
            return this.http.get<Customer[] | Customer>(`${this.url}/customers/${id}`);
        }
    };

    products = {
        get: (id: string | number = ''): Observable<Product[] | Product> => {
            return this.http.get<Product[] | Product>(`${this.url}/products/${id}`);
        }
    };

    invoices = {
        get: (id: string | number = ''): Observable<Invoice[] | Invoice> => {
            return this.http.get<Invoice[] | Invoice>(`${this.url}/invoices/${id}`);
        },
        add: (newInvoice: Invoice) => {
            const httpOptions = {
            headers: new HttpHeaders({
                    'Content-Type': 'text/plain'
                })
            };
            console.log(newInvoice)
            return this.http.post(`${this.url}/invoices`, newInvoice, httpOptions);
        }
    };
}

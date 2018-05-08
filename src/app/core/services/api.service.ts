import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../interfaces/invoices.interface';

@Injectable()
export class ApiService {

    private url = 'http://api.invoice-app.2muchcoffee.com/api';

    constructor(private http: HttpClient) {}

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(`${this.url}/invoices`);
    }
}

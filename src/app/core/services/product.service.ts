import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/interfaces/products.interface';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {}

    getProducts(id: string | number = ''): Observable<Product[] | Product> {
        return this.http.get<Product[] | Product>(`/products/${id}`);
    }
}

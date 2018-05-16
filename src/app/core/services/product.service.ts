import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/interfaces/products.interface';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class ProductService {

    allProducts$: Observable<Product[] | Product>;

    constructor(private http: HttpClient) {}

    getProducts(id: string | number = -1): Observable<Product[] | Product> {
        if (id > -1) {
            return this.http.get<Product[] | Product>(`/products/${id}`);
        } else {
            return this.allProducts$ = this.allProducts$ || this.http.get<Product[] | Product>(`/products`).shareReplay(1);
        }
    }
}

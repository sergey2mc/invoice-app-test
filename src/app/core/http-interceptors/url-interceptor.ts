import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    private url = 'http://api.invoice-app.2muchcoffee.com/api';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqEdited = req.clone({
            url: `${this.url}${req.url}`
        });
        return next.handle(reqEdited);
    }
}

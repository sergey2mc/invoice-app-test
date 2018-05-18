import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './url-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
];

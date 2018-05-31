import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UrlInterceptor } from './url-interceptor';


export const APP_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
];

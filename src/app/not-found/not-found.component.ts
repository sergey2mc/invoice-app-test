import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { LoaderService } from '../core/services/loader.service';
import { ErrorHandlerService } from '../core/services/error-handler.service';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {

	loaderEnabled$: Observable<boolean>;
	error$: Observable<HttpErrorResponse>;

	constructor(
		private loaderService: LoaderService,
		private errorService: ErrorHandlerService
	) {
		this.loaderEnabled$ = loaderService.loaderEnabled$;
		this.error$ = errorService.httpError$;
	}
}

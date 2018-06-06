import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from '../core/services/error-handler.service';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {

	error$: Observable<HttpErrorResponse>;

	constructor(private errorService: ErrorHandlerService) {
		this.error$ = errorService.httpError$;
	}
}

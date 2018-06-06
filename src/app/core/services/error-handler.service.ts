import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/empty';


@Injectable()
export class ErrorHandlerService {

	httpError$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(null);

	constructor(private router: Router) {}

	handleError<T>(error = null) {
		this.httpError$.next(error);
		this.router.navigate(['/not-found']);
		return Observable.empty<T>()
	}

}

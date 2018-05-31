import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LoaderService } from '../core/services/loader.service';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {

	loaderEnabled$: Observable<boolean>;

	constructor(private loaderService: LoaderService) {
		this.loaderEnabled$ = loaderService.loaderEnabled$;
	}
}

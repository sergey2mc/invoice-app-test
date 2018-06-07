import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LoaderService } from '../../core/services/loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {

	loaderEnabled$: Observable<boolean>;

	constructor(private loaderService: LoaderService) {
		this.loaderEnabled$ = loaderService.loaderEnabled$;
	}
}

import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { LoaderService } from './core/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router, private loader: LoaderService) {
		router.events.subscribe(e => {
			if (e instanceof NavigationStart) {
				loader.show();
			} else if (e instanceof NavigationEnd) {
				loader.hide();
			}
		});
  }

}

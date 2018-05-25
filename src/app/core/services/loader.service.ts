import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class LoaderService {

	loaderEnabled$: ConnectableObservable<boolean>;
	emitter$: Subject<boolean> = new Subject();

	constructor() {
		this.loaderEnabled$ = this.emitter$
			.distinctUntilChanged()
			.publishReplay(1);
		this.loaderEnabled$.connect();
	}

	show() {
		this.emitter$.next(true);
	}

	hide() {
		this.emitter$.next(false);
	}
}

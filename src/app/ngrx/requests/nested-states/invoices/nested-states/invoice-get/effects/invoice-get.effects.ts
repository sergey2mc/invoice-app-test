import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Invoice } from '../../../../../../../core/interfaces/invoice.interface';
import { InvoiceService } from '../../../../../../../core/services/invoice.service';
import { ActionTypes, GetInvoiceFailAction, GetInvoiceSuccessAction } from '../actions';


@Injectable()
export class InvoiceRequestsEffects {

	@Effect()
	invoiceGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET)
		.switchMap((action: Action) => this.invoiceService.getInvoiceRequest(action['payload']))
		.map((invoice: Invoice) => new GetInvoiceSuccessAction(invoice))
		.catch((error) => Observable.of(new GetInvoiceFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceService: InvoiceService
	) {}
}

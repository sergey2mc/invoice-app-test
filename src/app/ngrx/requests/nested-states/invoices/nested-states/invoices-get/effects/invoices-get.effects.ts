import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { InvoiceService } from '../../../../../../../core/services/invoice.service';
import { ActionTypes, GetInvoicesSuccessAction, GetInvoicesFailAction } from '../actions';


@Injectable()
export class InvoicesRequestsEffects {

	@Effect()
	invoicesGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET_LIST)
		.switchMap(() => this.invoiceService.getInvoicesRequest())
		.map((invoices) => new GetInvoicesSuccessAction(invoices))
		.catch((error) => Observable.of(new GetInvoicesFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceService: InvoiceService
	) {}
}

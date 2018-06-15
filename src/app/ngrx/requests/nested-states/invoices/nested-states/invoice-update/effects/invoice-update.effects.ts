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
import { ActionTypes, UpdateInvoiceFailAction, UpdateInvoiceSuccessAction } from '../actions';


@Injectable()
export class InvoiceUpdateRequestsEffects {

	@Effect()
	invoiceUpdateRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.UPDATE)
		.switchMap((action: Action) => this.invoiceService.updateInvoiceRequest(action['payload']))
		.map((invoice: Invoice) => new UpdateInvoiceSuccessAction(invoice))
		.catch((error) => Observable.of(new UpdateInvoiceFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceService: InvoiceService
	) {}
}

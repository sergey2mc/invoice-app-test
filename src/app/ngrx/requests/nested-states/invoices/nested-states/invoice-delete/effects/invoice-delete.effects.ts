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
import { ActionTypes, DeleteInvoiceFailAction, DeleteInvoiceSuccessAction } from '../actions';


@Injectable()
export class InvoiceDeleteRequestsEffects {

	@Effect()
	invoiceDeleteRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.DELETE)
		.switchMap((action: Action) => this.invoiceService.deleteInvoiceRequest(action['payload']))
		.map((invoice: Invoice) => new DeleteInvoiceSuccessAction(invoice))
		.catch((error) => Observable.of(new DeleteInvoiceFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceService: InvoiceService
	) {}
}

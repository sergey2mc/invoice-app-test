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
import { ActionTypes, AddInvoiceFailAction, AddInvoiceSuccessAction } from '../actions';


@Injectable()
export class InvoiceAddRequestsEffects {

	@Effect()
	invoiceAddRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.ADD)
		.switchMap((action: Action) => this.invoiceService.addInvoiceRequest(action['payload']))
		.map((invoice: Invoice) => new AddInvoiceSuccessAction(invoice))
		.catch((error) => Observable.of(new AddInvoiceFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceService: InvoiceService
	) {}
}

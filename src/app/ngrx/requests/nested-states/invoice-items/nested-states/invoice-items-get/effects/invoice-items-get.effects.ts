import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item.interface';
import { InvoiceItemsService } from '../../../../../../../core/services/invoice-items.service';
import { ActionTypes, GetInvoiceItemsFailAction, GetInvoiceItemsSuccessAction } from '../actions';


@Injectable()
export class InvoiceItemsRequestsEffects {

	@Effect()
	invoiceItemsGetRequest: Observable<Action> = this.actions$
		.ofType(ActionTypes.GET_LIST)
		.switchMap((action: Action) => this.invoiceItemsService.getInvoiceItemsRequest(action['payload']))
		.map((invoiceItems: InvoiceItem[]) => new GetInvoiceItemsSuccessAction(invoiceItems))
		.catch((error) => Observable.of(new GetInvoiceItemsFailAction(error)));

	constructor(
		private actions$: Actions,
		private invoiceItemsService: InvoiceItemsService
	) {}
}

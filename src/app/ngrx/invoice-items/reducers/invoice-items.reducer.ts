import { IInvoiceItemState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { InvoiceItem } from '../../../core/interfaces/invoice-item.interface';


export function invoiceItemsReducer (state: IInvoiceItemState = initialState, {type, payload}: Actions): IInvoiceItemState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			(payload as InvoiceItem[]).forEach((invoiceItem: InvoiceItem) => entities = {...setEntities(entities, invoiceItem)});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		default: {
			return state;
		}
	}
}

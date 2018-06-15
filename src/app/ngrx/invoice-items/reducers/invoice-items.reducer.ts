import { IInvoiceItemState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { InvoiceItem } from '../../../core/interfaces/invoice-item.interface';


export function invoiceItemsReducer (state: IInvoiceItemState = initialState, {type, payload}: Actions): IInvoiceItemState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			entities = (payload as InvoiceItem[]).reduce((acc, product) => ({...acc, ...setEntities(entities, product)}), {});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		case ActionTypes.ADD_SUCCESS:
		case ActionTypes.UPDATE_SUCCESS: {
			let entities = {...state.entities};
			entities = {...setEntities(entities, payload)};
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds, invoiceItem: payload as InvoiceItem};
		}
		case ActionTypes.DELETE_SUCCESS: {
			const entities = {...state.entities};
			delete entities[(payload as InvoiceItem).id];
			const collectionIds = state.collectionIds.filter(id => id !== (payload as InvoiceItem).id);
			return {...state, entities, collectionIds, invoiceItem: payload as InvoiceItem};
		}
		default: {
			return state;
		}
	}
}

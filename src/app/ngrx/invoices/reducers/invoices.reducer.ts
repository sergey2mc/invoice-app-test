import { IInvoiceState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { Invoice } from '../../../core/interfaces/invoice.interface';


export function invoicesReducer (state: IInvoiceState = initialState, {type, payload}: Actions): IInvoiceState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			(payload as Invoice[]).forEach((invoice: Invoice) => entities = {...setEntities(entities, invoice)});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		case ActionTypes.GET_SUCCESS: {
			return {...state, invoice: payload};
		}
		default: {
			return state;
		}
	}
}
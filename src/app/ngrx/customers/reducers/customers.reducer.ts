import { ICustomerState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { Customer } from '../../../core/interfaces/customer.interface';


export function customersReducer (state: ICustomerState = initialState, {type, payload}: Actions): ICustomerState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			entities = (payload as Customer[]).reduce((acc, product) => ({...acc, ...setEntities(entities, product)}), {});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		default: {
			return state;
		}
	}
}

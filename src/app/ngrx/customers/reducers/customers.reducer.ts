import { ICustomerState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { Customer } from '../../../core/interfaces/customer.interface';


export function customersReducer (state: ICustomerState = initialState, {type, payload}: Actions): ICustomerState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			payload.forEach((customer: Customer) => entities = {...setEntities(entities, customer)});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		case ActionTypes.GET_SUCCESS: {
			return {...state, customer: payload};
		}
		default: {
			return state;
		}
	}
}

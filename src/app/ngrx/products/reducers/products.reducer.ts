import { IProductState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { Product } from '../../../core/interfaces/product.interface';


export function productsReducer (state: IProductState = initialState, {type, payload}: Actions): IProductState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			(payload as Product[]).forEach((product: Product) => entities = {...setEntities(entities, product)});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		case ActionTypes.GET_SUCCESS: {
			return {...state, product: payload};
		}
		default: {
			return state;
		}
	}
}

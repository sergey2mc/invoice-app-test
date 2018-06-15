import { IProductState, initialState } from '../states';
import { Actions, ActionTypes } from '../actions';
import { getIdsArrEntities, setEntities } from '../../utils';
import { Product } from '../../../core/interfaces/product.interface';


export function productsReducer (state: IProductState = initialState, {type, payload}: Actions): IProductState {
	switch (type) {
		case ActionTypes.GET_LIST_SUCCESS: {
			let entities = {...state.entities};
			entities = (payload as Product[]).reduce((acc, product) => ({...acc, ...setEntities(entities, product)}), {});
			const collectionIds = getIdsArrEntities(entities);
			return {...state, entities, collectionIds};
		}
		default: {
			return state;
		}
	}
}

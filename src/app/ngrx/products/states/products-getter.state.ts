import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';
import { IProductState } from './products.state';


const getProductsState = (state: AppState) => state.products;

export const getProductsEntities = createSelector(
	getProductsState,
	(state: IProductState) => state.entities
);

export const getProductsCollectionIds = createSelector(
	getProductsState,
	(state: IProductState) => state.collectionIds
);

export const getProducts = createSelector(
	getProductsEntities,
	getProductsCollectionIds,
	(entities, collectionIds) => collectionIds.filter(id => entities[id]).map(id => entities[id])
);

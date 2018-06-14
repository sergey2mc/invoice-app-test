import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';
import { ICustomerState } from './customers.state';


const getCustomersState = (state: AppState) => state.customers;

export const getCustomersEntities = createSelector(
	getCustomersState,
	(state: ICustomerState) => state.entities
);

export const getCustomersCollectionIds = createSelector(
	getCustomersState,
	(state: ICustomerState) => state.collectionIds
);

export const getCustomers = createSelector(
	getCustomersEntities,
	getCustomersCollectionIds,
	(entities, collectionIds) => collectionIds.filter(id => entities[id]).map(id => entities[id])
);

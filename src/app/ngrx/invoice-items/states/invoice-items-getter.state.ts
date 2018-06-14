import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';
import { IInvoiceItemState } from './invoice-items.state';


const getInvoiceItemsState = (state: AppState) => state.invoiceItems;

export const getInvoiceItemsEntities = createSelector(
	getInvoiceItemsState,
	(state: IInvoiceItemState) => state.entities
);

export const getInvoiceItemsCollectionIds = createSelector(
	getInvoiceItemsState,
	(state: IInvoiceItemState) => state.collectionIds
);

export const getInvoiceItems = createSelector(
	getInvoiceItemsEntities,
	getInvoiceItemsCollectionIds,
	(entities, collectionIds) => collectionIds.filter(id => entities[id]).map(id => entities[id])
);

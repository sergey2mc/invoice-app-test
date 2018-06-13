import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';
import { IInvoiceState } from './invoices.state';


const getInvoicesState = (state: AppState) => state.invoices;

export const getInvoicesEntities = createSelector(
	getInvoicesState,
	(state: IInvoiceState) => state.entities
);

export const getInvoicesCollectionIds = createSelector(
	getInvoicesState,
	(state: IInvoiceState) => state.collectionIds
);

export const getInvoice = createSelector(
	getInvoicesState,
	(state: IInvoiceState) => state.invoice
);

export const getInvoices = createSelector(
	getInvoicesEntities,
	getInvoicesCollectionIds,
	(entities, collectionIds) => collectionIds.filter(id => entities[id]).map(id => entities[id])
);

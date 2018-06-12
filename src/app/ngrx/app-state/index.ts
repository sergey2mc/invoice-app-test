import * as fromCustomers from '../customers/index';
import * as fromRequests from '../requests/index';


export interface AppState {
	readonly customers: fromCustomers.ICustomerState;
	readonly requests: fromRequests.IRequestsState;
}

export const reducers = {
	customers: fromCustomers.customersReducer,
	requests: fromRequests.requestsReducer
};

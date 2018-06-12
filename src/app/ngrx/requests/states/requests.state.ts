import { ICustomersState } from '../nested-states/customers/states';


export interface IRequestsState {
	customersState?: ICustomersState;
}

export const requestsInitialState: IRequestsState = {};

import { ICustomersGetState } from '../nested-states/customers-get/states';

export interface ICustomersState {
	customersGetState?: ICustomersGetState;
}

export const customersInitialState: ICustomersState = {};

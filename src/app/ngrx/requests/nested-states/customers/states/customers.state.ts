import { ICustomerGetState } from '../nested-states/customer-get/states';
import { ICustomersGetState } from '../nested-states/customers-get/states';

export interface ICustomersState {
	customerGetState?: ICustomerGetState;
	customersGetState?: ICustomersGetState;
}

export const customersInitialState: ICustomersState = {};

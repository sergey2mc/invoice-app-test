import { Customer } from '../../../../../../../core/interfaces/customer.interface';


export interface ICustomerGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Customer;
}

export const customerInitialState: ICustomerGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

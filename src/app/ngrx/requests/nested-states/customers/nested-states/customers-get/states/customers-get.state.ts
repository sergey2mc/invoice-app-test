import { Customer } from '../../../../../../../core/interfaces/customer.interface';


export interface ICustomersGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Customer[];
}

export const customersInitialState: ICustomersGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

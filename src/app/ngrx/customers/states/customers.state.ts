import { Customer } from '../../../core/interfaces/customer.interface';


export interface ICustomerState {
	entities: {[index: number]: Customer};
	collectionIds: number[];
}

export const initialState: ICustomerState = {
	entities: {},
	collectionIds: []
};
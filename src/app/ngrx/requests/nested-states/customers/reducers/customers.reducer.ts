import { customersInitialState, ICustomersState } from '../states';
import { customerGetReducer } from '../nested-states/customer-get/reducers';
import { customersGetReducer } from '../nested-states/customers-get/reducers';


export function customersReducer(state: ICustomersState = customersInitialState, action): ICustomersState {
	return {
		customersGetState: customersGetReducer(state.customersGetState, action),
		customerGetState: customerGetReducer(state.customerGetState, action)
	};
}

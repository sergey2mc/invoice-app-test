import { customersInitialState, ICustomersState } from '../states';
import { customersGetReducer } from '../nested-states/customers-get/reducers';


export function customersReducer(state: ICustomersState = customersInitialState, action): ICustomersState {
	return {
		customersGetState: customersGetReducer(state.customersGetState, action)
	};
}

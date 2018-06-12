import { IRequestsState, requestsInitialState } from '../states/requests.state';
import { customersReducer } from '../nested-states/customers/reducers';


export function requestsReducer(state: IRequestsState = requestsInitialState, action): IRequestsState {
	return {
		customersState: customersReducer(state.customersState, action)
	};
}

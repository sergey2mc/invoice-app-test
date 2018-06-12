import {Subscription} from 'rxjs/Subscription';

/**
 * Unsubscribes all subscriptions from object with them
 * @param {{[p: string]: Subscription}} subscriptions
 */
export function unsubscribeAll(subscriptions: {[property: string]: Subscription}): void {
	for (const key in subscriptions) {
		if (typeof subscriptions[key].unsubscribe !== undefined) {
			subscriptions[key].unsubscribe();
		}
	}
}

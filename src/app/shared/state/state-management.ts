import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';

interface Entity<T> {
	[index: number]: T;
}

export enum Actions {
	Get = 'GET',
	Add = 'ADD',
	Update = 'UPDATE',
	Delete = 'DELETE',
	GetList = 'GET_ALL'
}

export class StateManagement<T> {

	entities$: Observable<Entity<T>>;
	collectionIds$: Observable<number[]>;

	entityIdGet$: Observable<number>;
	entityIdAdd$: Observable<number>;
	entityIdUpdate$: Observable<number>;

	get$: Subject<Observable<T>> = new Subject();
	add$: Subject<Observable<T>> = new Subject();
	update$: Subject<Observable<T>> = new Subject();
	delete$: Subject<Observable<T>> = new Subject();
	getList$: Subject<Observable<T[]>> = new Subject();

	getData$: Observable<T>;
	addData$: Observable<T>;
	updateData$: Observable<T>;
	deleteData$: Observable<T>;
	getListData$: Observable<T[]>;

	request$: Observable<{response: T[], type: Actions}>;
	response$: ConnectableObservable<{response: T[], type: Actions}>;

	constructor() {

		/**
		 * Merging observable data and making subjects WARM
		 * @type Observable<Observable<T>> => Observable<T>
		 */
		this.getData$ = this.get$.mergeAll().share();
		this.addData$ = this.add$.mergeAll().share();
		this.updateData$ = this.update$.mergeAll().share();
		this.deleteData$ = this.delete$.mergeAll().share();
		this.getListData$ = this.getList$.mergeAll().share();

		/**
		 * Merging observables, that are emited by subjects and refactoring emited data's format
		 * @type <Observable<T>> => Observable<{response: T[], type: Actions}>
		 */
		this.request$ = Observable.merge(
				this.getData$.map(res => ({response: [res], type: Actions.Get})),
				this.addData$.map(res => ({response: [res], type: Actions.Add})),
				this.updateData$.map(res => ({response: [res], type: Actions.Update})),
				this.deleteData$.map(res => ({response: [res], type: Actions.Delete})),
				this.getListData$.map(res => ({response: res, type: Actions.GetList}))
			)
			.share();

		/**
		 * Making merged observable HOT
		 */
		this.response$ = this.request$
			.publish();
		this.response$.connect();

		/**
		 * calc entities after every action has been happened
		 * Observable<{response: T[], type: Actions}> => Observable<Entity<T>>
		 */
		this.entities$ = this.response$
			.scan((acc: Entity<T>, data: {response: T[], type: Actions}) => {
				switch (data.type) {
					case Actions.Get:
					case Actions.Add:
					case Actions.Update:
					case Actions.GetList: return {...acc, ...this.getEntities(data.response)};
					case Actions.Delete: {
						const accClone = acc;
						delete accClone[data.response[0]['id']];
						return accClone;
					}
					default: return acc;
				}
			}, {});
			// .do(data => console.log('Entities...', data));

		/**
		 * Calc collection IDs after every action has been happened
		 * @type Observable<{response: T[], type: Actions}> => Observable<number[]>
		 */
		this.collectionIds$ = this.response$
			.scan((acc: number[], data: {response: T[], type: Actions}) => {
				switch (data.type) {
					case Actions.Add: return [...acc, ...this.getCollectionIds(data.response)];
					case Actions.Delete: return acc.filter(id => id !== data.response['id']);
					case Actions.GetList: return this.getCollectionIds(data.response);
					default: return acc;
				}
			}, []);
			// .do(data => console.log('Collection IDs...', data))

		/**
		 * Getting id of target entity after Get/Add/Update/Delete action has been happened
		 * @type Observable<{response: T[], type: Actions}> => Observable<number>
		 */
		this.entityIdGet$ = this.request$.let(this.getEntityId(Actions.Get)); // .do(res => console.log('ID Get...', res));
		this.entityIdAdd$ = this.request$.let(this.getEntityId(Actions.Add)); // .do(res => console.log('ID Add...', res));
		this.entityIdUpdate$ = this.request$.let(this.getEntityId(Actions.Update)); // .do(res => console.log('ID Update...', res));
	}

	/**
	 * Return instance from response after Add/Update actions
	 * @param {Actions} action
	 * @returns {Observable<T>}
	 */
	getResponseElement(action: Actions): Observable<T> {
		let elementId$;
		switch (action) {
			case Actions.Add: elementId$ = this.entityIdAdd$; break;
			case Actions.Update: elementId$ = this.entityIdUpdate$; break;
		}
		return Observable.combineLatest(
				this.entities$,
				elementId$
			)
			.map(([entities, id]) => entities[id]);
	}

	/**
	 * Calc id of target entity after "action" has been happened
	 * @param {Actions} action
	 * @returns {(observable: Observable<{response: T[]; type: Actions}>) => Observable<number>}
	 */
	private getEntityId(action: Actions) {
		return (observable: Observable<{response: T[], type: Actions}>): Observable<number> => {
			return observable
				.filter(({type}) => type === action)
				.map((data) => (!!data.response && !!data.response[0]) ? this.getCollectionIds(data.response) : [null])
				.map((id: number[]) => id[0]);
		};
	}

	/**
	 * Getting Entities from array of <T>odjects
	 * @param {T[]} data
	 * @returns {Entity<T>}
	 */
	private getEntities(data: T[]): Entity<T> {
		return (!!data && !!data[0]) ? data.reduce((acc: Entity<T>, item: T) => ({...acc, [item['id']]: item}), {}) : {};
	}

	/**
	 * Getting Collection IDs from array of <T>odjects
	 * @param {T[]} data
	 * @returns {number[]}
	 */
	private getCollectionIds(data: T[]): number[] {
		return (!!data && !!data[0]) ? data.map(item => item['id']) : [null];
	}
}

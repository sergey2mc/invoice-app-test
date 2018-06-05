import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publish';

import { Entity } from '../../core/interfaces/entity.interface';


export enum Actions {
	Get,
	Add,
	Update,
	Delete,
	GetList
}

export class StateManagement<T> {

	entities$: Observable<Entity<T>>;
	collectionIds$: Observable<number[]>;

	entityId$: Observable<number>;

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

		// merging observable data and making subjects WARM
		// Observable<Observable<T>> => Observable<T>
		this.getData$ = this.get$.mergeAll().share();
		this.addData$ = this.add$.mergeAll().share();
		this.updateData$ = this.update$.mergeAll().share();
		this.deleteData$ = this.delete$.mergeAll().share();
		this.getListData$ = this.getList$.mergeAll().share();

		// merging observables, that are emited by subjects and refactoring emited data's format
		// <Observable<T>> => Observable<{response: T[], type: Actions}>
		this.request$ = Observable.merge(
				this.getData$.map(res => ({response: [res], type: Actions.Get})),
				this.addData$.map(res => ({response: [res], type: Actions.Add})),
				this.updateData$.map(res => ({response: [res], type: Actions.Update})),
				this.deleteData$.map(res => ({response: [res], type: Actions.Delete})),
				this.getListData$.map(res => ({response: res, type: Actions.GetList}))
			)
			.share();

		// making merged observable HOT
		this.response$ = this.request$
			.publish();
		this.response$.connect();

		// calc entities after every action has been happened
		// Observable<{response: T[], type: Actions}> => Observable<Entity<T>>
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

		// calc collection IDs after every action has been happened
		// Observable<{response: T[], type: Actions}> => Observable<number[]>
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

		// calc id of target entity after Get/Add/Update/Delete action has been happened
		// Observable<{response: T[], type: Actions}> => Observable<number>
		this.entityId$ = this.request$
			.filter(({type}) => type !== Actions.GetList)
			.map((data) => this.getCollectionIds(data.response))
			.map((id: number[]) => id[0]);
			// .do(res => console.log('ID...', res));
	}

	getEntities(data: T[]): Entity<T> {
		return data.reduce((acc: Entity<T>, item: T) => ({...acc, [item['id']]: item}), {});
	}

	getCollectionIds(data: T[]): number[] {
		return data.map(item => item['id']);
	}
}
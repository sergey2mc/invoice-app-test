import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publish';


export enum Actions {
	Get,
	Add,
	Update,
	Delete,
	GetList,
}

export interface Entities<T> {
	[index: number]: T;
}

export class StateManagement<T> {

	entities$: Observable<Entities<T>>;
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
		this.getData$ = this.get$.mergeAll().share();
		this.addData$ = this.add$.mergeAll().share();
		this.updateData$ = this.update$.mergeAll().share();
		this.deleteData$ = this.delete$.mergeAll().share();
		this.getListData$ = this.getList$.mergeAll().share();

		this.request$ = Observable.merge(
				this.getData$.map(res => ({ response: [res], type: Actions.Get })),
				this.addData$.map(res => ({ response: [res], type: Actions.Add })),
				this.updateData$.map(res => ({ response: [res], type: Actions.Update })),
				this.deleteData$.map(res => ({ response: [res], type: Actions.Delete })),
				this.getListData$.map(res => ({ response: res, type: Actions.GetList }))
			)
			.share();

		this.response$ = this.request$
			.publishReplay();
		this.response$.connect();

		this.entities$ = this.response$
			.scan((acc: Entities<T>, data: {response: T[], type: Actions}) => {
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
			}, {})
			// .do(data => console.log('Entities...', data))
			.share();

		this.collectionIds$ = this.response$
			.scan((acc: number[], data: {response: T[], type: Actions}) => {
				switch (data.type) {
					case Actions.Add: return [...acc, ...this.getCollectionIds(data.response)];
					case Actions.Delete: return acc.filter(id => id !== data.response['id']);
					case Actions.GetList: return this.getCollectionIds(data.response);
					default: return acc;
				}
			}, [])
			// .do(data => console.log('Collection IDs...', data))
			.share();

		this.entityId$ = this.request$
			.filter(({type}) => type !== Actions.GetList)
			.map((data) => this.getCollectionIds(data.response))
			.map((id: number[]) => id[0])
			// .do(res => console.log('ID...', res))
			.share();
	}

	getEntities(data: T[]): Entities<T> {
		return data.reduce((acc: Entities<T>, item: T) => ({...acc, [item['id']]: item}), {});
	}

	getCollectionIds(data: T[]): number[] {
		return data.map(item => item['id']);
	}
}
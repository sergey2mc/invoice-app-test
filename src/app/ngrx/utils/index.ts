import * as _ from 'lodash';

const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unique"`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}

export function getIdsArrEntities(entities: any) {
	return _.map(entities, (entity: any) => entity.id);
}

export function setEntities(entities, entityToSet) {
	// for games
	const oldText = entities[entityToSet.id] ? entities[entityToSet.id].text : null;
	const newText = entityToSet.text ? entityToSet.text : null;
	let text = {
		text: Object.assign({}, oldText, newText)
	};
	text = oldText || newText ? text : null;

	entityToSet = Object.assign({}, entities[entityToSet.id], entityToSet, text);
	return _.set(
		_.omit(entities, entityToSet.id),
		entityToSet.id,
		entityToSet
	);
}

export function updateEntities(payload, entityModel?) {
	if (!_.isArray(payload)) {
		payload = [payload];
	}
	const entitiesIds = payload.map(_payload => _payload.id);
	const entities = payload.reduce((_entities: { [id: string]: any }, entity: any) => {
		return Object.assign(_entities, {
			[entity.id]: entityModel ? new entityModel(entity) : entity
		});
	}, {});
	return {entitiesIds, entities};
}

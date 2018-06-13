import { Product } from '../../../core/interfaces/product.interface';


export interface IProductState {
	entities: {[index: number]: Product};
	collectionIds: number[];
	product: any;
}

export const initialState: IProductState = {
	entities: {},
	collectionIds: [],
	product: null
};

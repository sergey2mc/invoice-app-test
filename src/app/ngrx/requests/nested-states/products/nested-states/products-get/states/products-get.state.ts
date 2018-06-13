import { Product } from '../../../../../../../core/interfaces/product.interface';


export interface IProductsGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Product[];
}

export const productsInitialState: IProductsGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

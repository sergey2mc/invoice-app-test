import { Product } from '../../../../../../../core/interfaces/product.interface';


export interface IProductGetState {
	loading: boolean;
	loaded: boolean;
	status: string;
	data: Product;
}

export const productInitialState: IProductGetState = {
	loading: false,
	loaded: false,
	status: '',
	data: null
};

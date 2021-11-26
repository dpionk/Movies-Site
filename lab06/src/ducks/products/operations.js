import axios from "axios";
import * as actions from './actions';

export const getProductList = () => {
    return async dispatch => {
        const response = await 
            axios.get('https://fakestoreapi.com/products');
        dispatch(actions.productListAction(response.data));
    }
}

export const getProduct = (id) => {
    return async dispatch => {
        const response = await 
            axios.get(`https://fakestoreapi.com/products/${id}`);
        dispatch(actions.productDetailsAction(response.data));
    }
}

export const createProduct = (newProduct) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post('https://fakestoreapi.com/products', newProduct);
            if(response.status === 201) 
                dispatch(actions.productCreateAction(response.data));
        } catch(ex) {

        }
    }
}

export const deleteProduct = (productToDelete) => {
	return async dispatch => {
		try {
			const response = await
			axios.delete(`https://fakestoreapi.com/products/${productToDelete.id}`);
			if(response.status === 200)
			dispatch(actions.productDeleteAction(response.data));
		}
		catch (ex) {
		}
	}
}
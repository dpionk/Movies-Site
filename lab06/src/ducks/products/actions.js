import types from './types';

export const productListAction = (products) => ({
    type: types.PRODUCT_LIST,
    payload: products
});

export const productDetailsAction = (product) => ({
    type: types.PRODUCT_DETAILS,
    payload: product
});

export const productCreateAction = (newProduct) => ({
    type: types.PRODUCT_CREATE,
    payload: newProduct
});

import types from "./types";

export const cartReducer = (state = [{"userID" : 1, "cart": [{"productID": 1, "quantity": 3}, {"productID": 4, "quantity": 1}]}, {"userID": 4, "cart": [{"productID": 1, "quantity": 2}]}], action) => {
    switch(action.type) {
        case types.CART_ADD_PRODUCT: 
            return [...state , action.payload]
		case types.CART_DELETE:
			return state.filter(el => el.userID !== action.payload.userID)
        default:
            return state;
    }
}
import types from "./types";

export const productReducer = (state = [], action) => {
    switch(action.type) {
        case types.PRODUCT_LIST: 
            return [...action.payload]
		case types.PRODUCT_DETAILS:
			return action.payload
        case types.PRODUCT_CREATE:
            return [...state, action.payload]; 
		case types.PRODUCT_DELETE:
			return state.filter(el => el.id !== action.payload.id)
        default:
            return state;
    }
}
import types from "./types";

export const userReducer = (state = [], action) => {
    switch(action.type) {
        case types.USER_LIST: 
            return [...action.payload]
        case types.USER_CREATE:
            return [...state, action.payload]; 
        default:
            return state;
    }
}
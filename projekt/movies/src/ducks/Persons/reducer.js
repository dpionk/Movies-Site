import types from "./types";

export const personReducer = (state = [], action) => {
    switch(action.type) {
        case types.PERSON_LIST: 
            return [...action.payload]
        case types.PERSON_ADD:
            return [...state, action.payload]; 
        default:
            return state;
    }
}
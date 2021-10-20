import { TODO_ADD } from "../actions/TodoActions";

export const TodoReducer = (state = [], action) => {
    console.log(action);
    switch(action.type) {
        case TODO_ADD: 
            return [...state, action.payload];
        default:
            return state;
    }
}
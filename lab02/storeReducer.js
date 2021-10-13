const Redux = require('redux');

function storeReducer(state = { todos: [] }, action) {
    switch(action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload ]};
        case 'DELETE_TODO':
            return { ...state, todos: [ ...state.todos.filter(el => el.id !== action.payload.id) ]}
        case 'FINISH_TODO':
            return { ...state, todos: [...state.todos.map((element) => {
                if (element.id == action.payload.id) {
                    nowyElement = element
                    nowyElement.done = true
                    return nowyElement
                }
                else {
                    return element
                }
            })] };
        case 'UPDATE_TODO': 
            return {...state.todos.map((element) => {
                if (element.id == action.payload.id) {
                    return action.payload
                }
                else {
                    return element
                }
            })};
        default:
            return state;
    }
}



let store = Redux.createStore(storeReducer);
store.dispatch({ type: 'ADD_TODO', payload: { id: 0, title: 'test', done: false } });
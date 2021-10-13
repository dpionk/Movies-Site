const Redux = require('redux');

function storeReducer(state = { todos: [], notes: [] }, action) {
    switch(action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload ]};
        case 'DELETE_TODO':
            return { ...state, todos: [ ...state.todos.filter(el => el.id !== action.payload.id) ]}
        case 'FINISH_TODO':
            return { ...state, todos: [...state.todos.map((element) => {
                if (element.id == action.payload.id) {
                    let nowyElement = element
                    nowyElement.done = true
                    return nowyElement
                }
                else {
                    return element
                }
            })] };
        case 'UPDATE_TODO': 
            return { ...state, todos : [...state.todos.map((element) => {
                if (element.id == action.payload.id) {
                    let nowyElement = element
                    nowyElement.title = action.payload.title
                    nowyElement.done = action.payload.done
                    return nowyElement
                }
                else {
                    return element
                }
            })]};
        case 'ADD_NOTE':
            {
                return {
                    ...state,  notes: [ ...state.notes, action.payload ]
                }
            }
        case 'DELETE_NOTE':
            {
                return { ...state, notes: [...state.notes.filter(el => el.id != action.payload.id)]}
            }
        default:
            return state;
    }
}

// let store = Redux.createStore(storeReducer);
// store.dispatch({ type: 'ADD_TODO', payload: { id: 0, title: 'test', done: false } });
// store.dispatch({ type: 'ADD_TODO', payload: { id: 1, title: 'test1', done: false } });
// store.dispatch({ type: 'ADD_TODO', payload: { id: 2, title: 'test2', done: false } });

// store.dispatch({ type: 'UPDATE_TODO', payload: { id: 0, title: 'test2fdgfdgfdg', done: false } });
// store.dispatch({ type: 'FINISH_TODO', payload: { id: 2, title: 'test2fdgfdgfdg', done: false } });
// store.dispatch({ type: 'DELETE_TODO', payload: { id: 2, title: 'test2fdgfdgfdg', done: false } });
// store.dispatch({ type: 'ADD_NOTE', payload: { id: 1, content: 'asdfesfgdrg'} });
// store.dispatch({ type: 'ADD_NOTE', payload: { id: 2, content: 'asdfesfgfdgfddrg'} });
// // store.dispatch({ type: 'DELETE_NOTE', payload: { id: 2, content: 'asdfesfgfdgfddrg'} });
// console.log(store.getState())

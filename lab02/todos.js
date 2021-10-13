
  const Redux = require('redux');
  
  export default function toDosReducer(state = { todos: [] }, action) {
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
            default:
            return state;
        }
    }
    
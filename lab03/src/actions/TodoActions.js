export const TODO_ADD = 'TODO_ADD';
export const TODO_EDIT = 'TODO_EDIT';
export const TODO_DONE = 'TODO_DONE';
export const TODO_DELETE = "TODO_DELETE";

export const addTodoAction = (payload) => ({
    type: TODO_ADD,
    payload
});

export const editTodoAction = (payload) => ({
    type: TODO_EDIT,
    payload
});

export const doneTodoAction = (payload) => ({
    type: TODO_DONE,
    payload
});

export const deleteTodoAction = (payload) => ({
    type: TODO_DELETE,
    payload
});

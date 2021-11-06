export const ACTOR_ADD = 'ACTOR_ADD';
export const ACTOR_DELETE = "ACTOR_DELETE";
export const ACTOR_EDIT = "ACTOR_EDIT";

export const addActorAction = (payload) => ({
    type: ACTOR_ADD,
    payload
});

export const editActorAction = (payload) => ({
    type: ACTOR_EDIT,
    payload
});


export const deleteActorAction = (payload) => ({
    type: ACTOR_DELETE,
    payload
});

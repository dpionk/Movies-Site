export const ACTOR_ADD = 'ACTOR_ADD';
export const ACTOR_DELETE = "ACTOR_DELETE";

export const addActorAction = (payload) => ({
    type: ACTOR_ADD,
    payload
});


export const deleteActorAction = (payload) => ({
    type: ACTOR_DELETE,
    payload
});

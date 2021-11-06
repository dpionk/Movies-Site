export const ACTOR_IN_MOVIE_ADD = "ACTOR_IN_MOVIE_ADD";
export const ACTOR_IN_MOVIE_DELETE = "ACTOR_IN_MOVIE_DELETE";

export const addActorInMovieAction = (payload) => ({
    type: ACTOR_IN_MOVIE_ADD,
    payload
});

export const deleteActorAction = (payload) => ({
    type: ACTOR_IN_MOVIE_DELETE,
    payload
});

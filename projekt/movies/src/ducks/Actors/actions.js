import types from './types';

export const actorListAction = (actors) => ({
    type: types.ACTOR_LIST,
    payload: actors
});

export const movieActorListAction = (actor, movie) => ({
    type: types.ACTOR_IN_MOVIE,
    payload: { 'actor' : actor, 'movie': movie}
});


export const actorCreateAction = (actor) => ({
    type: types.ACTOR_ADD,
    payload: actor
});

export const actorDeleteAction = (actor, movie) => ({
	type: types.ACTOR_DELETE,
	payload: { 'actor' : actor, 'movie': movie}
})

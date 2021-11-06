import { ACTOR_IN_MOVIE_ADD, ACTOR_IN_MOVIE_DELETE } from "../actions/ActorsInMoviesActions";


export const ActorsInMoviesReducer = (state = [{ "movieID": "74e936df-c4cb-4d7e-a0d7-4113bd921cfd", "actorID": "ec88133a-959f-48b6-b6e3-d5d20d4913ce" },
{ "movieID": "061ea4cb-3487-4296-8ecf-795984c01591", "actorID": "ec88133a-959f-48b6-b6e3-d5d20d4913ce" } ,
{"movieID": "8514b757-be14-49ae-9b69-84ce37b0bb5b", "actorID": "eb368cd4-2681-46ef-b419-47c36beaafdd"},
{"movieID": "74e936df-c4cb-4d7e-a0d7-4113bd921cfd", "actorID": "9b0db9fc-fda3-455b-aa84-6f949d600d57"}], action) => {
    switch(action.type) {
        case ACTOR_IN_MOVIE_ADD: 
            return [...state, action.payload];
		case ACTOR_IN_MOVIE_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))];
        default:
            return state;
    }
}
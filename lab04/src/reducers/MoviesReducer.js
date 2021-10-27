import { MOVIE_ADD, MOVIE_EDIT, MOVIE_DELETE } from "../actions/MoviesActions";


export const MoviesReducer = (state = [{"id": "74e936df-c4cb-4d7e-a0d7-4113bd921cfd", "title": "Jakiś film", "productionYear": 2020},
{"id": "8514b757-be14-49ae-9b69-84ce37b0bb5b", "title": "Kolejny film", "productionYear": 2001 }, 
{"id": "a260091c-6194-4d43-948a-1c3906152b4d", "title": "Jakiś film 2", "productionYear": 2018 },
{"id": "cf70b54c-ed20-4393-8e55-a140d228615e", "title": "Super fajny film", "productionYear": 2018}], action) => {
    switch(action.type) {
        case MOVIE_ADD: 
		console.log(state)
            return [...state, action.payload];
		case MOVIE_EDIT:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					const nowyElement = element
					nowyElement.name = action.payload.name
                    nowyElement.date = action.payload.date
					return nowyElement
				}
				return element
			})]
		case MOVIE_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))]
        default:
            return state;
    }
}
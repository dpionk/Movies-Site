import { MOVIE_ADD, MOVIE_EDIT, MOVIE_DELETE } from "../actions/MoviesActions";


export const MoviesReducer = (state = [{"id": "74e936df-c4cb-4d7e-a0d7-4113bd921cfd", "title": "Jakiś film", "productionYear": 2020, "director_id":"74e936df-c4cb-4d7e-a0d7-cb8f396a-3d92-4558-b7fd-d6b2d914b290"},
{"id": "8514b757-be14-49ae-9b69-84ce37b0bb5b", "title": "Kolejny film", "productionYear": 2001, "director_id": "74e936df-c4cb-4d7e-a0d7-cb8f396a-3d92-4558-b7fd-d6b2d914b290" }, 
{"id": "a260091c-6194-4d43-948a-1c3906152b4d", "title": "Jakiś film 2", "productionYear": 2018 , "director_id": "046da679-33e8-46dc-826d-f82185401870"},
{"id": "cf70b54c-ed20-4393-8e55-a140d228615e", "title": "Super fajny film", "productionYear": 2018, "director_id" : "362ee6c9-db80-496f-8b3e-0e751f7fca19"}], action) => {
    switch(action.type) {
        case MOVIE_ADD: 
		console.log(state)
            return [...state, action.payload];
		case MOVIE_EDIT:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					const nowyElement = element
					nowyElement.title = action.payload.title
                    nowyElement.productionYear = action.payload.productionYear
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
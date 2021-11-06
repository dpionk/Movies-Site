import { MOVIE_ADD, MOVIE_EDIT, MOVIE_DELETE } from "../actions/MoviesActions";


export const MoviesReducer = (state = [{"id": "74e936df-c4cb-4d7e-a0d7-4113bd921cfd", "title": "Diuna", "productionYear": 2021, "director_id":"74e936df-c4cb-4d7e-a0d7-cb8f396a-3d92-4558-b7fd-d6b2d914b290"},
{"id": "8514b757-be14-49ae-9b69-84ce37b0bb5b", "title": "Igrzyska śmierci", "productionYear": 2012, "director_id": "a90abb55-1df1-41e9-b8bc-fc729077fd3d" }, 
{"id": "a260091c-6194-4d43-948a-1c3906152b4d", "title": "Gnijąca panna młoda", "productionYear": 2005 , "director_id": "046da679-33e8-46dc-826d-f82185401870"},
{"id": "cf70b54c-ed20-4393-8e55-a140d228615e", "title": "Edward Nożycoręki", "productionYear": 1990, "director_id" : "046da679-33e8-46dc-826d-f82185401870"},
{"id": "061ea4cb-3487-4296-8ecf-795984c01591", "title": "Tamte dni, tamte noce", "productionYear" : 2017}], action) => {
    switch(action.type) {
        case MOVIE_ADD: 
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
import { DIRECTOR_ADD, DIRECTOR_EDIT, DIRECTOR_DELETE } from "../actions/DirectorsActions";


export const DirectorsReducer = (state = [{"id": "74e936df-c4cb-4d7e-a0d7-cb8f396a-3d92-4558-b7fd-d6b2d914b290", "firstName": "Denis", "lastName": "Villeneuve","age": 20},
{"id": "a90abb55-1df1-41e9-b8bc-fc729077fd3d", "firstName": "Gary", "lastName": "Ross","age": 20}, 
{"id": "046da679-33e8-46dc-826d-f82185401870", "firstName": "Tim", "lastName": "Burton","age": 36 }], action) => {
    switch(action.type) {
        case DIRECTOR_ADD: 
            return [...state, action.payload];
		case DIRECTOR_EDIT:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					const nowyElement = element
					nowyElement.firstName = action.payload.firstName
                    nowyElement.lastName = action.payload.lastName
                    nowyElement.age = action.payload.age
					return nowyElement
				}
				return element
			})]
		case DIRECTOR_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))]
        default:
            return state;
    }
}
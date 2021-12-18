import axios from 'axios';
import * as actions from './actions';

export const getMovieList = () => {
	return async dispatch => {
        try {
            const response = await 
            axios.get('http://localhost:5000/api/movies');
                dispatch(actions.movieListAction(response.data));
        } catch(ex) {
			console.log(ex)
        }
    }
}

export const createMovie = (newMovie) => {
	return async dispatch => {
        try {
            const response = await 
            axios.post('http://localhost:5000/api/movies', newMovie);
                dispatch(actions.movieCreateAction(response.data));
				alert('Dodano!')
        } catch(ex) {
			if (ex.response.data === 'TITLE_DUPLICATE') {
				alert('Zduplikowany tytuł!')
			}
        }
    }
}
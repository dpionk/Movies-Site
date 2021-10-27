import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addMovieAction, editMovieAction } from "../actions/MoviesActions";
import { connect } from 'react-redux';

const MovieForm = ( props) => {


	const handleSubmit = (values) => {
        console.log(values);
		props.addMovieAction(values);
	}

	return (

		<div>
				<div>
					<h3>Dodaj film</h3>
					<Formik
						initialValues={{
							id: uuidv4(),
							title: '',
                            productionYear: ''
						}}
						onSubmit={(values) => handleSubmit(values)}
						enableReinitialize={true}>
						<Form>
							<Field name="title" />
                            <Field name="productionYear" />
							<button type="submit">
								Dodaj
							</button>
						</Form>
					</Formik>
				</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		movies: state.movies
	}
};

const mapDispatchToProps = {
	addMovieAction,
	editMovieAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
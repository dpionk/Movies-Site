import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addMovieAction, editMovieAction } from "../actions/MoviesActions";
import { connect } from 'react-redux';
import { useHistory} from "react-router";

const yup = require('yup');

const MovieForm = ( props) => {

	
	const history = useHistory();

	const handleSubmit = (values) => {
        console.log(values);
		props.addMovieAction(values);
		history.push(`/movies`);
	}
	const yupObject = yup.object().shape({
		title: yup.string()
		.required("Tytuł jest obowiązkowy"),
		productionYear: yup.number()
		.required("Rok jest obowiązkowy")
		.min(1895, "Wcześniej nie było filmów"),
		image: yup.string().url("Nieprawidłowy URL").notRequired()
	})
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
						validationSchema={yupObject}
						onSubmit={(values) => handleSubmit(values)}
						enableReinitialize={true}>
						
							{ (formProps) => (
								<Form>
									<div>
									<label>Tytuł</label>
							<Field  type="text" name="title" />	
							{formProps.touched.title && formProps.errors.title ? <div className="error">{formProps.errors.title}</div> : null}													
                            </div>
							<div>
							<label>Rok produkcji</label>
							<Field name="productionYear" />
							{formProps.touched.productionYear && formProps.errors.productionYear ? <div className="error">{formProps.errors.productionYear}</div> : null}
							</div>
							<button type="submit">
								Dodaj
							</button>
						</Form>
							)}
							
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
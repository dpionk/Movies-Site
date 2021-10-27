import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addDirectorAction, editDirectorAction } from "../actions/DirectorsActions";
import { connect } from 'react-redux';

const DirectorForm = ( props) => {


	const handleSubmit = (values) => {
        console.log(values);
		props.addDirectorAction(values);
	}

	return (

		<div>
				<div>
					<h3>Dodaj reżysera</h3>
					<Formik
						initialValues={{
							id: uuidv4(),
							firstName: '',
                            lastName: '',
                            age: ''
						}}
						onSubmit={(values) => handleSubmit(values)}
						enableReinitialize={true}>
						<Form>
							<Field name="firstName" />
                            <Field name="lastName" />
                            <Field name="age" />
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
	addDirectorAction,
	editDirectorAction
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectorForm);
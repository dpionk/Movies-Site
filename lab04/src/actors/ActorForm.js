import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addActorAction, editActorAction } from "../actions/ActorsActions";
import { connect } from 'react-redux';

const ActorForm = ( props) => {


	const handleSubmit = (values) => {
		props.addActorAction(values);
	}

	return (

		<div>
				<div>
					<h3>Dodaj Aktora</h3>
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
		actors: state.actors
	}
};

const mapDispatchToProps = {
	addActorAction,
	editActorAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ActorForm);
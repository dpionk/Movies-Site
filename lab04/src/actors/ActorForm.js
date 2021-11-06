import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addActorAction, editActorAction } from "../actions/ActorsActions";
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams} from "react-router";
const yup = require('yup');

const ActorForm = ({addActorAction, editActorAction}) => {

	const history = useHistory();
	const id = useParams().id

	const actor = useSelector((state) => {
		return state.actors.find(element => 
			element.id === id )
	})


	const handleAdd = (values) => {
		addActorAction(values);
		history.push(`/actors`);
	}

	const handleEdit = (values) => {
		editActorAction(values);
		history.push(`/actors`);
	}
	

	const state = 
		{
			id: actor ? actor.id : uuidv4(),
			firstName: actor ? actor.firstName : '',
			lastName: actor ? actor.lastName : '',
			age: actor ? actor.age :  ''
		}
	
		const yupObject = yup.object().shape({
			firstName: yup.string()
			.required("Imię jest obowiązkowe"),
			lastName: yup.string()
			.required("Nazwisko jest obowiązkowe"),
			age: yup.number()
			.required("Wiek jest obowiązkowy")
			.min(0, ":)"),
		})
	return (

		<div>
				<div>
					{ !actor ? <h3>Dodaj aktora</h3> : <h3>Edytuj aktora</h3>}
					<Formik
						initialValues={
							state
							}
						onSubmit={ !actor ? (values) => handleAdd(values) : (values) => handleEdit(values)}
						enableReinitialize={true}
						validationSchema={yupObject}>
							
							
						{ (formProps) => (
								<Form>
									<div>
									<label>Imię</label>
							<Field  type="text" name="firstName" />	
							{formProps.touched.firstName && formProps.errors.firstName ? <div className="error">{formProps.errors.firstName}</div> : null}													
                            </div>
							<div>
									<label>Nazwisko</label>
							<Field  type="text" name="lastName" />	
							{formProps.touched.lastName && formProps.errors.lastName ? <div className="error">{formProps.errors.lastName}</div> : null}													
                            </div>
							<div>
							<label>Wiek</label>
							<Field name="age" />
							{formProps.touched.age && formProps.errors.age ? <div className="error">{formProps.errors.age}</div> : null}
							</div>
							{ !actor ? 
							<button type="submit">
								Dodaj
							</button>
							:
							<button type="submit">
								Zatwierdź edycję
							</button>
							}
						</Form>
							)}
					</Formik>
				</div>
		</div>
	)
}


const mapDispatchToProps = {
	addActorAction,
	editActorAction
};

export default connect(null, mapDispatchToProps)(ActorForm);
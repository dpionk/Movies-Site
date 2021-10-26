import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addNoteAction, editNoteAction } from "../actions/NoteActions";
import { connect } from 'react-redux';
import { useParams } from "react-router";

const NoteForm = ( props) => {


	const handleSubmit = (values) => {
		props.addNoteAction(values);
	}

	const handleEdit = (values) => {
		props.editNoteAction(values)
	}

	const id = useParams();
	return (

		<div>
			{id.id === undefined ?
				<div>
					<h3>Add note</h3>
					<Formik
						initialValues={{
							id: uuidv4(),
							text: '',
						}}
						onSubmit={(values) => handleSubmit(values)}
						enableReinitialize={true}>
						<Form>
							<Field name="text" />
							<button type="submit">
								Submit
							</button>
						</Form>
					</Formik>
				</div>
				:
				<div>
					<h3>Edit note</h3>
					<Formik
						initialValues={{
							id: props.notes.find(note => note.id === id.id).id,
							text: props.notes.find(note => note.id === id.id).text
						}}
						onSubmit={(values) => handleEdit(values)}
						enableReinitialize={true}>
						<Form>
							<Field name="text" />
							<button type="submit">
								Submit
							</button>
						</Form>
					</Formik>
				</div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes
	}
};

const mapDispatchToProps = {
	addNoteAction,
	editNoteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
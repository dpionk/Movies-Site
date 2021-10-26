import { Field, Form, Formik } from "formik"
import {v4 as uuidv4 } from 'uuid';
import { addNoteAction } from "../actions/NoteActions";
import { connect } from 'react-redux';

const NoteForm = (props) => {


    const handleSubmit = (values) => {
        props.addNoteAction(values);
    }

    return (
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
    )
}

const mapStateToProps = (state) => {
    return {
        noted: state.notes
    }
};

const mapDispatchToProps = {
    addNoteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
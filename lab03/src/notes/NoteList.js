import { connect } from "react-redux";
import { deleteNoteAction } from "../actions/NoteActions";
import { Link } from 'react-router-dom';

const NoteList = ( {notes, deleteNoteAction},  props ) => {

    return (
        <div>
            {notes.map(note => (<div><div><Link to={`/notes/${note.id}`}> {note.id}  </Link> {note.text} <button onClick={() => deleteNoteAction(note)}>delete</button><Link to={`/notes/${note.id}/edit`}>Edit</Link></div></div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    };
}

const mapDispatchToProps = {
	deleteNoteAction
}


export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
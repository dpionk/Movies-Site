import { connect } from "react-redux";
import { deleteNoteAction } from "../actions/NoteActions";
import { Link } from 'react-router-dom';

const NoteList = ( {notes, deleteNoteAction},  props ) => {

    return (
        <div>
            {notes.map(note => (<div><div><Link to={`/notes/${note.id}`}> {note.id}  </Link> {note.name}    {note.date}    <button onClick={() => deleteNoteAction(note)}>delete</button><button>Edit</button></div></div>))}
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
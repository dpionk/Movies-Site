import { connect } from "react-redux";
import { deleteDirectorAction } from "../actions/DirectorsActions";
import { Link } from 'react-router-dom';

const DirectorList = ( {directors, deleteDirectorAction},  props ) => {

    return (
        <div>
            {directors.map(director => (<div><div><Link to={`/directors/${director.id}`}> {director.id}  </Link> {director.title}   {director.productionYear} <button onClick={() => deleteDirectorAction(director)}>Usuń</button></div></div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    };
}

const mapDispatchToProps = {
	deleteDirectorAction
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectorList);
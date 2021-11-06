import { connect } from "react-redux";
import { deleteActorAction } from "../actions/ActorsActions";
import { Link } from 'react-router-dom';

const ActorList = ( {actors, deleteActorAction} ) => {


    return (
        <div>
            {actors.map(actor => (<div><div><Link to={`/actors/${actor.id}`}> {actor.firstName} {actor.lastName}  </Link>  <button onClick={() => deleteActorAction(actor)}>Usuń</button></div></div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        actors: state.actors
    };
}

const mapDispatchToProps = {
	deleteActorAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ActorList);
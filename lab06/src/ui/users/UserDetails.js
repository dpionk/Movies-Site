import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom"
import { getUser } from "../../ducks/users/operations";
import { getUserDetails } from "../../ducks/users/selectors";

const UserDetails = ({user, getUser}, props) => {
    const id = useParams().id;

    useEffect(() => {
        getUser(id);
    }, [id]);

    console.log(props)
    return (
        <div>
            <h3>{user.username}</h3>
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div>{user.phone}</div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user: getUserDetails(state, props),
    };
}
const mapDispatchToProps = {
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
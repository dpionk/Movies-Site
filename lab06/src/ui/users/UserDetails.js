import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom"
import { getUser } from "../../ducks/users/operations";
import { getUserDetails } from "../../ducks/users/selectors";

const UserDetails = ({user, getUser}, props) => {
    const id = useParams().id;

    console.log(props)
    useEffect(() => {
        getUser(id);
    }, [id]);

    console.log(user)
    return (
        <div>
            {/* <h3>{user.username}</h3> */}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user: getUserDetails(state, props.match),
    };
}
const mapDispatchToProps = {
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
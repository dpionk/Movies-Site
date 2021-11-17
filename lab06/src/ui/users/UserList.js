
import { useEffect } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../ducks/users/operations";
import { getUsers } from "../../ducks/users/selectors";

const UserList = ({ users, getUserList } ,props) => {
    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div>
            <h3>Users list</h3>
            {
                users.map(user => {
                    return (
                    <div>
                        {user.name}
                    </div>)
                    })
            }
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        users: getUsers(state)
    };
}
const mapDispatchToProps = {
    getUserList
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
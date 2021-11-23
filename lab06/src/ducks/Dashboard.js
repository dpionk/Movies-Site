import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
	<div>
		<div>
			<Link to='/users'>
				Lista użytkowników
			</Link>
		</div>
		<div>
			<Link to='/products'>
				Lista produktów
			</Link>
		</div>
	</div>
	)
}

export default Dashboard;
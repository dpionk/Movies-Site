import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPersons } from '../../ducks/Persons/selectors'
import { getPersonList } from '../../ducks/Persons/operations';
import Person from './Person'
import { AiFillFilter } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import './Persons.scss';

function Persons({persons, getPersonList}) {

	useEffect(() => {
        getPersonList();
    }, []);

	const personList = persons.map((person) => {
		const personInList = <Person 
		first_name={person.first_name}
		last_name={person.last_name}
		id={person.id}/>
		return personInList
	})

	return (
		<div>
				<div className="persons-container">
					<div className="persons">
						<div className="sort">
							<div className="buttons">
							<button className="btn"><BiSort/></button>
							<button className="btn"><AiFillFilter/></button>
							</div>
							<div className="displaying">
							</div>
						</div>
						<div className="list-group">
							{personList && personList}
						</div>
					</div>
					<div className="pagination-container">
					</div>
				</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		persons: getPersons(state)
	};
}

const mapDispatchToProps = {
	getPersonList
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
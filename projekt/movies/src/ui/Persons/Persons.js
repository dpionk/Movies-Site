import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPersons } from '../../ducks/Persons/selectors'
import Person from './Person'
import { AiFillFilter } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import Pagination from '../Pagination/Pagination';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';
import './Persons.scss';

function Persons({persons}) {

	const [personFilterText, setPersonFilterText] = useState(null);
	const [personFilterNationality, setPersonFilterNationality] = useState(null);
	const [personSort, setPersonSort] = useState(null);
	const [shownPersons, setShownPersons] = useState([]);
	const [showSort, setShowSort] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [dateActive, setDateActive] = useState(false);
	const [defaultActive, setDefaultActive] = useState(false);
	const [alphabeticActive, setAlphabeticActive] = useState(false);

	const { id = "1" } = useParams();
	const personsPerPage = 3;
	const indexOfLastPerson = Number(id) * personsPerPage;
	const indexOfFirstPerson = Number(id - 1) * personsPerPage;
	const currentPersons = shownPersons.slice(indexOfFirstPerson, indexOfLastPerson)

	useEffect(() => {
		let personsToShow = [...persons]
		if (personSort) {
			personsToShow = personsToShow.sort(personSort)
		}
		if (personFilterNationality) {
			personsToShow = personsToShow.filter(x => {return x.nationality.toLowerCase() === personFilterNationality})
		}
		if (personFilterText) {
			personsToShow = personsToShow.filter(x => {return x.last_name.toLowerCase().indexOf(personFilterText.toLowerCase()) > -1})
		}
		setShownPersons(personsToShow);
	}, [personSort, persons, personFilterNationality, personFilterText])

	const personsAlphabetic = () => {
		setPersonSort(() => (a, b) => {
			return (a.last_name > b.last_name) ? 1 : -1
		})
		setAlphabeticActive(true);
		setDateActive(false);
		setDefaultActive(false);
	};

	const personsByDate = () => {
		setPersonSort(() => (a, b) => {
			return (a.birth_date > b.birth_date) ? 1 : -1
		})
		setAlphabeticActive(false);
		setDateActive(true);
		setDefaultActive(false);
	};

	const personsDefault = () => {
		setPersonSort(null);
		setAlphabeticActive(false);
		setDateActive(false);
		setDefaultActive(true);
	};

	const handleFilterReset = () => {
		setPersonFilterText(null);
		setPersonFilterNationality(null);
	}

	const personList = currentPersons.map((person) => {
		const personInList = <Person 
		first_name={person.first_name}
		last_name={person.last_name}
		id={person.id}
		key={person.id}/>
		return personInList
	})

	const handleSort = () => {
		if (showSort) {
			setShowSort(false);
		}
		else {
			setShowSort(true);
			setShowFilter(false);
		}
	}
	const handleFilter = () => {
		if (showFilter) {
			setShowFilter(false);
		}
		else {
			setShowFilter(true);
			setShowSort(false);
		}
	}

	return (
		<div>
				<div className="persons-container">
					<div className="persons">
						<div className="sort">
							<div className="buttons">
							<button className="btn" onClick={handleSort}><BiSort/></button>
							<button className="btn" onClick={handleFilter}><AiFillFilter/></button>
							</div>
							<div className="displaying">
							{showSort ? <Sort whatToShow='persons' alphabeticActive={alphabeticActive} dateActive={dateActive} defaultActive={defaultActive} alphabetic={personsAlphabetic} byDate={personsByDate} defaultSort={personsDefault}/> : null}
							{showFilter ? <Filter setFilterText={setPersonFilterText} setFilterGenre={setPersonFilterNationality} handleFilterReset={handleFilterReset}/> : null}
							</div>
						</div>
						<div className="list-group">
							{personList && personList}
						</div>
					</div>
					<div className="pagination-container">
					<Pagination whatToShow='persons' data={shownPersons} elementsPerPage={personsPerPage} />
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

export default connect(mapStateToProps, null)(Persons);
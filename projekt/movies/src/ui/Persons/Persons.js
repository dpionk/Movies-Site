import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPersons } from '../../ducks/Persons/selectors'
import { getActors } from '../../ducks/Actors/selectors'
import Person from './Person'
import { AiFillFilter } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import Pagination from '../Pagination/Pagination';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';
import './Persons.scss';

function Persons({persons, actors}) {
	const [personFilterActor, setPersonFilterActor] = useState(null);
	const [personFilterText, setPersonFilterText] = useState(null);
	const [personFilterNationality, setPersonFilterNationality] = useState(null);
	const [personSort, setPersonSort] = useState(null);
	const [shownPersons, setShownPersons] = useState([]);
	const [showSort, setShowSort] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [dateActive, setDateActive] = useState(false);
	const [defaultActive, setDefaultActive] = useState(false);
	const [alphabeticActive, setAlphabeticActive] = useState(false);
	const [actorActive, setActorActive] = useState(false);

	const { id = "1" } = useParams();
	const personsPerPage = 3;
	const indexOfLastPerson = Number(id) * personsPerPage;
	const indexOfFirstPerson = Number(id - 1) * personsPerPage;
	const currentPersons = shownPersons.slice(indexOfFirstPerson, indexOfLastPerson)

	useEffect(() => {
		let personsToShow = persons.map((person) => {
			for (let i=0;i<actors.length;i++) {
				if (actors[i][0] === person.id) {
					return {
						...person,
						'movies_played': actors[i][1]
					}
				}


			}
			return {
				...person,
				'movies_played': 0
			}
		})
		if (personSort) {
			personsToShow = personsToShow.sort(personSort)
		}
		if (personFilterNationality) {
			personsToShow = personsToShow.filter(x => {return x.nationality.toLowerCase() === personFilterNationality})
		}
		if (personFilterText) {
			personsToShow = personsToShow.filter(x => {return x.last_name.toLowerCase().indexOf(personFilterText.toLowerCase()) > -1})
		}
		if (personFilterActor) {
			personsToShow = personsToShow.filter(x => {return actors.filter((actor) => actor[0] === x.id).length !== 0})
		}
		setShownPersons(personsToShow);
	}, [personSort, persons, personFilterNationality, personFilterText, actors, personFilterActor])

	const personsAlphabetic = () => {
		setPersonSort(() => (a, b) => {
			return (a.last_name > b.last_name) ? 1 : -1
		})
		setAlphabeticActive(true);
		setDateActive(false);
		setActorActive(false);
		setDefaultActive(false);
	};

	const personsByDate = () => {
		setPersonSort(() => (a, b) => {
			return (a.birth_date > b.birth_date) ? 1 : -1
		})
		setAlphabeticActive(false);
		setDateActive(true);
		setActorActive(false);
		setDefaultActive(false);
	};

	const personsByActors = () => {

		setPersonSort(() => (a,b) => {
			return (a.movies_played < b.movies_played ? 1 : -1)
		})
		setAlphabeticActive(false);
		setDateActive(false);
		setDefaultActive(false);
		setActorActive(true);
	}

	const personsDefault = () => {
		setPersonSort(null);
		setAlphabeticActive(false);
		setDateActive(false);
		setActorActive(false);
		setDefaultActive(true);
	};

	const handleFilterReset = () => {
		setPersonFilterText(null);
		setPersonFilterNationality(null);
		setPersonFilterActor(null);
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
							{showSort ? <Sort whatToShow='persons' personsByActors={personsByActors} actorActive={actorActive} alphabeticActive={alphabeticActive} dateActive={dateActive} defaultActive={defaultActive} alphabetic={personsAlphabetic} byDate={personsByDate} defaultSort={personsDefault}/> : null}
							{showFilter ? <Filter setPersonFilterActor={setPersonFilterActor} setFilterYear={() => {}} setFilterText={setPersonFilterText} setFilterGenre={setPersonFilterNationality} handleFilterReset={handleFilterReset}/> : null}
							</div>
						</div>
						<div className="list-group">
							{personList.length !== 0 ? personList : 'Brak osób'}
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
		persons: getPersons(state),
		actors: getActors(state).reduce((prev,curr) => {
			let key = curr['person_id']
			if (!prev.find((element) => element[0] === key)) {
				prev = [...prev, [key, 1]]
			}
			else {
				prev = prev.map((element) => {
					if (element[0] === key) {
						return [key, element[1] + 1]
					}
					return element
				})
			}
		return prev
	}, [] ).sort((a, b) => {
		return (a[1] < b[1]) ? 1 : -1
	})
	};
}

export default connect(mapStateToProps, null)(Persons);
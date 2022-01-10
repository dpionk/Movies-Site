import { useState } from 'react';
import { connect } from 'react-redux';
import './Filter.scss'

function Filter({ whatToShow, genreArray, nationalityArray, setFilterText, setFilterGenre, handleFilterReset, setFilterYear, setPersonFilterActor }) {

	const [dropdownClicked, setdropdownClicked] = useState(false);
	const [checkboxClicked, setCheckboxClicked] = useState(false);
	const [textValue, setTextValue]=useState('');

	const handleClick = () => {
		if (dropdownClicked) {
			setdropdownClicked(false);
		}

		else {
			setdropdownClicked(true);
		}
	};

	const handleChange = (event) => {
		setFilterGenre(null);
		setFilterText(event.target.value);
		setTextValue(event.target.value)

	};

	const genres = genreArray.map((genre) => {
		return (
			<button onClick={() => {
				setFilterYear(null);
				setFilterText(null);
				setFilterGenre(genre);
			}}
				key={genre} className="dropdown-item">{genre}</button>
		)
	})

	const nationalities = nationalityArray.map((nationality) => {
		return (
			<button onClick={() => {
				setFilterYear(null);
				setFilterText(null);
				setFilterGenre(nationality);
			}}
				key={nationality} className="dropdown-item">{nationality}</button>
		)
	})

	return (
		<div>
			<ul className="list-group filter">
				<div className="dropdown">
					<button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleClick}>
						{whatToShow === 'movies' ? 'Gatunki' : 'Narodowości'}
					</button>
					{<div className={"dropdown-menu" + (dropdownClicked ? " show" : "")}>
						{whatToShow === 'movies' ? genres : nationalities}
					</div>
}				
				</div>

				<div className="form-check">
				{ whatToShow === 'movies' ? <div className="star-filter">
						
						<label className="form-check-label" >
							zeszłoroczne
						</label>
						<input className="form-check-input" type="checkbox" value="year" id="flexCheckDefault" onClick={() => {
							if (checkboxClicked) {
								setCheckboxClicked(false)
								setFilterYear(null);
								}
								else {
									setCheckboxClicked(true)
									setFilterYear(2021);
									setFilterText(null);
									setFilterGenre(null);
								}

			}} />
					</div> : <div className="star-filter">
						
						<label className="form-check-label" >
							tylko aktorzy
						</label>
						<input className="form-check-input" type="checkbox" value="2022" id="flexCheckDefault" onClick={() => {
							if (checkboxClicked) {
							setCheckboxClicked(false)
							setPersonFilterActor(false);
							}
							else {
								setCheckboxClicked(true)
								setFilterText(null);
							setFilterGenre(null);
							setPersonFilterActor(true);
							}
						}}  />
					</div>}

				</div>
				<input type="text" className="form-control" placeholder={ whatToShow === 'movies' ? "Szukaj po tytule..." : "Szukaj po nazwisku..."} onChange={handleChange} value={textValue} />
				<button className="btn" onClick={() => {handleFilterReset(); setTextValue("")}} >Cofnij filtrowanie</button>
			</ul>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
	genreArray: state.movies.items.reduce((prev,curr) => {
		if (prev.find((elem) => {
			return elem.toLowerCase() === curr.genre.toLowerCase()
		})) {
			prev = [...prev]
		}
		else {
		prev = [...prev, curr.genre.toLowerCase()]
		}
		return prev;
	},[]),
	
	nationalityArray: state.persons.items.reduce((prev,curr) => {
		if (prev.find((elem) => {
			return elem.toLowerCase() === curr.nationality.toLowerCase()
		})) {
			prev = [...prev]
		}
		else {
		prev = [...prev, curr.nationality.toLowerCase()]
		}
		return prev;
	},[])
}
}
export default connect(mapStateToProps,null)(Filter);
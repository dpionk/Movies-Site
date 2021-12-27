import { useState } from 'react';
import { connect } from 'react-redux';
import './Filter.scss'

function Filter({ genreArray, setBookFilterText, setBookFilterGenre, setBookFilterRating, handleFilterReset }) {

	const [dropdownClicked, setdropdownClicked] = useState(false);

	const handleClick = () => {
		if (dropdownClicked) {
			setdropdownClicked(false);
		}

		else {
			setdropdownClicked(true);
		}
	};

	const handleChange = (event) => {
		setBookFilterGenre(null);
		setBookFilterRating(null);
		setBookFilterText(event.target.value);

	};

	const genres = genreArray.map((genre) => {
		return (
			<button onClick={() => {
				setBookFilterRating(null);
				setBookFilterText(null);
				setBookFilterGenre(genre);
			}}
				key={genre} className="dropdown-item">{genre}</button>
		)
	})

	return (
		<div>
			<ul className="list-group filter">
				<div className="dropdown">
					<button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleClick}>
						Gatunki
					</button>
					{<div className={"dropdown-menu" + (dropdownClicked ? " show" : "")}>
						{genres}
					</div>
}
				</div>
				<div className="form-check">
				</div>
				<input type="text" className="form-control" placeholder="Szukaj po tytule..." onChange={handleChange} />
				<button className="btn" onClick={handleFilterReset} >Cofnij filtrowanie</button>
			</ul>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
	genreArray: state.movies.reduce((prev,curr) => {
		if (prev.find((elem) => {
			return elem.toLowerCase() === curr.genre.toLowerCase()
		})) {
			prev = [...prev]
		}
		else {
		prev = [...prev, curr.genre.toLowerCase()]
		}
		return prev;
	},[])
	};
}
export default connect(mapStateToProps,null)(Filter);
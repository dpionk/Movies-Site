import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import './Filter.scss'

function Filter({ genreArray, setBookFilterText, setBookFilterGenre, setBookFilterRating, handleFilterReset }) {

	const [dropdownClicked, setdropdownClicked] = useState(false);
	const [starsClicked, setStarsClicked] = useState(false);

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
					<div className={"dropdown-menu" + (dropdownClicked ? " show" : "")}>
						{genres}
					</div>
				</div>
				<div className="form-check">
					<div className="star-filter">
						<label className="form-check-label" >
							<AiFillStar color="#ffc107" /><AiFillStar color="#e4e5e9" /><AiFillStar color="#e4e5e9" /><AiFillStar color="#e4e5e9" /><AiFillStar color="#e4e5e9" />
						</label>
						<input className="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onClick={() => { if (starsClicked) { setBookFilterRating(null); setStarsClicked(false) } else { setBookFilterRating(1); setStarsClicked(true) } }} />
					</div>
					<div className="star-filter">
						<label className="form-check-label" >
							<AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#e4e5e9" /><AiFillStar color="#e4e5e9" /><AiFillStar color="#e4e5e9" />
						</label>
						<input className="form-check-input" type="checkbox" value="2" id="flexCheckDefault" onClick={() => { if (starsClicked) { setBookFilterRating(null); setStarsClicked(false) } else { setBookFilterRating(2); setStarsClicked(true) } }} />
					</div>
					<div className="star-filter">
						<label className="form-check-label" >
							<AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#e4e5e9" /><AiFillStar color="#e4e5e9" />
						</label>
						<input className="form-check-input" type="checkbox" value="3" id="flexCheckDefault" onClick={() => { if (starsClicked) { setBookFilterRating(null); setStarsClicked(false) } else { setBookFilterRating(3); setStarsClicked(true) } }} />
					</div>
					<div className="star-filter">
						<label className="form-check-label" >
							<AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#e4e5e9" />
						</label>
						<input className="form-check-input" type="checkbox" value="4" id="flexCheckDefault" onClick={() => { if (starsClicked) { setBookFilterRating(null); setStarsClicked(false) } else { setBookFilterRating(4); setStarsClicked(true) } }} />
					</div>
					<div className="star-filter">
						<label className="form-check-label" >
							<AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" /><AiFillStar color="#ffc107" />
						</label>
						<input className="form-check-input" type="checkbox" value="5" id="flexCheckDefault" onClick={() => { if (starsClicked) { setBookFilterRating(null); setStarsClicked(false) } else { setBookFilterRating(5); setStarsClicked(true) } }} />
					</div>
				</div>
				<input type="text" className="form-control" placeholder="Szukaj po tytule..." onChange={handleChange} />
				<button className="btn" onClick={handleFilterReset} >Cofnij filtrowanie</button>
			</ul>
		</div>
	);
}

export default Filter;
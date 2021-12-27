import './Sort.scss'

function Sort({ moviesAlphabetic, moviesByDate, moviesDefault, alphabeticActive, dateActive, defaultActive }) {

	return (
		
		<div className="filter-container">
			<div className="filter-text">
				Sortuj
			</div>
			{alphabeticActive && !dateActive && !defaultActive && <button className="btn btn-primary" onClick={moviesAlphabetic}>Alfabetycznie</button>}
			{!alphabeticActive && <button className="btn" onClick={moviesAlphabetic}>Alfabetycznie</button>}
			{dateActive && !alphabeticActive && !defaultActive && <button className="btn btn-primary" onClick={moviesByDate}>Według daty</button>}
			{!dateActive && <button className="btn" onClick={moviesByDate}>Według daty</button>}
			{/*{!alphabeticActive && !defaultActive && !dateActive && <button className="btn btn-primary" >Według liczby aktorów</button>}*/}
			{/*{ !ratingActive && <button className="btn" onClick={moviesByRating}>Według liczby aktorów</button>}*/}
			{defaultActive && !alphabeticActive && !dateActive && <button className="btn btn-primary" onClick={moviesDefault}>Domyślnie</button>}
			{!defaultActive && <button className="btn" onClick={moviesDefault}>Domyślnie</button>}
		</div>

	);
}

export default Sort;
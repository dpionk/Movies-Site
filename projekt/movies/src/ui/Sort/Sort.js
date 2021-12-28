import './Sort.scss'

function Sort({ whatToShow, alphabetic, byDate, defaultSort, alphabeticActive, dateActive, defaultActive }) {

	return (
		
		<div className="filter-container">
			<div className="filter-text">
				Sortuj
			</div>
			{alphabeticActive && !dateActive && !defaultActive && whatToShow ==='movies' && <button className="btn btn-primary" onClick={alphabetic}>Alfabetycznie</button>}
			{!alphabeticActive && whatToShow ==='movies' && <button className="btn" onClick={alphabetic}>Alfabetycznie</button>}
			{alphabeticActive && !dateActive && !defaultActive && whatToShow ==='persons' && <button className="btn btn-primary" onClick={alphabetic}>Alfabetycznie (według nazwiska)</button>}
			{!alphabeticActive && whatToShow ==='persons' && <button className="btn" onClick={alphabetic}>Alfabetycznie (według nazwiska)</button>}
			{dateActive && !alphabeticActive && !defaultActive && whatToShow ==='movies' && <button className="btn btn-primary" onClick={byDate}>Według daty</button>}
			{!dateActive && whatToShow ==='movies' && <button className="btn" onClick={byDate}>Według daty</button>}
			{dateActive && !alphabeticActive && !defaultActive && whatToShow ==='persons' && <button className="btn btn-primary" onClick={byDate}>Według daty urodzenia</button>}
			{!dateActive && whatToShow ==='persons' && <button className="btn" onClick={byDate}>Według daty urodzenia</button>}
			{/*{!alphabeticActive && !defaultActive && !dateActive && <button className="btn btn-primary" >Według liczby aktorów</button>}*/}
			{/*{ !ratingActive && <button className="btn" onClick={moviesByRating}>Według liczby aktorów</button>}*/}
			{defaultActive && !alphabeticActive && !dateActive && <button className="btn btn-primary" onClick={defaultSort}>Domyślnie</button>}
			{!defaultActive && <button className="btn" onClick={defaultSort}>Domyślnie</button>}
		</div>

	);
}

export default Sort;
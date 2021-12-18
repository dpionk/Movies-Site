import './Sort.scss'

function Sort({ booksAlphabetic, booksByDate, booksByRating, booksDefault, alphabeticActive, dateActive, ratingActive, defaultActive }) {

	return (
		
		<div className="filter-container">
			<div className="filter-text">
				Sortuj
			</div>
			{alphabeticActive && !dateActive && !ratingActive && !defaultActive && <button className="btn btn-primary" onClick={booksAlphabetic}>Alfabetycznie</button>}
			{!alphabeticActive && <button className="btn" onClick={booksAlphabetic}>Alfabetycznie</button>}
			{dateActive && !alphabeticActive && !ratingActive && !defaultActive && <button className="btn btn-primary" onClick={booksByDate}>Według daty</button>}
			{!dateActive && <button className="btn" onClick={booksByDate}>Według daty</button>}
			{ratingActive && !alphabeticActive && !defaultActive && !dateActive && <button className="btn btn-primary" onClick={booksByRating}>Według ocen</button>}
			{ !ratingActive && <button className="btn" onClick={booksByRating}>Według ocen</button>}
			{defaultActive && !alphabeticActive && !ratingActive && !dateActive && <button className="btn btn-primary" onClick={booksDefault}>Domyślnie</button>}
			{!defaultActive && <button className="btn" onClick={booksDefault}>Domyślnie</button>}
		</div>

	);
}

export default Sort;
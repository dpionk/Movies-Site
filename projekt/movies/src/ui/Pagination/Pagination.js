import { Link } from 'react-router-dom';
function Pagination({ booksPerPage, data}) {

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(data.length / booksPerPage); i++) {
		pageNumbers.push(i);
	}
	
	return (
		<nav className="pagination-container">
  			<ul className="pagination">
				  {pageNumbers.map((number) => {
					  const link = `/books/page/${number}/`
					  return(
					  <li key={number} className="page-item">
						  <Link to={link} className='page-link'>
							  {number}
						  </Link>
					  </li>
					  );
				  })}
  			</ul>
		</nav>
	);
}

export default Pagination;
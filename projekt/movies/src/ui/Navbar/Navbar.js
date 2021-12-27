import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.scss'

function Navbar() {

	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(
			!clicked
		)
	}

	return (
	  <div>
		  <nav className='navbar navbar-expand-lg navbar-light sticky-top'>
			<div className='container-fluid'>
				<div className='top'>
					<div className='navbar-brand' >
				</div>
					<button className='navbar-toggler' type='button' onClick={handleClick}>
						<span className='navbar-toggler-icon'></span>
					</button>
				</div>
				<div className={"collapse navbar-collapse" + (clicked ? " show" : "")} id="navbarTogglerDemo02">
					<ul className='navbar-nav .navbar-nav-scroll me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
						<Link to="/movies/page/1" style={{ textDecoration: 'none' }}>
								<div className="nav-link">Filmy</div>
							</Link>
						</li>
						<li className='nav-item'>
						<Link to="/movies/add" style={{ textDecoration: 'none' }}>
								<div className="nav-link">Dodaj film</div>
							</Link>
						</li>
						<li className='nav-item'>
						<Link to="/persons/page/1" style={{ textDecoration: 'none' }}>
								<div className="nav-link">Osoby</div>
							</Link>
						</li>
						<li className='nav-item'>
						<Link to="/persons/add" style={{ textDecoration: 'none' }}>
								<div className="nav-link">Dodaj osobę</div>
							</Link>
						</li>
					</ul>
					</div>
			</div>
		</nav>
	  </div>
	);
  }
  
  export default Navbar;
  
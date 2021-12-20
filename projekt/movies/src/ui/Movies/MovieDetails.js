import { useState } from "react";
import { connect } from 'react-redux';
import { getMovieDetails } from "../../ducks/Movies/selectors";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { RiArrowGoBackLine } from 'react-icons/ri';
import './MovieDetails.scss'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

function MovieDetails ({movie}) {

	const history = useNavigate();
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [errorDelete, setErrorDelete] = useState(false);	

	const handleClick = () => {
		history(-1)
	}

	return (
		
		<div>
			{movie  &&
				<div className="movie-detailed">
					<div className="list-group-detailed" key={movie.id}>
						<div className="list-group-item">
							<div className="img-date">
								<img src={movie.image_url} alt="" />
								<div className="release-date">
									<div>
									{new Date(movie.release_date).toLocaleDateString('en-GB')}
									</div>
								</div>
							</div>
							<div className="info-buttons">
								<div className="title-author">
									<div className="title-back">
										<div className="title">
											{movie.title}	
										</div>
										<div className="button-back">
											<button className="btn" type="button" onClick={handleClick}><RiArrowGoBackLine/></button>
										</div>
									</div>
									<div className="author">
										{movie.director}
									</div>
									<div className="genre">
										{movie.genre}
									</div>
									<div className="description">
										{movie.description}
									</div>
								</div>
								<div className="buttons">
									{!deleting && !error && <button type='submit' className='btn'><AiFillDelete/></button>}
									<Link to={`/movies/edit/${movie.id}`}>
										<button type='submit' className='btn'><AiFillEdit/></button>
									</Link>
									{deleting && !error && <button className='btn' disabled>Usuwanie...</button>}
									{errorDelete && <button className='btn' disabled>Coś poszło nie tak....</button>}
								</div>
							</div>
						</div>
					</div>
				</div>
				}
		</div>
	)
}

const mapStateToProps = (state,props) => {
	return {
		movie: getMovieDetails(state,props.router.params.id)
	}
}

export default withRouter(connect(mapStateToProps, null)(MovieDetails));


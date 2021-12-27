import { useState } from "react";
import { connect } from 'react-redux';
import { Formik, Field } from "formik";
import { getPersonDetails } from '../../ducks/Persons/selectors';
import { getMovieDetails } from "../../ducks/Movies/selectors";
import { deleteMovie, editDirector } from "../../ducks/Movies/operations";
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

function MovieDetails ({movie, deleteMovie, director, editDirector}) {

	const handleValidate = (values) => {
		const errors = {};

		if (!values.id) {
			errors.id = "Proszę podać id"
		}
		return errors;
	}

	async function handleSubmitDirector(director_id) {
		await editDirector(movie, director_id)
	}


	const history = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [errorDelete, setErrorDelete] = useState(false);	
	const [editingDirector, setEditDirector] = useState(false)

	const handleClick = () => {
		history(-1)
	}

	async function handleDelete(movie) {
		await deleteMovie(movie)
		history('/movies/page/1')
	}

	return (
		
		<div>
			{movie && director &&
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
									{!deleting && !error && <button type='button' className='btn' onClick={() => handleDelete(movie)}><AiFillDelete/></button>}
									<Link to={`/movies/edit/${movie.id}`}>
										<button type='submit' className='btn'><AiFillEdit/></button>
									</Link>
									{deleting && !error && <button className='btn' disabled>Usuwanie...</button>}
									{errorDelete && <button className='btn' disabled>Coś poszło nie tak....</button>}
								</div>
							</div>
						</div>
						<div className="list-group-item">
						<div className='persons-container'>
						<div className="director-actors">
						<div className='director'>
							<div className='director-edit'>
							<h4>reżyser</h4>
							<button type='button' className='btn' onClick={() => { if (editingDirector) { 
								setEditDirector(false)} else {setEditDirector(true)}}}><AiFillEdit/></button>
							</div>
							{director.hasOwnProperty('id') && !editingDirector && <div className='nav-item'><Link to={`/persons/${director.id}` } style={{ textDecoration: 'none', color: 'gray'}}>{director.first_name} {director.last_name}</Link></div>}
							{!director.hasOwnProperty('id') && !editingDirector && <div>Nie wybrano reżysera</div>}
							{editingDirector ? <div>
							<Formik
							enableReinitialize={true}
							initialValues={{id: movie.director_id ? movie.director_id : ''}}
							validate={handleValidate}
							onSubmit={handleSubmitDirector}
							>
							{(formProps) => (
								<div className='mb-2'>
									<label className='form-label'>id nowego reżysera</label>
									<Field type='text' className='form-control' name='id' value={formProps.values.id ? formProps.values.id : ''}>
									</Field>
									{formProps.touched.id && formProps.errors.id ? <div className="error">{formProps.errors.id}</div> : null}
									<button type='button' onClick={() => {formProps.handleSubmit(formProps.values.id)}} className='btn' >Zatwierdź</button>
								</div>
							)}
							
							</Formik></div> : null}
						</div>
						<div className='actors'>
							<h4>aktorzy</h4>
							<div>aktor 1</div>
							<div>aktor 2</div>
						</div>
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
	const movie = getMovieDetails(state,props.router.params.id)
	return {
		movie: movie,
		director: movie && getPersonDetails(state,movie.director_id)
	}
}

const mapDispatchToProps = {
	deleteMovie,
	editDirector
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));


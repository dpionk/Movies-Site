
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNationalities } from '../../ducks/Persons/selectors';
import { getGenres, getMovies } from '../../ducks/Movies/selectors';
import { getActors } from '../../ducks/Actors/selectors';
import { Bar } from 'react-chartjs-2'
import './Main.scss';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function Main({movies, nationalities, genres, actors, persons, actorsMovies}) {
	
	const colors = [
		"#eb9dda",
		"#ebd59d",
		"#9debae",
		"#9db3eb",
		"#d1f3a5"
	  ]

	const [nationalityData, setNationalityData] = useState({
		labels:  nationalities.map((nationality) => {
			 return nationality
		}),
		datasets: [
			{
				label: 'Narodowości osób',
				data: nationalities.map((nationality) => {
					return nationality[1]
				}),
				backgroundColor: colors
			}
		],
			scales: {
				y: {
					max: 5,
					min: 0,
					ticks: {
						stepSize: 2
					}
				}
			}
	})

	const [genreData, setGenreData] = useState({
		labels:  genres.map((genre) => {
			return genre
	   }),
	   datasets: [
		   {
			   label: 'Gatunki filmów',
			   data: genres.map((genre) => {
				   return genre[1]
			   }),
			   backgroundColor: colors
		   }
	   ],
	   scales: {
		   yAxes: [{
			   max: 5,
			   min: 0,
			   ticks: {
				   stepSize: 2
			   }
		   }]
	   }
	})

 
	const [actorsData, setActorsData] = useState({
		labels:  persons.map((person) => {
			for (let i=0;i<actors.length;i++) {
				if (actors[i][0] === person.id) {
					return {
						...person,
						'movies_played': actors[i][1]
					}
				}
	
			}
			return {
				...person,
				'movies_played': 0
			}
		}).map((person) => {
			return person.first_name + ' ' + person.last_name
	   }),
	   datasets: [
		   {
			   label: 'Aktorzy z największą ilością zagranych filmów',
			   data: persons.map((person) => {
				for (let i=0;i<actors.length;i++) {
					if (actors[i][0] === person.id) {
						return {
							...person,
							'movies_played': actors[i][1]
						}
					}
		
				}
				return {
					...person,
					'movies_played': 0
				}
			}).map((person) => {
				   return person.movies_played
			   }),
			   backgroundColor: colors
		   }
	   ],
	   scales: {
		   y: {
			   max: 5,
			   min: 0,
			   ticks: {
				   stepSize: 2
			   }
		   }
	   }
	})



	const [moviesData, setMoviesData] = useState({
		labels:  movies.map((movie) => {
			for (let i=0;i<actorsMovies;i++) {
				if (actorsMovies[i][0] === movie.id) {
					return {
						...movie,
						'actors': actorsMovies[i][1]
					}
				}
			}
			return {
				...movie,
				'actors': 0
			}
		}).map((movie) => {
			return movie.title
	   }),
	   datasets: [
		   {
			   label: 'Aktorzy z największą ilością zagranych filmów',
			   data: movies.map((movie) => {
				for (let i=0;i<actorsMovies;i++) {
					if (actorsMovies[i][0] === movie.id) {
						return {
							...movie,
							'actors': actorsMovies[i][1]
						}
					}
				}
				return {
					...movie,
					'actors': 0
				}
			}).map((movie) => {
				   return movie.actors
			   }),
			   backgroundColor: colors
		   }
	   ],
	   scales: {
		   y: {
			   max: 5,
			   min: 0,
			   ticks: {
				   stepSize: 2
			   }
		   }
	   }
	})

	useEffect(() => {
		setNationalityData({
			labels:  nationalities.map((nationality) => {
				return nationality
		   }),
			datasets: [
				{
					label: 'Narodowości osób',
					data: nationalities.map((nationality) => {
						return nationality[1]
					}),
					backgroundColor: colors
				}
			],
			scales: {
				y: {
					max: 5,
					min: 0,
					ticks: {
						stepSize: 2
					}
				}
			}
		})
		setGenreData({
			labels:  genres.map((genre) => {
				return genre
		   }),
		   datasets: [
			   {
				   label: 'Gatunki filmów',
				   data: genres.map((genre) => {
					   return genre[1]
				   }),
				   backgroundColor: colors
			   }
		   ],
		   scales: {
			   y: {
				   max: 5,
				   min: 0,
				   ticks: {
					   stepSize: 2
				   }
			   }
		   }
		})
		setActorsData({
			labels:  persons.map((person) => {
				for (let i=0;i<actors.length;i++) {
					if (actors[i][0] === person.id) {
						return {
							...person,
							'movies_played': actors[i][1]
						}
					}
		
				}
				return {
					...person,
					'movies_played': 0
				}
			}).map((person) => {
				return person.first_name + ' ' + person.last_name
		   }),
		   datasets: [
			   {
				   label: 'Aktorzy z największą ilością zagranych filmów',
				   data: persons.map((person) => {
					for (let i=0;i<actors.length;i++) {
						if (actors[i][0] === person.id) {
							return {
								...person,
								'movies_played': actors[i][1]
							}
						}
			
					}
					return {
						...person,
						'movies_played': 0
					}
				}).map((person) => {
					   return person.movies_played
				   }),
				   backgroundColor: colors
			   }
		   ],
		   scales: {
			   y: {
				   max: 5,
				   min: 0,
				   ticks: {
					   stepSize: 2
				   }
			   }
		   }
		})
		setMoviesData({
			labels: movies.map((movie) => {
				for (let i=0;i<actorsMovies;i++) {
					if (actorsMovies[i][0] === movie.id) {
						return {
							...movie,
							'actors': actorsMovies[i][1]
						}
					}
				}
				return {
					...movie,
					'actors': 0
				}
			}).map((movie) => {
				return movie.title
		   }),
		   datasets: [
			   {
				   label: 'Filmy z największą liczbą aktorów',
				   data: movies.map((movie) => {
					   if (actorsMovies.find((element) => element[0] === movie.id)) {
						return {
							...movie,
							'actors': actorsMovies.find((element) => element[0] === movie.id)[1]
						}
					   }
						return {
							...movie,
							'actors': 0
						}

				}).map((movie) => {
					   return movie.actors
				   }),
				   backgroundColor: colors
			   }
		   ],
		   scales: {
			   y: {
				   max: 5,
				   min: 0,
				   ticks: {
					   stepSize: 2
				   }
			   }
		   }
		})
	},[nationalities, genres, actors, persons, actorsMovies, movies])

	return (
		<div>
			{movies && nationalities &&
		<div className="list-group">
			{ movies.length >= 3 ?<div className='list-group-item'>
					 <div className='newMovies'>
						<h4>Najnowsze filmy</h4>
						<div className='movies'>
					{ movies.length >= 3 ? movies.sort((a,b) => (a.release_date < b.release_date) ? 1 : ((b.release_date < a.release_date) ? -1 : 0)).slice(0,3).map((movie) => {
						return (
							<Link className='image' to={`/movies/${movie.id}`} key={movie.id}><img src={movie.image_url} alt="" /></Link>
							
						)
					}) : null}
					</div>
					</div>
					
			</div>
			: null }
			
			<div className='list-group-item'>
				<div className='charts'>
					<div className='chart'>
				<Bar data={nationalityData} className='chart-bar'/>
		</div>
		  <div className='chart'> 
		  <Bar data={genreData}  className='chart-bar'/>
		  </div>
		  </div>
			</div>
			<div className='list-group-item'>
			<div className='chart'> 
		  <Bar data={actorsData}  className='chart-bar'/>
		  </div>
		  <div className='chart'> 
		  <Bar data={moviesData}  className='chart-bar'/>
		  </div>
			</div>
		</div>
		}
		</div>
	);
}

const mapStateToProps = (state) => {
	const movies=getMovies(state)
    return {
        movies: movies,
		nationalities: getNationalities(state),
		genres: movies ? getGenres(state) : [],
		persons: state.persons.items,
		actors: state.actors.items.reduce((prev,curr) => {
			let key = curr['person_id']
			if (!prev.find((element) => element[0] === key)) {
				prev = [...prev, [key, 1]]
			}
			else {
				prev = prev.map((element) => {
					if (element[0] === key) {
						return [key, element[1] + 1]
					}
					return element
				})
			}
		return prev
	}, [] ).sort((a, b) => {
		return (a[1] < b[1]) ? 1 : -1
	}),
	actorsMovies: getActors(state).reduce((prev,curr) => {
		let key = curr['movie_id']
		if (!prev.find((element) => element[0] === key)) {
			prev = [...prev, [key, 1]]
		}
		else {
			prev = prev.map((element) => {
				if (element[0] === key) {
					return [key, element[1] + 1]
				}
				return element
			})
		}
	return prev
}, [] ).sort((a, b) => {
	return (a[1] < b[1]) ? 1 : -1
})
    }
}

export default connect(mapStateToProps,null)(Main);



import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNationalities } from '../../ducks/Persons/selectors';
import { getGenres } from '../../ducks/Movies/selectors';
import { Bar } from 'react-chartjs-2'
import './Main.scss';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function Main({movies, nationalities, genres}) {

	const [nationalityData, setNationalityData] = useState({
		labels:  nationalities.map((nationality) => {
			 return nationality
		}),
		datasets: [
			{
				label: 'Narodowości aktorów',
				data: nationalities.map((nationality) => {
					return nationality[1]
				}),
				backgroundColor: [
					"#ffbb11",
					"#ecf0f1",
					"#50AF95",
					"#f3ba2f",
					"#2a71d0"
				  ]
			}
		]
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
			   backgroundColor: [
				   "#ffbb11",
				   "#ecf0f1",
				   "#50AF95",
				   "#f3ba2f",
				   "#2a71d0"
				 ]
		   }
	   ]
	})

	useEffect(() => {
		setNationalityData({
			labels:  nationalities.map((nationality) => {
				return nationality
		   }),
			datasets: [
				{
					label: 'Narodowości aktorów',
					data: nationalities.map((nationality) => {
						return nationality[1]
					}),
					backgroundColor: [
						'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
					  ]
				}
			]
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
				   backgroundColor: [
					   "#ffbb11",
					   "#ecf0f1",
					   "#50AF95",
					   "#f3ba2f",
					   "#2a71d0"
					 ]
			   }
		   ]
		})
	},[nationalities, genres])

	return (
		<div>
			{movies && nationalities &&
		<div className="list-group">
			<div className='list-group-item'>
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
			<div className='list-group-item'>
				<div className='charts'>
					<div className='chart'>
				<Bar data={nationalityData} className='chart-bar'
				options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}/>
		</div>
		  <div className='chart'> 
		  <Bar data={genreData}  className='chart-bar'
				options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}/>
		  </div>
		  </div>
			</div>
			<div className='list-group-item'>
			<div className='chart'> 
		  <Bar data={genreData}  className='chart-bar'
				options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}/>
		  </div>
				</div>
		</div>
		}
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
		nationalities: getNationalities(state),
		genres: getGenres(state)
    }
}

export default connect(mapStateToProps,null)(Main);


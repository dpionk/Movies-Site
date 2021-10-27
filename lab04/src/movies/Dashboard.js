import { connect } from "react-redux";

function Dashboard({movies}, props) {

    
    return (
        <div>
            {movies.sort((a,b) => (a.productionYear < b.productionYear) ? 1 : ((b.productionYear < a.productionYear) ? -1 : 0)).slice(0,3).map((movie) => { return (
                <div>
                    <div>
                        {movie.title}   {movie.productionYear}
                    </div>
                    </div>
                    )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps, null)(Dashboard);
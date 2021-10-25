import React, { Component } from "react";
import { useParams } from "react-router-dom";
// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from '../config'

// Components
import BreadCrumbs from './BreadCrumbs';
import Grid from './Grid'
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
// API
import API from '../API';
//Image
import NoImage from '../images/no_image.jpg'
class Movie extends Component {
    state = {
        movie: {},
        loading: true,
        error: false
    }

    fetchMovie = async () => {
        const {movieId} = this.props.params;
        try {

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId)
            //get directors only
            const directors = credits.crew.filter(member => member.job === 'Director');

            this.setState({
                movie: {
                    ...movie,
                    actors: credits.cast,
                    directors
                },
                loading: false,
                error: false
            })

        } catch(error) {
            this.setState({
                loading: false,
                error: true
            })
        }
    };

    componentDidMount() {
        this.fetchMovie();
    }
    
    render(){
        const {loading, error, movie} = this.state;
        if(loading) return <Spinner/>
        if(error) return <div>something went wrong...</div>
        return (
            <>
            <BreadCrumbs movieTitle={movie?.original_title}/>
            <MovieInfo movie={movie}/>
            <MovieInfoBar 
                time={movie.runtime} 
                budget={movie.budget} 
                revenue={movie.revenue} 
            />
            <Grid header="Actors">
                {
                    movie.actors.map(actor => (
                        <Actor 
                            key={actor.credit_id}
                            actorName={actor.name}
                            character={actor.character}
                            imageUrl={actor.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path : NoImage}
                        />
                    ))
                }
            </Grid>
            </>
        )
    }
}
// This is a hack to get the movie id as useParams is not supported for class component.
const MovieWithParams = props => <Movie {...props} params={useParams()}/>

export default MovieWithParams; 
import React, {Component} from "react";

// config
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from './Thumb'
import Spinner from "./Spinner";
import SearchBar from "./SearchBar"
import ShowMoreButton from "./ShowMoreButton"
// Image
import NoImage from '../images/no_image.jpg'
//API
import API from '../API'


const initialState = {
    page:0,
    results: [],
    total_pages: 0,
    total_results: 0
}

class Home extends Component  {
    state = {
        movies: initialState,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false,
    }

    fetchMovies = async(page, searchTerm= "") => {
        try {
            this.setState({
                error: false,
                loading: true
            })
            const movies  = await API.fetchMovies(searchTerm, page);

            this.setState(prev => ({
                ...prev,
                movies: {
                ...movies,
                results: page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results],
                },
                loading: false,
            }))
        } catch(error) {
            this.setState({
                error: true,
            })
        }
        this.setState({
            loading: false,
        })
    }


    handelSearchTerm = searchTerm => {
        this.setState({movies: initialState, searchTerm}, () => this.fetchMovies(1, this.state.searchTerm))
    }

    handelLoadMore = () => {
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
    }

    componentDidMount() {
        this.fetchMovies(1);
    }
    render() {
        const {error, loading ,searchTerm , movies} = this.state;
        const hero = movies[0];
        if (error) {
            return (
                 <div>Something went wrong ....</div>
            )
        } else {

            return (
                <>
                {hero &&! searchTerm ?
                    <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${hero.backdrop_path}`}
                        title={hero.original_title}
                        text={hero.overview}
                    /> 
                    : null
                }
                <SearchBar setSearchTerm={this.handelSearchTerm}/>
                <Grid header={searchTerm? 'Search Results' :'Popular Movies'}>
                    {movies.results.map(movie => (
                        <Thumb key={movie.id} 
                            clickable 
                            image={ movie.poster_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}` : NoImage}
                            movieId={movie.id}
                        />
                    ))}
                </Grid>
                {loading && <Spinner/>}
                {movies.page < movies.total_pages && !loading && (
                    <ShowMoreButton callback={this.handelLoadMore} text='Load More'/>
                )}          
                </>
            )
        }
    }
}

export default Home;
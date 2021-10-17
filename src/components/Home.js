import React from "react";

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from './Thumb'
import Spinner from "./Spinner";
// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";
// Image

import NoImage from '../images/no_image.jpg'

const Home = () => {
    const {state, loading, error} = useHomeFetch();
    const results = state?.results;
    const hero = results[0];
    console.log(hero)

    return (
        <>
        {hero ?
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${hero.backdrop_path}`}
                title={hero.original_title}
                text={hero.overview}
            /> 
            : null
        }
        <Grid header='Popular Movies'>
            {results.map(movie => (
                <Thumb key={movie.id} 
                    clickable 
                    image={ movie.poster_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}` : NoImage}
                    movieId={movie.id}
                />
            ))}
        </Grid>
        {loading ? <Spinner/> : null}          
        </>
    )
}

export default Home;
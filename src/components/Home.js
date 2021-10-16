import React from "react";

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// components
import HeroImage from "./HeroImage";
// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";
// Image

import NoImage from '../images/no_image.jpg'

const Home = () => {
    const {state, loading, error} = useHomeFetch();
    const hero = state?.results[0];
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

        </>
    )
}

export default Home;
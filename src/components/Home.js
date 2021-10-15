import React from "react";

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// components

// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";
// Image

import NoImage from '../images/no_image.jpg'

const Home = () => {
    const {state, loading, error} = useHomeFetch();
    console.log(state, error,loading)
    return <div>Home Page</div>
}

export default Home;
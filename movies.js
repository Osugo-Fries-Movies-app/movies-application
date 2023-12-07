'use strict'

import { getAllMovies } from "/movies-api.js"

// GETTING ALL MOVIES

(async () => {
    const movies = await getAllMovies();
    console.log(movies)
})();



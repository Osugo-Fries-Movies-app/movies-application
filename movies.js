'use strict'

import { getAllMovies, editedMovie} from "/movies-api.js"

// GETTING ALL MOVIES

(async () => {
    const movies = await getAllMovies();
    console.log(movies)
})();



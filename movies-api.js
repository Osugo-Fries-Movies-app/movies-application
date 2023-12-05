'use strict'

// GETTING ALL MOVIES
export const getAllMovies = async () => {
    try {
        const moviesUrl = `http://localhost:3000/movies`;
        const moviesResponse = await fetch(moviesUrl);
        const movies = await moviesResponse.json();
        return movies;
    } catch (error) {
        console.log(error);
    }
}

// ADDING A MOVIE

// export const addMovie = async (movies) => {
//     try {
//         const url = `http://localhost:3000/movies`;
//         const options = {
//             method: 'POST',
//             body: JSON.stringify(movies)
//         };
//         const response = await fetch (url, options);
//         const newMovie = await response.json();
//         return newMovie;
//     } catch (error) {
//         console.log(error);
//     }
// }

function showMovies() {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}
showMovies()
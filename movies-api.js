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

// function showMovies() {
//     fetch('http://localhost:3000/movies')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
// }
// showMovies()

// FUNCTION CREATING MOVIE CARDS
function movieCards(movie) {
    return `
        <div class="col-md-3">
            <div class="card mb-4 box-shadow">
            <img class="card-img-top" src="${POSTER_API_KEY}" alt="${movie.title}">
                <div class="card-body">
                    <h2>${movie.title}</h2>
                    <p>Rating: ${movie.rating}</p>
                    <p>Showtimes: 2:00PM 3:15PM 5:30PM 6:45PM 7:20pm 8:15PM</p>
                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    <button class="btn btn-danger delete-button" data-movie-id="${movie.id}">Delete</button>
                </div>
            </div>
        </div>
    `;
}

// FUNCTION THAT DISPLAYS LOADING IMG THEN POPULATES MOVIES
async function showMovies() {
    try {
        const moviesContainer = document.getElementById('movies');
        const loadingImg = document.getElementById('img');
        loadingImg.style.display = 'block';
        const movies = await getAllMovies();
        moviesContainer.innerHTML = '';
        movies.forEach(movie => {
            moviesContainer.innerHTML += movieCards(movie);
        });
        loadingImg.style.display = 'none';
        deleteBtnListener();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', showMovies);

// FUNCTION THAT SAVES ADDED MOVIE WITHOUT REFRESHING PAGE


// FUNCTION THAT SAVES EDITED MOVIE WITHOUT REFRESHING PAGE





































































// FUNCTION TO DELETE MOVIE WITHOUT REFRESHING PAGE

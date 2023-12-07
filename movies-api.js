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

                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>

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


// ADDING A MOVIE

async function addMovie(){
        const movieTitle = document.querySelector('#addTitle');
        const movieRating = document.querySelector('#addRating')
    const saveNewMovie = document.getElementById('saveNewMovie')
    saveNewMovie.addEventListener("click", ()=>{
        console.log(movieTitle.value);
        console.log(movieRating.value);
    })
}
// addMovie()

// // FUNCTION TO ADD MOVIE TO JSON
export async function createMovie() {
    const movieTitle = document.querySelector('#addTitle').value;
    const movieRating = document.querySelector('#addRating').value;
// console.log ('update movie hit')
    try {
        const response = await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: movieTitle, rating: movieRating }),
        });
        const createdMovie = await response.json();
        console.log(updatedMovie);
        return createdMovie;
    } catch (error) {
        console.error(error);
    }
}
document.querySelector('#saveNewMovie').addEventListener('click', async() => {
await createMovie();
})



// EDITING A MOVIE
export async function editedMovie(id) {
    const movieTitle = document.querySelector('#editTitle').value;
    const movieRating = document.querySelector('#editRating').value;
    // const editModal = document.getElementById('editModal');

    try {
        const url = `http://localhost:3000/movies/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: movieTitle, rating: movieRating }),
        }
        const response = await fetch(url,options)
        const updatedMovie = await response.json()
        console.log(updatedMovie);
        return updatedMovie;
    } catch (error) {
        console.error(error);
    }
}

document.querySelector('#editMovie').addEventListener('click', async (e) => {
await editedMovie()
})




// FUNCTION THAT SAVES EDITED MOVIE WITHOUT REFRESHING PAGE

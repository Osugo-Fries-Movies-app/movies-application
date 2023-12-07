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
                      <button type="button" class="editBtn btn btn-dark" data-bs-toggle="modal" data-bs-target="#editModal" data-movie-id="${movie.id}">Edit</button>
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
        editBtnListener()
        deleteBtnListener();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', showMovies);


// FUNCTION THAT SAVES ADDED MOVIE WITHOUT REFRESHING PAGE

// ADDING A MOVIE

async function addMovie() {
    const movieTitle = document.querySelector('#addTitle');
    const movieRating = document.querySelector('#addRating')
    const saveNewMovie = document.getElementById('saveNewMovie')
    saveNewMovie.addEventListener("click", () => {
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
            body: JSON.stringify({title: movieTitle, rating: movieRating}),
        });
        const createdMovie = await response.json();
        console.log(updatedMovie);
        return createdMovie;
    } catch (error) {
        console.error(error);
    }
}

document.querySelector('#saveNewMovie').addEventListener('click', async () => {
    await createMovie();
})


// FUNCTION DELETES MOVIE WITHOUT REFRESHING PAGE
function deleteBtnListener() {
    const deleteBtn = document.querySelectorAll('.delete-button');
    deleteBtn.forEach(button => {
        button.addEventListener('click', deleteClick);
    });
}

async function deleteClick(event) {
    const movieId = event.target.dataset.movieId;
    console.log(event);
    console.log(movieId);
    try {
        const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Movie with ID ${movieId} is deleted`);
            showMovies();
        }
    } catch (error) {
        console.error('Error deleting movie with ID of:'`${movieId}`, error);
    }
}

// FUNCTION TO EDIT MOVIES WITHOUT REFRESHING PAGE
function editBtnListener() {
    const editBtn = document.querySelectorAll('.editBtn');
    editBtn.forEach(button => {
        button.addEventListener('click', function (event) {
            editClick(event.target.dataset.movieId)
            // console.log(event.target.dataset.movieId)
        });
    });
}

async function editClick(movieId) {
    try {
        const response = await fetch(`http://localhost:3000/movies/${movieId}`);
        const movieEditData = await response.json();
        console.log(movieEditData.id)
        populateDataFields(movieEditData);
        document.getElementById('editMovie').addEventListener('click', function () {
            fetch(`http://localhost:3000/movies/${movieEditData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        id: movieEditData.id,
                        title:  document.getElementById('editTitle').value,
                        rating: document.getElementById('editRating').value
                    }
                )
            })
        })
        if (response.ok) {
            console.log(`Movie with ID ${movieId} is edited`);
            // You can also choose to re-fetch the movies and update the entire movie list
            // showMovies();
        }
    } catch (error) {
        console.error('Error editing movie with ID of:', movieId, error);
    }
}

function populateDataFields (movieDetails) {
    document.getElementById('editTitle').value = movieDetails.title
    document.getElementById('editRating').value = movieDetails.rating
}
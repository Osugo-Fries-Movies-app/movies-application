'use strict'

// GETTING ALL MOVIES IN CONSOLE
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
            <img class="card-img-top" src="${movie.image}" alt="${movie.title}">
                <div class="card-body">
                    <h2>${movie.title}</h2>
                    <p>Rating: ${movie.rating}</p>
                    <p>Showtimes: 2:00PM 3:15PM 5:30PM 6:45PM 7:20PM 8:15PM</p>
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
        setTimeout(() => {
            loadingImg.style.display = 'none';
        }, 5000);
        movies.forEach(movie => {
            moviesContainer.innerHTML += movieCards(movie);
        });
        loadingImg.style.display = 'none';
        editBtnListener();
        // saveBtnListener()
        deleteBtnListener();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', showMovies);


// FUNCTION THAT SAVES ADDED MOVIE WITHOUT REFRESHING PAGE
async function addMovie() {
    const movieTitle = document.querySelector('#addTitle');
    const movieRating = document.querySelector('#addRating')
    const moviePoster = document.querySelector('#addPoster')
    const saveNewMovie = document.getElementById('saveNewMovie')
    saveNewMovie.addEventListener("click", () => {
        console.log(movieTitle.value);
        console.log(movieRating.value);
        console.log(moviePoster.value);
    })
}
addMovie()

// FUNCTION TO ADD MOVIE TO JSON
export async function createMovie() {
    const movieTitle = document.querySelector('#addTitle').value;
    const movieRating = document.querySelector('#addRating').value;
    const moviePoster = document.querySelector('#addPoster').value;
// console.log ('update movie hit')
    try {
        const response = await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: movieTitle, rating: movieRating, image: moviePoster}),
        });
        const createdMovie = await response.json();
        showMovies()
        // console.log(updatedMovie);
        // appendMovieToPage(createdMovie);
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
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach(button => {
        button.addEventListener('click', async function (event) {
            const movieId = event.target.dataset.movieId;
            const movieEditData = await fetchMovieDetails(movieId);
            populateDataFields(movieEditData);
        });
    });
}

// FETCH MOVIE DETAILS FUNCTION
async function fetchMovieDetails(movieId) {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`);
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error fetching movie details for ID ${movieId}`);
        return null;
    }
}

// POPULATE EDITED MOVIE DETAILS THEN SHOWS ALL MOVIES
function populateDataFields(movieEditData) {
    // PRE-POPULATING MOVIE DATA IN FORM
    document.getElementById('editTitle').value = movieEditData.title;
    document.getElementById('editRating').value = movieEditData.rating;
document.getElementById('editPoster').value = movieEditData.image;

    // ADDING EVENT LISTENER TO EDIT MOVIE BUTTON
    document.getElementById('editMovie').addEventListener('click', async function () {
        const updatedMovie = await updateMovie(movieEditData.id);
        if (updatedMovie) {
            console.log(`Movie with ID ${movieEditData.id} is edited`);
            await showMovies();
        } else {
            console.error(`Error updating movie with ID ${movieEditData.id}`);
        }
    });
}

// FUNCTION TO SAVE EDITED MOVIE
async function updateMovie(movieId) {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById('editTitle').value,
            rating: document.getElementById('editRating').value,
            image: document.getElementById('editPoster').value
        })
    });

    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error updating movie with ID ${movieId}`);
        return null;
    }
}
editBtnListener();

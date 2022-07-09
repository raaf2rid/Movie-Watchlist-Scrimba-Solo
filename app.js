const searchValue = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const moviesList = document.getElementById("movie-list");
const pageCount = document.getElementById("page-count");
const pageShift = document.getElementById("page-shift");

// localStorage.clear()



let totalPages = 0;

const apiKey = "e7ad2478";

let page = 1;

let searchMovie = ''

let nextPage = page
let previousPage = page




let movieData = []

// fetch from database

async function getMovie(fetchMovies, pageNumber) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${fetchMovies}&type=movie&page=${pageNumber}`
  );
  const movie = await response.json();
  return movie;
}

async function getMovieInfo(fetchMovieData) {
  let moviesArray = [];

  for (let i = 0; i < fetchMovieData.length; i++) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${fetchMovieData[i].imdbID}`
    );
    const movies = await response.json();

    moviesArray.push(movies);
  }

  return moviesArray;
}

// Promise handling


function getMovies(movieId){

  if (movieId.Error === "Movie not found!") {
    moviesList.innerHTML = `<div
  id="movie-section-default" class="movie-section-default">
    <div class="default">
    <h3 class="error-message">Unable to find what you're looking for.<br>Please try another search.</h3>
   </div>
  </div>`;

    throw Error("An error Occured");
  } else if (movieId.Error === "Too many results.") {
    moviesList.innerHTML = `<div
  id="movie-section-default" class="movie-section-default">
    <div class="default">
    <h3 class="error-message">Too many Results!<br>
    Be a little more specific.</h3>
   </div>
  </div>`;

    throw Error("An error Occured");
  }

}


function imdbInfo(movieInfo){

  let toAdd = 
  `<button class="watchlist">
  <i class="fa-solid fa-circle-plus"></i>Watchlist</button>`

  let toRemove = 
  `<button class="watchlist">
  <i class="fa-solid fa-circle-minus"></i>Watchlist</button>`

    let watchListMovies = JSON.parse(localStorage.getItem("previousData"))


    movieInfo.filter(checkLocal)

    function checkLocal(data){

    
    Object.assign(data, {addOrRemove : toAdd})

    if(watchListMovies){

    for(let item of watchListMovies){

      if(item.title === data.Title){

        Object.assign(data, {addOrRemove : toRemove})


      }



    }

  }
  

    }


  for (let i = 0; i < movieInfo.length; i++) {


    let moviePoster = movieInfo[i].Poster;
  
    if (movieInfo[i].Poster === "N/A") {
      moviePoster = `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`;
    }
  
    pageCount.innerHTML = `<h3> Total Pages: <span>${totalPages}</span> </h3>`;

    let showMovieList = ''
  
    showMovieList = `<div class="movie-section">
  
      <img src=${moviePoster} alt="" class="poster">
  
      <div class="movie-info">
  
        <div class="info-flex title-rating">
          <h4 class="title">${movieInfo[i].Title}</h4>
          <p class="rating"><img src="star.png" alt="" class="rating-icon">${
            movieInfo[i].imdbRating
          }</p>
        </div>
        
        <div class="info-flex">
          <p class="duration">${movieInfo[i].Runtime}</p>
          <p class="genre">${movieInfo[i].Genre.split(",", 3)}</p>
          <div class = "watchlist-div">
          ${movieInfo[i].addOrRemove}
          </div>
        </div>
  
          <p class="description">${movieInfo[i].Plot}</p>
          </div>
  
  
  </div>`; 


  moviesList.innerHTML += showMovieList


  let watchlistDiv = document.querySelectorAll(".watchlist-div")

  for(let i = 0; i < watchlistDiv.length; i++){

  watchlistDiv[i].addEventListener("click", ()=>{



  const aboutFilm = {

  poster: movieInfo[i].Poster,
  title: movieInfo[i].Title,
  rating: movieInfo[i].imdbRating,
  duration: movieInfo[i].Runtime,
  genre: movieInfo[i].Genre.split(",", 3),
  plot: movieInfo[i].Plot
  }

  let previousData = JSON.parse(localStorage.getItem("previousData")) || [];



  if(movieInfo[i].addOrRemove === toAdd){

  movieInfo[i].addOrRemove = toRemove

  watchlistDiv[i].innerHTML = movieInfo[i].addOrRemove
  

  previousData.push(aboutFilm)

  localStorage.setItem("previousData", JSON.stringify(previousData))


  }

  else if(movieInfo[i].addOrRemove === toRemove){

  movieInfo[i].addOrRemove = toAdd

  watchlistDiv[i].innerHTML = movieInfo[i].addOrRemove

  previousData.pop(aboutFilm)

  localStorage.setItem("previousData", JSON.stringify(previousData))


  }

  })

  }

  
    

}
}


function changePage(){

  pageShift.innerHTML = `<button id="previous"><i class="fa-solid fa-angles-left"></i></button></i><h3 id="current-page"> 1 </h3><button id="next"><i class="fa-solid fa-angles-right"></i></button>`;
  
    const previousBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    const currentPage = document.getElementById("current-page");

    previousBtn.classList.add("hideItem")

    if (totalPages === 1){

      nextBtn.classList.add("hideItem")

    }


    previousBtn.addEventListener("click", () => {
      if (page === 2) {
        // previousBtn.innerHTML = ''
        previousBtn.classList.add("hideItem")
      }
      page--;

      moviesList.innerHTML = "";
      pageCount.innerHTML = "";
      // previousBtn.classList.remove("hideItem")
      nextBtn.classList.remove("hideItem")


      previousPage = page;


      getMovie(searchMovie, previousPage)
      .then((imdb) => {

      totalPages = Math.floor(imdb.totalResults / 10 + 1);

      getMovieInfo(imdb.Search).then((imdbData) => {

        imdbInfo(imdbData)

      });

    })
  
        currentPage.textContent = " " + page + " ";
  
      
    });
  
    nextBtn.addEventListener("click", () => {

      moviesList.innerHTML = "";
      pageCount.innerHTML = "";
      previousBtn.classList.remove("hideItem")

      if(page === totalPages - 1){
        nextBtn.classList.add("hideItem")
      }

      page++

      nextPage = page;


      getMovie(searchMovie, nextPage)
    .then((imdb) => {

      totalPages = Math.floor(imdb.totalResults / 10 + 1);

      getMovieInfo(imdb.Search).then((imdbData) => {

        imdbInfo(imdbData)



      });

    })

  
    currentPage.textContent = " " + page + " ";
    


      
    });
  

}




// Show fetched data

searchBtn.addEventListener("click", () => {

  page = 1

  moviesList.innerHTML = "";
  pageCount.innerHTML = "";
  pageShift.innerHTML = "";

  searchMovie = searchValue.value.split(" ").join("+");

  getMovie(searchMovie, 1)
    .then((imdb) => {

      getMovies(imdb)

      totalPages = Math.floor(imdb.totalResults / 10 + 1);

      getMovieInfo(imdb.Search).then((imdbData) => {

        imdbInfo(imdbData)

        changePage()

      });

      searchValue.value = "";
    })
      .catch((err) => {
      
      console.log(err);
      // Find out the error
    });
});

///////////////////////////////////////////////////////////////////
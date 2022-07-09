const moviesListWatchList = document.getElementById("movie-list-watchlist");

let toWatch = JSON.parse(localStorage.getItem("previousData"))

const defaultMessage = 
`<div class="movie-list-watchlist-default">
  <p>Your watchlist is looking a little empty...</p>
  <a href="index.html" class="add-movies-btn"><i class="fa-solid fa-circle-plus"></i><span>Let's add some movies!</span></a>
  </div>`

console.log(toWatch.length)


function renderPage(data){


  if(data.length !== 0){
  
    renderMovies(data)

  }
  else{
  moviesListWatchList.innerHTML = defaultMessage
  
  console.log(moviesListWatchList)
  }

}
// localStorage.clear()

renderPage(toWatch)



function renderMovies(moviesArray){

   let listMovies = ''
  
    for(let i = 0; i < moviesArray.length; i++){
    
  
    let moviePoster = moviesArray[i].poster;
    
    if (moviesArray[i].poster === "N/A") {
      moviePoster = `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`;
    }

  
     listMovies += `
     
        <div class="movie-section">
    
        <img src=${moviePoster} alt="" class="poster">
    
        <div class="movie-info">
    
          <div class="info-flex title-rating">
            <h4 class="title">${moviesArray[i].title}</h4>
            <p class="rating"><img src="star.png" alt="" class="rating-icon">${
              moviesArray[i].rating
            }</p>
          </div>
          
          <div class="info-flex">
            <p class="duration">${moviesArray[i].duration}</p>
            <p class="genre">${moviesArray[i].genre}</p>
            <button id="watchlist" class="watchlist">
            <i class="fa-solid fa-circle-minus"></i>Watchlist</button>
          </div>
    
            <p class="description">${moviesArray[i].plot}</p>
            </div>
    
    
        </div>`;
    
          }

        moviesListWatchList.innerHTML = listMovies

        const removeMovie = document.querySelectorAll('.watchlist')

        for(let i = 0; i < removeMovie.length; i++){

          removeMovie[i].addEventListener("click", ()=>{


            let updatedList = []

            function deleteItem(data){

          

              if(data !== toWatch[i]){

                updatedList.push(data)
              }

            


            }


            toWatch.filter(deleteItem)

            localStorage.setItem("previousData", JSON.stringify(updatedList))

            toWatch = JSON.parse(localStorage.getItem("previousData"))

            renderMovies(toWatch)

            if(toWatch.length === 0){

              moviesListWatchList.innerHTML = defaultMessage


            }
        

          })



        }

  
        }

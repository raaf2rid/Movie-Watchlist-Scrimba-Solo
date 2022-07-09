













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

      console.log(aboutFilm.poster)


      if(movieInfo[i].addOrRemove === toAdd){

      movieInfo[i].addOrRemove = toRemove

      watchlistDiv[i].innerHTML = movieInfo[i].addOrRemove



      let previousData = JSON.parse(localStorage.getItem("previousData")) || [];

      previousData.push(aboutFilm)

      localStorage.setItem("previousData", JSON.stringify(previousData))


      }

      else if(movieInfo[i].addOrRemove === toRemove){

      movieInfo[i].addOrRemove = toAdd

      watchlistDiv[i].innerHTML = movieInfo[i].addOrRemove

      let previousData = JSON.parse(localStorage.getItem("previousData")) || [];

      previousData.pop(aboutFilm)

      localStorage.setItem("previousData", JSON.stringify(previousData))


      }

      })

      }
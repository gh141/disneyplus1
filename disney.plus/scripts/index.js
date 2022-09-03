const api_key = 'f0922fcd242ae59dd69a342d925c303b'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'


const LIST_MOVIES = ['539681', '616037', '438148', '585511', '1010818', '400160', '718789', '508947']



function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=${API_LANGUAGE}`
}



const moviesList = document.getElementById('movies__list')

function setMainMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const app = document.getElementById('app')
  
    const title = document.querySelector('.movie h1')
    const description = document.querySelector('.movie p')
    const info = document.querySelector('.movie span')
    const rating = document.querySelector('.rating strong')
  
    const yearRelease = data.release_date.split('-')[0]
  
    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - movie'
  
  
    const image = BASE_URL_IMAGE.concat(data.backdrop_path)
    app.style.backgroundImage = `linear-gradient(180deg, rgba(14,23,47,0.0001) 11.72%, #0e172F 100%), url('${image}')`
  })
}

function createButtonMovie(movieId) {
  const button = document.createElement('button')
  button.setAttribute('onclick', `setMainMovie('${movieId}')`)
  button.innerHTML = '<img src="/assets/icon-play-button.png" alt="icon play button" />'
  return button

}

function createMovie(movieId) {
  console.log('createMovie id', movieId);
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const movie = document.createElement('li')
    const genre =`<span>${data.genres[0].name}</span>`
    const title =`<strong>${data.title}</strong>`
    const image = BASE_URL_IMAGE.concat(data.backdrop_path)

    movie.innerHTML = genre + title 
    movie.appendChild(createButtonMovie (movieId))
    movie.style.backgroundImage = `linear-gradient(180deg, rgba(14,23,47,0.0001) 11.72%, #0e172F 100%), url('${image}')`
    moviesList.appendChild(movie)
  } )
}

function loadlistMovies() {
  LIST_MOVIES.map(createMovie)
}

loadlistMovies()

setMainMovie(LIST_MOVIES[0])
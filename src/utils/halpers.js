const searchItem = (
  inputValue,
  setSearchInputValue,
  localStorageKeyItem,
  localStorageKeyInput
) => {
  if (inputValue !== localStorage.getItem(localStorageKeyInput)) {
    localStorage.removeItem(localStorageKeyItem)
  }
  localStorage.setItem(localStorageKeyInput, inputValue)
  setSearchInputValue(inputValue)
}

const moviesFilter = (value, movies) => {
  return movies.filter((movie) => {
    return (
      movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(value.toLowerCase())
    )
  })
}

const shortMoviesFilter = (movies) => {
  return movies.filter((movie) => {
    return movie.duration <= 40
  })
}

const handleItemsFiltering = (
  value,
  movies,
  addfilter,
  width,
  setMoviesToRender,
  mainFilter,
  durationFilter,
  calculateToRender = null
) => {
  let filteredMovies = mainFilter(value, movies)
  if (addfilter) {
    filteredMovies = durationFilter(filteredMovies)
  }
  if (calculateToRender) {
    const listToRender = calculateToRender(filteredMovies, width)
    setMoviesToRender(listToRender)
  } else {
    setMoviesToRender(filteredMovies)
  }
  return filteredMovies
}

const calculateMoviesToRender = (movies, width) => {
  if (width <= 767) {
    return movies.slice(0, 5)
  } else if (width <= 955) {
    return movies.slice(0, 8)
  } else if (width < 1280) {
    return movies.slice(0, 12)
  } else {
    return movies.slice(0, 16)
  }
}

const calculateMoviesToAdd = (filteredMovies, listMovies, width) => {
  let moviesToAdd
  if (width <= 767) {
    moviesToAdd = filteredMovies.slice(listMovies, listMovies + 2)
  } else if (width <= 955) {
    moviesToAdd = filteredMovies.slice(listMovies, listMovies + 2)
  } else if (width < 1280) {
    moviesToAdd = filteredMovies.slice(listMovies, listMovies + 3)
  } else {
    moviesToAdd = filteredMovies.slice(listMovies, listMovies + 4)
  }
  return moviesToAdd
}

const saveItem = (movie) => {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: 'https://api.nomoreparties.co' + movie.image.url,
    trailerLink: movie.trailerLink,
    thumbnail:
      'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  }
}

export {
  moviesFilter,
  shortMoviesFilter,
  calculateMoviesToRender,
  saveItem,
  handleItemsFiltering,
  calculateMoviesToAdd,
  searchItem,
}


const getters = {
  getMovies : (state) => state.movies,
  getFavorites : (state) => state.favorites,
  getGenres : (state) => state.genres,
  getCurrentPage: (state) => state.currentPage,
  getTotalResults: (state) => state.totalResults,
  getMovie: (state) => state.movie,
  getSimilar: (state) => state.similar
}

export default getters

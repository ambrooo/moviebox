const mutations = {

  SET_MOVIES(state, data){
    if (data.page == 1){
      state.movies = []
    }
    data.results.forEach(
        (result) => {
          state.movies.push(result)
        }
    )
    state.currentPage = data.page
    state.totalResults = data.total_results
  },
  SET_MOVIE(state,data){
    state.movie = data
  },
  SET_SIMILAR(state,data){
    state.similar = data.results
  },
  SET_GENRES(state, data){
    state.genres = []
    state.genres = data
    state.genres.unshift({
      id:null,
      name:'Filter by genre'
    })
  },
  setFavorite(state, data){
    state.favorites.push(data)
},
  removeFavorite(state, data){
    state.favorites.splice(state.favorites.indexOf(data),1)
  }
}

export default mutations


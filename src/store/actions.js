
import Ls from '@/services/ls'

const actions = {

    bootstrap ({ commit }, filters) {
        return new Promise((resolve, reject) => {
            window.axios.get(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${filters.page}`).then((response) => {
                commit('SET_MOVIES', response.data)
                resolve(response)
            }).catch((err) => {
                console.log(err.response)
                reject(err)
            })
        })
    },
    getGenres({commit}){
        return new Promise((resolve, reject) => {
            window.axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en-US').then((response) => {
                commit('SET_GENRES', response.data.genres)
                resolve(response)
            }).catch((err) => {
                console.log(err.response)
                reject(err)
            })
        })
    },
    searchGenre({commit}, filters){
        return new Promise((resolve, reject) => {
            window.axios.get(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${filters.page}&with_genres=${filters.genre}`).then((response) => {
                commit('SET_MOVIES', response.data)
                resolve(response)
            }).catch((err) => {
                console.log(err.response)
                reject(err)
            })
        })
    },
    searchMovies({commit}, filters){
        return new Promise((resolve, reject) => {
            const search = filters.search.replace(' ', '+')
            window.axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${filters.page}`).then((response) => {
                commit('SET_MOVIES', response.data)
                resolve(response)
            }).catch((err) => {
                console.log(err.response)
                reject(err)
            })
        })
    },
    showMovie({commit}, id){
        return new Promise((resolve, reject) => {
            window.axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`).then((response) => {
                commit('SET_MOVIE', response.data)
                resolve(response)
            }).catch((err) => {
                console.log(err.response)
                reject(err)
            })
        })
    },
    getSimilar({commit}, id){
        return new Promise((resolve, reject) => {
            window.axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`).then((response) => {
                commit('SET_SIMILAR', response.data)
                resolve(response)
            }).catch((err) => {
                console.log(err.response)
                reject(err)
            })
        })
    },
    setFavorite({commit}, id){
        commit('setFavorite', id)
    },
    removeFavorite({commit}, id){
        commit('removeFavorite', id)
    }
}

export default actions

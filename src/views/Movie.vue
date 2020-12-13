<template>
    <div v-if="movieLoaded">
        <router-link to="/" class="back px-3">Back to movies</router-link>
        <div class="row no-gutters d-flex">
            <img class="col-md-6" :src="'http://image.tmdb.org/t/p/original/'+mainMovie.backdrop_path" :alt="mainMovie.title">
            <div class="col-md-6 text-white bg-info p-3 d-flex flex-column">
                <div>
                    <h1 class="text-uppercase d-inline-block">{{mainMovie.title}}</h1> <h4 class="d-inline-block ml-3"><i class="icon-calendar"></i> {{formatedDate(mainMovie.release_date)}}</h4>
                    <p class="font-italic">{{mainMovie.overview}}</p>
                </div>
                <div class="mt-auto mb-3">
                    <p><i class="icon-credit-card"></i> {{movieFinance}}</p>
                    <div class="genre text-white font-weight-bold">
                        <i class="icon-tag"></i> {{movieGenre(mainMovie.genres.map(x=>x.id))}}
                    </div>
                </div>
            </div>
        </div>
        <div class="movies p-0" v-if="similars.length">
            <div class="container-fluid p-0">
                <b-row no-gutters>
                    <b-col
                            v-for="movie in similars"
                            :key="movie.id"
                            lg="3"
                            md="6"
                            class="movie"
                    >
                        <img
                                :src="'http://image.tmdb.org/t/p/w500/'+movie.poster_path"
                                :alt="movie.title"
                                class="w-100"
                        >
                        <router-link :to="{name: 'movie', params: { id: movie.id }}" class="movie-details d-block">
                            <div class="d-flex pt-2 mb-3 title">
                                <h3 class=" d-inline-block">{{ movie.title }}</h3>
                                <i class="icon-heart ml-auto cursor-pointer movie-heart"
                                   :class="isFavorite(movie.id)?'text-info':'text-white'"
                                   @click.prevent="setFavorite(movie.id)"></i>
                            </div>

                            <p>Release date: <span>{{formatedDate(movie.release_date)}}</span></p>
                            <p><i class="icon-bulb"></i><i> {{movie.overview}}</i></p>
                            <div class="rating">
                                <div class="d-inline-block w-75">
                                    <b-form-rating class="w-100 text-white rating" precision="2" inline
                                                   :value="movie.vote_average" readonly size="sm" no-border stars="10"
                                                   show-value></b-form-rating>
                                </div>
                                <div class="genre pl-2 text-white font-weight-bold">
                                    <i class="icon-tag"></i> {{movieGenre(movie.genre_ids)}}
                                </div>
                            </div>
                        </router-link>
                    </b-col>
                </b-row>
            </div>
        </div>
        <div class="d-flex justify-content-center my-5">
            <h3>That's all folks</h3>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import moment from "moment";
    export default {
        name:'movie',
        data(){
            return{
                movieLoaded: false
            }
        },
        computed:{
            ...mapGetters({
                mainMovie:'getMovie',
                similars:'getSimilar',
                favorites: 'getFavorites',
                genres: 'getGenres',
            }),
            movieFinance(){
                let formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });
                let diff = this.mainMovie.revenue - this.mainMovie.budget
                return (diff>=0?'Profit ':'Loss ')+formatter.format(Math.abs(diff))
            }
        },
        methods:{
            getMovie(){
                this.$store.dispatch('showMovie', this.$route.params.id).then(
                    (resp) => this.movieLoaded = true
                )
            },
            isFavorite(id) {
                return this.favorites.find(x => x === id)
            },
            setFavorite(id) {
                if (this.isFavorite(id)) {
                    this.$store.dispatch('removeFavorite', id)
                } else {
                    this.$store.dispatch('setFavorite', id)
                }
            },
            formatedDate(date) {
                return moment(date).format('MMMM Do YYYY')
            },
            movieGenre(ids) {
                let genres = []
                ids.forEach(
                    (id) => genres.push(this.genres.find(x => x.id === id).name)
                )
                return genres.join(', ')
            },
        },
        mounted() {
            this.getMovie()
            this.$store.dispatch('getSimilar', this.$route.params.id)
        }
    }
</script>
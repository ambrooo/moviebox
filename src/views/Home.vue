<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="info" class="w-100" fixed="top">
                <b-navbar-brand to="/">Movie BOX</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto w-25">
                        <b-form-input size="sm" class="mr-sm-2 searchbox" placeholder="Show me the movies"
                                      v-model="filters.search" @input="setSearchPage"></b-form-input>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-5 w-25">
                        <b-form-select placeholder="Filter by genre" :options="genres" value-field="id"
                                       text-field="name" v-model="filters.genre" class="selectbox form-control-sm"
                                       @input="setGenrePage"></b-form-select>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div class="movies" v-if="movies.length">
            <div class="container-fluid p-0">
                <b-row no-gutters>
                    <b-col
                            v-for="movie in movies"
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
                        <router-link :to="'/movie/'+movie.id" class="movie-details d-block">
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
        <spinkit v-if="movies.length&&movies.length<totalResults"
                 v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }"></spinkit>
        <div class="d-flex justify-content-center my-5" v-else>
            <h3>That's all folks</h3>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import moment from 'moment'
    import spinkit from "../components/spinkit";
    import _ from 'lodash'

    export default {
        name: 'Home',
        data() {
            return {
                intersectionOptions: {
                    root: null,
                    rootMargin: '0px 0px 0px 0px',
                    threshold: [0, 1] // [0.25, 0.75] if you want a 25% offset!
                },
                filters: {
                    search: null,
                    genre: null,
                    page: 1
                }
            }
        },
        computed: {
            ...mapGetters({
                movies: 'getMovies',
                favorites: 'getFavorites',
                genres: 'getGenres',
                currentPage: 'getCurrentPage',
                totalResults: 'getTotalResults'
            })
        },
        components: {
            spinkit
        },
        watch: {
            filters: {
                handler: 'setFilters',
                deep: true
            }
        },
        methods: {
            setSearchPage() {
                this.filters.page = 1
                this.filters.genre = null
            },
            setGenrePage() {
                this.filters.page = 1
                this.filters.search = null
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
            onWaypoint({going, direction}) {
                if (direction === this.$waypointMap.DIRECTION_TOP && this.filters.page === this.currentPage) {
                    this.filters.page += 1
                }
            },
            searchMovies: _.debounce((filters, vm) => {
                vm.$store.dispatch('searchMovies', filters)
            }, 300),
            setFilters() {
                if (this.filters.search && this.filters.search !== '') {
                    this.searchMovies(this.filters, this)
                } else if (this.filters.genre) {
                    this.$store.dispatch('searchGenre', this.filters)
                } else {
                    this.$store.dispatch('bootstrap', this.filters)
                }
            }
        },
        mounted() {
            this.setFilters()
        }
    }
</script>

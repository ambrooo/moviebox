<template>
    <div id="app" v-if="dataLoaded">
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>
<script>

    export default {
        data(){
            return{
                dataLoaded:false,
            }
        },
        mounted() {
            this.$store.dispatch('getGenres').then(
                (resp) => this.dataLoaded = true
            )
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2C3E50;
        min-height: 100vh;

        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2C3E50;
        min-height: 100vh;

        .container {
            min-height: 100vh;
        }
    }
</style>

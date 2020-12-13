<template>
    <div id="app">
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>
<script>

    export default {
        mounted() {
            this.$store.dispatch('getGenres')
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

<template>
    <div class="d-flex container justify-content-between">
        <h1>prova header</h1>
        <input 
        type="text" 
        placeholder="fai una ricerca" 
        v-model="UserSearch"
        >
        <button @click="SearchMovies()">cerca film</button>
    </div>
    
</template>

<script>
import axios from "axios"
export default {
    name: 'HeaderSite',
    data() {
        return {
            UserSearch: '',
            ThemoviedbApi: '',
            movieList: [],
        }
    },
    methods:{
        SearchMovies() {
            this.ThemoviedbApi = 'https://api.themoviedb.org/3/search/movie?api_key=193243e6ba454e23bb7950ff587b4977&language=it&include_adult=false&query='+ this.UserSearch
            axios
            .get(this.movieApi)
            .then((result) => {
                this.movieList = result.data.results
                console.log(this.movieList);
            })
        },
    },
}

</script>


<style lang="scss">

</style>
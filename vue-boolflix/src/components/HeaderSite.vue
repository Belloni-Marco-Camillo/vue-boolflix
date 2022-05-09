<template>
    <div class="container">
        <div id="header" class="d-flex container justify-content-between">
            <h1>prova header</h1>
            <input 
            type="text" 
            placeholder="fai una ricerca" 
            v-model="UserSearch"
            @keyup.enter="SearchMovies(), SearchShow()"
            >
            <button @click="SearchMovies(), SearchShow()">cerca film</button>
        </div>
        <div class="row">
            <h2>film</h2>
            <div class="card-film col-2" v-for="movie in movieList" :key="movie.id">
                <img class="col-12 max-height" v-if="movie.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+movie.poster_path">
                <img class="col-12 img-dimension" v-else :src="'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'">
                <div class="title_film"> <span>titolo: </span>  {{movie.title}}</div>
                <div class="title_film"> <span>titolo originale: </span> {{movie.original_title}}</div>
                <lang-flag :iso="movie.original_language" />
                <Rate class="d-flex" :length="5" :value="vote(movie.vote_average)"></Rate>
                
            </div> 
        </div>
        
        <div class="row">
            <h2>serie tv</h2>
            <div class="card-film col-2" v-for="show in tvShow" :key="show.id">
                <img class="col-12 max-height" v-if="show.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+show.poster_path">
                <img class="col-12 img-dimension" v-else :src="'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'">
                <div class="title_film"> <span>titolo: </span>  {{show.name}}</div>
                <div class="title_film"> <span>titolo originale: </span>  {{show.original_name}}</div>
                <div class="title_film"> <span>lingua originale: </span>  {{show.original_language}}</div>
                <Rate class="d-flex" :length="5" :value="vote(show.vote_average)"></Rate>
            </div> 
        </div>
            
        
    </div>
</template>

<script>
import axios from "axios"
import LangFlag from "../../node_modules/vue-lang-code-flags/LangFlag.vue"
import Rate from '../../node_modules/vue-rate/src/Rate.vue';

export default {
    name: "HeaderSite",
    data() {
        return {
            UserSearch: "",
            ThemoviedbApi: "",
            movieList: [],
            tvShow: [],
        };
    },
    methods: {
        SearchMovies() {
            this.ThemoviedbApi = "https://api.themoviedb.org/3/search/movie?api_key=193243e6ba454e23bb7950ff587b4977&language=it&include_adult=false&query=" + this.UserSearch;
            axios
                .get(this.ThemoviedbApi)
                .then((result) => {
                this.movieList = result.data.results;
                //console.log(this.movieList);
                return this.movieList;
            });
        },
        vote(voto){
            return Math.round(Number(voto) / 2)
        },
        SearchShow() {
            this.ThemoviedbApi = "https://api.themoviedb.org/3/search/tv?api_key=193243e6ba454e23bb7950ff587b4977&language=it-IT&query=" + this.UserSearch;
            axios
                .get(this.ThemoviedbApi)
                .then((result) => {
                this.tvShow = result.data.results;
                console.log(this.tvShow);
                return this.tvShow;
            });
        },
    },
    components: { 
        LangFlag,
        Rate,
    }
}
</script>


<style lang="scss">
.card-film{
    margin: 30px 0;
    span{
        font-weight: bold;
    }
    lang-flag{
        width: 200px;
    }
}
img{
    height: 300px;
}
</style>
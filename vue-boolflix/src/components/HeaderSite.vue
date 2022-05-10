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





        <div class="row gy-3 gx-2">
            <h2>film</h2>
            <div class="flip-card-container col-2" v-for="movie in movieList" :key="movie.id">
                <div class="flip-card">
                    <div class="flip-card-front">
                        <img class="col-12 max-height" v-if="movie.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+movie.poster_path">
                        <img class="col-12 img-dimension" v-else :src="'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'">
                    </div>
                    <div class="flip-card-back">
                        <div> <span>titolo: </span>  {{movie.title}}</div>
                        <div> <span>titolo originale: </span> {{movie.original_title}}</div>
                        <lang-flag :iso="movie.original_language" />
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="col-2"> {{movie.vote_average}}</div>
                            <Rate :readonly="true" class="rate-width" :length="5" :value="vote(movie.vote_average)"></Rate>
                        </div>
                        <div v-if="movie.overview.length > 0" class="overview-scroll">{{movie.overview}}</div>
                        <div v-else>nessuna descrizione</div>
                    </div>
                </div>
            </div> 
        </div>



        <div class="row gy-3 gx-2">
            <h2>serie tv</h2>
            <div class="flip-card-container col-2" v-for="show in tvShow" :key="show.id">
                <div class="flip-card">
                    <div class="flip-card-front">
                        <img class="col-12 max-height" v-if="show.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+show.poster_path">
                        <img class="col-12 img-dimension" v-else :src="'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'">
                    </div>
                    <div class="flip-card-back">
                        <div> <span>titolo: </span>  {{show.name}}</div>
                        <div> <span>titolo originale: </span> {{show.original_name}}</div>
                        <lang-flag :iso="show.original_language" />
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="col-2"> {{show.vote_average}}</div>
                            <Rate :readonly="true" class="rate-width" :length="5" :value="vote(show.vote_average)"></Rate>
                        </div>
                        <div v-if="show.overview.length > 0" class="overview-scroll">{{show.overview}}</div>
                        <div v-else>nessuna descrizione</div>
                    </div>
                </div>
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

span{
    font-weight: bold;
}
lang-flag{
    width: 200px;
}

.rate-width *{
    width: 8px;
}
img{
    height: 300px;
}



.max-height-backdrop{
    height: 100px;
}
.overview-scroll{
    position: absolute;
    bottom: 0;
    max-height: 200px;
    overflow-y: scroll;
}
.flip-card-container {
  height: 400px;
  perspective: 1000px;
}
.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}
.flip-card-container:hover .flip-card {
  transform: rotateY(180deg); /* <=>  rotateY(.5turn) */
}
/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  /* border-radius: 0.5rem; */
}
.flip-card-front {
  background-color: #333;
  color: #fff;
}
.flip-card-back {
  background-color: #517fa4;
  color: #fff;
  transform: rotateY(180deg);
}

.flip-card-front img {
  width: 100%;
  height: 100%;
  /* border-radius: 0.5rem; */
}
.flip-card-back p {
  text-align: center;
  margin: 1rem;
  font-size: 1.4rem;
  line-height: 1.5rem;
}
.flip-card-back p span {
  display: block;
  font-size: 1rem;
  font-style: italic;
  font-weight: bold;
  margin-top: 1.25rem;
}
</style>
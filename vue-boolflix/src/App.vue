<template>

  <div id="app">

<button @click="FilterMove()"></button>

    <div class="container">
        <HeaderSite />
    <h2 class="text-start text-white">film</h2>
        <div id="filmList" class="row flex-nowrap overflow-x gy-3 gx-2 mb-3">
            <div class="flip-card-container col-2" v-for="movie in movieList" :key="movie.id">
                <div class="flip-card">
                    <div class="flip-card-front">
                        <img class="col-12 max-height" v-if="movie.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+movie.poster_path">
                        <img class="col-12 img-dimension" v-else :src="'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'">
                    </div>
                    <div class="flip-card-back">
                        <img class="backprop-card" v-if="movie.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+movie.backdrop_path">
                        <div class="backprop-card" v-else> nessuna immagine di copertina </div>
                        <div class="title-card"> <span>titolo: </span>  {{movie.title}}</div>
                        <div class="originalTitle-card"> <span>titolo originale: </span> {{movie.original_title}}</div>
                        <lang-flag class="lenguage-card" :iso="movie.original_language" />
                        <div  class="vote-card d-flex justify-content-center align-items-center">
                            <div class="col-2"> {{movie.vote_average}}</div>
                            <Rate :readonly="true" class="rate-width" :length="5" :value="vote(movie.vote_average)"></Rate>
                        </div>
                        <div v-if="movie.overview.length > 0" class="overview-card overview-scroll">{{movie.overview}}</div>
                        <div class="emptyOverview-card" v-else>nessuna descrizione</div>
                    </div>
                </div>
            </div> 
        </div>

        
        <h2 class="text-start text-white">serie tv</h2>
        <div class="row flex-nowrap overflow-x gy-3 gx-2">
            <div class="flip-card-container col-2" v-for="show in tvShow" :key="show.id">
                <div class="flip-card">
                    <div class="flip-card-front">
                        <img class="col-12 max-height" v-if="show.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+show.poster_path">
                        <img class="col-12 img-dimension" v-else :src="'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'">
                    </div>
                    <div class="flip-card-back">
                        <img class="backprop-card" v-if="show.poster_path !== null" :src="'https://image.tmdb.org/t/p/w342'+show.backdrop_path">
                        <div class="backprop-card" v-else> nessuna immagine di copertina </div>
                        <div class="title-card"> <span>titolo: </span>  {{show.name}}</div>
                        <div class="originalTitle-card"> <span>titolo originale: </span> {{show.original_name}}</div>
                        <lang-flag class="lenguage-card" :iso="show.original_language" />
                        <div  class="vote-card d-flex justify-content-center align-items-center">
                            <div class="col-2"> {{show.vote_average}}</div>
                            <Rate :readonly="true" class="rate-width" :length="5" :value="vote(show.vote_average)"></Rate>
                        </div>
                        <div v-if="show.overview.length > 0" class="overview-card overview-scroll">{{show.overview}}</div>
                        <div class="emptyOverview-card" v-else>nessuna descrizione</div>
                    </div>
                </div>
            </div> 
        </div>
  </div>
    </div>
    
  

</template>

<script>
import HeaderSite from './components/HeaderSite.vue';
import LangFlag from "../node_modules/vue-lang-code-flags/LangFlag.vue"
import Rate from '../node_modules/vue-rate/src/Rate.vue';
import state from '@/state.js';


export default {
    
  name: 'App',
  data() {
        return {
            movieList: [],
        };
    },
  
  components: {
    LangFlag,
    Rate,
    HeaderSite,
  },
  computed: {
    FilterMove() {
        movieList=state.movieList;
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  background-color: #333;
  min-height: 100vh;
}
</style>

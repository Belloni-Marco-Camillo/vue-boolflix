<template>
    <div class="container">
        <div id="header" class="d-flex mb-5 container justify-content-between">
            <div class="header-sx d-flex">
                <img src="./../assets/Netflix_logo.svg" alt="logo">
                <ul class="d-flax text-white">
                    <li> <a href="#"> home</a></li>
                    <li> <a href="#"> TV Show</a></li>
                    <li> <a href="#"> Movies</a></li>
                    <li> <a href="#"> New & Popular</a></li>
                    <li> <a href="#"> My List</a></li>
                </ul>
            </div>
            <input
            type="text" 
            placeholder="title, people, genres" 
            v-model="UserSearch"
            @keyup="SearchMovies(), SearchShow()"
            >
        </div>




        <h2 class="text-start text-white">film</h2>
        <div class="row flex-nowrap overflow-x gy-3 gx-2 mb-3">
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










#header{
    img{
        width: 100px;
        height: 30px;
        padding: 0;
        margin-left: -10px;
    }
    ul{
        li{
            float: left;
            margin: 0 10px;
            list-style: none;
            a{
                text-decoration: none;
                color: #fff;
            }
        }
    }
    input{
        border-color: white;
        padding: 3px;
    }
}
.row{
    h2{
        text-transform: uppercase;
        color: white;
        text-align: left;
    }
}


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
.overflow-x{
    overflow-x: scroll;
    scrollbar-width: thin;
    overflow-y: hidden;
}

.flip-card-back{
    .backprop-card{
        height: 125px;
    }
    .title-card{
        font-size: 12px;
        height: 50px;
    }
    .originalTitle-card{
        font-size: 12px;
        height: 50px;
    }
    .lenguage-card{
        height: 25px;
    }
    .vote-card{
        height: 25px;
    }
    .overview-card{
        overflow-y: scroll;
        height: 125px;
    }
    .emptyOverview-card{
        height: 125px;
    }
    .overview-scroll{
        position: absolute;
        bottom: 0;
        max-height: 200px;
        overflow-y: scroll;
    }
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
  background-color: #333;
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
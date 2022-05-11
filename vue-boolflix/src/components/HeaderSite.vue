<template>
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
        <div class="containerLent d-flex"><input
        type="text" 
        placeholder="title, people, genres" 
        v-model="UserSearch"
        @keyup="SearchMovies(), SearchShow()"
        @keyup.enter="state()"
        >
        <!-- <div @click="move()" class="fontContainer"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div> -->
        </div>
    </div>
</template>

<script>
import axios from "axios"
import state from '@/state.js';



export default {
    name: "HeaderSite",
    data() {
        return {
            UserSearch: "",
            ThemoviedbApi: "",
            TheActorApi:"",
            movieList: [],
            tvShow: [],
            ActorList:[],
        };
    },
    methods: {
/*         move(){
            let move = document.getElementsByClassName('fontContainer');
            move.style.left("-180px");
        }, */
        SearchMovies() {
            if(this.UserSearch == ''){
                this.movieList=[];
                return;
            }
            this.ThemoviedbApi = "https://api.themoviedb.org/3/search/movie?api_key=193243e6ba454e23bb7950ff587b4977&language=it&include_adult=false&query=" + this.UserSearch;
            axios
                .get(this.ThemoviedbApi)
                .then((result) => {
                this.movieList = result.data.results;
                //console.log(this.movieList);
                return this.movieList;
            });
        },
        /* vote(voto){
            return Math.round(Number(voto) / 2)
        }, */
        SearchShow() {
            if(this.UserSearch == ''){
                this.tvShow=[];
                return;
            }
            this.ThemoviedbApi = "https://api.themoviedb.org/3/search/tv?api_key=193243e6ba454e23bb7950ff587b4977&language=it-IT&query=" + this.UserSearch;
            axios
                .get(this.ThemoviedbApi)
                .then((result) => {
                this.tvShow = result.data.results;
                //console.log(this.tvShow);
                return this.tvShow;
            });
        },
        state(){
            //console.log(this.movieList);
            //console.log(this.tvShow);
            state.movieList = this.movieList;
            state.tvShow = this.tvShow;
            console.log(state);
        }
    },
    
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
    .containerLent{
        height: 30px;
        position: relative;
        input{
            position: relative;
            
            right: 0px;
        }
        .fontContainer{
            position: absolute;
            color: white;
            padding: 10px 0 10px 155px;
            background-color: #333;
            z-index: 10;
        }
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
        width: 100%;
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
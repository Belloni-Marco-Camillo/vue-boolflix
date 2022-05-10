<template>

  <div id="app">
    <HeaderSite />
  </div>
  

</template>

<script>
import HeaderSite from './components/HeaderSite.vue';


export default {
  name: 'App',
  components: {
    HeaderSite,
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

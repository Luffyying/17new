<template>
  <div id="app">
    <Hi></Hi>
  </div>
</template>

<script>
import Hi from './components/Hi'
export default{
  name:'app',
  components:{
    Hi
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


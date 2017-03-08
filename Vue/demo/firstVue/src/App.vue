<template>
  <div id="app">
    <section class="clock_header">
        <h1>计时器</h1>
    </section>
    <section>
      <nav class="clock_nav">
        <router-link to="/home">首页</router-link>
        <router-link to="/clocklist">计时列表</router-link>
      </nav>
      <div class="clock_sidebar">
        <Sidebar></Sidebar>
      </div>  
    </section>
  </div>
</template>

<script>
import Hi from './components/Hi'
import Sidebar from './components/Sidebar'
export default{
  components:{
    Sidebar
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


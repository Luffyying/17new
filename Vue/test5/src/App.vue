<template>
  <div id="app">
    <div class="container body">
      <div class="main-container">
      <!-- ref被用来给元素或者子组件注册引用信息 -->
        <sidebar ref="sidebar"></sidebar>
        <top v-on:sideToggle="transToggle"></top>
        <!-- role的作用是增强语义性 -->
        <div class="right-col" role="main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import sidebar from './component/sideBar2.vue'
  import top from './component/top.vue'
  export default{
    name: 'app',
    data () {
      return {
        selected:[],
        show:true,
        msg: 'Hello World',
        totalTime:2
      }
    },
    //components:{timeEntries,home,sidebar}
    components:{sidebar,top},
    methods:{
      //这里我们直接通过ref索引获取调用Sidebar子组件的toggleMenuShowAll方法
      transToggle(){
        this.$refs.sidebar.toggleMenu();
      },
      created() {
          $('body').attr('class', 'nav-md');
      },
      mounted() {
          $('.right_col').css('min-height', $(window).height());
      }
    }
  } 
</script>
<template>
  <div id="firstCom">
  		<h3>我是第二页</h3>
  		<ul>
	      <li v-for="article in articles">
	        {{article.title}}
	      </li>
    	</ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'haha',
      articles:[]
    }
  },
  mounted:function(){
  	this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10',{},{
  		headers:{

  		},
  		emulateJSON:true
  	}).then(function(response){
  		this.articles = response.data.subjects
  	},function(response){
  		console.log(response)
  	})
  }
}
</script>
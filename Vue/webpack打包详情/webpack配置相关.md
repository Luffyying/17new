what is webpack?
分析目录结构，找到js模块以及其它的一些浏览器不能直接运行的扩展。
忽略环境的安装，直接从项目说起：

# package.json #

1. 创建项目的文件夹，进入文件夹后，执行npm init命令，系统需要完善初识化配置，按照步骤执行即可。
1. 再看项目，此时已经生成了一个package.json的文件，它就像一个项目的生产说明书,也是启动整个项目的基础。

		{
			"name": "athena-new",
			"version": "1.0.0",
			"description": "",
			"main": "index.js",
			"scripts": {
				"dev":"cross-env NODE_ENV=development webpack-dev-server --open --hot",
    			"build":"cross-env NODE_ENV=production webpack --progress"
			},
			"repository": {
				"type": "git",
				"url": "ssh://git@gitlab.17zuoye.net:10022/bigdata/athena-new.git"
			},
			"author": "",
			"license": "ISC",
			"dependencies": {
				"axios": "^0.16.2",
				"element-ui": "^1.4.7",
				"vue": "^2.5.2",
				"vue-router": "^3.0.1",
				"vuex": "^3.0.0"
			},
			"devDependencies": {
				"babel-core": "^6.26.0",
				"babel-loader": "^7.1.2",
			}
		}
1. devDependencies --save-dev 在开发环境中用到的依赖,
dependencies  --save 生产环境下用到的依赖
license：ISC 一种开放源代码许可证，让人知道使用的权利和限制
scripts:一些npm脚本命令，Key：生命周期事件，Value时要运行的命令。如上的dev命令	

		npm run build
		/*等同于*/
		webpack --progress
	原理：推荐阮一峰老师的文章http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html




1.  path.resolve([from ...],to)将to的位置指定为一个绝对路径里面
path.join()用于连接路径。






# webpack.config.js #

这个文件中内容较多,可以慢慢消化。
这里包含一些打包任务的相关的配置和一些插件的使用。一个项目可以配置多个配置文件，针对不同环境完成不同的功能。(下面关于各种插件的详细解释，大多都基于此配置文件，可以参考着阅读)

	var path = require('path')
	var webpack = require('webpack')
	
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const ExtractTextPlugin = require('extract-text-webpack-plugin')

	//loader用于对模块的源代码进行转换
	
	module.exports = config = {
	entry:{
		app:'./index.js',
		vendor: [
            'vue',
            'vuex',
            'vue-router',
        ]
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'js/[name].[hash].js',
	},
	module:{
		rules:[
		{
			test:/\.css$/,
			loader:ExtractTextPlugin.extract({
				fallback:'style-loader',//采用什么去提取css
				use:[
					'css-loader'//采用什么loader去编译css
				]
			})
		},{
			test:/\.css$/,
			include:path.resolve(__dirname,"./App.vue"),
			loader:['style-loader','css-loader']
		},
		{
			test:/\.vue$/,
			loader:'vue-loader',
			options:{
				loaders: {
		            'scss': 'vue-style-loader!css-loader!sass-loader',
		            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
		          }
			}
		}, {
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: /node_modules///排除的,可以忽略的
      }]
	},
	devServer: {
    	//任意的404响应(服务器上不存在的文件)都可能需要被重定向为index.html
    	historyApiFallback: true,
		inline:true
  	},
	resolve:{
		extensions:['.js','.json','.vue','.css','sass'],
		alias: {
	      		'myvue': path.resolve(__dirname,'./App.vue'),
	  	}
	},
	externals:{
        jquery:'window.jQuery'
    },
	plugins:[
		new ExtractTextPlugin('css/all.css'),
		//new ExtractTextPlugin('./dist/css/all.css'),
		new HtmlWebpackPlugin({
			filename:path.resolve(__dirname,'./dist/index.html'),
			template:path.resolve(__dirname,'./index.html'),
			inject:true//注入
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names:['vendor']
		}),
		//定义全局变量
		new webpack.DefinePlugin({
				'process.env': {NODE_ENV: '"production"'},
				__DEV__:true
		}),
		//给输出文件添加注释头
        new webpack.BannerPlugin('版权所有，翻版必究'),
        //
        new webpack.optimize.OccurrenceOrderPlugin(true),
		]
	}

这个例子采用了commonJs规范，通过require引入插件，最后再将模块暴露出去。

1. entry:项目的入口文件，output:打包后的文件存储的位置

	entry:'./index.js'//仅有一个入口的情形,如下是index.js的内容

		import Vue from 'vue'
		import App from './App.vue'
		new Vue({
			el:'#app',
			render:h => h(App)
		})

	entry:['./index.js','./one.js']//也可以是一个数组，最后整合到一个js文件里
	
		entry:{
			app:'./index.js',
			vendor: [
				'vue',
				'vuex',
				'vue-router',
				'element-ui'
			]
		}
	//也可以是一个对象，此时的应用场景：应用程序app and 第三方库入口vendor

		entry: {
			pageOne: './src/pageOne/index.js',
			pageTwo: './src/pageTwo/index.js',
			pageThree: './src/pageThree/index.js'
		}

 	//此时的应用场景：多页面应用程序,由于入口起点怎多，多页应用能够复用入口起点之间的大量代码

		output:{
			path:path.resolve(__dirname,'./dist'),//绝对路径
			filename:'js/[name].[hash].js',//输出到硬盘的文件名
			publicPath:''
		},
	name:entry.key,hash:哈希值

	publicPath:

	<!-- 指定了一个在浏览器中被引用的URL地址，默认值为空
	对于script和
	link加载器，当文件路径不同于他们的本地磁盘路径的时候，它被用来作为href指向该文件，当需要将
	静态文件放在不同的域名或者cdn上面的时候有用。 -->

	静态资源最终访问路径 = output.publicPath + 资源loader或者插件等配置路径,举个栗子：
	
		ouput.publicPath = '/static/'
		//js打包配置,publicPath最好以'/'结尾，后面的配置路径不要以'/'开头
		{
			filename:'js/[name].js'
		}
		//最终访问路径为：
		output.publicPath +'js/[name].js' = '/static/js/[name].js'
以上是针对webpack.config.js中output.publicPath,它的功能是为了可以访问打包后的静态资源，在用API
调用webpack-dev-server,或者webpack-dev-middleware时，也会遇到一个publicPath,它们是有区别的，比如

		var server = new webpackDevServer(compiler, {
		 hot: true,
		 publicPath: '/web/'
		});
		server.listen(8282, "0.0.0.0")

当你查看webpack-dev-server所有启动后的资源：访问/webpack-dev-server时，点击其中的一个资源，会发现，
这些资源的路径是/web/xxxxx,注入index.html文件中的js路径变为：/web/js/main.js,但是，style.css中的图片路径
仍然为/static/img/xx.jpg

		var server = new webpackDevServer(compiler, {
		 hot: true,
		 publicPath: '/web/'
		});

当二者不一样的时候：

1）浏览 index.html 需要加上 webpack-dev-server 配置的 publicPath 才能访问（http://localhost:8282/web/）

2）所加载的资源也都加上了'/web/'；

2. __dirname返回当前项目文件夹所在的完整绝对路径

	若当前项目所在的文件夹为demo,则：

	path.resolve(__dirname,'./xx')  //D:\demo\xx

	path.resolve(__dirname,'/xx')  //D:\xx

  	path.join(__dirname,'src'); //D:\demo\src 

3. resolve:其他解决方案配置（文件路径的指向问题）

	extensions//在引入模块的时候不带扩展

	alias//别名

4. module

	test:

	exclude:

	include:

	loader:

5. externals:表明从外部引入，内部不会打包合并进去

	可以在index.html中这样引入：

		<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
	
	在入口文件index.js中，当你这样使用时，jq不会被打包：

		import $ from 'jquery'
		console.log($('body'));

	


4. plugins:配置插件

2. 详细介绍下常用的插件
### ExtractTextPlugin ###

功能：抽离css

在没有使用插件之前（仅仅使用了相关loader），webpack会自动搜索页面中加载的*.css，在打包的时候都会与js代码打包在一起，就像下面代码一样：

	exports.push([module.i, "body{\r\n\tbackground: #ccc;\r\n}", ""]);

所有页面的css都会被打包进入口文件，以style的形式出现在响应的页面，
这样会使页面显得过于臃肿，如果想把css单独打包,使用ExtractTextPlugin可以抽离出css,以link的形式加在相应的模块中，优点：可以和js并行加载，有利于缓存，缺点：请求更多次的Http请求，加快运行时间。（适合样式文件大小较大的时候）

(对于vue中的内部css(style形式)，可以不用css相关loader,因为vue-loader已经满足了这个条件,但是如果要使用外部样式，还是需要在options里面添加loaders)

在此将所有样式打包到一个文件下all.css(html中的css不会被打包)

new ExtractTextPlugin('css/all.css')

因为出口是同一个，路径则是相对于output.path的，
但是，如果一些异步加载的components里面的css不希望被打包到首屏的html中，也就是不想抽离，减少体积减少，加快加载速度，则：

	{
		test:/\.css$/,
		include:path.resolve(__dirname,"./App.vue"),
		loader:['style-loader','css-loader']
	}


### HtmlWebpackPlugin ###

功能：生成html文件

有时你可能需要一个系统的首页，展示title或者其他的属性，所以也要把这个index.html加入到dist下面，还要将打包后的多入口js,css一并引入，HtmlWebpackPlugin正好起到生成html页面的作用，

title:生成的html文件的title,可以被template中的title代替

filename:生成的文件名，不会被template的名字代替,路径是相对于output.path的（在 webpack-dev-server 中，则相对于 webpack-dev-server 配置的 publicPath）

template:模板，路径是相对于output.context的，故要放在output.context下面才能被识别

context:是entry配置项的根目录（绝对路径）

inject:注入选项

1）true:默认值，script标签位于html文件的body底部

2）body:同true

3）head:script标签位于html文件的head内

4）false:不插入生成的 js 文件，只是单纯的生成一个 html 文件

favicon:生成 favicon，和title一样，会被template覆盖

minify：

1)false:默认值，不压缩HTML

2)压缩选项：具体请参考 https://github.com/kangax/html-minifier#options-quick-reference

hash:给生成的Js文件一个独特的hash值

cache:表示只有在内容变化时才会生成一个新的文件

chunks:针对多入口文件，可以使用数组的形式定义入口是否使用这些入口


### CommonsChunkPlugin ###

功能：提取公共模块

为何要分离第三方库？一般他们都比较稳定，不会轻易改变，利用浏览器缓存后，用户再次加载页面会减少服务器请求，提高速度优化体验，这和提取多个入口的公共模块的作用类似。

	new webpack.optimize.CommonsChunkPlugin({
		name:'common',
		chunks:['app','vendor'],
		//minChunks: n  //提取至少n个模块共有的部分
	})

如上，将app and vendor入口模块的公共部分提取出来放入到common.js中，此时，你会发现打包后的app.js和vendor.js的大小明显变小了，因为大部分都跑到了common.js中了。

此时可以将common.js放入到HtmlWebpackPlugin的chunks里面了。


	new webpack.optimize.CommonsChunkPlugin({
		name:'vendor',
	})

如果直接这样写，表示默认把所有的入口的公共部分都放入vendor.js中。


（抽离第三方库的时候，如上面entry中的vendor,但是每当这里面的文件有改动，Hash值都会改变，缓存也就失效了，但是一般情况我们是不会动这里面的文件的。）

###  UglifyJsPlugin ### 

webpack自带了一个压缩插件 UglifyJsPlugin
通过压缩可以减少更多的体积



### DefinePlugin ### 

功能：创建一个在编译时（编译时替换）可以配置的全局变量(使用场景如：根据设置的变量决定是否打包压缩及启动dev server 还是prod server)

例如：上面的config文件，在一个index.js中，可以直接这样使用：

	if(__DEV__){
	console.log('这是全局变量')
	}

	console.log(process.env.NODE_ENV);//production
process是node.js里面的一个对象,它可以在任意的地方使用，process.env则表示当前系统下的环境变量。
还可以通过另一种方式：package.json
	
	"scripts":{
		"dev":"cross-env NODE_ENV=development ...."
	}
	new webpack.EnvironmentPlugin(['NODE_ENV'])

### webpack-dev-server ###

功能：它是一个轻量级express服务器

1.为静态文件提供服务

2.自动刷新和热替换



用法：以命令行形式和以Node.js API启动

命令行下：

webpack配置中的devSever配置项（上面的devServer配置）只对在命令行模式有效，默认端口是8080

1）--hot 热替换

2）--config 指定执行某一个配置文件

3） --inline 默认是找webpack.config.js

4） --content-base 默认以当前目录为基本目录，除非你制定它

5） --port 指定特定端口

Node.js API下（如下代码摘抄，理解大概意思即可）：


	var config = require("./webpack.config.js");
	var webpack = require('webpack');
	var WebpackDevServer = require('webpack-dev-server');
	config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
	var compiler = webpack(config);
	var server = new WebpackDevServer(compiler, {
		contentBase:'build/',
		publicPath: "/assets/"
	});
	server.listen(8080);

注意：webpack-dev-server生成的包并没有放在你的真实目录中,而是放在了内存中. 每次修改文件后，你会发现在命令行中显示了新的打包结果，但是磁盘中的打包目录下却没有生成新的文件。

### webpack-dev-middleware ###

### BannerPlugin ###

作用：为生成的文件添加注释头

查看文件你会在头发现这样的注释：

	/*! 版权所有，翻版必究 */

### OccurrenceOrderPlugin ###


功能：排序输出

通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用

#  .babelrc #
Babel的配置文件是.babelrc，用来设置转码的规则和插件，(rc结尾的文件通常代表运行时自动加载的文件)存放在项目的根目录下，它用来设置转码规则和插件，基本格式：

	{
		"presets":["env","es2015"],
		"plugins":[]
	}

当然要install "babel-preset-env","babel-preset-es2015": 

babel-polyfill:
Babel默认只转换新的js句法，但是不转换新的API，如：Set,Generator,Promise等全局对象，此时需要这个插件

babel-core:需要调用Babel的API进行转码

#  .gitignore #

.gitignore 配置文件用于配置不需要加入版本管理的文件

	.DS_Store
	node_modules/
	dist/
	npm-debug.log
	yarn-error.log

	# Editor directories and files
	.idea
	*.suo
	*.ntvs*
	*.njsproj
	*.sln

规则：

1）fd/* 忽略目录fd下的内容，无论是根目录下的/fd/目录，还是某个子目录下的目录

2）/fd/* 只忽略根目录下的/fd/目录

语法：

以斜杠“/”开头表示目录

　　以星号“*”通配多个字符

　　以问号“?”通配单个字符

　　以方括号“[]”包含单个字符的匹配列表

　　以叹号“!”表示不忽略(跟踪)匹配到的文件或目录










在早期，模块定义的方式多种多样，最常见的一种是：

	var module = (function($,YAHOO){
	//.....
	
	})(jQuery,YAHOO)


node.js的模块系统是参考commonJs的，适合于服务器端，因为模块直接存在于硬盘里面，以一种同步的形式执行，
var a = require('math');
a.add()
但是在浏览器端，js文件都是后加载的，所以应该以异步的形式来展现，于是有个AMD（AMD的一个库：require.js）
require([module],callback)
define([],function(){
})


发布上线的时候,node_modules就不需要了，需要的（package.json中的dependencies）会被打包进去，发布的就是打包后的结果,所以用来打包的那些诸如express服务器，就不用部署到线上了，直接用就可以了，而且浏览器是不认识vue的，打包的过程也是将还要把Vue编译成CSS，JS。

相对路径加载文件的几种方式:
如果是
var config = require('../config')
则默认识别config目录下的index.js文件





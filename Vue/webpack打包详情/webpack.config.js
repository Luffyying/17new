var path = require('path')
var webpack = require('webpack')
var glob = require('glob')
var htmlWebpackPlugin = require('html-webpack-plugin')
var config = {}

module.exports = config =  {
  entry: {},
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins:[],
  devtool: '#eval-source-map'
}
//多个入口
function comJs(){
	var files = glob.sync('./src/apps/*/main.js');
	var newEntries = {};
	files.forEach(function(f){
		var name = /.*\/(.*?\/main)\.js/.exec(f)[1];
		newEntries[name] = f;
	})
  newEntries['build'] = './src/main.js'
	return newEntries;
}

config.entry = Object.assign({}, config.entry, comJs());//生成js

function plg(){
	var files = glob.sync('./src/apps/*/main.js');
	var newEntries = {};
	var plgs = [];
	files.forEach(function(f){
		var name = /.*\/(.*?\/main)\.js/.exec(f)[1];
//		var h_name = /.*\/(.*?\/index)\.html/.exec(f)[1];
		//newEntries[name] = f;
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		console.log(name)
		var md_name = name.split("/")[0];
		console.log("&&&&&&&&&"+md_name);
		var plug = new htmlWebpackPlugin({
					filename:  md_name+'/index.html', // html 文件输出路径
	        chunks: [name],//应用的模块
	        template: path.resolve(__dirname, './src/apps/'+md_name+'/index.html'),//应用的模板
	        inject: true
	    })
		plgs.push(plug);
	})
	return plgs;
}
config.plugins.push.apply(config.plugins,plg());//生成多个入口HTML

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

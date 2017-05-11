关于jQuery的就绪函数和传统js的就绪函数:

$:

		$(document).ready(function(){
			console.log("document loaded");
		});
		$(function(){
			console.log('document loaded');
		});
（后者是简化版）

还有两个常用的，也算是就绪函数

	$(window).on('load',function(){
			console.log('window loaded');
		});
		$('#vp').on('load',function(){
			console.log('has load');
		});

传统:

	window.onload = function(){
			show();
		}

二者区别

1.window.onload和$(window).on('load')是类似的，即等到页面中所有元素都加载完，js才可以访问页面的任何元素,而$的ready 只要DOM树加载完即可，比如一个图库网站，如果使用ready,与图片有关的HTML下载完毕，并且已经解析为DOM树了，但可能图片还没有加载完毕，所以图片的高度和宽度这样的属性，包括获取和位置相关的属性，scrollTop()等，都无法使用,这时$('#vp').on('load')就派上用场了。

2.多次使用的问题，onload，一次只能保存对一个函数的引用,会覆盖,但是，ready就可以，会在现有的行为上追加新的行为，这些行为函数会根据注册的顺序依次执行。


3.还有一个以前不知道的，一般像onload事件之类的使用匿名函数执行，即window.onload = function(){show()}这种形式才是在所有元素加载完毕之后才执行

function(){show()}这种形式才是在所有元素加载完毕之后才执行，

	<body>
	</script>
		function show(){
			alert($('span').text());
			alert('lletet');
		}
		window.onload = function(){
			show();
		}

		//window.onload = show();
	</script>
	<span>jjjjkjkj</span>
	</body>


（head中的脚本：head中存放的脚本是需要调用才执行的脚本，或者是事件触发执行的脚本
，但是body部分中的脚本，是页面被加载的时候执行的，故放在body部分的脚本通常来被用作生成页面。这样可以看到效果，估计是alert()有延迟，阻塞了进程）
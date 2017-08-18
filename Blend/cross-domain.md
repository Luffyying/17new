关于跨域的实践栗子：
使用了http://www.officeweb365.com/提供的在线预览功能，代码如下：
	
	<iframe id="myframe" name="myframe" class="dociframe" data-bind="attr: {src: iframeUrl}, event: {load: setLoadingEnd}" frameborder="0"></iframe>

但是在我的父窗口，main.html下想要访问里面的DOM，或者想使用里面a链接的地址，但是这是最明显的跨域问题，读或者写iframe都不允许。但是还是可以获得到iframe这个大标签，里面的就无从得知了。

还有一种情况是自己本地写的iframe，这样就有很多种方法实现双方通讯。（具体遇到再详解）
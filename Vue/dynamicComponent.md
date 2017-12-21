###动态组件 ###

	<sidebar v-show="showAnswerPanel" :open="sidebarOpen" @switch="switchSidebar">
			<answer-panel v-if="showAnswerPanel" :qobj="qobj"></answer-panel>
		</sidebar>

如上是两个组件，分别是sidebar，answerPanel。正常使用使用就可以了，今天遇到这样的组件：

	<component v-else
		:qobj="qobj" 
		:is="tplName" 
		:index="currentIndex"
		:total="qlist.length"
		ref="base">
	</component>

	data(){
		return {
			tplName: 'base-tpl',
		}
	}

	import baseTpl from './tpls/base';

（1）仅仅需要注意这里就好了***:is="tplName"*** ,这就是动态组件——简单来说多个组件放在同一个挂载点上，依据父元素的变量来控制显示和隐藏的关系，如果没有匹配到响应的组件则不显示。
（2）其中涉及到一个***keep-alive***组件，如果在被切除后，依然使其保留在内存中，避免下次出现的时候重新渲染。它是一个内置抽象组件，自身不会渲染一个DOM元素，也不会出现在父组件链中。
include - 字符串或正则表达式。只有匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何匹配的组件都不会被缓存
	
	<keep-alive :include="/a|b/">
		<component></component>
	</keep-alive>

(3)activated / deactivated
使用keep-alive的时候用到，当切换到keep-alive组件的时候调用activated，离开的时候调用 deactivated    
和data,methods是平级的，当这个函数中的done参数执行的时候，组件才会切换，故也可以将异步请求的数据放在这里执行，然后done()即可。
(4)transition-mode过渡模式
组件切换的时候有个过渡的动画效果

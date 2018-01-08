### about slot 内容分发 ###

（1）背景：一般情况下，在父组件中，想要给子组件添加一些DOM是实现不了的。栗子：
在父组件question.vue中
	
	<sidebar v-show="showAnswerPanel" :open="sidebarOpen" @switch="switchSidebar">
			<span>渲染后，看不到我的。</span>
		</sidebar>
在子组件sidebar.vue中：

	<div>我是子组件的全部内容</div>

http://blog.csdn.net/sinat_17775997/article/details/52484072

这样我们是看不到span里面的内容的，故使用方法slot。

（2）单个的无名的slot

这是一个默默奉献的slot,修改子组件：

	<div>我是子组件的全部内容</div>
	<slot></slot>
渲染后的结果：可以看到span里面的内容。自然，无论是一个span，还是写了多个DOM结构，都被看做是一个整体。

（3）具名的slot
将放在子组件里的HTML代码放置在不同位置
修改父组件：

	<sidebar v-show="showAnswerPanel" :open="sidebarOpen" @switch="switchSidebar">
			<span slot="first">123</span>
			<span slot="first">456</span>
		</sidebar>
修改子组件：

	<div>我是子组件的全部内容</div>
	<slot name="first"></slot>
	<span>lalala</span>
	<slot name="second"></slot>

(4)分发内容的作用域，由其模板决定（父组件）

参考：http://blog.csdn.net/sinat_17775997/article/details/52484072



	




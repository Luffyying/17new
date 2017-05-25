关于父组件和子组件之间的关系
通常在父组件中使用router-view来承载子组件，当子组件需要一些数据参数的时候，尽量不要太过依赖父组件，通过传值来实现，低耦合才是好的，将自顶向下转换为以消息通知上层。这样的好处在处理多级嵌套的组件的时候比较明显。

	<router-view :data="data1"></router-view>


	<router-view v-on:change="change"></router-view>

1.beforeCreate

组件实例刚被创建，组件属性计算之前，如data属性等

2.created

组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在

3 beforeMount?

模板编辑/挂载之前

4.mounted

5.beforeUpdata

组件更新之前

6.updated

组件更新之后

7.activated

for keep-alive ,组件被激活时调用

8.deactivated 

for keep-alive ,组件被移除时调用

9.beforeDestory 

组件销毁前调用

10.destoryed

组件销毁后调用

关于get语法：


有的时候，希望访问属性的时候能返回一个动态计算后的值，或希望不通过使用明确的方法调用而显示内部变量的状态.在JavaScript中, 能通过使用 getter 实现. 尽管可能结合使用getter和setter创建一个伪属性,但不能既使用getter绑定到一个属性上,同时又用该属性真实的存储一个值.（可以通过delete 删除getter）

	var o ={
			name:'',
			get firstName(){
				return (this.name.split(' ')[0]);
			}
			set firstName(item){
				this.name = item +''+this.name.split(' ')[1]
			}
		}

如上，在新对象o初始化的时候，创建了一个虚假属性，firstName,手动改变它的值是不起作用的。

	var o ={
			age:6
		}
		Object.defineProperty(o,"home",{
			get:function(){
				return this.age + 1;
			}
		});

如上，是在已经存在的对象上定义getter.

关于set

当尝试设置该属性的时候，其将对象属性绑定到要调用的一个函数上，也就是说，在js中，当试图改变一个属性的值的时候，对应的setter将被执行，一个拥有真实值的属性就不能再有setter了。

		var p ={
			set current (str){
				return this.log[this.log.length] = str;
			},
			log:[]
		}

		var q ={
			age:6
		}
		Object.defineProperty(q,"home",{
			set:function(s){
				this.age = s;
			}
		});

同get一样，有两种情况。

在控制台中：

q.home = '9'

q

Object{age:'9'}







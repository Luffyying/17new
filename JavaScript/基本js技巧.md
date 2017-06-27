		/* 三元操作符 将if...else语句使用三元操作符来替代 */
		const answer= x>10?'true':'false';
		/* 短路求值简写方式 当给一个变量分配另一个值的时候，想确定下原始值不是null，undefined或者空值，可以撰写一个多重条件的If语句*/
		if(variable !=null || variable !==undefined || variable !==''){
			let variable2 = variable;
		}
		/*声明变量简写方法*/
		let x;let y;let z=3;
		let x,y,z=3;
		/*if存在条件简写方法*/
		if(l===true){}
		if(l)
		if(!l)
		/*js循环简写方法*/
		for(let i=0;i<arr.length;i++){}
		arr.foreach(function(ele,index,array){})
		/*对象属性简写,如果属性名和key名相同，用es6方法*/
		const a = {x:x,y:y};
		const a= {x,y};
		/*箭头函数*/
		function say(name){
			//
		}
		setTimeout(function(){});
		list.forEach(function(){

		});
		say = name =>{

		}
		setTimeout(() =>{},200);
		list.forEach(item =>{});
		/*模板字符串*/
		const wel= 'sdf'+sd+'ss';
		const db='http://';
		//ES6可以使用反引号和${}
		const wel= `you have logged in as ${first} ${second}`;
		const db= `http://${host}`
		/*解构赋值简写方法*/
		//在web框架中，经常需要从组件和API之间来回传递数组或对象字面量形式的数据，然后需要解构它
		const observable1 = require('mobx/observable1');
		const observable2 = require('mobx/observable2');
		const observable3 = require('mobx/observable3');
		const store = this.props.store;
		const form = this.props.form;
		const loading = this.props.loading;
		//可以转成下面的写法
		import {observable1,observable2,observable3} from 'mobx';
		const {store,form,loading} = this.props;
		/*多行字符串简写*/
		const str = '<html>'+ 'sdfsdf'+ '</html>';
		const str = `<html>sdfsdf
				</html>`
		/*扩展运算符简写*/
		/*双重非位运算简写*/
		Math.floor(4.9) === 4
		//向下取整 简写如下 
		~~4.9 ===4
		/*Array.find*/
		//在ES6中新增的find
		const pets = [
		  { type: 'Dog', name: 'Max'},
		  { type: 'Cat', name: 'Karl'},
		  { type: 'Dog', name: 'Tommy'},
		]
		pet = pets.find(pet => pet.type==='Dog' && pet.name ==='Tonny');
		console.log(pet);

		//重磅 扩展运算符
		//joining arrays
		const odd = [1, 3, 5 ];
		const nums = [2 ,4 , 6, ...odd];
		console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

		// cloning arrays
		const arr = [1, 2, 3, 4];
		const arr2 = [...arr];
		const odd = [1, 3, 5 ];
		const nums = [2, ...odd, 4 , 6];

		//也可以使用扩展运算符解构：
		const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
		console.log(a) // 1
		console.log(b) // 2
		console.log(z) // { c: 3, d: 4 }
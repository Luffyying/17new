优化你的代码（摘自前端早读课【第933期】javascript少一点条件语句）
	
	<script>
		//第一种重构条件语句的方法是避免使用else
		//尽可以以最直接的方式来返回数据,如下的栗子
		function render(data){
			let menuHtml = '';
			if(menuHtml===null){
				menuHtml = '<div class="menu-error"></div>';
			}else if(data.length ===0){
				menuHtml = '<div>menu here</div>';
			}else{
				menuHtml = '<ul>menu</ul>'
			}
			return menuHtml;
		}
		//将上述代码重构，不使用else，一旦符合我们的一个条件，就直接返回结果然后退出,利于读者阅读
		function render(data){
			if(menuHtml===null){
				return '<div class="menu-error"></div>'
			}
			if(data.length ===0){
				return '<div>menu here</div>'
			}
			return '<ul>menu</ul>'
		}
		//能尽量使用三元操作符的时候，尽量不用if
		let foo = (bar ==='some value') ? baz : qux;
		//切换switch
		let notificationPtrn;
		switch (notification.type) {
		    case 'citation':
		        notificationPtrn = 'You received a citation from {{actingUser}}.';
		        break;
		    case 'follow':
		        notificationPtrn = '{{actingUser}} started following your work';
		        break;
		    case 'mention':
		        notificationPtrn = '{{actingUser}} mentioned you in a post.';
		        break;
		    default:
		        // Well, this should never happen
		}
        //改造后
        function getnotificationPtrn(n) {
        switch (n.type) {
            case 'citation':
                return 'You received a citation from {{actingUser}}.';
            case 'follow':
                return '{{actingUser}} started following your work';
            case 'mention':
                return '{{actingUser}} mentioned you in a post.';
            default:
                // Well, this should never happen
        	}
   		}

    	let notificationPtrn = getNotificationPtrn(notification);
    	//更优化一步 有一个纯函数
    	function getNotificationPtrn(n){
    		const textOptions = {
    			citation: 'You received a citation from {{actingUser}}.',
        		follow:   '{{actingUser}} started following your work',
        		mention:  '{{actingUser}} mentioned you in a post.',
    		}
    		return textOptions[n.type]
    	}
    	let notificationPtrn = getNotificationPtrn(notification);
    	//于是 用数据替代一种控制结构 而且有更少的代码缩进
    	const textOptions = {
    			citation: 'You received a citation from {{actingUser}}.',
        		follow:   '{{actingUser}} started following your work',
        		mention:  '{{actingUser}} mentioned you in a post.',
    		}
    	function getNotificationPtrn(textOptions,n){
    		return textOptions[n.type]
    	}
    	const notificationPtrn = getNotificationPtrn(txtOptions, notification);
    	//如上改进的操作中没有处理未知的通知类型

    	function getNotificationPtrn(textOptions,n){
    		if(typeof textOptions[n.type] ==='undefined'){
    			return 'error...'//这里替代了switch中的default
    		}
    		return textOptions[n.type]
    	}
    	//也可以把默认的信息作为参数 在||运算符中，如果第一部分是假值，JS会直接返回第二部分
    	const dflt ='error...'
    	function getNotificationPtrn(defaultTxt,textOptions,n){
    		return textOptions[n.type] || defaultTxt;
    	}
    	const notificationPtrn = getNotificationPtrn(defaultTxt,txtOptions, notification);
    	function getNotificationPtrn(txtOptions, n) {
    		return txtOptions[n.type]
        			|| 'You’ve received some sort of notification we don’t know about.';
		}
	</script>
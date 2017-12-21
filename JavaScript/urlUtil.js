//传入url,返回参数字典（缺省url，默认url）
function getUrlParams(url=window.location.href){
	// test : url = "test.tiku.17zuoye.net/xx/questions/list?subject_id=102&name=luffy&age=66"
	let queryString= ''
	if(url.indexOf('?') !== -1){
		url.replace(/(.*)\?(.*)/,RegExp.$2)
		queryString = url.replace(/(.*)\?(.*)/,RegExp.$2)
	}else{
		queryString = ''
	}
	//queryString = url.indexOf('?')==-1?'':url.replace(/(.*)\?(.*)/,RegExp.$2)
	return getParamsDict(queryString)
}

//传入参数字符串，返回参数字典
function getParamsDict(queryString){
	let dict = {};
	let item = queryString.split('&');//["subject_id=102", "name=luffy", "age=66"]
	item.forEach(function(item,index,array){
		dict[item.split('=')[0]] = item.split('=')[1]
	})
	return dict
}

//传入一个字典，生成参数字符串
function renderQueryString(dict){
	let urlString = {subject_id: "102", name: "luffy", age: "66"};
	let queryArray = [];
	for(let k in urlString){
		queryArray.push(k+'='+urlString[k]);
	}
	return queryArray.join('&')
}
export default{
	getUrlParams,
	getParamsDict,
	renderQueryString
}

define(['knockout', "Tools"], function(ko, $tools){
	class Task {
		constructor(d) {
			this.addList = ko.observableArray([]);//白名单数据
			this.addValue = ko.observable('');//新添加的数据
		}
	}
	return Task;
});

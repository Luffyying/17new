'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['knockout', "Tools"], function (ko, $tools) {
	var Task = function Task(d) {
		_classCallCheck(this, Task);

		this.addList = ko.observableArray([]); //白名单数据
		this.addValue = ko.observable(''); //新添加的数据
	};

	return Task;
});
//# sourceMappingURL=es6/maps/listClass.js.map
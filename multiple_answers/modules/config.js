'use strict';

define(['knockout', 'Tools', 'mobilePreview', 'initEditor', 'popbox', 'slideout', 'ko-mapping', 'popbox'], function (ko, $tools, mobilePreview, question, initEditor) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.loading = self.parent.loading;
        self.loading(false);

        self.subject_id = ko.observable(101);
        self.previewUrl = ko.observable('');
        self.currentQuestionId = ko.observable('');
        self.dealTpl = ko.observable({});

        self.today_mark = ko.observable(0); //今天标记的题目数
        self.answered_status = ko.observable(1);
        self.templates = ko.observable({});
        self.button_visible = ko.observable(false);
        self.button_disable = ko.observable(true);

        //是否仅显示一个验证环节的条件
        self.isOnly = ko.observable(true);
        self.configTpl = ko.observable({});
        self.dataList = ko.observableArray([]);
        //self.dataList = ko.observableArray([{subject:'1',mark_count:2,condition:'788'}]);
        self.isAdd = false;
        //添加
        self.addConfig = function () {
            self.isOnly(true);
            self.con('');
            self.isAdd = true;
            var box = $.popbox({
                title: '添加配置',
                width: '800px',
                maxHeight: '450px',
                content: '<div id="configTpl" data-bind="template: configTpl"></div>',
                customPos: { marginTop: '-300px', marginLeft: '-400px' },
                onOpen: function onOpen(box) {
                    ko.applyBindings(self, box[0]);
                    self.configTpl({
                        name: self.data.mapping.getTmpl('configTpl')
                    });
                },
                onOk: function onOk() {
                    $tools.ajax({
                        url: '/multiple_answers/edit_config',
                        data: {
                            subject_id: self.subject_id(),
                            check_times: self.time(),
                            condition: $('input:checked').val()
                        },
                        success: function success(returnData) {
                            console.log(returnData.data);
                            self.dataList.push(returnData.data);
                            $tools.msgTip('操作成功', 'success');
                            box.close();
                        }
                    });
                    return false;
                },
                onClose: function onClose() {}
            });
        };
        self.times = ko.observableArray([1, 2, 3, 4, 5]);
        self.time = ko.observable('');
        //点击编辑任务
        self.con = ko.observable('');
        self.edit_config = function (taskData) {
            console.log(taskData);
            self.isAdd = false;
            self.con(taskData.condition.toString());
            self.time(taskData.check_times);
            self.isOnly(taskData.check_times == 1 ? false : true);
            var box = $.popbox({
                title: taskData.subject,
                width: '800px',
                maxHeight: '450px',
                content: '<div id="configTpl" data-bind="template: configTpl"></div>',
                customPos: { marginTop: '-300px', marginLeft: '-400px' },
                onOpen: function onOpen(box) {
                    ko.applyBindings(self, box[0]);
                    self.configTpl({
                        name: self.data.mapping.getTmpl('configTpl')
                    });
                },
                onOk: function onOk() {
                    $tools.ajax({
                        url: '/multiple_answers/edit_config',
                        data: {
                            subject_id: taskData.subject_id,
                            check_times: self.time(),
                            condition: $('input:checked').val()
                        },
                        success: function success(returnData) {
                            //self.dataList.(returnData.data);
                            $tools.msgTip('操作成功', 'success');
                            box.close();
                            window.location.reload();
                        }
                    });
                    return false;
                },
                onClose: function onClose() {}
            });
        };
        $('body').off('config_page_ready').on('config_page_ready', function () {
            $tools.ajax({
                url: '/multiple_answers/configs',
                data: {},
                success: function success(returnData) {
                    console.log(returnData);
                    self.dataList(returnData.data);
                }
            });
        });

        if (self.data.test) {
            window.config = self;
        }
    };
});
//# sourceMappingURL=es6/maps/mark.js.map
//# sourceMappingURL=es6/maps/config.js.map
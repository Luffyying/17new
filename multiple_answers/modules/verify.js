'use strict';

define(['knockout', 'Tools', 'Task', 'popbox', 'slideout', 'ko-mapping', 'question_detail'], function (ko, $tools, Task) {
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
        self.button_disable = ko.observable(false);
        var status_num_map = {
            check_finished_count: 0,
            check_unfinished_count: 0,
            today_my_check_count: 0,
            today_my_mark_count: 0
        };
        self.status_num = ko.mapping.fromJS(status_num_map);
        self.subject_id.subscribe(function () {
            self.getNum();
            self.isShow(false);
            self.button_visible(false);
        });
        self.getNum = function () {
            $tools.ajax({
                url: '/multiple_answers/tips',
                data: {
                    subject_id: self.subject_id()
                },
                success: function success(returnData) {
                    console.log(returnData);
                    ko.mapping.fromJS(returnData, self.status_num);
                }
            });
        };
        self.question_id = ko.observable('');
        self.isShow = ko.observable(false);
        self.list = ko.observableArray([]);
        self.white_list = ko.observableArray([]);
        self.isWhite = false;
        self.questionDetialParams = {
            question_id: self.question_id,
            v: new Task(),
            list: self.list,
            white_list: self.white_list,
            isWhite: self.isWhite
        };
        //获取题目
        self.isShow = ko.observable(false);
        self.getQuestions = function () {
            $tools.ajax({
                //url:'xx/questions/list',
                url: '/multiple_answers/check_extract',
                data: {
                    subject_id: self.subject_id()
                },
                success: function success(returnData) {
                    var d = returnData.data;
                    console.log(d);
                    console.log(d.question.content.sub_contents[0]);
                    self.list(d.question.content.sub_contents[0]);
                    self.question_id(d.question_id);
                    self.white_list(d.check_answers_list);
                    self.isShow(true);
                    self.button_visible(true);
                    self.button_disable(false);
                }
            });
        };
        self.submit = function () {
            $tools.ajax({
                url: '/multiple_answers/check',
                data: {
                    subject_id: self.subject_id(),
                    white_list_data: self.questionDetialParams.v
                },
                success: function success(data) {
                    self.white_list.push(666);
                    console.log(self.white_list());
                    self.button_disable(true);
                    self.today_mark(self.today_mark() + 1);
                    self.status_num.verified_count(self.status_num.verified_count() + 1);
                    self.status_num.unverified_count(self.status_num.unverified_count() - 1);
                    $tools.msgTip('操作成功', 'success');
                }
            });
        };

        $('body').off('verify_page_ready').on('verify_page_ready', function () {
            self.getNum();
        });
        if (self.data.test) {
            window.verify = self;
        }
    };
});
//# sourceMappingURL=es6/maps/mark.js.map
//# sourceMappingURL=es6/maps/verify.js.map
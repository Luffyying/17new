'use strict';

define(['knockout', 'Tools', 'PaginationMod', 'UserListFilterMod', 'popbox', 'slideout', 'ko-mapping', 'ko-datepicker'], function (ko, $tools, PaginationMod, UserListFilterMod) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.loading = self.parent.loading;
        self.loading(false);

        self.subject_id = ko.observable('101');

        self.previewUrl = ko.observable('');
        self.currentQuestionId = ko.observable('');
        self.dealTpl = ko.observable({});

        self.today_mark = ko.observable(0); //今天标记的题目数
        self.answered_status = ko.observable(1);

        self.templates = ko.observable({});
        self.button_visible = ko.observable(false);
        self.button_disable = ko.observable(true);

        self.task_name_cn = ['题目标记', '题目验证'], self.user_id = ko.observable('');
        self.start_at = ko.observable('');
        self.end_at = ko.observable('');
        self.dataList = ko.observableArray([]);
        self.switch_stat = ko.observable(0);
        //导航菜单
        self.switch_button = ko.observable(0);
        self.isShow = ko.observable(false);
        //任务切换
        self.change_button = function (index) {
            self.switch_button(index);
            // self.templates({});
            self.dataList([]);
            self.isShow(false);
            console.log(self.dataList());
        };
        //搜索
        self.getData = function (page) {
            //console.log(self.dataList());
            self.isShow(true);
            self.switch_stat(0);
            // self.dataList([]);
            console.log('search');
            console.log(self.switch_button());
            $tools.ajax({
                url: 'multiple_answers/stat',
                data: {
                    stage: self.switch_button() + 1,
                    start_at: self.start_at(),
                    end_at: self.end_at(),
                    user_id: self.user_id(),
                    subject_id: self.subject_id(),
                    //subject_id:'',
                    page: page || 1,
                    export: self.switch_stat()
                },
                success: function success(returnData) {
                    self.dataList(returnData.data);
                    PaginationMod.renderPagination(returnData.page, returnData.per_page, returnData.total, 'getData');
                }
            });
        };
        window.getData = self.getData;

        //下载数据
        self.downloadData = function () {
            console.log(self.switch_stat());
            self.switch_stat(1);
            var oReq = new XMLHttpRequest();
            var url = 'multiple_answers/stat';
            oReq.open("POST", url, true);
            oReq.responseType = "blob";
            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4) {
                    if (oReq.status == 200) {
                        window.open(URL.createObjectURL(oReq.response));
                    } else {
                        alert(oReq.responseText);
                    }
                }
            };
            var oMyForm = new FormData();
            oMyForm.append("subject_id", self.subject_id() || '');
            oMyForm.append("stage", self.switch_stat() + 1 || '');
            oMyForm.append("user_id", self.user_id() || '');
            oMyForm.append("start_at", self.start_at() || '');
            oMyForm.append("end_at", self.end_at());
            oMyForm.append("export", self.switch_stat());
            oReq.send(oMyForm);
        };

        $('body').off('statistic_page_ready').on('statistic_page_ready', function () {
            //初始化用户筛选
            UserListFilterMod.init({
                url: '/service/all-users',
                userInput: $('#name'),
                getSubject: self.subject_id
            });
        });

        if (self.data.test) {
            window.statistic = self;
        }
    };
});
//# sourceMappingURL=es6/maps/mark.js.map
//# sourceMappingURL=es6/maps/statistic.js.map
'use strict';

define(['knockout', 'ko-mapping'], function (ko) {
  function question_detail(params) {
    console.log(params.data.list());
    var self = this;
    var context = params.data;

    self.content = params.data.list;

    self.content.listData = context.white_list;
    console.log(self.content());
    //console.log(self.content);
    // console.log(self.content());
    self.isWhite = context.isWhite;
    console.log(self.isWhite);
    self.nid = ko.observable(12345); //编号
    //self.stem = ko.observable(12345);//小题题干
    self.stem = context.list().content;
    self.con = context.content;
    self.values = context.v.addValue;
    self.answer = ko.observableArray([3, 2, 1]); //答案
    context.v.addList = params.data.white_list;
    //self.listData = context.v.addList;
    self.listData = context.white_list;
    self.analysis = context.list().analysis;
    self.question_id = context.question_id;
  }
  ko.components.register('question-detail', {
    viewModel: question_detail,
    template: { require: "text!question_detail_tpl" }
  });
});
//# sourceMappingURL=es6/maps/question_detail.js.map
define(['knockout', 'Tools', 'Task','mobilePreview', 'popbox', 'slideout', 'ko-mapping','question_detail'], function (ko, $tools,Task) {
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
        self.ma_id = ko.observable('');
        self.isShow = ko.observable(false);
        self.isWhite = true;
        self.list = ko.observableArray([]);
        self.question_id = ko.observable('');
        self.white_list = ko.observableArray([]);
        self.questionDetialParams = {
            question_id:self.question_id,
            v:new Task(),
            list:self.list,
            white_list:self.white_list,
            isWhite:self.isWhite,
        };
         //提交的数据
        let postData = {
            ma_id:'',
            answers:[]
        }
        let countArr =[];
        //获取题目
        let arrs = [];
        self.search = function () {
            countArr = [];
            arrs = [];
           $tools.ajax({
                url:'/multiple_answers/white_list',
                type:'GET',
                data:{
                    question_id:self.ma_id()
                },
                success:function(returnData){
                    let d = returnData.data;
                    console.log(d);
                    console.log(d.question.content.sub_contents[0]);
                    postData.ma_id = d._id;
                    self.list(d.question.content.sub_contents);
                    self.question_id(d.question_id);
                    self.white_list(d.question.content.sub_contents.undetermined_answers);
                    //self.white_list(d.undetermined_answers);
                    countArr = [];//记录多答案的数目
                    for(let item of d.undetermined_answers){
                        let arr = [];
                        let a = item.answers;
                        let count = 0;
                        for(let i of a){
                            count++;
                            arr.push(i.answers_list);
                        }
                        countArr.push(count);
                        // postData.answers.push(arr);
                        arrs.push(arr);
                    }
                    self.isShow(true);
                    self.button_visible(true);
                    self.button_disable(false);
                    
                }
            });
        };
        self.submit = function(){
           $('.white_list').find('textarea').each(function(i){

                var p = $(this).val();
                    var k = p.split('\n');
                    //console.log(k);
                    //var ar = [];
                    for(var i=0;i<k.length;i++){
                        console.log(k[i]);
                        var s = k[i].split(',');
                        ar.push(s);
                    }
                    //self.list.white_list_answers[i].push(ar);
                    arrs[i].push(ar);
            });
            //var array = self.questionDetialParams.v.addValue().split(',');
            //console.log(array);
            //postData.answers.push(array);
            $tools.ajax({
                url:'/multiple_answers/white_list',
                data:JSON.stringify(postData),
                success:function(data){
                    self.white_list.push(self.questionDetialParams.v.result);
                }
            });
        };
       
        $('body').off('list_page_ready').on('list_page_ready', function () {
            //self.getQuestionNum();
        });
        if(self.data.test){
            window.list = self;
        }

    };
});
//# sourceMappingURL=es6/maps/mark.js.map
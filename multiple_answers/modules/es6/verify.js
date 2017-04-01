define(['knockout', 'Tools','Task', 'popbox', 'slideout', 'ko-mapping','question_detail'], function (ko, $tools, Task) {
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
        let status_num_map = {
            check_finished_count:0,
            check_unfinished_count:0,
            today_my_check_count:0,
            today_my_mark_count:0
        }
        self.status_num = ko.mapping.fromJS(status_num_map);
        self.subject_id.subscribe(function(){
            self.getNum();
            self.isShow(false);
            self.button_visible(false);
        });
        self.getNum = function(){
            $tools.ajax({
                url:'/multiple_answers/tips',
                data:{
                    subject_id:self.subject_id()
                },
                success:function(returnData){
                    console.log(returnData);
                    ko.mapping.fromJS(returnData,self.status_num);
                }
            });
        };
        self.question_id = ko.observable('');
        self.isShow = ko.observable(false);
        self.list = ko.observableArray([]);
        self.white_list = ko.observableArray([]);
        self.isWhite = false;
        self.questionDetialParams = {
            question_id:self.question_id,
            v:new Task(),
            list:self.list,
            white_list:self.white_list,
            isWhite:self.isWhite
        };
        let countArr =[];
        //获取题目
        let arrs = [];
        self.isShow = ko.observable(false);
        self.getQuestions = function () {
            countArr = [];
            arrs = [];
           $tools.ajax({
                //url:'xx/questions/list',
                url:'/multiple_answers/check_extract',
                data:{
                    subject_id:self.subject_id()
                },
                success:function(returnData){
                    let d = returnData.data;
                    console.log(d);
                    console.log(d.question.content.sub_contents[0]);
                    self.list(d.question.content.sub_contents);
                    self.question_id(d.question_id);
                    self.white_list(d.question.content.sub_contents.check_answers_list);
                    countArr = [];//记录多答案的数目
                    for(let item of d.question.content.sub_contents.undetermined_answers){
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
                    for(var i=0;i<k.length;i++){
                        console.log(k[i]);
                        var s = k[i].split(',');
                        ar.push(s);
                    }
            });
            let newArr = [];
            let arr = [];
            $('input[type="checkbox"]').each(function(){
                arr.push($(this).prop('checked'));
            });
            console.log(arr);
            let newArr_c = [];//true false
           for(let i=0;i<countArr.length;i++){
                let n=0;
                newArr_c.push(arr.slice(n.countArr[i]));
                countArr[i] = n;
           }
           let last = [];
           for(let j=0;j<arrs.length;j++){
                let k = [];
                for(let t=0;t<arrs[j].length;t++){
                    if(newArr_c[j][t]==true){
                        k.push(arrs[j][t]);
                    }
                }
                last.push(k);
           }
            postData.answers = last;
            $tools.ajax({
                url:'/multiple_answers/check',
                data:{
                    subject_id:self.subject_id(),
                    white_list_data:self.questionDetialParams.v
                },
                success:function(data){
                    self.white_list.push(666);
                    console.log(self.white_list());
                    self.button_disable(true);
                    self.today_mark(self.today_mark() + 1);
                    self.status_num.verified_count(self.status_num.verified_count()+1);
                    self.status_num.unverified_count(self.status_num.unverified_count()-1);
                    $tools.msgTip('操作成功', 'success');
                }
            });
        };
       


        $('body').off('verify_page_ready').on('verify_page_ready', function () {
             self.getNum();
        });
         if(self.data.test){
            window.verify = self;
        }

    };
});
//# sourceMappingURL=es6/maps/mark.js.map
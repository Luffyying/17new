define(['knockout', 'Tools', 'Task', 'popbox', 'slideout', 'ko-mapping','question_detail'], function (ko, $tools,Task) {
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

        self.isWhite = false;
        self.list = ko.observableArray([]);
        self.white_list = ko.observableArray([]);
        self.question_id = ko.observable('');
        self.questionDetialParams = {
            question_id:self.question_id,
             v:new Task(),
            // v:
            list:self.list,
            white_list:self.white_list,
            isWhite:self.isWhite
        };
        self.whiteData = ko.observableArray([]);
        //提交的数据
        let postData = {
            ma_id:'',
            answers:[]
        };
        let countArr =[];
        //获取题目
        let arrs = [];
        self.isShow = ko.observable(false);
        self.getQuestions = function(){
            countArr = [];
            arrs = [];
            $tools.ajax({
                url:'/multiple_answers/extract',
                data:{
                    subject_id:self.subject_id()
                },
                success:function(returnData){
                    let d = returnData.data;
                    console.log(d);
                    //console.log(d.question.content.sub_contents[0]);
                    postData.ma_id = d._id;
                    self.list(d.question.content.sub_contents);
                    self.question_id(d.question_id);
                    self.white_list(d.question.content.sub_contents.undetermined_answers);
                    //self.white_list(d.undetermined_answers);
                    console.log(d.undetermined_answers);
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
                    console.log(arrs);
                    console.log(countArr);
                   
                    //self.questionDetialParams.v.addList = arrs;
                    //console.log(self.questionDetialParams.v.addList);
                    //console.log(JSON.stringify(postData));
                    self.isShow(true);
                    self.button_visible(true);
                    self.button_disable(false);
                }
            });

        };
        self.getNum = function(){
            $tools.ajax({
                url:'/multiple_answers/tips',
                data:{
                    subject_id:self.subject_id()
                },
                success:function(returnData){
                    //console.log(returnData.data.today_my_mark_count);
                    self.today_mark(returnData.data.today_my_mark_count);
                }
            });
        };
        self.subject_id.subscribe(function(){
            self.getNum();
            self.isShow(false);
            self.button_visible(false);
        });
        self.submit = function(){
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
            //console.log(arrs);
            // for(let i=0;i<arrs.length;i++){
            //     if(arr[i]==true){
            //         newArr.push(arrs[i]);
            //     }
            // }
            //var array = self.questionDetialParams.v.addValue().split(',');
            //console.log(array);
           // postData.answers = newArr;
            //postData.answers.push(array);
            postData.answers = last;
           console.log(last);
          
            $tools.ajax({
                url:'/multiple_answers/mark',
                data:JSON.parse(postData),
                //data:JSON.stringify(postData),
                success:function(data){

                    self.button_disable(true);
                    self.today_mark(self.today_mark() + 1);
                    $tools.msgTip('操作成功', 'success');
                }
            });
            
           // self.questionDetialParams.v.addList.push(array);
            //self.white_list.push(self.questionDetialParams.v.addValue());
            //console.log(self.questionDetialParams.v.addList);
            //console.log(self.white_list());
        };
    
        $('body').off('mark_page_ready').on('mark_page_ready', function () {
            self.getNum();
            console.log($('input'));
        });
        if(self.data.test){
            window.mark = self;
        }

    };
});
//# sourceMappingURL=es6/maps/mark.js.map
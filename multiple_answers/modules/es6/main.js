define(['knockout', 'sammy'], function (ko, Sammy) {
    return function (context) {
        let self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.loading = ko.observable(false);
        self.palette = ko.observable({});

        self.menus = ko.observableArray([
            {
                id: 'mark',
                title: '题目标记',
                route: '#/mark'
            },
            {
                id: 'verify',
                title: '题目验证',
                route: '#/verify'
            },
            {
                id: 'statistic',
                title: '工作量统计',
                route: '#/statistic'
            },
            {
                id: 'list',
                title: '白名单管理',
                route: '#/list'
            },
            {
                id: 'config',
                title: '配置管理',
                route: '#/config'
            }
        ]);


        self.focusMenu = ko.observable('mark');
        self.hideLeftMenu = ko.observable(false); //是否隐藏左侧菜单
        self.data.showLeftNav(false); //隐藏顶部左侧导航
        Sammy(function (){
            this.templateCache = function () {};
            this.get(/\/multiple_answers.*\#\/([^/]+)\/?([^/]*)\/?([^/]*)/, function(){

                let moduleName = this.params.splat[0];
                self.data.itemId = this.params.splat[1];
                self.data.itemIndex = this.params.splat[2];
                self.focusMenu(moduleName);

                self.palette({ 
                    name: self.data.mapping.get(moduleName), 
                    template: self.data.mapping.getTmpl(moduleName), 
                    data: { parent: self, data: self.data }, 
                    afterRender: () => {
                        $('body').trigger(moduleName+'_page_ready');
                        self.loading(false);
                    }
                });
                self.loading(true);
            });

        });

        Sammy().run();

        if (self.data.test) {
            window.main = self;
        }

    };
});

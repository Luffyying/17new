关于window.open()的兼容性问题：
举个栗子，一个简单的下载功能

	self.centerDownload = function(){
            var oReq = new XMLHttpRequest();
            var url = '/resource/download/'+'R20170707040551674';
            // let url = '/resource/download/'+self.resource_id();
            oReq.open("GET", url, true);
            //默认执行异步操作，false不会返回任何东西或报错
            oReq.responseType = "blob";
            oReq.onreadystatechange = function(){
            	
                 if (oReq.readyState==4){
                    if (oReq.status==200){
                        if(oReq.response.type ==="application/octet-stream"){
                        	if(window.navigator && window.navigator.msSaveOrOpenBlob){
                        		 window.navigator.msSaveOrOpenBlob(oReq.response);
                        	}else{
                        		window.open(URL.createObjectURL(oReq.response));
                        	}
                        }
                    }
                    else{
                        alert(oReq.responseText);
                    }
                 }
            };
            oReq.send();

		}

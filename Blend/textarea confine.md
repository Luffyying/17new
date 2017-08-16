记录一个关于textarea的常见需求：
//评论区字数控制
		
	//评论区字数控制
		self.countWord = function(textareaName,spanName){
			if($(textareaName).val().length<=240){
				document.getElementById(spanName).innerHTML = 240 - document.getElementById(textareaName).value.length +'字'; 
				console.log(document.getElementById(spanName).innerHTML);
			}else{
				layer.msg('不可在输入了',{ time: 3000,icon:5});
			}
		}

		<div class="feedback">
			<textarea  data-bind='value:feedback_content,event:{keyup:countWord("textarea","word"),keydown:countWord("textarea","word")}' maxlength=240  data-bind="value:feedback_content" placeholder="写点评论支持下文档贡献者~" name="" id="textarea" rows="5"></textarea>
			<div class="text-length"><span id="word">240字</span></div>
		</div>

		.text-length{
			top: 79px;
		    text-align: right; 
		    position: absolute;
		    right: 9px;
		    color:#D6D6D6;
		}
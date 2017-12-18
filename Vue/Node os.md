### node.js在windows下获取内网IP地址: ###
			


		function getIPAdress(){
			let interfaces = require('os').networkInterfaces();//类似这样的一个对象
			let interfaces = require('os').networkInterfaces();
			for(let i in iface){
				let alias = iface[i];
				if(alias.family ==='IPv4' && alias.address != '127.0.0.1' && !alias.internal){
					return alias.address;
				}
			}
		}

		
		interfaces是类似这样的对象：
		{
			'本地连接':[{
				address:'fe80:4107:e4fe:54cc:a470',
				netmask:'ffff:ffff:ffff:ffff::',
				family:'IPv6',
				mac:'48:4d:7e:b2:56:a1',
				scopeid:11,
				internal:false
				}]
		}
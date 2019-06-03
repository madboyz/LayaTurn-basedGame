var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var neohomeUI=(function(_super){
		function neohomeUI(){
			
		    this.title=null;
		    this.main_option=null;
		    this.initsdk_btn=null;
		    this.login_button=null;
		    this.show_read_view_button=null;
		    this.show_tx_view=null;
		    this.recharge_button=null;
		    this.gas_button=null;
		    this.confirm_button=null;
		    this.balance_button=null;
		    this.userinfo_button=null;
		    this.nettype_button=null;
		    this.set_en_button=null;
		    this.set_cn_button=null;
		    this.read_contract_view=null;
		    this.nnc=null;
		    this.sbParamJson=null;
		    this.sbPushString=null;
		    this.extString=null;
		    this.read_contract_action=null;
		    this.contract_return_main=null;
		    this.invokescript_btn=null;
		    this.result_view=null;
		    this.result_content=null;
		    this.result_return_btn=null;

			neohomeUI.__super.call(this);
		}

		CLASS$(neohomeUI,'ui.neohomeUI',_super);
		var __proto__=neohomeUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(neohomeUI.uiView);

		}

		neohomeUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1278,"skin":"comp/bg.png","sizeGrid":"27,5,3,4","height":718}},{"type":"Text","props":{"y":62,"x":58,"width":333,"var":"title","text":"NEO Laya Demo","name":"title","height":30,"fontSize":30,"color":"#ff0400"}},{"type":"Box","props":{"y":117,"x":53,"var":"main_option","name":"main_option"},"child":[{"type":"Button","props":{"width":153,"var":"initsdk_btn","skin":"comp/button.png","name":"initsdk_btn","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"初始化SDK","height":51}},{"type":"Button","props":{"y":2,"x":188,"width":150,"var":"login_button","skin":"comp/button.png","name":"login_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"登陆","height":51}},{"type":"Button","props":{"y":74,"x":2,"width":150,"var":"show_read_view_button","skin":"comp/button.png","name":"show_read_view_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"合约读取","height":51}},{"type":"Button","props":{"y":73,"x":186,"width":150,"var":"show_tx_view","skin":"comp/button.png","name":"show_tx_view","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"合约交易","height":51}},{"type":"Button","props":{"y":74,"x":373,"width":150,"var":"recharge_button","skin":"comp/button.png","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"充值","height":51}},{"type":"Button","props":{"y":72,"x":542,"width":150,"var":"gas_button","skin":"comp/button.png","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"GAS转账","height":51}},{"type":"Button","props":{"y":72,"x":710,"width":150,"var":"confirm_button","skin":"comp/button.png","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"确认通知","height":51}},{"type":"Button","props":{"y":156,"x":4,"width":150,"var":"balance_button","skin":"comp/button.png","name":"balance_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"余额","height":51}},{"type":"Button","props":{"y":156,"x":189,"width":150,"var":"userinfo_button","skin":"comp/button.png","name":"userinfo_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"用户信息","height":51}},{"type":"Button","props":{"y":159,"x":375,"width":150,"var":"nettype_button","skin":"comp/button.png","name":"nettype_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"网络类型","height":51}},{"type":"Button","props":{"y":243,"x":6,"width":150,"var":"set_en_button","skin":"comp/button.png","name":"set_en_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"英文","height":51}},{"type":"Button","props":{"y":243,"x":190,"width":150,"var":"set_cn_button","skin":"comp/button.png","name":"set_cn_button","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"中文","height":51}}]},{"type":"Box","props":{"y":111,"x":310,"width":674,"visible":false,"var":"read_contract_view","pivotY":-3,"pivotX":1,"name":"read_contract_view","height":546},"child":[{"type":"TextInput","props":{"y":78,"x":29,"width":554,"var":"nnc","text":"0xcfe8f6824365f70d382733a92d8f373ee4faf222","name":"nnc","height":47,"fontSize":20,"font":"Microsoft YaHei","color":"#030303","borderColor":"#000000","bold":true}},{"type":"TextInput","props":{"y":176,"x":32,"width":554,"var":"sbParamJson","text":"[\"(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT\"]","name":"sbParamJson","height":47,"fontSize":20,"font":"Microsoft YaHei","color":"#030303","borderColor":"#000000","bold":true}},{"type":"Text","props":{"y":51,"x":29,"text":"nnc","fontSize":20,"color":"#000000","bold":true}},{"type":"Text","props":{"y":150,"x":29,"text":"sbParamJson","fontSize":20,"color":"#000000","bold":true}},{"type":"Text","props":{"y":250,"x":37,"text":"sbPushString","fontSize":20,"color":"#000000","bold":true}},{"type":"TextInput","props":{"y":276,"x":32,"width":554,"var":"sbPushString","text":"balanceOf","name":"sbPushString","height":47,"fontSize":20,"font":"Microsoft YaHei","color":"#030303","borderColor":"#000000","bold":true}},{"type":"Text","props":{"y":348,"x":32,"text":"extString","fontSize":20,"color":"#000000","bold":true}},{"type":"TextInput","props":{"y":373,"x":36,"width":554,"var":"extString","text":"invokeScript","name":"extString","height":47,"fontSize":20,"font":"Microsoft YaHei","color":"#030303","borderColor":"#000000","bold":true}},{"type":"Button","props":{"y":464,"x":131,"width":153,"visible":false,"var":"read_contract_action","skin":"comp/button.png","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"合约读取","height":51}},{"type":"Text","props":{"y":4,"x":252,"text":"合约读取","fontSize":30,"font":"Microsoft YaHei","color":"#161414","bold":true}},{"type":"Button","props":{"y":464,"x":339,"width":153,"var":"contract_return_main","skin":"comp/button.png","name":"contract_return_main","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"返回","height":51}},{"type":"Button","props":{"y":462,"x":133,"width":153,"visible":false,"var":"invokescript_btn","skin":"comp/button.png","name":"invokescript_btn","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"交易","height":51}}]},{"type":"Box","props":{"y":148,"x":61,"width":1156,"visible":false,"var":"result_view","name":"result_view","height":419},"child":[{"type":"Text","props":{"y":64,"x":235,"wordWrap":true,"width":655,"var":"result_content","text":"result","overflow":"scroll","name":"result_content","height":243,"fontSize":30,"color":"#000000"}},{"type":"Button","props":{"y":340,"x":486,"width":150,"var":"result_return_btn","skin":"comp/button.png","name":"result_return_btn","labelStrokeColor":"#c01b18","labelSize":25,"labelFont":"Microsoft YaHei","labelBold":true,"label":"返回","height":51}}]}]};
		return neohomeUI;
	})(View);
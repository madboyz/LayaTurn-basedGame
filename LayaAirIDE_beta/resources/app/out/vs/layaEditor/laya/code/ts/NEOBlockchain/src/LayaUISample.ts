import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;
import Event = Laya.Event;

class TestUI extends ui.test.TestPageUI {

	public var that:TestUI ;
	constructor() {
		super();
		that = this
		
		this.initsdk_btn.on(Event.CLICK,this,this.onInitButtonClick);
		this.login_button.on(Event.CLICK,this,this.onLoginButtonClick);
		this.show_read_view_button.on(Event.CLICK,this,this.on_show_button_click);


		this.contract_return_main.on(Event.CLICK,this,this.on_contract_return_main);
		this.read_contract_action.on(Event.CLICK,this,this.on_read_contract_action);
		this.show_tx_view.on(Event.CLICK,this,this.on_show_tx_view);
		this.invokescript_btn.on(Event.CLICK,this,this.on_invokescript_btn);

		this.result_return_btn.on(Event.CLICK,this,this.on_result_return_btn);

		this.gas_button.on(Event.CLICK,this,function(){
			that.set_result('请查看函数makeGasTransfer')
		})
		
				
		this.recharge_button.on('click',null,function(){
			that.set_result('请查看函数makerecharge')
		})

		this.confirm_button.on('click',null,function(){
			that.set_result('请查看函数confirmappnotify')
		})

		this.userinfo_button.on('click',this,this.getUserInfo)
		this.balance_button.on('click',this,this.getbalance)
		this.nettype_button.on('click',this,this.getNetType);
		this.set_en_button.on('click',this,function(){
			that.setLang('en');
		})

		this.set_cn_button.on('click',null,function(){
			that.setLang('cn');
		})
	
	}

		/**
			init
		 */
		private function onInitButtonClick(e:Event):void {
			console.log('init sdk');
			var appid = "5";
			var appkey = "";
			window.BlackCat.SDK.init(appid, appkey, result_callback, "cn")
		}

		private function onLoginButtonClick(e:Event):void {
			  window.BlackCat.SDK.login(this.login_callback);
		}


		private function on_show_button_click(e:Event):void{
			console.log('change view to read contract');
			this.main_option.visible = false;
			this.read_contract_view.visible = true;
			this.invokescript_btn.visible = false;
			this.read_contract_action.visible = true;

			this.nnc.text = '0x3f7420285874867c30f32e44f304fd62ad1e9573';
			this.sbParamJson.text = '["(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT"]';
			this.sbPushString.text = 'balanceOf'
			this.extString.text = 'invokeScript'
		}


		private function on_contract_return_main(e:Event):void{
			  this.main_option.visible = true;
			  this.read_contract_view.visible =false;
		}


		//合约读取执行
		private function on_read_contract_action(e:Event):void{

			console.log('on_read_contract_action')
			 var data = {
                nnc: this.nnc.text,
                sbParamJson: this.sbParamJson.text,
                sbPushString: this.sbPushString.text,
                extString: this.extString.text
            }

            console.log(data);
            data.sbParamJson = JSON.parse(data.sbParamJson)
            window.BlackCat.SDK.invokescript(data, function(res){
                console.log('[BlackCat]', 'invokescript.callback.function.res => ', res)
            })
		}


		 //打开合约交易界面
		private function on_show_tx_view(){
			 console.log('open tx view');
			this.main_option.visible = false;
			this.read_contract_view.visible =true;

			this.nnc.text = '0x3f7420285874867c30f32e44f304fd62ad1e9573';
			this.sbParamJson.text = '["(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT","(address)AWPVmAobCJGxrupvQSnovofakaVb2ue65a","(integer)100000"]';
			this.sbPushString.text = 'transfer'
			this.extString.text = 'makeRawTransaction'

			this.invokescript_btn.visible = true;
			this.read_contract_action.visible = false;
		}

    	//交易执行
		private function on_invokescript_btn():void{
			var data = {
                nnc: this.nnc.text,
                sbParamJson: this.sbParamJson.text,
                sbPushString: this.sbPushString.text,
                extString: this.extString.text
            }
            data.sbParamJson = JSON.parse(data.sbParamJson)
            window.BlackCat.SDK.invokescript(data, function(res){
                console.log('[BlackCat]', 'invokescript.callback.function.res => ', res)
            })
		}

		//结果页面返回
		private function on_result_return_btn():void{
			this.main_option.visible = true;
			this.read_contract_view.visible =false;
			this.result_view.visible = false;
		}

		//查询余额
		private function getbalance():void{
			window.BlackCat.SDK.getBalance(function(res){
				console.log("getbalance.callback.function.res ", res)
			})
		}


		//获取用户信息
		private function getUserInfo():void{
			window.BlackCat.SDK.getUserInfo(function(res){
				console.log("getUserInfo.callback.function.res ", res)
			})
		}

		private function getNetType():void{
			window.BlackCat.SDK.getNetType(function(res){
				console.log("getNetType.callback.function.res ", res)
			})
		}

		private function setLang(lang:String):void{
			 window.BlackCat.SDK.setLang(lang)
		}

		private function set_result(str:String):void{
			this.result_content.text = str
			this.main_option.visible = false;
			this.read_contract_view.visible = false;
			this.result_view.visible = true;
		}
		
		
		var result_callback = function(data){
			that.result_content.text = JSON.stringify(JSON.parse(data));
			that.main_option.visible = false;
			that.read_contract_view.visible = false;
			that.result_view.visible = true;
		}

		// //结果回调
		// private function result_callback(data:String):void{
		// 	 console.log('result_callback',data);
		
		// }

		private function login_callback(data:String):void{
			console.log('login callback',data)
		}

		
		


		//gas转账
		function makeGasTransfer()
				{
					var data = {
						toaddr: document.getElementById('toaddr').value,
						count: document.getElementById('gascount').value,
						extString: document.getElementById('extString4').value
					}
					BlackCat.SDK.makeGasTransfer(data, function(res){
						console.log("makeGasTransfer.callback.function.res ", res)
					})
				}

			//充值
			function makerecharge()
			{
				var data = {
					count: document.getElementById('count').value,
					extString: document.getElementById('extString3').value
			}

				BlackCat.SDK.makeRecharge(data, function(res){
					console.log('[BlackCat]', 'makeRecharge.callback.function.res => ', res)
				})
			}

			//确认通知
			function confirmappnotify()
			{
				var data = {
					txid: document.getElementById('txid').value
				}

				BlackCat.SDK.confirmAppNotify(data, function(res){
					console.log('[BlackCat]', 'confirmAppNotify.callback.function.res => ', res)
				})
			}
			

		

	

	
}

//程序入口
Laya.init(1280, 720, WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

function beginLoad(){
	Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}

function onLoaded(): void {
	//实例UI界面
	var testUI: TestUI = new TestUI();
	Laya.stage.addChild(testUI);
}
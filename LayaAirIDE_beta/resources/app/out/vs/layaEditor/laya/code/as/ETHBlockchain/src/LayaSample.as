package {

	import laya.display.Stage;
	import laya.webgl.WebGL;
	import laya.events.Event;
	import laya.display.Sprite;
	import laya.display.Text;

	//import LayaGCS
	
	public class LayaSample {

		//将合约的ABI引入 这里的gooABI是编译好智能合约的.json文件
		private	var gooAbi:Array = [{"constant": false,"inputs": [{"name": "unitId","type": "uint256"}, {"name": "amount","type": "uint256"}],"name": "buyBasicUnit","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{ "constant": true,"inputs": [],"name": "getGameInfo","outputs": [{"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256[]"}, {"name": "","type": "bool[]"}],"payable": false,"stateMutability": "view","type": "function"}]
			
	
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640,WebGL);

			var instruction_label:Text = new Text();
			instruction_label.color = '#ffffff';
			instruction_label.x = 100;
			instruction_label.y = 100;
			instruction_label.text = '点击方块调用区块链函数';
			Laya.stage.addChild(instruction_label);

			
			//初始化区块链引擎的按钮
			var init_button:Sprite = new Sprite();
			init_button.graphics.drawRect(0, 0, 90, 90, "#ffff00");
			init_button.x = 100;
			init_button.y = 166
			init_button.width = 90;
			init_button.height = 90;
			Laya.stage.addChild(init_button);
			init_button.on('click',this,this.on_init_button_click);

			var init_label:Text = new Text();
			init_label.color = "#ffff00";
			init_label.fontSize = 20;
			init_label.x = 300;
			init_label.y = 166;
			init_label.text = '初始化区块链引擎'
			Laya.stage.addChild(init_label);


			//绘制读取合约按钮
			var read_contract_data_button:Sprite = new Sprite();
			read_contract_data_button.graphics.drawRect(0,0,90,90,"#ff00ff");
			read_contract_data_button.x = 100;
			read_contract_data_button.y = 266;
			read_contract_data_button.height = 90;
			read_contract_data_button.width = 90;
			Laya.stage.addChild(read_contract_data_button);
			read_contract_data_button.on('click',this,this.on_read_button_click);


			var read_label:Text = new Text();
			read_label.color = "#ff00ff";
			read_label.fontSize = 20;
			read_label.x = 300;
			read_label.y = 266;
			read_label.text = '读取线上合约数据'
			Laya.stage.addChild(read_label);


			//绘制调用合约按钮
			var call_contract_method_button:Sprite = new Sprite();
			call_contract_method_button.graphics.drawRect(0,0,90,90,"#00ffff");
			call_contract_method_button.x = 100;
			call_contract_method_button.y = 366;
			call_contract_method_button.width = 90;
			call_contract_method_button.height = 90;
			Laya.stage.addChild(call_contract_method_button);
			call_contract_method_button.on('click',this,this.on_write_button_click);

			var call_label:Text = new Text();
			call_label.color = "#00ffff";
			call_label.fontSize = 20;
			call_label.x = 300;
			call_label.y = 366;
			call_label.text = '调用线上合约数据'
			Laya.stage.addChild(call_label);
			
		}		

        //初始化按钮回调
		private function on_init_button_click(e:Event):void{
			
			//初始化LayaGCS
			var option:Object = new Object();
			option.laya_stage_node = Laya.stage;
			option.network  = 1;
			window.LayaGCS.initlize(option);

			
		}

		//读取合约数据
		private function on_read_button_click(e:Event):void{

			if(window.LayaGCS.initlized == false){
				alert('未初始化区块链SDK');
				return;
			}

			if(window.LayaGCS.get_current_account() == undefined){
				alert('尚未登录，请点击浮层ICON登录区块链账户')
				return ;
			}

			/*
				以太坊游戏EtherGoo的线上合约地址为0x57b116da40f21f91aec57329ecb763d29c1b2355
			*/

			var web3 = window.LayaGCS.web3;
			var gooContract = web3.eth.contract(gooAbi).at('0x57b116da40f21f91aec57329ecb763d29c1b2355');			
			gooContract.getGameInfo(this.on_recv_read_data);

		}

		//调用合约方法
		private function on_write_button_click(e:Event):void{

			if(window.LayaGCS.initlized == false){
				alert('未初始化区块链SDK');
				return;
			}

			if(window.LayaGCS.get_current_account() == undefined){
				alert('尚未登录，请点击浮层ICON登录区块链账户')
				return ;
			}
			var web3 = window.LayaGCS.web3;
			var gooContract = web3.eth.contract(gooAbi).at('0x57b116da40f21f91aec57329ecb763d29c1b2355');			
			gooContract.buyBasicUnit(1,1,this.on_recv_call_result);
		}


		/*
			读取合约数据
			err和result都是json数据
		*/
		private function on_recv_read_data(err:String,result:Object):void{
			if(err != undefined){
				console.log('读取结果',result);
			}
		}

		private function on_recv_call_result(err:String,result:Object):void{
			if(err != undefined){
				console.log('读取结果',result);
			}
		}

	
	
	}
}
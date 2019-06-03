var WebGL = laya.webgl.WebGL;
var Text = laya.display.Text;
var Sprite = laya.display.Sprite;


var gooAbi = [{"constant": false,"inputs": [{"name": "unitId","type": "uint256"}, {"name": "amount","type": "uint256"}],"name": "buyBasicUnit","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{ "constant": true,"inputs": [],"name": "getGameInfo","outputs": [{"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256"}, {"name": "","type": "uint256[]"}, {"name": "","type": "bool[]"}],"payable": false,"stateMutability": "view","type": "function"}]

var Game = {};

Game.init = function(){

        Laya.init(1136, 640,WebGL);

        var instruction_label = new Text();
        instruction_label.color = '#ffffff';
        instruction_label.x = 100;
        instruction_label.y = 100;
        instruction_label.text = '点击方块调用区块链函数';
        Laya.stage.addChild(instruction_label);
        Game.result_label = instruction_label;

        
        //初始化区块链引擎的按钮
        var init_button = new Sprite();
        init_button.width = 90;
        init_button.height = 90;
        init_button.x = 100;
        init_button.y = 166;
        init_button.graphics.drawRect(0, 0, 90, 90, "#ffff00");
        Laya.stage.addChild(init_button);
        init_button.on('click',Game,Game.on_init_button_click);

        var init_label = new Text();
        init_label.color = "#ffff00";
        init_label.fontSize = 20;
        init_label.x = 300;
        init_label.y = 166;
        init_label.text = '初始化区块链引擎'
        Laya.stage.addChild(init_label);


        //绘制读取合约按钮
        var read_contract_data_button = new Sprite();
        read_contract_data_button.width = 90;
        read_contract_data_button.height = 90;
        read_contract_data_button.x = 100;
        read_contract_data_button.y = 266;
        read_contract_data_button.graphics.drawRect(0,0,90,90,"#ff00ff");
        Laya.stage.addChild(read_contract_data_button);
        read_contract_data_button.on('click',Game,Game.on_read_button_click);


        var read_label = new Text();
        read_label.color = "#ff00ff";
        read_label.fontSize = 20;
        read_label.x = 300;
        read_label.y = 266;
        read_label.text = '读取线上合约数据'
        Laya.stage.addChild(read_label);


        //绘制调用合约按钮
        var call_contract_method_button = new Sprite();
        call_contract_method_button.width = 90;
        call_contract_method_button.height = 90;
        call_contract_method_button.x = 100;
        call_contract_method_button.y = 366;
        call_contract_method_button.graphics.drawRect(0,0,90,90,"#00ffff");
        Laya.stage.addChild(call_contract_method_button);
        call_contract_method_button.on('click',Game,Game.on_write_button_click);

        var call_label = new Text();
        call_label.color = "#00ffff";
        call_label.fontSize = 20;
        call_label.x = 300;
        call_label.y = 366;
        call_label.text = '调用线上合约数据'
        Laya.stage.addChild(call_label);


    

}


//初始化按钮回调
Game.on_init_button_click = function(e){

    console.log('on_init_button_click');
    
    //初始化LayaGCS
    var option = {};
    option.laya_stage_node = Laya.stage;
    option.network  = 1;
    LayaGCS.initlize(option);

    
}

//读取合约数据
Game.on_read_button_click = function(e){

   if(LayaGCS.get_current_account() == undefined){

        //检测是否初始化LayaGCS
        if(LayaGCS.initlized == false){
            Game.result_label.text = '尚未初始LayaGCS，请点击黄色方块';
        }   
        else{
            Game.result_label.text = '还没有登录区块链账户，请点击蓝色ICON登录';
        }
        
        //也可以直接唤醒登录界面 LayaGCS.show_login_ui()
        return;
    }

    /*
        以太坊游戏EtherGoo的线上合约地址为0x57b116da40f21f91aec57329ecb763d29c1b2355
    */

    var web3 = LayaGCS.web3;
    var gooContract = web3.eth.contract(gooAbi).at('0x57b116da40f21f91aec57329ecb763d29c1b2355');			
    gooContract.getGameInfo(function(err,result){


        var wei = 10^18;
    	var time = result[0].toNumber() * 1000;
		var totalPot = result[1].toNumber() / wei;
		var totalProduction = result[2].toNumber();
		var nextSnapshot = result[3].toNumber();
		var goo = result[4].toNumber();
		var ether = result[5].toNumber() / wei;
		var gooProduction = result[6].toNumber();
		var units = result[7];
		var upgrades = result[8];

		console.log('时间',time,"总pot",totalPot,"总生产",totalProduction,'下次快照',nextSnapshot,'Goo',goo,'Ether',ether.toFixed(8),'gooProduction',gooProduction);
        Game.result_label.text = '读取成功,当前总生产Goo'+ totalProduction +' Goo的数量为'+ goo; 
    });

}

//调用合约方法
Game.on_write_button_click = function(){

    if(LayaGCS.get_current_account() == undefined){

        //检测是否初始化LayaGCS
        if(LayaGCS.initlized == false){
            Game.result_label.text = '尚未初始LayaGCS';
        }   
        else{
            Game.result_label.text = '还没有登录区块链账户，请点击蓝色ICON登录';
        }
        
        //也可以直接唤醒登录界面 LayaGCS.show_login_ui()
        return;
    }

    var web3 = LayaGCS.web3;
    var gooContract = web3.eth.contract(gooAbi).at('0x57b116da40f21f91aec57329ecb763d29c1b2355');			
    gooContract.buyBasicUnit(1,1,function(err,result){
        if(!err){
            console.log(result);
        }
    });
}

Game.init();

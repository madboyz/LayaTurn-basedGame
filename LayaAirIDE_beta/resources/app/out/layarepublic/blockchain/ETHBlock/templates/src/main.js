var LoginPage = require('./page/login_page');
var LayaEth = require('./layaeth.js');
var LayaGSC = null;
window.onload = function(){
 	var SCREEN_WIDTH = 1136;
	var SCREEN_HEIGHT = 640;

 	Laya.init(SCREEN_WIDTH, SCREEN_HEIGHT,Laya.WebGL);
	Laya.stage.scaleMode = "noborder";

	console.log(Laya.stage.width , Laya.stage.height);
	LoginPage.initlize(Laya.stage);


	//初始化LayaGSC SDK
	// 0 ETH测试网络网络，正式网络为1
	var network = 0;
	LayaGSC = LayaEth.init(Laya.stage, network);
	
	var test_button = new laya.display.Sprite();
	test_button.graphics.drawRect(0,0,100,100,'#FFF');
	test_button.width = 100;
	test_button.height = 100;
	test_button.x = 190;
	test_button.y = 30;
	Laya.stage.addChild(test_button);
	test_button.on('click',this,web3Test);
}

//测试 SDK调用 EtherGoo的数据
function web3Test(){
	var web3 = LayaGSC.web3;
	var wei = 1000000000000000000; // 10^18
	var gameAbi = require('./gameabi');
	var gameAddress = '0x9310e6d115066fa5d939135092051dd4ff128cc5';
	var gameContract = LayaEth.initContract(gameAbi, gameAddress);
	if(!gameContract) {
		console.log("构建合约失败!");
		return;
	}
	gameContract.getScore(function(err, result) {
		if(err) return console.log("获取分数失败!");
		console.log("初始的分数为:", result);
	});

	var addr1 = '0xf4C48ef5711e54F5828360bE50758c4c5FfCDCB9';
	gameContract.addScore(addr1, 12345, function(err, result) {
		if(err) return console.log("加分失败!", err)
		console.log("用户:", addr1, "加分后得分为：", result);
	});
}

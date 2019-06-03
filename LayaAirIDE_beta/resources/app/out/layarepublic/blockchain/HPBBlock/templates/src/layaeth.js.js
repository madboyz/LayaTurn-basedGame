
var LayaGSC = require('layagcs');

/**
 * 初始化LayaGSC SDK
 * @param {object} stage 传入Laya Air根节点
 * @param {int} network 0 ETH测试网络网络，正式网络为1
 */
function init(stage, network) {
	var GSCOption = {};
	GSCOption.laya_stage_node = Laya.stage;
	GSCOption.network = network;					

	LayaGSC.initlize(GSCOption);			//初始化SDK
	return LayaGSC;
}

/**
 * 初始化合约
 * @param {object} abi 合约的abi定义
 * @param {string} address 合约的地址
 */
function initContract(abi, address) {
	let web3 = LayaGSC.web3;
	var contract = web3.eth.contract(abi).at(address);
	return contract;
}

module.exports = {init, initContract}
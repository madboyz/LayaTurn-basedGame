/**
 * 完成合约的部署
 */
const path = require("path");
const fs = require("fs-extra");
const util = require("util");
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const web3admin = require('./web3Admin.js');

const GAS_LIMIT = 2000000;

let web3 = null
let _isInited = false
let _fromAddress = null
let _fromPrivateKey = null

var deployer = function (owner, ownerPrivateKey, apiUrl, options, callback) {
  if(!_init(owner, ownerPrivateKey, apiUrl)) {
    return callback('init_inval')
  }
  // read code
  console.log("读取合约bytecode...")
  let file = path.join(options.contracts_build_directory, options.contract_name + ".json")
  let obj = fs.readJsonSync(file, { throws: false })
  if(!obj) {
    console.log("合约json文件不合法")
    return callback('contract_json_inval')
  }
  let code = obj.bytecode
  // create contract
  let to = '0x'
  try {
    console.log("发送部署合约交易...")
    let txId = _sendFrom(_fromAddress, _fromPrivateKey, to, options.gasprice, code)
    callback(null, txId)
  } catch (e) {
    console.log("提交交易报错!", e)
    return callback(e)
  }
}

/**
 * 初始化
 */
function _init(owner, ownerPrivateKey, apiUrl) {
  if(_isInited) {
    return true
  }
  web3 = new Web3();
  web3admin.extend(web3);
  web3.setProvider(new web3.providers.HttpProvider(apiUrl));
  try {
    if(!web3.net.listening) {
      console.log("web连接provider为%s失败", apiUrl);
      return false;
    }
  } catch (e) {
    console.log("web连接provider为%s失败", apiUrl);
    return false;
  }

  _fromPrivateKey = ownerPrivateKey
  _fromAddress = owner
  this._isInited = true
  return true
}

/**
 * 获取nonce
 * 从pending和queued中获取nonce数目
 * TODO 需要优化，此时每次获取nonce都要获取所有的pending和queued数据
 */
function _getNonce(address) {
  let key = address.toLowerCase();
  // 已经完成的交易数目
  let transCount = web3.eth.getTransactionCount(address);
  let queued = web3.txpool.content.queued;
  let pending = web3.txpool.content.pending;
  // 从queued中计算合适的nonce
  let nonceQueued = _calcNonceInQueued(key, queued, transCount);
  if(nonceQueued) {
    return nonceQueued
  }
  // 从pending中计算noncde
  let noncePending = _calcNonceInPending(key, pending);
  if(noncePending) {
    return noncePending
  }
  return transCount
}

/**
 * 获取地址的nonce
 * @param {string} address 地址
 */
function _getNonce2(address) {
  return web3.eth.getTransactionCount(address, 'pending');
}

/**
 * 从queued中获取nonce
 */
function _calcNonceInQueued(key, content, transCount) {
  if (key in content) {
    // content中的交易，是因为nonce不连贯导致，所以要找出对应的nonce
    let nonceList = Object.keys(content).map(elem => parseInt(elem));
    let max = Math.max(...nonceList);
    let corruptList = [];
    for(let i = transCount; i <= max; ++i) {
      corruptList.push(i);
    }
    let nonceSet = new Set(nonceList);
    let diffSet = new Set(
      corruptList.filter(x => !nonceSet.has(x))
    )
    // 空隙的nonce
    let gapList = [...diffSet];
    if(gapList.length > 0) {
      return gapList[0];
    } 
  } 
  return null
}

/**
 * 从pending中获取
 */
function _calcNonceInPending(key, content) {
  // 地址大小写不一
  let kvList = Object.keys(content).map((elem) => {return {address: elem.toLowerCase(), data:content[elem]}})
  for(let i = 0; i < kvList.length; ++i) {
    if(kvList[i].address == key) {
      // 找到此地址
      let nonceList = Object.keys(kvList[i].data).map(elem => parseInt(elem))
      let max = Math.max(...nonceList);
      return max + 1
    }
  }
  return null;
}

/**
 * 生成发送交易
 */
function _sendFrom(from, privateKeyStr, to, gasprice, code) {
  let nonce = _getNonce2(from);
  // console.log("address:", from, "nonce:", nonce);
  let tx = {
    from: from,
    to: to,
    value: web3.toWei(0, 'ether'),
    data: code,
    gas: GAS_LIMIT,
    gasPrice: web3.toWei(gasprice, 'gwei'),
    nonce: nonce
    // chainId: 1110011
  };
  let privateKey = Buffer.from(privateKeyStr, 'hex');
  let [rawTx, serializedTx] = _genSignedTx(tx, privateKey);
  // console.log("\ntx:", rawTx);
  // console.log("txSigned:", serializedTx);
  let ret = web3.eth.sendRawTransaction(serializedTx);
  console.log("交易id:", ret);
  return ret;
}

/**
 * 交易签名
 */
function _genSignedTx(tx, privateKey) {
  var rawTx = {
    from: tx.from,
    to: tx.to,
    value: web3.toHex(tx.value),
    data: tx.data,
    gasLimit: web3.toHex(tx.gas),
    gasPrice: web3.toHex(tx.gasPrice),
    nonce: web3.toHex(tx.nonce),
    chainId: tx.chainId
  };
  var txSigned = new Tx(rawTx);
  txSigned.sign(privateKey);
  var serializedTx = "0x" + txSigned.serialize().toString('hex');
  return [rawTx, serializedTx];
}


module.exports = deployer
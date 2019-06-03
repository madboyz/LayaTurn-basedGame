'use strict'
const fs = require('fs-extra')
const path = require('path')
const compiler = require('truffle-workflow-compile')
const graphlib = require('graphlib')
const initer = require('./lib/initer.js')
const deployer = require('./lib/deployer.js')
const Parser = require('truffle-compile/parser.js')
const Profiler = require("truffle-compile/profiler.js")
const Web3 = require('web3');

function Worker() {
}

/**
 * 创建一个新的项目
 */
Worker.prototype.init = function(name, dir, callback) {
  initer(name, dir, callback)
}

/**
 * 默认的编译选项
 */
Worker.prototype.compileOpts = function() {
  return {
    contracts_directory: "contracts/",
    contracts_build_directory: "build/",
    all: true,
    quiet: false,
    strict: false,
    optimizer: true
  }
}

/**
 * 编译sol代码
 */
Worker.prototype.compile = function(options, callback) {
  if(options && options['optimizer'] && typeof(options['optimizer']) == typeof(true)) {
    options["solc"] = 
    {
      optimizer: {
        enabled: options['optimizer'],
        runs: 200
      }
    }
  }
  compiler.compile(options, callback);
}

/**
 * 部署合约默认参数
 */
Worker.prototype.deployOpts = function() {
  return {
    mainnet: false, // 是否主网
    gasprice: 10,   // gwei
    contracts_build_directory: '',  // 合约build 目录
    contract_name: ''               // 合约名称
  }
}

/**
 * 部署合约
 */
const TESTNET_API = "http://54.238.198.125:38545";
const MAINNET_API = "http://54.238.198.125:38545";
Worker.prototype.deploy = function(owner, ownerPrivateKey, options, callback) {
  if(!owner || !ownerPrivateKey) return false
  if(!options) {
    options = this.deployOpts()
  }
  let apiUrl = ''
  if(options.mainnet) {
    apiUrl = MAINNET_API
  } else {
    apiUrl = TESTNET_API
  }
  deployer(owner, ownerPrivateKey, apiUrl, options, callback)
}

/**
 * $layaFlag
 * 返回使用的gas量
 */
let __web3;
Worker.prototype.getGas = function(isMainnet, ownerAddress) {
  let apiUrl = ''
  if(isMainnet) {
    apiUrl = MAINNET_API
  } else {
    apiUrl = TESTNET_API
  }
  if (!__web3) {
    __web3 = new Web3(new Web3.providers.HttpProvider(apiUrl));
  }
  return __web3.eth.estimateGas({
    from: ownerAddress
  });
}

/**
 * $layaFlag
 * 返回ETH
 */
Worker.prototype.getETH = function(isMainnet, weiValue) {
  let apiUrl = ''
  if(isMainnet) {
    apiUrl = MAINNET_API
  } else {
    apiUrl = TESTNET_API
  }
  if (!__web3) {
    __web3 = new Web3(new Web3.providers.HttpProvider(apiUrl));
  }
  return __web3.fromWei(weiValue, 'ether');
}


/**
 * 生成etherscan.io 认证所需的数据
 */
const TESTNET_VERIFY_URL = "https://rinkeby.etherscan.io/verifyContract2"
const MAINNET_VERIFY_URL = "https://etherscan.io/verifyContract2"
Worker.prototype.verifyContract = function(json, contracts_dir, mainnet, optimized, callback) {
  let verifyUrl = ''
  if(mainnet) {
    verifyUrl = MAINNET_VERIFY_URL
  } else {
    verifyUrl = TESTNET_VERIFY_URL
  }
  let obj = fs.readJsonSync(json, { throws: false })
  if(!obj) {
    console.log("合约json文件不合法")
    return callback('contract_json_inval')
  }

  let contractName = obj.contractName
  let compiler = obj.compiler.version
  let file = obj.sourcePath
  _genFlatSol2(file, contracts_dir, function(err, flatSol) {
    if(err) {
      return callback(err)
    }

    let ret = {
      "URL": verifyUrl,
      "Contract Name": contractName,
      "Compiler": compiler,
      "Optimization": optimized? "Yes": "No",
      "Enter the Solidity Contract Code below": flatSol
    }
    callback(null, ret)
  })
}

var Config = require("truffle-config");
var Resolver = require("truffle-resolver");
function _genFlatSol2(file, contracts_dir, callback) {
  // Use a config object to ensure we get the default sources.
  var config = Config.default()
  if (!config.resolver) {
    config.resolver = new Resolver(config);
  }
  config.logger = config.logger || console;
  config.contracts_directory = contracts_dir
  config.paths = [file]

  // console.log(">>>>paths:", config.paths)
  Profiler.dependency_graph(config.paths, config.resolver, function(err, dependsGraph) {
    if (err) return callback(err);
    // sources in order
    let sourcesOrder = graphlib.alg.postorder(dependsGraph, file);
    // console.log("sources:", sourcesOrder)

    Profiler.required_sources(config.with({
      base_path: config.contracts_directory
    }), function(err, result) {
      if (err) return callback(err);

      let version = null;
      var parts = sourcesOrder.map(function(elem){
        if(!version) {
          let matchs = result[elem].match(/pragma\s+solidity\s+(.*);/)
          version = matchs[1]
        }
        let importSource = result[elem]
        importSource = importSource.replace(/import[^'"]+("|')([^'"]+)("|');/gi, '')
        importSource = importSource.replace(/pragma\s+solidity\s+.*;/gi, '')
        return importSource
      })
      var flatSource = "pragma solidity " + version + ";\n"
      flatSource += parts.join("\n")
      callback(null, flatSource)
    });
  });
}


function _sortByDependency(sources, dependsGraph) {

}


module.exports = new Worker
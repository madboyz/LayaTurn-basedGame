



### 项目创建页

![](http://palu6iv0v.bkt.clouddn.com/UC20180622_121042.png)

```javascript

//创建新项目
const initer = require('./lib/initer.js')
initer(name, dir, callback)

```

### 编译合约

![](http://palu6iv0v.bkt.clouddn.com/UC20180622_121116.png)

```javascript

const compiler = require('truffle-workflow-compile')

//编译选项
var options = {
    contracts_directory: "contracts/",
    contracts_build_directory: "build/",
    all: true,
    quiet: false,
    strict: false,
    optimizer: true

}

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




```




### 部署合约(1)

![](http://palu6iv0v.bkt.clouddn.com/UC20180622_121142.png)

```javascript
  // owner 和 ownerPrivateKey 代表输入框输入的公钥和私钥，这里简单判断下是否输入
 if(!owner || !ownerPrivateKey) {
     //这里弹错误提示   
     return false
 }


```


### 部署合约(2)

![](http://palu6iv0v.bkt.clouddn.com/UC20180622_121214.png)


```javascript


var options =  {
    mainnet: false, // 是否主网
    gasprice: 10,   // gwei
    contracts_build_directory: '',  // 合约build 目录
    contract_name: ''               // 合约名称
  }


const deployer = require('./lib/deployer.js')


//这个节点地址可能会更换
 var MAINNET_API = "http://13.230.28.15:8545";
 var TESTNET_API = "http://115.159.27.162:48545";
 

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


```


### 封装

以上实现都可以使用封装好的Worker来调用

```javascript

var Worker = require('index');
Worker.init(name,dir,cb); //创建项目
Worker.compile(options,callback); //编译合约
Worker.deploy(options,callback) //部署合约

```
# 说明
提供eth solidity合约创建、编译、发布等相关的工作。

# 安装
```
npm install layagcs --registry=https://registry.npmjs.org
npm install
```

# 创建新的合约项目
执行脚本:  
```
./deploydemo MyGame
```
会在/tmp/MyGame目录创建一个游戏项目，随后编译sol，并eth测试网络部署合约。
同时会生成在etherscan.io认证所需的各种信息。

# 运行demo页面
运行templates目录下的内容
```
grunt serve
```
浏览器输入：`http://localhost:8080`

# 测试合约及账户
测试环境contract code认证地址:  
https://ropsten.etherscan.io/verifyContract2?a=  

测试环境 game合约：  
https://ropsten.etherscan.io/address/0x9310e6d115066fa5d939135092051dd4ff128cc5#code

game合约创建者及私钥:  
地址： `0x50d3dd0831858a8a5c4802b792fb7cd521e28687`  
私钥： `71e1a11975be5315f2a3b2fd63d8092a1f04d946216249377feb85b40e9164ae`  

# 事例
## 如何五分钟发布一个代币
- 创建ETH项目，合约模板选择：ERC20，合约名叫LetToken
- 修改LetToken代码中, symbol, decimal, name, totalSupply等参数
- 编译合约
- 部署合约
- 生成认证所需sol
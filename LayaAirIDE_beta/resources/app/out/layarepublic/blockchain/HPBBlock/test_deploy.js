var Worker = require('./index.js');

var complie_opts = {
    contracts_directory:"./test_contract/",
    contracts_build_directory:"./test_contract/build/",
    all: true,
    quiet: false,
    strict: false,
    optimizer: true
};

/**
 * 编译HPB合约
 */
// Worker.compile(complie_opts,function(err,result){
//     if(err == null){
//         console.log('编译完成');
//     }
// })


//部署HPB合约
var deploy_opts = {
    mainnet: false, // 是否主网
    gasprice: 10,   // gwei
    contracts_build_directory: './test_contract/build/',  // 合约build 目录
    contract_name: 'GAME_SYMBOL'               // 合约名称
}

Worker.deploy("0x8A1A48Efe354c18386c0516B30e497eE8707b0f0","4901AF18D798E0B4BD45101709028FA8C384C435FD52E0607687DC05431F9EB4",deploy_opts,function(err,res){
    console.log(err,res);
})
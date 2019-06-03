
var fs = require('fs');
var path = require('path');

function log(m){
    console.log(m);
}

exports.crc32=function(file){
    var stat = fs.lstatSync(file);
    //读文件
    var buff = fs.readFileSync(file);
    var len = buff.length;
    //计算简单校验
    var checkbuff = new Buffer(8);
    checkbuff.fill(0);
    var clen = len-len%8;    //最后剩下的算法不同，所以要分开
    for(var i=0; i<clen; i++ ){
        checkbuff[i%8]^=buff[i];
    }
    for(i=clen; i<len; i++){
        checkbuff[0]^=buff[i];
    }

    var checksum = new Buffer(4);
    checksum.fill(0);
    checksum[0]= checkbuff[0]^checkbuff[4];
    checksum[1]= checkbuff[1]^checkbuff[5];
    checksum[2]= checkbuff[2]^checkbuff[6];
    checksum[3]= checkbuff[3]^checkbuff[7];
    
    var crc=checksum.readUInt32LE(0);
    //由于这个算法太简单，可能会产生出0来，而0会被检验函数认为错误，所以要处理一下
    if(crc===0) crc=1;
    return crc;
}

exports.crc32mem=function(buff){
    var len = buff.length;
    //计算简单校验
    var checkbuff = new Buffer(8);
    checkbuff.fill(0);
    var clen = len-len%8;    //最后剩下的算法不同，所以要分开
    for(var i=0; i<clen; i++ ){
        checkbuff[i%8]^=buff[i];
    }
    for(i=clen; i<len; i++){
        checkbuff[0]^=buff[i];
    }

    var checksum = new Buffer(4);
    checksum.fill(0);
    checksum[0]= checkbuff[0]^checkbuff[4];
    checksum[1]= checkbuff[1]^checkbuff[5];
    checksum[2]= checkbuff[2]^checkbuff[6];
    checksum[3]= checkbuff[3]^checkbuff[7];
    
    var crc=checksum.readUInt32LE(0);
    //由于这个算法太简单，可能会产生出0来，而0会被检验函数认为错误，所以要处理一下
    if(crc===0) crc=1;
    return crc;
}
//fs.writeFileSync('d:/temp/aaa.txt',files.join('\n'),'utf8');

var fs = require('fs');
var path = require('path');

function log(m){
    console.log(m);
}

exports.rip=function(file){
    var stat = fs.lstatSync(file);
    var buff = fs.readFileSync(file);
    var len = buff.length;
    if( buff[0]==0xff && buff[1]==0xee && buff[2]==0x88 && buff[3]==0x77 ){
        //var shellLen = 32;
        fs.writeFileSync(file+'.o',buff.slice(32,buff.length));
    }
}

exports.rip('D:/temp/mycache/4167437262');

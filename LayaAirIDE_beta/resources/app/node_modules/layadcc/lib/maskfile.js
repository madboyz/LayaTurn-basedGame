
var log = console.log;
var fs = require('fs');

function maskfile(f,key,len,fout){
	var buf = fs.readFileSync(f);
	key&=0xff;
	for(var i=0; i<len; i++){
		buf[i]^=key;
	}
	fs.writeFileSync(fout||f,buf);
}

exports.maskfile=maskfile;
//maskfile('e:/souh5/games/4x5/game/loadingimage/031.png',0xaa,10);

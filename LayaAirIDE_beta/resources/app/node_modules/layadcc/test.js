
function log(m){
	console.log(m);
}

var pathcrc = require('./lib/crc32.js');
var filecrc = require('./lib/scrc32.js');

if( pathcrc.crc32('/index.htm')==4167437262){
	log('path crc ok');
}
if( filecrc.crc32('E:/lr2wai/index.htm')==182761737){
	log('file crc ok');
}
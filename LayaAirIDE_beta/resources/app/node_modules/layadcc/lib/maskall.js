

/*
	把exportJSON转换为二进制格式
	
*/

var fs = require('fs');
var path = require('path');

function log(m){
	console.log('\x1b[0m\x1b[37m'+m);
}

function logNotify(m){
	console.log('\x1b[1m\x1b[37m'+m+'\x1b[0m\x1b[37m');
}

function logErr(m){
	console.log('\x1b[0m\x1b[31m'+m+'\x1b[0m\x1b[37m');
}

var excludes=[
	'.git',
	'.svn',
	'update',
	'dccTools',
];

var excludeExts={'.exportjson':1,'.pngz':1,'.jpgz':1,'.jngz':1};

//统计文件类型
var extfilest={};

//遍历每个文件，执行func,传入完整的文件名字
function allFiles(root,func){
  var files = fs.readdirSync(root);
  files.forEach(function(file){
    var pathname = root+'/'+file;
	try{
		var stat = fs.lstatSync(pathname);
		if (!stat.isDirectory()){
			var ext = path.extname(file);
			if(extfilest[ext]==undefined)
				extfilest[ext]=1;
			else
				extfilest[ext]++;
			//扩展名过滤
			if(excludeExts[ext])
				return true;
		   func(pathname);
		} else {
		var exclude = (function(){
			//目录过滤
			var i=0,sz=excludes.length;
			for(i=0; i<sz; i++){
				if(excludes[i]==file)
					return true;
			}
			return false;
			})();
			if(exclude)	return;
			allFiles(pathname,func);
		}
	}catch(e){
		logErr('Error:'+e);
		logErr(e.stack);
	}
  });
}

function chkval(v,msg){
	if(!v)
		throw msg;
}

var srcpath;
var outpath;
var urlToLower=false;
var genCache=false;
try{
	//chkval(process.argv.length>=4,'用法：node genDcc.js 输入目录，输出目录 [写缓存么] [转小写么].');
	srcpath = process.argv[2];
	outpath = process.argv[3];
	genCache=process.argv[4] && process.argv[4]*1;
	urlToLower=process.argv[5] && process.argv[5]*1;
}catch(e){
	logErr(e);
	return;
}

var crypto = require('crypto');
var md5 = crypto.createHash('md5')
var fmask = require('./maskfile.js').maskfile;

allFiles(srcpath,function(p){
	if( path.extname(p)=='.png'){
		fmask(p,0xaa,10,p+'z');
	}
});

function maskfile(f,key,len){
	var buf = fs.readFileSync(f);
	key&=0xff;
	for(var i=0; i<len; i++){
		buf[i]^=key;
	}
	fs.writeFileSync(f,buf);
}

//maskfile('e:/souh5/games/4x5/game/loadingimage/031.png',0xaa,10);

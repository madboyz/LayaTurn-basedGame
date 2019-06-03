#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
function help(){
    console.log('用法：');
    console.log('   layadcc 输入目录 [options]');
    console.log('   options:');
    console.log('       -cache 生成cache.');
    console.log('       -lwr 文件路径全部转为小写。');
    console.log('       -url url 生成cache的话，对应的url.');
    console.log('       -cout outpath cache的输出目录，如果不设置的话，就是在资源目录下。');
    console.log('例如:');
    console.log('   layadcc d:/game/wow -cache -url www.game.com');
}

if (process.argv.length < 3) {
    help();
    process.exit(1);
}

var options={lwr:false,cache:false,url:null};
process.argv.forEach((v,i,arr)=>{
    if(v.charAt(0)==='-'){
        switch(v){
        case '-lwr':
            options.lwr=true;
            break;
        case '-cache':
            options.cache=true;
            break;
        case '-url':
            options.url=arr[i+1];
            break;
        case '-cout':
            options.cout=arr[i+1];
            break;
        default:
            console.error( '错误：不认识的参数 '+v);
            console.log(`
            `);
            help();
            process.exit(1);
        }
    }
});

var srcpath = path.resolve(process.cwd(), process.argv[2]);
if(!fs.existsSync(srcpath)){
    var desc = 'directory [' + srcpath + ']not exist, the first parameter should be a valid path.';
    process.exit(1);
}

var relout=false;   //输出在资源目录下
var outpath = srcpath + '/update';
if( options.url && options.cache){
    if(options.cout){
        if(path.isAbsolute(options.cout)) outpath = options.cout;
        else{
            if(options.cout.split(/[\\\/]/).length>1){
                console.log('错误：输出路径如果是相对路径，不允许多层，当前输出路径不满足这个条件:'+options.cout);
                process.exit(1);
            }
            relout=true;
            outpath = path.resolve(process.cwd(),options.cout);
        }
    }
    else outpath = path.resolve(/*process.cwd()*/srcpath,'layadccout');  //好多人不知道当前目录是什么，改成缺省为资源目录
}
if (!fs.existsSync(outpath)) {
    //console.log('输出目录'+outpath+' 不存在，创建一个.');
    fs.mkdirSync(outpath);
}

var gendcc = require('../lib/genDcc');
gendcc.gendcc (srcpath, outpath, options.cache, options.lwr, options.url); 
if(relout)
    console.log('注意:\n当前输出路径在资源目录下，记得下次生成cache的时候删除这个输出目录('+outpath+')，否则也会被算作资源处理的。 ')
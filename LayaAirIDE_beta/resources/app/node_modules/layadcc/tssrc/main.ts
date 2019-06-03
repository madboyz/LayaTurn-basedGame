///<reference path="e:/tsdefination/node/node.d.ts" />
///<reference path="lib/genDcc.d.ts" />

/**
 * 这个文件不再维护。反正比较简单，直接写js了。
 */

import * as fs from 'fs';
import * as path from 'path';

if (process.argv.length < 3) {
    console.log('用法：node genDcc.js 输入目录，[写缓存么] [转小写么].');
    throw -1;
}

var srcpath = path.resolve(__dirname,process.argv[2]);
if (!fs.existsSync(srcpath)) {
    var desc = 'directory [' + srcpath + ']not exist, the first parameter should be a valid path.';
    throw desc;
}
var genCache = (process.argv[3] && parseInt(process.argv[3]) != 0);
var urlToLower = (process.argv[4] && parseInt(process.argv[4]) != 0);
var outpath = srcpath + '/update';
if (!fs.existsSync(outpath)) {
    console.log('update 目录不存在，创建一个.');
    fs.mkdirSync(outpath);
}

var gendcc = require('./lib/genDcc');
gendcc.gendcc(srcpath, outpath, genCache, urlToLower);

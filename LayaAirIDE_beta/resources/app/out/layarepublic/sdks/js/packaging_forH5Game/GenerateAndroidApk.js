"use strict";
//var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//    return new (P || (P = Promise))(function (resolve, reject) {
//        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
//        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
//        step((generator = generator.apply(thisArg, _arguments)).next());
//    });
//};
const fs = require('fs');
const path = require('path');
const fs_extra = require('fs-extra');
const child_process = require('child_process');
const gen_dcc = require('layadcc');
const http = require('http');
const url = require('url');
const unzip = require('unzip');
const xmldom = require('xmldom');
const apkAction = require('./action.js');
const configUtil = require('./configUtil.js');
function sleepMs(ms) {
    return apkAction.__awaiter(this, void 0, Promise, function* () {
        return new Promise(function (res, rej) {
            setTimeout(res, ms);
        });
    });
}
function copyFile(srcf, dstf) {
    return apkAction.__awaiter(this, void 0, Promise, function* () {
        return new Promise(function (res, rej) {
            fs_extra.copy(srcf, dstf, function (e) {
                if (e) {
                    rej(false);
                    return;
                }
                res(true);
            });
        });
    });
}
class GenerateAndroidApk {
    constructor() {
        this.jdkbinpath = null;
        this.apk_path = path.join(__dirname, "../../apk_forH5Game/layabox.apk");
        this.tool_path = path.join(__dirname, "../../tool");
        this.output_path;
        this.download_tools_tmp_total = 0;
        this.download_tools_tmp_cur = 0;
        //this.sdk_path = 'E:/apk/laya_air/release/Android/sdk/dangle/';
        //this.sdk_path = '';

        this.packingAction = new apkAction.ApkAction();
        this.configUtil = new configUtil.ConfigUtil();
        if (process.platform == "win32") {
            this.exec_opt = {
                stdio: [
                    0,
                    'pipe',
                    fs.openSync('err.out', 'w')
                ]
            };
        }
    }
    download_sdk_file(allDataConfig,choiceConfig,callback){
        var choiceStr = this.packingAction.read(choiceConfig);
        var allDataStr = this.packingAction.read(allDataConfig);
        var choiceData = JSON.parse(choiceStr);
        var allData = JSON.parse(allDataStr);
        var needDownload = 0;
        var totalLen = 0;
        var cur = 0;
        for(var key in choiceData){
            if( !allData[key] ){
                continue;
            }
            var _sdkPath = allData[key].sdk_path;
            var _isHaveSdk = fs.existsSync(_sdkPath);
            if(!allData[key].needUpdate && _isHaveSdk ){
                continue;
            }
            // App variables
            var file_url = allData[key].download_url;
            // Function to download file using HTTP.get
            var me = this;
            var download_file_httpget = function (file_url) {
                var options = {
                    host: url.parse(file_url).host,
                    port: 80,
                    path: url.parse(file_url).pathname
                };

                var file_name = url.parse(file_url).pathname.split('/').pop();
                var file_name_only = file_name.split('.').shift();
                var download_path = path.join(__dirname, '../../plugins/' + file_name);
                var file = fs.createWriteStream(download_path);
                var curKey = key;
                needDownload++;

                window.xsdkShowLoading(window.textConfig.download_sdk);
                http.get(options, function (res) {
                    totalLen += parseInt(res.headers['content-length'], 10);
                    var progress = 0;
                    res.on('data', function (data) {
                        file.write(data);
                        cur+=data.length;
                        progress = parseInt((cur/totalLen)*100);
                        window.xsdkShowLoading(window.textConfig.download_sdk+" "+progress+"%");
                        console.log("progress = "+progress);
                    }).on('end', function () {
                        file.end();
                        var outputPath = path.join(__dirname, '../../plugins/');
                        me.unzip_file(download_path,outputPath,function(path){
                            callback(curKey,path,--needDownload);
                        });
                        //fs.createReadStream(download_path).pipe(unzip.Extract({path: outputPath}));
                        //me.sdk_path = outputPath + file_name_only;
                        //fs_extra.outputFileSync(allDataConfig, JSON.stringify(allData));
                        //fs.unlinkSync(download_path)
                        window.xsdkHideLoading();
                    });

                    res.on('error',function(e){
                        window.alert(e);
                    });
                });
            };


            download_file_httpget(file_url);
        }

        if( needDownload == 0 ){
            callback(-1,"",0);
        }
    }

    excuteByConfigFile(allDataConfig,gameConfig,choiceConfig,attributeConfig,onProcess){
        var choiceStr = this.packingAction.read(choiceConfig);
        var allDataStr = this.packingAction.read(allDataConfig);
        var allData = JSON.parse(allDataStr);
        this.choiceData = JSON.parse(choiceStr);

        this.choiceArray = [];
        this.choiceArray.gameConfig = gameConfig;
        this.choiceArray.attributeConfig = attributeConfig;
        this.choiceArray.onProcess = onProcess;

        var count = 0;
        for(var key in this.choiceData){
            if( !allData[key] ){
                continue;
            }
            this.choiceArray[count++] = {"spid":key,"data":allData[key]};

        }
        this._excuteByArray();
    }

    _excuteByArray(){
        var me = this;
        if( !this.choiceArray ||　this.choiceArray.length == 0 ){
            console.log("所有渠道包已经完成！");
            window.xsdkHideLoading();
            window.xsdkMessageBox("所有渠道包都打包完成，是否打开生成目录?",["确定", "取消"],function(){
                if( me.output_path ) {
                    window.electron.remote.shell.showItemInFolder(me.output_path);
                }
            },function(){});
            return;
        }
        var currentSP = this.choiceArray.pop();
        if(!currentSP.needUpdate){
            var cornerInfo = {};
            cornerInfo.filePath = this.choiceData[currentSP.spid].corner;
            cornerInfo.ox = this.choiceData[currentSP.spid].relative ? this.choiceData[currentSP.spid].relative.ox:0;
            cornerInfo.oy = this.choiceData[currentSP.spid].relative ? this.choiceData[currentSP.spid].relative.oy:0;

            this._excuteByConfigFile(currentSP.data.name,this.choiceArray.gameConfig,currentSP.data.sdk_path,
                this.choiceArray.attributeConfig, currentSP.spid, cornerInfo, this.choiceArray.onProcess);
        }
    }
    _excuteByConfigFile( spname,gameConfig,sdk_path, attributeConfig, key, iconInfo, onProcess) {
        var gameStr = this.packingAction.read(gameConfig);
        //var choiceStr = me.packingAction.read(choiceConfig);
        var attributeStr = this.packingAction.read(attributeConfig);


        var packageData = {};
        var gameData = JSON.parse(gameStr);
        //gameData = gameData[1000];
        var attributeData = JSON.parse(attributeStr);
        var selectAttri = attributeData[key];

        packageData.app_name = gameData.gameName;
        packageData.orientation = gameData.orientation;
        packageData.game_url = gameData.gameURL;
        packageData.spname = spname;
        packageData.icon_path = gameData.gameIcon;
        packageData.keystore_path = gameData.keystoreFile;
        packageData.keystore_pwd = gameData.keystorePassword;
        packageData.keystore_alias_pwd = gameData.aliasPassword;
        packageData.output_path = gameData.outDir;
        packageData.loading_view_show = false;
        packageData.gen_res_pkg = true;
        packageData.res_path = gameData.resPath;
        packageData.keystore_alias = gameData.alias;
        packageData.iconInfo = iconInfo;
        packageData.sdk_path = sdk_path+"/";
        packageData.package_name = selectAttri.package.value;
        packageData.spInfo = selectAttri;
        //for(var key in choiceData){
        //    var selectAttri = attributeData[key];
        //    packageData.package_name = selectAttri.package.value;
        //    packageData.spInfo = selectAttri;
        //}

        this.excute(packageData, onProcess);
    }
    excute(packageData, onProcess) {
        if( !packageData ){
            return;
        }
        if (fs.existsSync(this.tool_path) && fs.existsSync(this.apk_path)) {
            this._excute(packageData, onProcess);
            return;
        }

        var have_tool_path = false;
        var have_apk_path = false;
        if( fs.existsSync(this.tool_path) ) {
            have_tool_path = true;
        }
        if( fs.existsSync(this.apk_path) ){
            have_apk_path = true
        }
        var me = this;

        this.download_tools_tmp_total = 0;
        this.download_tools_tmp_cur = 0;
        if(!have_tool_path) {
            var _url = "http://platform.layalab.com/plugin/download/xsdk/tool.zip";
            var file_name = url.parse(_url).pathname.split('/').pop();
            var file_name_only = file_name.split('.').shift();
            var download_path = path.join(__dirname, '../../' + file_name);
            var unzip_path = path.join(__dirname, '../../');

            window.xsdkShowLoading(window.textConfig.download_tool);
            this.download_file(_url, download_path, unzip_path, function (tool_path) {
                window.xsdkHideLoading();
                have_tool_path = true;
                if( have_tool_path && have_apk_path ){
                    me._excute(packageData, onProcess);
                }
            });
        }

        if(!have_apk_path) {
            var _apkurl = "http://platform.layalab.com/plugin/download/xsdk/apk.zip";
            var apk_file_name = url.parse(_apkurl).pathname.split('/').pop();
            var apk_file_name_only = apk_file_name.split('.').shift();
            var apk_download_path = path.join(__dirname, '../../' + apk_file_name);
            var apk_unzip_path = path.join(__dirname, '../../');

            window.xsdkShowLoading(window.textConfig.download_tool);
            this.download_file(_apkurl, apk_download_path, apk_unzip_path, function (tool_path) {
                window.xsdkHideLoading();

                have_apk_path = true;
                if( have_tool_path && have_apk_path ){
                    me._excute(packageData, onProcess);
                }
            });
        }

    }
    _checkParam(packageData){
        if(!packageData){
            alert("打包参数为空!");
            return false;
        }
        if(!packageData.app_name){
            alert("请填写游戏名称！");
            return false;
        }
        if(!packageData.output_path){
            alert("请选择输出目录！");
            return false;
        }
        //if(!packageData.game_url){
        //    alert("请填写游戏地址！");
        //    return false;
        //}
        if(!packageData.package_name){
            alert("请填写渠道:"+packageData.spname+"的包名！");
            return false;
        }

        if( packageData.spInfo && !packageData.spInfo.relatedid){
            alert("请填写渠道:"+packageData.spname+"的relatedid！");
            return false;
        }
        if(!packageData.icon_path){
            packageData.icon_path = path.join(__dirname,"./../../img/defaultIcon.png");
        }
        return true;
    }
    _excute(packageData, onProcess){
        console.log("excute packageData = "+JSON.stringify(packageData));
        if( !this._checkParam(packageData) ){
            return;
        }

        /**
         *需要传入的参数:
         * icon_path:游戏图标路径 图标大小为512*512
         * keystore_path:签名路径
         * keystore_pwd:签名密码
         * keystore_alias:签名alias
         * keystore_alias_pwd:签名alias密码
         * */
        var app_name = packageData.app_name;
        var output_path = packageData.output_path;
        var url = packageData.game_url;
        var loading_view_show = packageData.loading_view_show;
        var gen_res_pkg = packageData.gen_res_pkg;
        var res_path = packageData.res_path;
        var package_name = packageData.package_name;
        var icon_path = packageData.icon_path;
        var keystore_path = packageData.keystore_path;
        var keystore_pwd = packageData.keystore_pwd;
        var keystore_alias = packageData.keystore_alias;
        var keystore_alias_pwd = packageData.keystore_alias_pwd;
        var cornerInfo = packageData.iconInfo;
        var sdk_path = packageData.sdk_path;
        var sp_name = packageData.spname;
        this.output_path = packageData.output_path;

        var sdkConfigPath = path.join(output_path,"sdk_config_info.xml");
        this.configUtil.loadXmlConfig(sdkConfigPath);
        this.configUtil.addAttribute("test123","123");
        if (process.platform == "darwin") {
            var cmd = "chmod -R 755 ";
            cmd += this.tool_path;
            child_process.execSync(cmd);
        }
        if (!app_name || app_name == "") {
            var desc = 'app_name  [' + app_name + '] invalid.';
            throw desc;
        }
        if (!output_path || output_path == "") {
            var desc = 'output_path  [' + output_path + '] invalid.';
            throw desc;
        }
        if (!url)
            url = '';
        if( packageData.spInfo ){
            var relatedid = packageData.spInfo.relatedid.value;
            if( url.indexOf('relatedId') == -1 ){
                if( url.indexOf('?') == -1 ){
                    url += "?relatedId="+relatedid;
                }else{
                    url += "&relatedId="+relatedid;
                }
            }
        }
        var date = new Date;

        //1. 生成临时路径，用来存放临时生成的文件，处理完之后会把临时文件夹的内容打包
        this.temp_path = path.join(output_path, String(date.getTime()));
        var me = this;
        function exec() {
            return apkAction.__awaiter(this, void 0, void 0, function* () {
                function processMsg(msg, err, percent) {
                    if (msg) {
                        console.log('==> ' + percent + '% ' + msg);
                        if (onProcess)
                            onProcess(msg, percent);
                    }
                    if (err)
                        throw err;
                }
                var error = false;
                var arrive_clean = false;
                yield sleepMs(1);
                try {
                    processMsg('copy src apk', null, 10);
                    var tmpApkPath = path.join(me.temp_path, "temp.apk");
                    try {
                        fs_extra.copySync(me.apk_path, tmpApkPath);
                    }
                    catch (e) {
                        processMsg(null, '拷贝文件失败，请检查目录是否正确。', 0);
                    }
                    processMsg('decompile apk.', null, 15);

                    //2. 获得反编译路径4
                    var decomplilePath = path.join(me.temp_path, "decompile");

                    //3. 获得电脑上的java信息，以及设置工作参数，并且进行反编译apk包
                    var ret = yield me.packingAction.runCmd(me.packingAction.getToolPath("java"), [
                        '-jar', '-Xms512m', '-Xmx512m',
                        path.join(me.tool_path, "apktool2.jar"),
                        '-q', 'd', '-b',
                        '-f', tmpApkPath,
                        '-o', decomplilePath], function (str) { console.log(str); });
                    if (!ret) {
                        if (confirm('apktool运行错误，可能是java版本太低，系统需要java 1.7以上，点确定下载。')) {
                            window.open('http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html');
                        }
                    }
                    processMsg('decompile apk', ret ? null : 'apktool运行错误\n', 20);

                    //-- 将sdk的源文件合并到项目中
                    //var smaliDir = decomplilePath+'/smali';

                    //4. 替换config.properties中的游戏启动地址
                    var urlPath = path.join(decomplilePath, "/assets/config.properties");
                    try {
                        var str = me.packingAction.read(urlPath);
                        var reg = new RegExp("^opengame_url=.*","m");
                        str = str.replace(reg,"opengame_url="+url)
                        //str = str.replace(/^\s*loadUrl\s*\(.*$/m, `loadUrl(conch.presetUrl||'${url}');`);
                        fs_extra.outputFileSync(urlPath, str);
                    }
                    catch (e) {
                        error = true;
                    }
                    processMsg('replace url', error ? '替换url出错，可能是解包不对。' : null, 25);

                    me.packingAction.modifiy_orientation(decomplilePath,packageData.orientation);

                    if(packageData.spInfo) {
                        me.packingAction.excuteSDKScript(sdk_path, decomplilePath, package_name, packageData.spInfo, packageData.orientation);
                    }
                    processMsg('config loading view', null, 30);


                    //8. 修改packagename
                    if (package_name && package_name != "") {
                        me.packingAction.renameApkPackage(path.join(decomplilePath, "/AndroidManifest.xml"), package_name);
                    }
                    processMsg('modify package', null, 50);

                    //9. 替换图标
                    if (icon_path && icon_path != "") {
                        me.packingAction.replaceIcon(icon_path,cornerInfo,sdk_path,decomplilePath);
                        //processMsg('make icon', img ? null : ('加载图标文件错误：' + icon_path), 55);
                    }

                    //9. 修改应用名
                    me.packingAction.modifyAppName(path.join(decomplilePath, "res/values/strings.xml"), app_name);
                    me.packingAction.modifyAppName(path.join(decomplilePath, "res/values-zh-rCN/strings.xml"), app_name);
                    processMsg('modify app name', null, 60);

                    //10. 生成新的R文件
                    yield me.packingAction.produceNewRFile(app_name, package_name, decomplilePath, function (msg, err) {
                        if (err) {
                            throw err;
                        }
                    });
                    processMsg('gen R file', null, 70);

                    //11. 重新打包
                    var tempApkPath = path.join(me.temp_path, "temp2.apk");
                    ret = yield me.packingAction.runCmd(me.packingAction.getToolPath("java"), [
                        '-jar', '-Xms512m', '-Xmx512m',
                        path.join(me.tool_path, "apktool2.jar"),
                        '-q', 'b',
                        '-f', decomplilePath,
                        '-o', tempApkPath
                    ], function (str) { console.log(str); });
                    processMsg('repacking', ret ? null : '重新打包失败！', 80);
                    console.log('...');

                    if (fs.existsSync(path.join(decomplilePath, "unknown"))) {
                        var unknowPath = path.join(decomplilePath, "AddForRoot");
                        fs.renameSync(path.join(decomplilePath, "unknown"), unknowPath);
                        me.addForRootDir(tempApkPath, unknowPath);
                    }

                    //12. 使用我们的签名文件进行签名
                    var default_keystore_path = path.join(__dirname, "../../config/keystore/default.keystore");
                    var realSign = (keystore_path && keystore_path.length > 0) &&
                        (keystore_pwd && keystore_pwd.length > 0) &&
                        (keystore_alias && keystore_alias.length > 0) &&
                        (keystore_alias_pwd && keystore_alias_pwd.length > 0);
                    if (realSign) {
                        if (fs.existsSync(keystore_path)) {
                            yield me.packingAction.signApk(tempApkPath, keystore_path, keystore_pwd, keystore_alias, keystore_alias_pwd);
                        }
                        else {
                            if (confirm(`指定的签名文件不存在：${keystore_path}如果继续打包，将使用缺省签名，是否继续？`)) {
                                realSign = false;
                            }
                            else {
                                me.clean();
                                if (onProcess)
                                    onProcess('error', 0);
                                return;
                            }
                        }
                    }
                    if (!realSign) {
                        yield me.packingAction.signApk(tempApkPath, default_keystore_path, '123456', '123456', '123456');
                    }
                    processMsg('singing', null, 90);
                    console.log('align apk.');
                    var output_apk_path = path.join(output_path, app_name+"_"+sp_name+".apk");
                    yield me.packingAction.alignAPK(tempApkPath, output_apk_path);
                    processMsg('clean', null, 99);
                    arrive_clean = true;
                    me.clean();
                    processMsg('complete', null, 100);
                    me._excuteByArray();
                }
                catch (err) {
                    try {
                        me.clean();
                    }
                    catch (e) { }
                    if (arrive_clean) {
                        processMsg('complete', null, 100);
                    }
                    else {
                        alert(err);
                        if (onProcess)
                            onProcess('error', 0);
                    }
                }
            });
        }
        exec();
    }

    signByDefaultKeystore(apkPath){
        var default_keystore_path = path.join(__dirname, "../../config/keystore/default.keystore");
        this.packingAction.signApk(apkPath, default_keystore_path, '123456', '123456', '123456');
    }

    addForRootDir(tempApkPath, src) {
    }


    clean() {
        if (this.temp_path && fs.existsSync(this.temp_path)) {
            fs_extra.removeSync(this.temp_path);
        }
    }

    /**
     * 下载管理以后用志华提供的，先临时用自己的
     * */
    download_file(file_url,download_path,unzip_path,callback){
        var options = {
            host: url.parse(file_url).host,
            port: 80,
            path: url.parse(file_url).pathname
        };


        var file = fs.createWriteStream(download_path);
        var me = this;
        http.get(options, function (res) {
            me.download_tools_tmp_total+=parseInt(res.headers['content-length'], 10);;
            res.on('data', function (data) {
                file.write(data);
                me.download_tools_tmp_cur+=data.length;
                var progress = parseInt((me.download_tools_tmp_cur/me.download_tools_tmp_total)*100);
                window.xsdkShowLoading(window.textConfig.download_tool+" "+progress+"%");
            }).on('end', function () {
                file.end();
                return me.unzip_file(download_path,unzip_path,callback);
            });
        });
    }
    unzip_file(file_path,unzip_path,callback){
        var unzipExtractor = unzip.Extract({path: unzip_path});
        unzipExtractor.on('close',function(){
            fs.unlinkSync(file_path);
            var file_name = url.parse(file_path).pathname.split('/').pop();
            var file_name_only = file_name.split('.').shift();

            callback(unzip_path+file_name_only);
        });
        unzipExtractor.on('error',function(err){
            alert(err);
        });
        fs.createReadStream(file_path).pipe(unzipExtractor);
        //me.sdk_path = outputPath + file_name_only;
    }

    checkJavaEnv() {
        var javaok = true;
        var cmd = this.packingAction.getToolPath('javac');
        var jret = child_process.spawnSync(cmd, ['-version'], { stdio: [0, 'pipe', 'pipe'] });
        console.log('javac -version');
        console.log('  out:' + jret.stdout);
        console.log('  err:' + jret.stderr);
        if (jret.status != 0) {
            console.log('执行javac出错:\n' + jret.stderr);
            javaok = false;
        }
        else {
            var rret = /javac\s*(.*)/.exec(jret.stderr.toString());
            if (!rret)
                javaok = false;
            else {
                var vers = rret[1].split('.');
                if (vers.length < 2) {
                    javaok = false;
                }
                else {
                    if (vers[0] >= '1' && parseInt(vers[1]) >= 7) { }
                    else
                        javaok = false;
                }
            }
        }
        return javaok;
    }
}
exports.GenerateAndroidApk = GenerateAndroidApk;


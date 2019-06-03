/**
 * Created by mayukai on 2016/9/1.
 */
"use strict";



var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};

const fs = require('fs');
const path = require('path');
const fs_extra = require('fs-extra');
const xmldom = require('xmldom');
const xsdkapi = require('./xsdk_api.js');
const child_process = require('child_process');
const nativeImage = require('electron').nativeImage;
class ApkAction {
    constructor(){
        this.tool_path = path.join(__dirname, "../../tool");
    }
    mergeManifestTool(manifest_file, sourceManifestFile){
        var sourceStr = this.read(sourceManifestFile);
        var sourceDoc = new xmldom.DOMParser().parseFromString(sourceStr);
        var destStr = this.read(manifest_file);
        var destDoc = new xmldom.DOMParser().parseFromString(destStr);
        var destRoot = destDoc.documentElement;

        var applicationCfg = sourceDoc.documentElement.getElementsByTagName("applicationCfg");
        var _keywordValue = applicationCfg[0].getAttribute("keyword");

        if( _keywordValue != null && _keywordValue.length>0 && destDoc.getElementsByTagName(_keywordValue).length==0 ){
            var docChilds = applicationCfg[0].childNodes;
            var child;
            var destApplication = destDoc.getElementsByTagName("application");
            while(docChilds.length != 0){
                destApplication[0].appendChild(docChilds[0]);
            }
        }
        var destPermissionList = destRoot.getElementsByTagName("uses-permission");
        var destPermissionArray = new Array();
        for(var i=0;i<destPermissionList.length;++i){
            var value = destPermissionList[i].getAttribute("android:name");
            destPermissionArray.push(value);
        }

        var permissionCfg = sourceDoc.documentElement.getElementsByTagName("permissionCfg");
        if( permissionCfg != null && permissionCfg.length != 0 ){
            var docChilds = permissionCfg[0].childNodes;
            var index = 0;
            while(docChilds.length != index){
                var child = docChilds[index];
                if( child.getAttribute != null){
                    var curAtt = child.getAttribute("android:name");
                    if( this.arrayContain(destPermissionArray,curAtt) ){
                        index++;
                        docChilds.length--;
                        continue;
                    }
                }
                destRoot.appendChild(child);
            }
        }
        fs_extra.outputFileSync(manifest_file, destDoc.toString());
    }
    modifiy_orientation(decomplilePath,orientation){
        var destManifestFile = path.join(decomplilePath, "/AndroidManifest.xml");
        var destStr = this.read(destManifestFile);
        var destDoc = new xmldom.DOMParser().parseFromString(destStr);
        //var destRoot = destDoc.documentElement;
        var destApplication = destDoc.getElementsByTagName("application")[0];
        var activitys = destApplication.getElementsByTagName("activity");

        for(var i=0;i<activitys.length;++i){
            var value = activitys[i].getAttribute("android:name");
            if( value == 'layaair.game.browser.MainActivity' ){
                activitys[i].setAttribute("android:screenOrientation",orientation);
                break;
            }
        }

        fs_extra.outputFileSync(destManifestFile, destDoc.toString());
    }
    copyResource(sdkPath,decomplilePath,package_name){
        return __awaiter(this, void 0, void 0, function* () {
            //-- copy libs dictionary
            var stat = fs.lstatSync(sdkPath);
            if (!stat || !stat.isDirectory()) {
                if (onProcess) {
                    onProcess('error', 0);
                }
                return;
            }
            var libsDir = sdkPath + "sdk_libs";
            if (fs.existsSync(libsDir)) {
                var dest_libs_path = path.join(decomplilePath, "lib");
                if (!fs.existsSync(dest_libs_path)) {
                    fs.mkdirSync(dest_libs_path);
                }

                fs_extra.copySync(libsDir, dest_libs_path);
            }


            //-- copy res dictionary
            var resDir = sdkPath + "sdk_res";
            if (fs.existsSync(resDir)) {
                var dest_res_path = path.join(decomplilePath, "res");
                if (!fs.existsSync(dest_res_path)) {
                    fs.mkdirSync(dest_res_path);
                }

                fs_extra.copySync(resDir, dest_res_path);
            }

            //-- copy splash to assets
            var splashDir = sdkPath + "sdk_splash";
            var dest_assets_path = path.join(decomplilePath, "assets");
            if (fs.existsSync(splashDir)) {
                if (!fs.existsSync(dest_assets_path)) {
                    fs.mkdirSync(dest_assets_path);
                }

                fs_extra.copySync(splashDir, dest_assets_path);
            }

            //-- copy assets to assets
            var assetsDir = sdkPath + "sdk_assets";
            if (fs.existsSync(assetsDir)) {
                if (!fs.existsSync(dest_assets_path)) {
                    fs.mkdirSync(dest_assets_path);
                }

                fs_extra.copySync(assetsDir, dest_assets_path);
            }

            // replace appid、appkey in AndroidManifest.xml
            //var sdk_config_properties_template = path.join(sdkPath, "laya_sdk_config_template.properties");
            //var sdk_config_properties = path.join(assetsDir, "laya_sdk_config.properties");
            //if (fs.existsSync(sdk_config_properties_template)) {
            //    var sdk_info_path = path.join(sdkPath, "sdk_config_info.txt");
            //    if (fs.existsSync(sdk_info_path)) {
            //        var str = this.read(sdk_info_path);
            //        var sdk_script_path = path.join(sdkPath, "script.js");
            //        if (fs.existsSync(sdk_script_path)) {
            //            var _script = require(sdk_script_path);
            //            var sdk_script = new _script.SDK_Define_Script(xsdkapi,sdkPath,decomplilePath,package_name,str);
            //            sdk_script.excute();
            //
            //
            //            var properties = this.read(sdk_config_properties_template);
            //            var _result = sdk_script.replaceConfig(properties, str);
            //            fs_extra.outputFileSync(sdk_config_properties, _result);
            //        }
            //    }
            //    fs_extra.copySync(sdk_config_properties, path.join(dest_assets_path, "laya_sdk_config.properties"));
            //}

            //-- copy dex to smali
            var sdkDexPath = sdkPath + "classes.dex";
            var smalitmp_path = path.join(decomplilePath, "smali");
            yield this.dexTrans2Smali(sdkDexPath, smalitmp_path, 10, 'baksmali');

            //var smali_path = path.join(decomplilePath, "smali");
            //fs_extra.copySync(smalitmp_path, smali_path);
            //if (fs.existsSync(smalitmp_path)) {
            //    fs_extra.removeSync(smalitmp_path);
            //}
        });
    }

    mergeManifest(sdkPath,decomplilePath,package_name){
        //-- modify manifest
        var destManifestFile = path.join(decomplilePath, "/AndroidManifest.xml");
        //var sourceManifestFile = path.join(sdkPath,"/SDKManifestLandscape.xml");
        //if (!fs.existsSync(sourceManifestFile)) {
        var sourceManifestFile = path.join(sdkPath,"/SDKManifest.xml");
        //}
        this.mergeManifestTool(destManifestFile,sourceManifestFile);


        //var destManifestFileStr = this.read(destManifestFile);
        //var _result = sdk_script.replaceConfig(destManifestFileStr,str);
        //fs_extra.outputFileSync(destManifestFile, _result);
    }


    excuteSDKScript(sdkPath,decomplilePath,package_name,spInfo,orientation){
        // replace appid、appkey in AndroidManifest.xml
        var sdk_script_path = path.join(sdkPath,"script.js");
        if (!fs.existsSync(sdk_script_path)) {
            return;
        }
        //var sdk_info_path = path.join(sdkPath,"sdk_config_info.txt");
        //if (!fs.existsSync(sdk_info_path)) {
        //    return;
        //}
        //var str = this.read(sdk_info_path);
        //if (!str || str.length <= 0)
        //    return;

        var _script = require(sdk_script_path);
        var sdk_script = new _script.SDK_Define_Script(xsdkapi,sdkPath,decomplilePath,package_name,orientation,spInfo);
        sdk_script.excute();
    }

    arrayContain(inArray,inValue){
        for(var i in inArray){
            if( inArray[i] == inValue){
                return true;
            }
        }
        return false;
    }
    read(path) {
        try {
            var text = fs.readFileSync(path, "utf-8");
            text = text.replace(/^\uFEFF/, '');
        }
        catch (err0) {
            return "";
        }
        return text;
    }
    produceNewRFile(app_name, package_name, decomplile_path, eventh) {
        return __awaiter(this, void 0, void 0, function* () {
            var temp_path = path.join(decomplile_path, "tempRFile");
            var target_res_path = path.join(temp_path, "res");
            fs_extra.copySync(path.join(decomplile_path, "res"), target_res_path);
            var gen_path = path.join(temp_path, "gen");
            if (!fs.existsSync(gen_path)) {
                fs.mkdirSync(gen_path);
            }
            var me = this;
            var ret = yield me.runCmd(me.getToolPath("aapt"), ['p', '-f', '-m',
                '-J', gen_path,
                '-S', target_res_path,
                '-I', me.getToolPath("android"),
                '-M', path.join(decomplile_path, "AndroidManifest.xml")
            ], function (str) {
                eventh(null, '修改包名错误 = '+str);
            });
            if (!ret && eventh) {
                eventh(null, '修改包名错误，请检查包名是否规范。');
                return;
            }
            var package_array = package_name.split(".");
            var r_path = gen_path;
            for (var i = 0; i < package_array.length; i++) {
                r_path = path.join(r_path, package_array[i]);
            }
            r_path = path.join(r_path, 'R.java');
            ret = yield me.runCmd(me.getToolPath("javac"), ['-source', '1.7',
                '-target', '1.7',
                '-encoding', 'UTF-8',
                r_path], function (str) { });
            if (!ret && eventh) {
                eventh(null, '重新编译java文件错误。');
                return;
            }
            var dex_path = path.join(temp_path, 'class.dex');
            if (process.platform == "win32") {
                ret = yield me.runCmd(me.getToolPath("dx"), ['--dex', '--output=' + dex_path, gen_path], function (str) { });
            }
            else {
                ret = yield me.runCmd(me.getToolPath("java"), ['-jar', '-Xms512m', '-Xmx512m',
                    me.getToolPath("dx"),
                    '--dex', '--output=' + dex_path,
                    gen_path
                ], function (str) { });
            }
            var smali_path = path.join(decomplile_path, "smali");
            me.dexTrans2Smali(dex_path,smali_path,10, 'baksmali');
        });
    }

    replaceIcon(icon_path,cornerInfo,sdkPath,decomplilePath){
        return __awaiter(this, void 0, void 0, function* () {
            var img = yield this.loadImgSync(icon_path);
            if (img) {
                var ps = [
                    {f: 'drawable-xxxhdpi-v4', sz: 192},
                    {f: 'drawable-xxhdpi-v4', sz: 144},
                    {f: 'drawable-xhdpi-v4', sz: 96},
                    {f: 'drawable-hdpi-v4', sz: 72},
                    {f: 'drawable-mdpi-v4', sz: 48},
                    {f: 'drawable-ldpi-v4', sz: 36},
                    {f: 'mipmap-xxxhdpi-v4', sz: 192},
                    {f: 'mipmap-xxhdpi-v4', sz: 144},
                    {f: 'mipmap-xhdpi-v4', sz: 96},
                    {f: 'mipmap-hdpi-v4', sz: 72},
                    {f: 'mipmap-mdpi-v4', sz: 48},
                    {f: 'mipmap-ldpi-v4', sz: 36}
                ];
                var sdkimg = null;
                if( cornerInfo ) {
                    var sourceSdkIcon = cornerInfo.filePath;//path.join(sdkPath, cornerInfo.filePath);
                    if (fs.existsSync(sourceSdkIcon)) {
                        sdkimg = yield this.loadImgSync(sourceSdkIcon);
                    }
                }

                //if (fs.existsSync(sourceSdkIcon)){
                //    sdkimg = yield loadImgSync(sourceSdkIcon);
                //}

                ps.forEach((v, i, arr) => {
                    let f = path.join(decomplilePath, "res/" + v.f + "/ic_launcher.png");
                    if (fs.existsSync(f)) {
                        var sdkox = cornerInfo == null ? 0 : cornerInfo.ox;
                        var sdkoy = cornerInfo == null ? 0 : cornerInfo.oy
                        this.ResizeImg(img, v.sz, v.sz, sdkimg,sdkox,sdkoy, f);
                    }
                });
            }
        });
    }

    modifyAppName(file_path, app_name) {
        var str = this.read(file_path);
        if (!str || str.length <= 0)
            return;
        var doc = new xmldom.DOMParser().parseFromString(str);
        var allres = doc.documentElement.getElementsByTagName('string');
        for (var i = 0; i < allres.length; i++) {
            if (allres[i].getAttribute('name') == 'app_name') {
                allres[i].childNodes[0]['data'] = app_name;
            }
        }
        fs_extra.outputFileSync(file_path, doc.toString());
    }
    //Utils

    alignAPK(src_apk, des_apk) {
        return __awaiter(this, void 0, void 0, function* () {
            var me = this;
            var ret = yield me.runCmd(me.getToolPath("zipalign"), ['-f', '4', src_apk, des_apk], function (str) { });
        });
    }
    renameApkPackage(manifest_path, package_name) {
        var str = this.read(manifest_path);
        var doc = new xmldom.DOMParser().parseFromString(str);
        var allres = doc.documentElement.setAttribute('package', package_name);
        fs_extra.outputFileSync(manifest_path, doc.toString());
    }

    signApk(src_apk, keyStore, storepassword, keyalias, aliaspassword) {
        return __awaiter(this, void 0, void 0, function* () {
            var files = '';
            var me = this;
            var ret = yield me.runCmd(me.getToolPath("aapt"), [
                'list', src_apk
            ], function (str) { files += str; });
            if (!ret) {
                throw 'appt list error！';
            }
            var array = files.toString().split("\n");
            for (var i = 0; i < array.length; i++) {
                var file_name = array[i];
                if (file_name != "" && file_name.includes("META-INF")) {
                    console.log('remove ' + array[i]);
                    var ret = yield me.runCmd(me.getToolPath("aapt"), ['remove', src_apk, array[i]], function (str) { });
                    if (!ret) {
                        throw 'aapt remove error!';
                    }
                }
            }
            ret = yield me.runCmd(me.getToolPath("jarsigner"), [
                '-keystore', keyStore,
                '-storepass', storepassword,
                '-keypass', aliaspassword,
                src_apk, keyalias,
                '-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1'
            ], function (str) {
                console.log(str);
            });
            if (!ret) {
                throw '重新签名错误，可能是密码不对。';
            }
        });
    }

    dexTrans2Smali(dexFile, targetDir, step, baksmali){
        return __awaiter(this, void 0, void 0, function* () {
            if(!fs.existsSync(targetDir)){
                fs.mkdirSync(targetDir);
            }
            var me = this;
            if( fs.existsSync(dexFile) ){
                var smaliFile = me.getToolPath(baksmali);

                var ret = yield me.runCmd(me.getToolPath("java"), ['-jar', '-Xms512m', '-Xmx512m',
                    smaliFile,
                    '-o',
                    targetDir,
                    dexFile
                ], function (str) {
                    console.log("str = "+str);
                });

                if(!ret){
                    if (onProcess) {
                        onProcess('error', 0);
                    }
                }
            }
        });
    }
    getToolPath(tool) {
        if (process.platform == "win32") {
            if (tool == "zipalign") {
                return path.join(this.tool_path, "win/zipalign.exe");
            }
            else if (tool == "aapt") {
                return path.join(this.tool_path, "win/aapt.exe");
            }
            else if (tool == "java") {
                return path.join(this.tool_path, "win/jre/bin/java");
            }
            else if (tool == "jarsigner") {
                return path.join(this.tool_path, "win/jre/bin/jarsigner");
            }
            else if (tool == "javac") {
                return path.join(this.tool_path, "win/jre/bin/javac");
            }
            else if (tool == "android") {
                return path.join(this.tool_path, "android.jar");
            }
            else if (tool == "dx") {
                return path.join(this.tool_path, "win/dx.bat");
            }
            else if (tool == "baksmali") {
                return path.join(this.tool_path, "baksmali.jar");
            }
        }
        else if (process.platform == "darwin") {
            if (tool == "zipalign") {
                return path.join(this.tool_path, "mac/zipalign");
            }
            else if (tool == "aapt") {
                return path.join(this.tool_path, "mac/aapt");
            }
            else if (tool == "java") {
                return 'java';
            }
            else if (tool == "jarsigner") {
                return tool;
            }
            else if (tool == "javac") {
                return 'javac';
            }
            else if (tool == "android") {
                return path.join(this.tool_path, "android.jar");
            }
            else if (tool == "dx") {
                return path.join(this.tool_path, "dx.jar");
            }
            else if (tool == "baksmali") {
                return path.join(this.tool_path, "baksmali.jar");
            }
        }
        else {
            var desc = process.platform + 'paltform not support';
            throw desc;
        }
    }
    runCmd(cmd, param, onout) {
        return __awaiter(this, void 0, Promise, function* () {
            console.log('run:' + cmd + '\n' + param.join(' '));
            return new Promise(function (res, rej) {
                var cproc = child_process.spawn(cmd, param);
                var hasErr = false;
                cproc.stdout.on('data', function (data) {
                    console.log('cmd out:' + data.toString());
                    onout('stdout:' + data.toString());
                });
                cproc.stderr.on('data', function (data) {
                    hasErr = true;
                    console.log('stderr:' + data.toString());
                    onout('stderr:' + data.toString());
                });
                cproc.on('exit', function (code) {
                    if (code == 0 && !hasErr) {
                        res(true);
                    }
                    else {
                        console.log("runcmd error:" + code);
                        res(false);
                    }
                });
            });
        });
    }
    loadImgSync(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise(function (res, rej) {
                var img = new Image();
                img.src = url;
                img.onload = function () {
                    res(img);
                };
                img.onerror = function () {
                    res(null);
                };
            });
        });
    }

    ResizeImg(img,nw, nh,sdk_icon,iconox,iconoy, file) {
        var canv = document.createElement('canvas');
        canv.width = nw;
        canv.height = nh;
        var ctx = canv.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, nw, nh);
        if( sdk_icon != null && sdk_icon!="" ){
            ctx.drawImage(sdk_icon, 0, 0, img.width, img.height, nw * iconox/512, nh * iconoy/512, nw, nh);
            //ctx.drawImage(sdk_icon, 0, 0, img.width, img.height, iconox, iconoy, nw, nh);
        }
        var buf = canv.toDataURL('image/png');
        var nimg = nativeImage.createFromDataURL(buf);
        var sz = nimg.getSize();
        console.log('new img:' + sz.width + ',' + sz.height);
        fs.writeFileSync(file, nimg.toPng());
    }
}

exports.ApkAction = ApkAction;
exports.__awaiter = __awaiter;
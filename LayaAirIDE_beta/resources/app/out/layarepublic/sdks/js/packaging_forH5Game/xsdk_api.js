/**
 * Created by mayukai on 2016/9/14.
 */

const fs = require('fs');
const path = require('path');
const xmldom = require('xmldom');
const fs_extra = require('fs-extra');

class xsdk_api {
    constructor(_sdk_path, _decompile_dir, _package_name,_orientation, _userSDKConfig) {
        this.sdk_path = _sdk_path;
        this.decompile_dir = _decompile_dir;
        this.package_name = _package_name;
        this.userSDKConfig = _userSDKConfig;
        this.orientation = _orientation;
    }

    replace_file_content(filepath,tag,value){
        var file_path = path.join(this.decompile_dir,filepath);
        if( !fs.existsSync(file_path) ){
            return;
        }
        var content = this.read(file_path);
        content = content.replace(new RegExp(tag,"gm"),value);
        fs_extra.outputFileSync(file_path, content);
    }

    get_config_value(key){
        return this.userSDKConfig == null ? null :　this.userSDKConfig[key];
    }
    get_package_name(){
        return this.package_name;
    }
    get_orientation(){
        return this.orientation;
    }
    modify_application(application_name){
        var destManifestFile = path.join(this.decompile_dir, "/AndroidManifest.xml");
        var destStr = this.read(destManifestFile);
        var destDoc = new xmldom.DOMParser().parseFromString(destStr);
       //var destRoot = destDoc.documentElement;
        var destApplication = destDoc.getElementsByTagName("application")[0];
        destApplication.setAttribute("android:name",application_name);
        fs_extra.outputFileSync(destManifestFile, destDoc.toString());
    }

    modifiy_orientation(orientation){
        var destManifestFile = path.join(this.decompile_dir, "/AndroidManifest.xml");
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
    copy_special_class(inputPackage,outputPackage){
        var package_array = inputPackage.split(".");
        var input_path = this.decompile_dir+"/smali/";
        var sourcePackage = "";
        var destPackage = "";
        for (var i = 0; i < package_array.length; i++) {
            input_path = path.join(input_path, package_array[i]);
            sourcePackage+=package_array[i]+"/";
        }

        package_array = outputPackage.split(".");
        var output_path = this.decompile_dir+"/smali/";
        var relativeOutPath = "/smali/";
        for (var i = 0; i < package_array.length; i++) {
            output_path = path.join(output_path, package_array[i]);
            destPackage+=package_array[i]+"/";
            relativeOutPath+=package_array[i]+"/";
        }

        fs_extra.copySync(input_path, output_path);

        var files=fs.readdirSync(output_path);
        for(var fn in files)
        {
            var fname = output_path+path.sep+files[fn];
            var stat = fs.lstatSync(fname);
            if(stat.isFile() == true)
            {
                this.replace_file_content(relativeOutPath+files[fn],sourcePackage,destPackage);
            }
        }
    }
    remove_mainactivity_filter(){
        var destManifestFile = path.join(this.decompile_dir, "/AndroidManifest.xml");
        var destStr = this.read(destManifestFile);
        var destDoc = new xmldom.DOMParser().parseFromString(destStr);
        //var destRoot = destDoc.documentElement;
        var destApplication = destDoc.getElementsByTagName("application")[0];
        var activitys = destApplication.getElementsByTagName("activity");

        for(var i=0;i<activitys.length;++i){
            var value = activitys[i].getAttribute("android:name");
            if( value == 'layaair.game.browser.MainActivity' ){
                activitys[i].removeChild(activitys[i].getElementsByTagName("intent-filter")[0]);
                break;
            }
        }

        fs_extra.outputFileSync(destManifestFile, destDoc.toString());
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
}

exports.xsdk_api = xsdk_api;

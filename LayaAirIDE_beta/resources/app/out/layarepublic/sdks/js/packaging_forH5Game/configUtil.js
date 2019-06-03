/**
 * Created by mayukai on 2016/9/9.
 */

const fs = require('fs');
const path = require('path');
const fs_extra = require('fs-extra');
const xmldom = require('xmldom');

class ConfigUtil {
    constructor() {

    }

    loadXmlConfig(configPath){
        this.configFile = configPath;
        if( fs.existsSync(configPath) ){
            var sourceStr = this.read(configPath);
            this.xmlInstance = new xmldom.DOMParser().parseFromString(sourceStr);
        }else{
            this.xmlInstance = new xmldom.DOMParser().parseFromString(
                '<xml xmlns="a" xmlns:config="http://www.layabox.com">\n'+
                '</xml>'
                ,'text/xml');
        }
    }
    addAttribute(key,value){
        if(this.getAttribute(key).length>1) {
            return;
        }
        var destRoot = this.xmlInstance.documentElement;
        var element = this.xmlInstance.createElement("configInfo");
        element.setAttribute(key,value);
        destRoot.appendChild(element);
        //var newatt = this.xmlInstance.createAttribute(key);
        //newatt.nodeValue = value;
        fs_extra.outputFileSync(this.configFile, this.xmlInstance.toString());
        var tt = this.getAttribute(key);
    }
    getAttribute(key){
        var destRoot = this.xmlInstance.documentElement;
        var configInfos = this.xmlInstance.getElementsByTagName("configInfo");
        for(var i=0;i<configInfos.length;++i){
            var configAtt = configInfos[i].getAttribute(key);
            if(configAtt.length>1){
                return configAtt;
            }
        }
        return "";
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

exports.ConfigUtil = ConfigUtil;

/**
 * Created by wangzhihua on 2016/6/15.
 */
var layahandlerHtml = (function () {
    function layahandlerHtml() {

    }
    layahandlerHtml.prototype.startReadfile = function (url,type) {
        isflagaddlayaUI=false;
        var htmlcont = fs.readFileSync(path.join(url, "bin", "index.html"), "utf-8");
        var jsscript = /<!--jsfile--startTag-->((?:.|(?:\r?\n))*)<!--jsfile--endTag-->/;
        var oldscript = jsscript.exec(htmlcont);
        if (oldscript && oldscript.length > 1) {
            var oldscriptCon = oldscript[1];
            if(type=="ts"){
                var fileList =LayaAirFileTools.getFileList(path.join(url,"bin","js"),".js");
            }else{
                var fileList =LayaAirFileTools.getFileList(path.join(url,"src"),".js");
            }
            url=url.replace(/\\/g,"/").replace(/\/$/, "");
            var addscript =""
                for(var j=0;j<fileList.length;j++)
                {
                    if(type=="ts"){
                        var fileItem= fileList[j].replace(url+"/bin/","");
                    }else{
                        var fileItem= fileList[j].replace(url+"/src/","../src/");
                    }
                    if(oldscriptCon.indexOf(fileItem)==-1)
                    {
                        addscript+="\n\t<script src="+"\""+fileItem+"\""+"><"+"\/"+"script>";
                    }
                }
            addscript ="<!--jsfile--startTag-->"+addscript;
            addscript+=oldscriptCon;
            addscript =addscript+"<!--jsfile--endTag-->";
            if(htmlcont.indexOf("layaUI.max.all.js")==-1&&isflagaddlayaUI)
            {
               if(type=="js") addscript ="\n\t<script src="+"\""+"../src/ui/layaUI.max.all.js"+"\""+"><"+"\/"+"script>\n\t"+addscript;
                else{
                   addscript ="\n\t<script src="+"\"js/ui/layaUI.max.all.js"+"\""+"><"+"\/"+"script>\n\t"+addscript;
               }
            }
            htmlcont = htmlcont.replace(oldscript[0],addscript);
            fs.writeFileSync(path.join(url, "bin", "index.html"),htmlcont);
        }

    }
    return new layahandlerHtml
})()
var isflagaddlayaUI= false;
var LayaAirFileTools = (function () {
    function LayaAirFileTools() {

    }
    //得到路径下所有文件列表 参数为 路径和扩展名
    LayaAirFileTools.prototype.getFileList= function(url, extension) {
        var result = [];
        var fileList = fs.readdirSync(url);
        var stat = fs.statSync;
        nextfind(url);
        return result;
        function nextfind(url) {
            var fileList = fs.readdirSync(url);
            fileList.forEach(function (filepath) {
                var filepath = path.join(url, filepath);
                if (stat(filepath).isFile()) {
                    filepath = filepath.replace(/\\/g,"/");
                    if (extension) {
                        if (path.extname(filepath) == extension) {
                            if(filepath.indexOf("layaUI.max.all.js")==-1){
                                result.push(filepath);
                            }else{
                                isflagaddlayaUI=true
                            }
                        }
                    } else {
                        result.push(filepath);
                    }
                } else {
                    nextfind(filepath);
                }
            })
        }
    }
    return new LayaAirFileTools();
})()
function cleanProTs(filepath)
{
    var files = [];

    if( fs.existsSync(filepath) ) {

        files = fs.readdirSync(filepath);

        files.forEach(function(file,index){

            var curPath = filepath + path.sep + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse

                cleanProTs(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(filepath);

    }
}
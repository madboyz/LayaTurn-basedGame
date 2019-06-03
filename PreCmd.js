
var PreCmd=(function(){
        var RunConfig = {};
        RunConfig.cdn = false;
        RunConfig.ci = false;
        RunConfig.version = "";
        var args = process.argv
        var FS = require('fs');
        var Readline = require('readline');
        var os = require('os'); 
        this.parseArgToObj = function(args,start,target){
            (start===void 0)&& (start=0);
			var i=0,len=0;
			len=args.length;
			var tParam;
			var pArr;
			for (i=start;i < len;i++){
				tParam=args[i];
				if (tParam.indexOf("=")> 0){
					pArr=tParam.split("=");
					if (target[pArr[0]] && typeof(target[pArr[0]])=="number"){
						pArr[1]=Sys.mParseFloat(pArr[1]);
					}
					//console.log(pArr);
                    target[pArr[0]]=pArr[1];
				}
			}
        }
        this.parseArgToObj(args,1,RunConfig);
        //
        //console.log(RunConfig.cdn)
        //if(RunConfig.cdn == true)
        //{
            var fileContent="";
            var value = FS.createReadStream("./bin/index.html");
            var objReadline = Readline.createInterface({
                input:value
                //output: fWrite,
            });
            objReadline.on('line',function (line) {
            //console.log("line======="+line)
            if (line.indexOf("window.CDN ==") != -1) 
            {

            }
            else if (line.indexOf("window.CDN =") != -1) 
            {
               line = `        window.CDN = ${RunConfig.cdn};`;
            } 
            else if (line.indexOf("var CI = ") != -1)
            {
                line = `		var CI = ${RunConfig.ci};`;
            }
            else if (line.indexOf("http://mxxy-res1.mzyule.com/") != -1)
            {
                line = line.replace("http://mxxy-res1.mzyule.com/",`http://mxxy-res1.mzyule.com/${RunConfig.version}/`);
            }
            fileContent += line+"\n";
            });
            
                        
            objReadline.on('close',function () {
                var fWrite = FS.createWriteStream("./bin/index.html"); 
                fWrite.on('finish', () => {
                    console.log('写入已完成..');
                    console.log('读取文件内容:', FS.readFileSync("./bin/index.html", 'utf8')); //打印写入的内容
                });
                fWrite.write(fileContent);
                fWrite.end();
                objReadline.write(fileContent);
            });
        
        
            objReadline.on('finish', () => {
                console.log('写入已完成..');
            });
        //}

        
})

PreCmd();
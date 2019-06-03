var layaWaitCompleteTimer = 0;
var layaCompile = false;
var __layatsInitArr;
var _curentTsArr = [];
function tsCompileModule()
{
    childProcess.exec("tsc -v", function(e, me)
    {
        if (me.indexOf("Version") != -1 || me.indexOf("version") != -1)
        {
            // layaEditeVscode.append("Tasks", "LayaAirIDE 需要ts版本为1.8以上版本，您使用的ts版本为:" + me + "\n您可以安装node,执行npm install -g typescript 来配置ts环境");
            var htmlcont = fs.readFileSync(path.join(configuration.workspacePath, "bin", "index.html"), "utf-8");
            if (htmlcont.indexOf("jsfile--Main") != -1)
            {
                LayaTypeScriptHtml.htmlHandlerScript();
            }
            else
            {
                layahandlerHtml.startReadfile(configuration.workspacePath, "ts")
            }
            if (complicallbackfunction)
            {
                complicallbackfunction();
                complicallbackfunction = null;
                return;
            }
            if (_layaisdebug)
            {
                _layaisdebug = false;
                sendMenuHandlerLaya("workbench.action.debug.start");
                if (layadebugSelect.selectedIndex == 0) sendMenuHandlerLaya("workbench.action.debug.restart");
                ____dispacher.emit('debugLaya', "code");
            }

        }
        else
        {
            debugButton.style.pointerEvents = "";
            debugButton.style.backgroundColor = "";
            return
        }
    })

    function getFileList(url, extension)
    {
        var result = [];
        var fileList = fs.readdirSync(url);
        var stat = fs.statSync;
        nextfind(url);
        return result;

        function nextfind(url)
        {
            var fileList = fs.readdirSync(url);
            fileList.forEach(function(filepath)
            {
                var filepath = path.join(url, filepath);
                var ststts = stat(filepath);
                if (ststts.isFile())
                {
                    filepath = filepath.replace(/\\/g, "/");
                    if (extension)
                    {
                        if (path.extname(filepath) == extension)
                        {
                            var tsfile = new TsFileState();
                            tsfile.time = ststts.mtime.getTime();
                            tsfile.url = filepath;
                            result.push(tsfile);
                        }
                    }
                    else
                    {
                        // result.push(filepath);
                    }
                }
                else
                {
                    nextfind(filepath);
                }
            })
        }
    }
}

function flashpublish()
{
    if (fs.existsSync(codeMain.workspacePath + path.sep + "tsconfig.json") || fs.existsSync(codeMain.workspacePath + path.sep + "jsconfig.json"))
    {
        alert("此功能只适用于AS工程");
        return
    }
    if (!checkPanelASSwf())
    {
        return
    }
    if (process.platform === 'darwin')
    {
        var arg1 = './mxmlc ';
    }
    else
    {
        var arg1 = 'mxmlc ';
    }
    var arg2 = "\"" + path.join(codeMain.workspacePath, "src", "LayaSwf.as") + "\"";
    check()
    var currentPath = process.cwd();
    var mxmlpath = path.join(path.dirname(__dirname), "libs", "FlashPublishTools", "sdk", "bin");
    process.chdir(mxmlpath);
    taskProlayaWaitCompleteTimer();
    var arg4 = " -output " + "\"" + path.join(codeMain.workspacePath, "bin", "Layaswf.swf") + "\"";
    var version = localStorage.getItem(codeMain.workspacePath);
    var enginepath = path.dirname(__dirname) + path.sep + "laya" + path.sep + "libs";
    var fileList = fs.readdirSync(enginepath);
    fileList = fileList.reverse()[0];
    var loadconigpath = path.join(enginepath, fileList, "as", "flex-config.xml");
    if (!fs.existsSync(loadconigpath))
    {
        var asc = path.join(path.dirname(__dirname), "libs", "FlashPublishTools", "flex-config.xml");
        layacopyDirFile(asc, path.dirname(loadconigpath))
    }
    var arg3 = " -load-config+=" + "\"" + loadconigpath + "\"";
    childProcess.exec(arg1 + arg2 + arg3 + arg4,
    {
        encoding: "binary",
        maxBuffer: 1024 * 1024 * 20
    }, function(err, stdOut, stdErr)
    {
        taskProlayaWaitCompleteTimerClear();
        if (err)
        {
            layaEditeVscode.clearOutput("Tasks");
            layaEditeVscode.showOutput("Tasks", true);
            var iconv = require('iconv-lite');
            var data = iconv.decode(stdErr, 'GBK');
            layaEditeVscode.append("Tasks", data);
        }
        else
        {
            layaEditeVscode.clearOutput("Tasks");
            layaEditeVscode.showOutput("Tasks", true);
            layaEditeVscode.append("Tasks", "编译swf完成,请查看bin目录下！");
        }
        var appdatapath = path.join(path.dirname(remote.app.getDataPath()), "Macromedia", "Flash Player", "#Security", "FlashPlayerTrust")
        if (fs.existsSync(appdatapath))
        {
            fs.writeFileSync(path.join(appdatapath, "laya.cfg"), codeMain.workspacePath)
        }

        process.chdir(currentPath);
    })

    function check()
    {
        var aspath = path.join(path.dirname(__dirname), "libs", "flashPublishTools", "LayaSwf.as");
        var arg2 = path.join(codeMain.workspacePath, "src");
        if (!fs.existsSync(path.join(arg2, "LayaSwf.as")))
        {
            layacopyDirFile(aspath, arg2)
        }
    }
}

/////
function checkPanelASSwf()
{
    var mxmlpath = path.join(path.dirname(__dirname), "libs", "FlashPublishTools", "sdk", "bin");
    if (!fs.existsSync(mxmlpath))
    {
        var layaPackage = getElement("div", "layaPackage");
        document.body.appendChild(layaPackage)
        var viewPanel = getElement("div", "viewPanel");
        layaPackage.appendChild(viewPanel);
        var titl = getElement("div", "titleBackground");
        titl.innerHTML = "swf生成环境向导";
        __Layadrag(layaPackage, titl);
        viewPanel.appendChild(titl);
        viewPanel.style.height = "240px";
        var closeBtn = getElement("div", "closeBtn");
        closeBtn.innerHTML = "×";
        closeBtn.onclick = function()
        {
            document.body.removeChild(layaPackage);
        }
        viewPanel.appendChild(closeBtn);
        var container = getElement("div", "container");
        viewPanel.appendChild(container);
        /////----------------
        var selectcontainer = getselectcontainer();
        var span = getElement("span", "", "1.生成swf文件需要官方提供的运行环境和最新的java环境,是否要下载？\n");
        span.style.width = "400px";
        selectcontainer.appendChild(span);
        var resBtn = getElement("button", "cusBtn", "跳转下载");
        selectcontainer.appendChild(resBtn);
        resBtn.onclick = function(e)
        {
                resBtn.blur();
                window.open("http://ldc.layabox.com/download/tools/FlashPublishTools.zip");
        }
            ///////////------------------------
        var selectcontainer = getselectcontainer();
        var span = getElement("span", "", "2.下载完成后请自行解压并覆盖到ide相应目录即可,是否打开环境目录？");
        span.style.width = "400px";
        selectcontainer.appendChild(span);
        var resBtn = getElement("button", "cusBtn", "打开目录");
        selectcontainer.appendChild(resBtn);
        resBtn.onclick = function(e)
        {
                resBtn.blur();
                var dir = path.dirname(__dirname);
                var tmp1 = path.join(dir, "libs", "FlashPublishTools");
                mkdirsSyncLaya(tmp1)
                remote.shell.showItemInFolder(tmp1)
        }
            ///////////------------------------
        var selectcontainer = getselectcontainer();
        var span = getElement("span", "", "3.覆盖FlashPublishTools目录后，重新打开此窗口");
        span.style.width = "450px";
        selectcontainer.appendChild(span);
        ///////////--------------------------------
        function getselectcontainer()
        {
            var div = getElement("div", "selectcontainer");
            container.appendChild(div);
            return div
        }

        function getElement(type, className, html)
        {
            var div = document.createElement(type);
            if (className) div.setAttribute("class", className);
            if (html) div.innerHTML = html;
            if (type == "input")
            {
                setFocuInput(div);
                div.styleBlur = className;
            }
            return div
        }

        return false
    }
    return true
}

function taskProlayaWaitCompleteTimer()
{
    clearInterval(layaWaitCompleteTimer);
    remote.getCurrentWindow().setProgressBar(-1);
    var count = 0;
    var pro = 0;
    var arcount = [".", "...", ".....", "......", "........"];
    var infoLaya = ["|", "/", "-", "\\", "|"]
    layaAndvscodeInfo.className = "task-statusbar-item-progress";
    layaWaitCompleteTimer = setInterval(function()
    {
        count++;
        count = count % 5;
        layaInfo.innerHTML = "开始编译:" + arcount[count];
        layaAndvscodeInfo.innerHTML = infoLaya[count];
        pro += 0.03;
        pro = Math.min(pro, 1);
        remote.getCurrentWindow().setProgressBar(pro);
    }, 50);
}

function taskProlayaWaitCompleteTimerClear()
{
    layaInfo.innerHTML = "编译完成";
    layaAndvscodeInfo.className = "task-statusbar-item-progress hidden";
    clearInterval(layaWaitCompleteTimer);
    remote.getCurrentWindow().setProgressBar(-1);
}

function down3dzip()
{
    
}
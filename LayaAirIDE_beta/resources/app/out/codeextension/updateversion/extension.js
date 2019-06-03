function activate(context)
{
    window.layainfobar = require(__dirname + path.sep + "popshowpanel.js");
    codeMain.popPanel = layainfobar;
    ipc.on("layaupdateeventpage", function()
    {
        (InnerVer !== "auto") && setTimeout(startupdate, 5000);
    })
    ipc.send("layaupdateevent");
    (InnerVer !== "auto") && setTimeout(startupdate, 5000);

    // 0:equal; 1:new>old; -1:new<old
    function compareVersion(oldVer, newVer) {
        if (oldVer === newVer) return 0;

        var oldArr = oldVer.split(".");
        var newArr = newVer.split(".");
        var oldLen = oldArr.length;
        var newLen = newArr.length;
        var len = (oldLen > newLen) ? oldLen : newLen;
        var oldTemp, newTemp;
        for (var i = 0; i < len; i++) {
            oldTemp = oldArr[i];
            newTemp = newArr[i];
            if (undefined === newTemp) return -1;
            if (undefined === oldTemp) return 1;
            
            if (oldTemp !== "" + parseInt(oldTemp)) {
                alert("Wrong Local Version Format.");
                // When local wrong, make it can be updated.
                return 1;
            }
            if (newTemp !== "" + parseInt(newTemp)) {
                alert("Wrong Remote Version Format.");
                // When remote wrong, make it can not be updated.
                return -1;
            }

            if (parseInt(newTemp) === parseInt(oldTemp)) {
                continue;
            } else if (parseInt(newTemp) > parseInt(oldTemp)) {
                return 1;
            } else {
                return -1;
            }
        }
        return 0;
    }
    window._compareVersion = compareVersion;

    function startupdate()
    {
        console.log('@@@', '请求“更新配置文件”');
        var popPanel = layainfobar
        var versionConfig = new XMLHttpRequest();
        var configVersion;
        versionConfig.open("GET", "http://ldc.layabox.com/download/LayaAir/versionconfig.json?" + Math.random());
        // versionConfig.open("GET", "http://10.10.20.34:8000/versionconfig.json?" + Math.random());
        versionConfig.onreadystatechange = function()
        {
            if (versionConfig.readyState !== 4) return;
            if (versionConfig.status === 200)
            {
                console.log('@@@', '下载“更新配置文件”成功，解析“更新配置文件”');
                window.configVersion = configVersion = JSON.parse(versionConfig.responseText);
                codeMain.mkdirsSync(path.join(remote.app.getPath("userData"), "layaversion"));
                configVersion.versionList = configVersion.versionList.reverse(); // 引擎库列表
                if (codeMain.layaIDEVersion.includes("beta"))
                {
                    //测试版
                    if(!configVersion.betaVersion){
                        console.log('@@@', '测试版，config文件，没有对应版本号，终止');
                        return
                    }
                    if (1 !== compareVersion(codeMain.localversion, configVersion.betaVersion))
                    {
                        console.log('@@@', '测试版，当前版本为最新版');
                        return;
                    }
                    //url
                    if (process.platform === 'darwin')
                    {
                        configVersion.winIdeUrl = configVersion.betaMacUrl;
                    }
                    else
                    {
                        configVersion.winIdeUrl = configVersion.betaWinUrl;
                    }
                }
                else
                {
                    //正式版//url
                    if(!configVersion.releaseVersion){
                        console.log('@@@', '正式版，config文件，没有对应版本号，终止');
                        return
                    }
                    if (1 !== compareVersion(codeMain.localversion, configVersion.releaseVersion))
                    {
                        console.log('@@@', '正式版，当前版本为最新版');
                        return
                    }
                    if (process.platform === 'darwin')
                    {
                        configVersion.winIdeUrl = configVersion.releaseMacUrl;
                    }
                    else
                    {
                        configVersion.winIdeUrl = configVersion.releaseWinUrl;
                    }
                }
                //下载整个版本
                configVersion.winIdeUrl =configVersion.winIdeUrl;
                var exezippath = path.join(remote.app.getPath("userData"), "layaversion", path.basename(configVersion.winIdeUrl));
                var downurl = configVersion.winIdeUrl;
                
                // 判断下载地址，如果该地址曾经被拒绝过，不再更新
                var doNotUpdateVersionStr = localStorage.getItem('doNotUpdateVersion');
                if (codeMain.layaIDEVersion.includes("beta") && doNotUpdateVersionStr == configVersion.betaVersion) { // beta版
                    console.log('@@@', 'beta版，曾经拒绝更新，不再更新');
                    return;
                } else if (!codeMain.layaIDEVersion.includes("beta") && doNotUpdateVersionStr == configVersion.releaseVersion) { // release 版
                    console.log('@@@', 'release版，曾经拒绝更新，不再更新');
                    return;
                }

                var request = require('request');

                function downloadFile(uri, filename, callback)
                {
                    console.log('@@@', '下载IDE', uri, filename);
                    var stream = fs.createWriteStream(filename);
                    request(uri).pipe(stream).on('close', callback);
                }

                // 延时下载
                let delayStr = localStorage.getItem("delayInfo");
                let delayObj;
                try {
                    delayObj = delayStr && JSON.parse(delayStr);
                    if ("object" !== typeof delayObj || !delayObj.timeNow || !delayObj.tiemDelay
                        || delayObj.downurl !== downurl) {
                        delayObj = null;
                    }
                } catch(e) {}

                // 如果这一版没有进行过延时，或者延时还没有到时间
                let _dataNow = Date.now();
                if (!delayObj || delayObj.timeNow + delayObj.tiemDelay > _dataNow) {
                    let randomTime = 0;
                    if (!delayObj) {
                        randomTime = getRandomInt(1, 12 * 60 *60 * 1000); // 1s - 12h
                        delayObj = {
                            timeNow: _dataNow,
                            tiemDelay: randomTime,
                            downurl: downurl
                        };
                        localStorage.setItem("delayInfo", JSON.stringify(delayObj));
                    } else {
                        randomTime = delayObj.timeNow + delayObj.tiemDelay - _dataNow; // 剩余的时间
                        if (isNaN(randomTime) || randomTime <= 0) {
                            randomTime = 0;
                        }
                    }
                    console.log(`@@@延时下载: ${Math.round(randomTime / 60) / 1000}min`);
                    setTimeout(() => {
                        downloadFile(downurl, exezippath, function() {
                            console.log('@@@', '下载结束', downurl, exezippath);
                            downIDE(exezippath);
                        });
                    }, randomTime);
                    return;
                }
                downloadFile(downurl, exezippath, function() {
                    console.log('@@@', '下载结束', downurl, exezippath);
                    downIDE(exezippath);
                });
            }
        }

        versionConfig.send(null);
        versionConfig.onerror = function(e) {

        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function downIDE(exezippath)
        {
            if (process.platform === 'darwin')
            {
                var macpath = path.dirname(remote.app.getPath("exe"));
                macpath = path.dirname(macpath);
                macpath = path.dirname(macpath);
                var cmd = "sleep 2;unzip -o " + "\"" + exezippath + "\"" + " -d " + "\"" + macpath + "\"" + "&&" + "\"" + remote.app.getPath("exe") + "\"";
                var shpath = path.join(remote.app.getPath("userData"), "cmd.sh")
                fs.writeFileSync(shpath, cmd);
                childProcess.exec("chmod 755 " + "\"" + shpath + "\"", function(e, ee)
                {
                    console.log(e);
                    console.log(ee);
                });
                var pop = new popPanel.ShowPop([codeMain.panel[142][langindex], codeMain.panel[104][langindex], codeMain.panel[105][langindex]], codeMain.panel[46][langindex], function(e)
                {
                    if (e == codeMain.panel[104][langindex]) // 立即更新
                    {
                        var updateSp = childProcess.spawn(
                           '/bin/sh',
                           ['-c', "\"" + shpath + "\""],
                           {}
                        );

                        // updateSp.stdout.on('data', (data) => {
                        //   console.log(`stdout: ${data}`);
                        // });

                        updateSp.stderr.on('data', (data) => {
                          console.log(`stderr: ${data}`);
                        });

                        updateSp.on('close', (code) => {
                          console.log(`子进程退出码：${code}`);
                        });
                        
                        // childProcess.exec("\"" + shpath + "\"", function(e, ee)
                        // {
                        //     console.log(e);
                        //     console.log(ee);
                        // });
                        setTimeout(function()
                        {
                            remote.app.exit(0);
                        }, 2000)

                    }
                    else if (e == codeMain.panel[105][langindex]) // 更新日志
                    {
                        window.open("http://ldc.layabox.com/download/?type=layaairide")
                    }
                    else // 关闭
                    {
                        pop.dispose();

                        // 拒绝该版本的更新
                        if (codeMain.layaIDEVersion.includes("beta")) { // beta版
                            localStorage.setItem('doNotUpdateVersion', configVersion.betaVersion);
                        } else { // release 版
                            localStorage.setItem('doNotUpdateVersion', configVersion.releaseVersion);
                        }
                    }
                }, true);
            }
            else
            {
                var temppath = path.dirname(remote.app.getPath("exe"));
                setTimeout(function(e)
                {
                    try
                    {

                        copyfile(temppath, path.join(remote.app.getPath("userData"), "layaupdateloading"));
                        copyfile(path.join(temppath, "locales"), path.join(remote.app.getPath("userData"), "layaupdateloading", "locales"));
                        copyfile(path.join(temppath, "resources"), path.join(remote.app.getPath("userData"), "layaupdateloading", "resources"));
                        codeMain.copyDir(path.join(__dirname, "tools"), path.join(remote.app.getPath("userData"), "layaupdateloading"));
                        codeMain.copyFile(path.join(temppath, "resources", "electron.asar"), path.join(remote.app.getPath("userData"), "layaupdateloading", "resources"));
                        // codeMain.copyDir(path.join(temppath, "resources", "app", "out", "codeextension", "updateversion", "tools", "resources", "app", "out"), path.join(remote.app.getPath("userData"), "layaupdateloading", "resources", "app", "out"));
                    }
                    catch (e)
                    {
                        return
                    }
                    var pop = new popPanel.ShowPop([codeMain.panel[142][langindex], codeMain.panel[104][langindex], codeMain.panel[105][langindex]], codeMain.panel[46][langindex], function(e)
                    {
                        if (e == codeMain.panel[104][langindex]) // 立即更新
                        {
                            childProcess.exec("\"" + path.join(remote.app.getPath("userData"), "layaupdateloading", "LayaAir.exe") + "\"" + " " + "\"" + remote.app.getPath("exe") + "\"" + "$$" + "\"" + exezippath + "\"", function(ee, eee, eeee) {});
                            remote.getCurrentWindow().hide();
                            setTimeout(function()
                            {
                                //缓冲时间 防止退出更新程序启动不起来。
                                remote.app.exit(0);
                            }, 4000)
                        }
                        else if (e == codeMain.panel[105][langindex]) // 更新日志
                        {
                            window.open("http://ldc.layabox.com/download/?type=layaairide")
                        }
                        else // 关闭
                        {
                            pop.dispose();

                            // 拒绝该版本的更新
                            if (codeMain.layaIDEVersion.includes("beta")) { // beta版
                                localStorage.setItem('doNotUpdateVersion', configVersion.betaVersion);
                            } else { // release 版
                                localStorage.setItem('doNotUpdateVersion', configVersion.releaseVersion);
                            }
                        }
                    }, true);
                }, 5000)
            }
        }

        function copyfile(from, to)
        {
            mkdirsSyncLaya(to)
            var readDir = fs.readdirSync;
            var stat = fs.statSync;
            if (stat(from).isFile())
            {
                mkdirsSyncLaya(to);
                fs.writeFileSync(to + path.sep + path.basename(from), fs.readFileSync(from));
                return
            }
            var copDir = function(src, dst)
            {
                var paths = fs.readdirSync(src);
                paths.forEach(function(pathLaya)
                {
                    var _src = src + path.sep + pathLaya;
                    var _dst = dst + path.sep + pathLaya;
                    var isDir = stat(_src);
                    if (isDir.isFile())
                    {
                        fs.writeFileSync(_dst, fs.readFileSync(_src));
                    }
                })
            }

            function mkdirsSyncLaya(dirname, mode)
            {
                console.log(dirname);
                if (fs.existsSync(dirname))
                {
                    return true;
                }
                else
                {
                    if (mkdirsSyncLaya(path.dirname(dirname), mode))
                    {
                        fs.mkdirSync(dirname, mode);
                        return true;
                    }
                }
            }

            // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
            var exists = function(src, dst, callback)
            {
                mkdirsSyncLaya(dst);
                callback(src, dst);
            };
            // 复制目录
            exists(from, to, copDir);
        }
    }
    window.layaUnzipFileHandler = function(unzipurl, filepath, callbackHandler, errHandler)
    {
        unzipurl = "\"" + unzipurl + "\"";
        var unzipexepath = "\"" + path.join(__dirname, "tools", "unzip.exe") + "\""

        if (process.platform === 'darwin')
        {
            var cmd = "unzip -o " + unzipurl + " -d " + "\"" + filepath + "\"";
            childProcess.exec(cmd, callbackHandler, errHandler);
        }
        else
        {
            var cmd = unzipexepath + " -o " + unzipurl + " -d " + "\"" + filepath + "\"";
            childProcess.exec(cmd, callbackHandler, errHandler);
        }
    }
}
exports.activate = activate;

function deactivate()
{}
exports.deactivate = deactivate;
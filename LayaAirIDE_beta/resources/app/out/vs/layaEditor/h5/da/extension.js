class DataSender {

    constructor(args) {
        this.__laya__now = Date.now();
        this.timeCount= 1000 * 60 * 60;
        this.userTime = 0;
        this._startTime = Date.now();
        this.delt = 0;
        this.isFocus = true;
        this.sendtime = Date.now();
        this.remote = require("electron").remote;
        this.path = require("path");
        this.msgFilePath = this.path.join(this.remote.app.getPath("userData"), "idemsg.da");
        this.msgIndexPath = this.path.join(this.remote.app.getPath("userData"), "idemsgindex.da");
        this.msgErrPath = this.path.join(this.remote.app.getPath("userData"), "idemsgerr.da");
        this.fs = require("fs");
        this.http = "http://statistics.masteropen.layabox.com/open/log?";
        this.msgOrder = 0;
        this.active = false;

        this.MsgSpliter  = "{|}";
        this.MaxSize = 5*1024*1024;
        this.DelaySender = 10000;

        this.serverErrorLength = 0;
        this.serverStartErrorTime = null;
        this.serverStopTime = null;
    }

    /**
     * 启动IDE后，初始化codeMain时调用
     * @param {*} context 
     */
    activate(context) {
        if (this.active) return;

        this.active = true;

        this.chkMsgFile();

        setInterval(this.updateTime.bind(this), 1000);

        setInterval(this.sendToSvr.bind(this), this.DelaySender);

        window.addEventListener('beforeunload', this.addOnBeforeUnload.bind(this), false);
        window.addEventListener("blur", this.onblur.bind(this));
        window.addEventListener("focus", this.onfocus.bind(this));
        this.sendservice("act", "login");

    }

    /**
     * 向服务器定时发送login/logout
     */
    updateTime() {
        if (this.isFocus) {
            let delay = Date.now() - this._startTime;
            if (delay > this.timeCount * 2) {
                this.userTime = 0;
                this.sendtime = Date.now();
                return;
            }
            this.userTime += delay;
        }
        if (Date.now() - this.sendtime >= this.timeCount) { // 距离上次发送超过一个小时
            this.sendservice("act", "logout");
            this.sendservice("act", "login");
            this.userTime = 0;
            this.sendtime = Date.now();
        }
        this._startTime = Date.now();
    }

    addOnBeforeUnload() {
        this.sendservice("act", "logout");
    }

    onblur() {
        this.isFocus = false;
    }

    onfocus() {
        this.isFocus = true;
    }

    chkMsgFile() {
        if (!this.fs.existsSync(this.msgIndexPath)) {
            this.msgOrder = 0;
            return;
        }

        this.msgOrder = parseInt(this.fs.readFileSync(this.msgIndexPath, 'utf8'));
        if (isNaN(this.msgOrder)) {
            this.msgOrder = 0;
            this.logErr("MsgIndexFile Content is NaN.");
            return;
        }

        if (!this.fs.existsSync(this.msgFilePath)) {
            if (this.msgOrder !== 0) {
                this.logErr("MsgOrder not sync with MsgFileContent: 0 " + this.msgOrder);
                this.msgOrder = 0;
                this.fs.writeFileSync(this.msgIndexPath, this.msgOrder);
            }
            return; 
        }

        let msgFileContent = this.fs.readFileSync(this.msgFilePath, 'utf8');
        if (!msgFileContent) {
            if (this.msgOrder !== 0) {
                this.logErr("MsgOrder not sync with MsgFileContent2: 0 " + this.msgOrder);
                this.msgOrder = 0;
                this.fs.writeFileSync(this.msgIndexPath, this.msgOrder);
            }
            return;
        }

        let msgArr = msgFileContent.split(this.MsgSpliter );
        let msgLen = msgArr.length;
        if (this.msgOrder > msgLen) {
            this.logErr("MsgOrder beyond MsgFileContentLen: " + msgLen + " " + this.msgOrder);
            this.msgOrder = msgLen;
        }

        let lastMsgArr = msgArr.slice(this.msgOrder);
        let lastMsgContent = lastMsgArr.length ? lastMsgArr.join(this.MsgSpliter ) : "";
        this.fs.writeFileSync(this.msgFilePath, lastMsgContent);
        this.msgOrder = 0;
        this.fs.writeFileSync(this.msgIndexPath, this.msgOrder);
    }

    logErr(err) {
        if (!err) return;
        if (!this.fs.existsSync(this.msgErrPath)) {
            this.fs.appendFileSync(this.msgErrPath, err + "\n");
            return;
        }

        let states = this.fs.statSync(this.msgErrPath);
        if (states.size > this.MaxSize) {
            this.fs.ftruncateSync(this.msgErrPath);
        }

        this.fs.appendFileSync(this.msgErrPath, err + "\n");
    }

    /**
     * 文件内: -> login/logout
     * 文件外: -> 新建项目时调用
     */
    sendservice() {
        // [k1,v1,k2,v2...]
        // ["act","newpro","publish",15]
        
        this.userTime = Math.min(this.userTime,this.timeCount);
        console.log(this.userTime);
        let clienttime = Date.now();
        let appendStr = "os=" + process.platform + "&ide_ver=" + codeMain.layaIDEVersion + "&loc_sent_time=" + clienttime + "&loc_event_time=" + clienttime + "&used_time=" + this.userTime;
        for (let i = 0; i < arguments.length; i+=2) {
            appendStr += "&" + arguments[i] + "=" + arguments[i + 1];
        }
        this.saveToFile(appendStr);
    }

    /**
     * 写入文件，发送过来的所有内容先写入文件，之后再发送给服务器
     * @param {*} content 
     */
    saveToFile(content) {
        if (!content) return;
        if (!this.fs.existsSync(this.msgFilePath)) {
            this.fs.writeFileSync(this.msgFilePath, content);
            return;
        }

        let states = this.fs.statSync(this.msgFilePath);
        if (states.size > this.MaxSize) {
            this.fs.ftruncateSync(this.msgFilePath);
        } else if (states.size > 0) {
            this.fs.appendFileSync(this.msgFilePath, this.MsgSpliter  + content);
        } else {
            this.fs.appendFileSync(this.msgFilePath, content);
        }
    }

    /**
     * 每10s检查是否有待发送内容
     */
    sendToSvr() {
        let msgArr = this.readMsgFromFile(10);
        if (!msgArr) return;
        if (!this.clientMac) {
            let os = require("os");
            let networkinfo = os.networkInterfaces();
            for (let i in networkinfo) {
                if (networkinfo[i]) {
                    if (networkinfo[i] instanceof Array) {
                        for (let j = 0; j < networkinfo[i].length; j++) {
                            let item = networkinfo[i][j];
                            if (item["family"] && item["family"] == "IPv4" && item.hasOwnProperty("internal") && (item["internal"] == false)) {
                                this.clientMac = item["mac"];
                            }
                        }
                    }
                }
            } 
        }
        if (!this.clientMac) {
            return;
        }

        // 如果十五分钟内，向服务器发送的消息，出错超过100，停止向服务器发送消息一个小时
        let 
            errorInTime = 900000, // 15 * 60 * 1000 = 900000
            serverMaxStopTime = 3600000, // 60 * 60 * 1000 = 3600000
            errorMaxLength = 100; // 100
        if (this.serverErrorLength >= errorMaxLength) { // 错误积累太多，暂时不再上传
            let nowTime = Date.now();
            let isInTime = (nowTime - this.serverStartErrorTime) < errorInTime;
            if (isInTime) { // 规定时间内，出错太多
                this.serverStopTime = nowTime;
                this.serverStartErrorTime = null;
                this.serverErrorLength = 0;
            } else { // 很长时间出错太多，错误清零，重新计算
                this.serverStopTime = null;
                this.serverStartErrorTime = null;
                this.serverErrorLength = 0;
            }
        }
        if (!!this.serverStopTime) { // 停止向服务器发送数据，变量有值
            let isPause = this.serverStopTime && Date.now() - this.serverStopTime < serverMaxStopTime;
            if (isPause) {
                let pauseTime = Date.now() - this.serverStopTime;
                let minutes = Math.floor(pauseTime / 60000);
                let seconds = Math.floor((pauseTime % 60000) / 1000);
                console.warn("错误太多，暂停向服务器发送消息", `${minutes} minutes : ${seconds} seconds`);
                return;
            } else { // 数据清零，重新发送数据
                this.serverStopTime = null;
                this.serverStartErrorTime = null;
                this.serverErrorLength = 0;
            }
        }

        let msg, cnt = 0;
        let msgLen = msgArr.length;
        for (let i = 0; i < msgLen; ++i) {
            msg = msgArr[i];
            if (!msg) continue;
            msg = "event=ide&user_id=" + this.clientMac + "&dev_id=" + this.clientMac + "&" + msg;

            let versionConfig = new XMLHttpRequest();
            versionConfig.open("GET", this.http + msg);
            versionConfig.onreadystatechange = function(e) {
                let versionConfig = e.target;
                if (versionConfig.readyState !== 4) return;
                // if http err, abandon.
                ++this.msgOrder;
                ++cnt;
                if (versionConfig.status === 200) {
                    console.log(versionConfig.responseText);
                    // TODO: chk responder valid, default right.
                    this.fs.writeFileSync(this.msgIndexPath, this.msgOrder);
                }
                // TODO: chk cnt due to async call
                if (cnt === msgLen) {
                    this.chkMsgFile();
                } else if (cnt > msgLen) {
                    this.logErr("cnt beyond msgLen: " + cnt + " " + msgLen);
                }
            }.bind(this);
            versionConfig.send(null);
            versionConfig.onerror = function(e) {
                this.serverErrorLength++;
                this.serverStartErrorTime = this.serverStartErrorTime ? this.serverStartErrorTime : Date.now();
            }.bind(this);
        }
    }

    readMsgFromFile(cnt) {
        if (cnt <= 0) return null;
        if (!this.fs.existsSync(this.msgFilePath)) return null;

        let fileContent = this.fs.readFileSync(this.msgFilePath, 'utf8');
        if (!fileContent) return null;

        let msgArr = fileContent.split(this.MsgSpliter );
        let msgLen = msgArr.length;
        let sliceCnt = (msgLen > cnt) ? cnt : msgLen;
        // get arr fron cnt
        return msgArr.slice(0, sliceCnt);
    }

    deactivate() {}
}

DataSender.I = new DataSender();

module.exports = DataSender;

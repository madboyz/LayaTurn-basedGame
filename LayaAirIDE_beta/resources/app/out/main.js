/*jshint esversion: 6 */

global.sharedObject = {
  InnerVer: 'release'
}


class Code {
    constructor() {
        this.fs = require("fs");
        this.app = require("electron").app;
        this.path = require("path");
        this.debug = false; //默认不是调试;
        this.htmlurl = ""; //调试地址
        this.ipcMain = require('electron').ipcMain;
        this.debugWindow = null;
        // this.initDa();
        this.init();
    }

    // initDa() {
    //     let DataSender = require("./vs/layaEditor/h5/da/extension.js");
    //     this.daSender = DataSender.I;
    //     this.daSender.activate();

    //     process.on('uncaughtException', this.noop.bind(this));
    // }

    // sendDa() {
    //     this.daSender.sendservice.apply(this.daSender, arguments);
    // }

    // noop(e) {
    //     // let fs = require("fs");
    //     // fs.writeFileSync('D:/ideerr.txt', "hi, i'm error: " + Math.random() + " " + e.message + " " + e.stack + '\n', {flag:'a'});
    //     // console.log("hi, i'm error out.");

    //     this.sendDa("act", "error", "message", e.message, "stack", e.stack);
    //     throw e;
    // }

    init() {
        this.app.once("ready", () => {
            this.start();
        });
        this.ipcMain.on("openFile", () => {
            console.log("----------------------------收到消息")
            console.log(process.argv, "-------------------------")
        })
    }

    start() {
        let arg = process.argv;
        for (var i = arg.length - 1; i >= 0; i--) {
            let key = arg[i];

            if (key.includes("--remote-debugging-port") || key.includes("no-default-browser-check")) {
                this.debug = true;
            } else if (key.indexOf(".html") != -1) {
                this.htmlurl = key;
            } else if (key.indexOf("http:") != -1 || key.indexOf("https:") != -1) {
                this.htmlurl = key;
            }
        }
        if (this.debug) {
            this.debugLaya();
        } else {
            this.start_vscode();
        }
    }

    stripComments(e)
    {
        return e.replace(/("(?:[^\\\"]*(?:\\.)?)*")|('(?:[^\\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g, function(e, r, a, n, t)
        {
            if (n) return "";
            if (t)
            {
                var o = t.length;
                return o > 2 && "\n" === t[o - 1] ? "\r" === t[o - 2] ? "\r\n" : "\n" : ""
            }
            return e
        })
    }

    getNLSConfiguration()
    {
        function e(e)
        {
            for (; e;)
            {
                var r = path.join(__dirname, "vs", "code", "electron-main", "main.nls.") + e + ".js";
                if (fs.existsSync(r)) return {
                    locale: s,
                    availableLanguages:
                        {
                            "*": e
                        }
                };
                var a = e.lastIndexOf("-");
                e = a > 0 ? e.substring(0, a) : null
            }
            return null
        }
        var minimist = require("minimist"),
            args = minimist(process.argv,
            {
                string: ["user-data-dir", "locale"]
            });
        var r = args.locale;
        if (!r)
        {
            var a = this.app.getPath("userData"),
                fs = require("fs"),
                path = require("path"),
                n = path.join(a, "User", "locale.json");
            if (fs.existsSync(n)) try
            {
                var t = this.stripComments(fs.readFileSync(n, "utf8")),
                    o = JSON.parse(t).locale;
                o && "string" == typeof o && (r = o)
            }
            catch (e)
            {}
        }
        var i = this.app.getLocale();
        if (r = r || i, "pseudo" === (r = r ? r.toLowerCase() : r)) return {
            locale: r,
            availableLanguages:
                {},
            pseudo: !0
        };
        var s = r;
        if (process.env.VSCODE_DEV) return {
            locale: r,
            availableLanguages:
                {}
        };
        if (r && ("en" == r || r.startsWith("en-"))) return {
            locale: r,
            availableLanguages:
                {}
        };
        var p = e(r);
        return !p && i && i !== r && (p = e(i)), p ||
        {
            locale: s,
            availableLanguages:
                {}
        }
    }

    getLanguage(langstr) {
        var ar = {
            "zh-cn": 0,
            "en": 1,
            "en-us": 1
        };
        return ar[langstr] || 0;
    }

    start_vscode() {
        let BrowserWindow = require('electron').BrowserWindow;
        let win = new BrowserWindow({
            width: 465,
            height: 311,
            show: true,
            frame: false,
            title: "LayaAir",
            alwaysOnTop: true,
            resizable: false
        });
        // win.openDevTools();
        win.on('closed', function () {
            win = null;
        });
        var InnerVer = global.sharedObject.InnerVer;
        console.log("InnerVer:" + InnerVer);
        win.loadURL('file://' + this.path.join(__dirname, "vs", "layaEditor", "h5", "loading.html?lang=" + this.getLanguage(this.getNLSConfiguration().locale.toLowerCase()) + "&InnerVer=" + InnerVer));
        setTimeout(function () {
            win.destroy();
            require("./vscodemain.js");
        }, 2000);
        this.ipcMain.on("restartApp", this.restartApp.bind(this));

    }

    debugLaya() {
        let BrowserWindow = require('electron').BrowserWindow;
        this.layaDebugerWin = new BrowserWindow({
            width: 300,
            height: 300,
            show: false,
            frame: true,
            title: "LayaAirPlayer",
            modal: true,
            webPreferences: {
                preload: this.path.join(__dirname, 'preload.js'),
                plugins: true,
                nodeIntegration: false
            }
        });
        this.layaDebugerWin.loadURL(this.htmlurl);
        this.layaDebugerWin.on("close", (evnet) => {
            this.app.exit(0)
        });
        this.layaDebugerWin.on("focus", (event) => {
            this.layaDebugerWin.setAlwaysOnTop(true);
            setTimeout(() => {
                this.layaDebugerWin.setAlwaysOnTop(false);
            }, 10)
        });
        this.ipcMain.on("opendev", function (event) {
            // 发送到调试器 打开开发者模式
            process.stdout.write('close-connection');
            event.returnValue = true;
            return true
        })
    }

    restartApp(event, arg) {
        event.returnValue = 'pong';
        this.app.relaunch({
            args: process.argv.slice(1).concat(['--relaunch'])
        })
        this.app.quit();
    }

}

// try {
//     new Code()
// } catch (e) {
//     noop(e);
// }

new Code()

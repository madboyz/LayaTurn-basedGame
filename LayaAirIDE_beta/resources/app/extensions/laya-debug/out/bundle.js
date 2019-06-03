/******/
(function(modules)
{ // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId)
    {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId])
        /******/
            return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            exports:
            {},
            /******/
            id: moduleId,
            /******/
            loaded: false
                /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.loaded = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(0);
    /******/
})
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    function(module, exports, __webpack_require__)
    {

        /*---------------------------------------------------------
         * Copyright (C) Microsoft Corporation. All rights reserved.
         *--------------------------------------------------------*/
        "use strict";
        const vscode_chrome_debug_core_1 = __webpack_require__(1);
        const path = __webpack_require__(2);
        const chromeDebugAdapter_1 = __webpack_require__(3);
        const EXTENSION_NAME = 'debugger-for-chrome';
        const targetFilter = target => target && (!target.type || target.type === 'page');
        // non-.txt file types can't be uploaded to github
        // also note that __dirname here is ...out/
        const logFilePath = path.resolve(__dirname, '../vscode-chrome-debug.txt');
        // Start a ChromeDebugSession configured to only match 'page' targets, which are Chrome tabs.
        // Cast because DebugSession is declared twice - in this repo's vscode-debugadapter, and that of -core... TODO
        vscode_chrome_debug_core_1.ChromeDebugSession.run(vscode_chrome_debug_core_1.ChromeDebugSession.getSession(
        {
            adapter: chromeDebugAdapter_1.ChromeDebugAdapter,
            extensionName: EXTENSION_NAME,
            logFilePath,
            targetFilter,
            pathTransformer: vscode_chrome_debug_core_1.UrlPathTransformer,
            sourceMapTransformer: vscode_chrome_debug_core_1.BaseSourceMapTransformer,
        }));
        vscode_chrome_debug_core_1.logger.log(EXTENSION_NAME + ': ' + ("2.4.1"));


        /***/
    },
    /* 1 */
    /***/
    function(module, exports)
    {

        module.exports = require("vscode-chrome-debug-core");

        /***/
    },
    /* 2 */
    /***/
    function(module, exports)
    {

        module.exports = require("path");

        /***/
    },
    /* 3 */
    /***/
    function(module, exports, __webpack_require__)
    {

        /*---------------------------------------------------------
         * Copyright (C) Microsoft Corporation. All rights reserved.
         *--------------------------------------------------------*/
        "use strict";
        const vscode_chrome_debug_core_1 = __webpack_require__(1);
        const child_process_1 = __webpack_require__(4);
        const utils = __webpack_require__(5);
        const DefaultWebSourceMapPathOverrides = {
            'webpack:///./*': '${webRoot}/*',
            'webpack:///*': '*',
            'meteor://💻app/*': '${webRoot}/*',
        };
        class ChromeDebugAdapter extends vscode_chrome_debug_core_1.ChromeDebugAdapter
        {
            initialize(args)
            {
                this._overlayHelper = new utils.DebounceHelper( /*timeoutMs=*/ 200);
                const capabilities = super.initialize(args);
                capabilities.supportsRestartRequest = true;
                return capabilities;
            }
            launch(args)
            {
                return super.launch(args).then(() =>
                {
                    // Check exists?
                    const chromePath = args.runtimeExecutable || utils.getBrowserPath();
                    var fs = require("fs")
                    if(!fs.existsSync(chromePath))
                    {
                        throw new Error("找不到文件: "+chromePath+" 请设置文件配置文件属性runtimeExecutable");
                        return 
                    }
                    if (!chromePath)
                    {
                        return vscode_chrome_debug_core_1.utils.errP(`Can't find Chrome - install it or set the "runtimeExecutable" field in the launch config.`);
                    }
                    // Start with remote debugging enabled
                    if(!args.fixedPort){
                        var  port = (Math.random()*1000+8000)>>0;
                    }else{
                        var  port = args.port || 9222;
                    }

                    const chromeArgs = ['--remote-debugging-port=' + port];
                    // Also start with extra stuff disabled
                    chromeArgs.push(...['--no-first-run', '--no-default-browser-check']);
                    if (args.runtimeArgs)
                    {
                        chromeArgs.push(...args.runtimeArgs);
                    }
                    if (args.userDataDir)
                    {
                        args.userDataDir = args.userDataDir.replace("${tmpdir}",require("os").tmpdir());
                        chromeArgs.push('--user-data-dir=' + args.userDataDir);
                    }
                    let launchUrl;
                    if (args.file)
                    {
                        launchUrl = vscode_chrome_debug_core_1.utils.pathToFileURL(args.file);
                    }
                    else if (args.url)
                    {
                        if (args.url.indexOf("http:") != -1 || args.url.indexOf("https:") != -1)
                        {
                            launchUrl = args.url;
                        }
                        else
                        {
                            launchUrl = vscode_chrome_debug_core_1.utils.pathToFileURL(args.url);
                        }

                    }
                    if (launchUrl)
                    {
                        chromeArgs.push(launchUrl);
                    }
                    vscode_chrome_debug_core_1.logger.log(`spawn('${chromePath}', ${JSON.stringify(chromeArgs)})`);
                    this._chromeProc = child_process_1.spawn(chromePath, chromeArgs,
                    {
                        detached: true,
                        stdio: ['ignore'],
                    });
                    this._chromeProc.unref();
                    this._chromeProc.on('error', (err) =>
                    {
                        const errMsg = 'Chrome error: ' + err;
                        vscode_chrome_debug_core_1.logger.error(errMsg);
                        this.terminateSession(errMsg);
                    });
                    this._chromeProc.stdout.on('data', (data) =>
                    {
                        if (data.toString() === 'close-connection')
                        {
                            this.terminateSession("close-connection");

                        }
                    });
                    // //add laya
                    // this._chromeProc.on('exit', (err) => {
                    //     this.terminateSessionLaya(0);
                    // });
                    return this.doAttach(port, launchUrl, args.address);
                });
            }
            attach(args)
            {
                return super.attach(args);
            }
            commonArgs(args)
            {
                args.sourceMapPathOverrides = getSourceMapPathOverrides(args.webRoot, args.sourceMapPathOverrides);
                args.skipFileRegExps = ['^chrome-extension:.*'];
                super.commonArgs(args);
            }
            doAttach(port, targetUrl, address, timeout)
            {
                return super.doAttach(port, targetUrl, address, timeout).then(() =>
                {
                    // Don't return this promise, a failure shouldn't fail attach
                    this.globalEvaluate(
                        {
                            expression: 'navigator.userAgent',
                            silent: true
                        })
                        .then(evalResponse => vscode_chrome_debug_core_1.logger.log('Target userAgent: ' + evalResponse.result.value), err => vscode_chrome_debug_core_1.logger.log('Getting userAgent failed: ' + err.message));
                });
            }
            runConnection()
            {
                return [...super.runConnection(), this.chrome.Page.enable()];
            }
            onPaused(notification)
            {
                this._overlayHelper.doAndCancel(() => this.chrome.Page.configureOverlay(
                {
                    message: ChromeDebugAdapter.PAGE_PAUSE_MESSAGE
                }).catch(() =>
                {}));
                super.onPaused(notification);
            }
            onResumed()
            {
                this._overlayHelper.wait(() => this.chrome.Page.configureOverlay(
                {}).catch(() =>
                {}));
                super.onResumed();
            }
            disconnect()
                {
                    if (this._chromeProc)
                    {
                        this._chromeProc.kill('SIGINT');
                        this._chromeProc = null;
                    }
                    return super.disconnect();
                }
                /**
                 * Opt-in event called when the 'reload' button in the debug widget is pressed
                 */
            restart()
            {
                return this.chrome.Page.reload(
                {
                    ignoreCache: true
                });
            }
        }
        ChromeDebugAdapter.PAGE_PAUSE_MESSAGE = 'Paused in Visual Studio Code';
        exports.ChromeDebugAdapter = ChromeDebugAdapter;

        function getSourceMapPathOverrides(webRoot, sourceMapPathOverrides)
        {
            return sourceMapPathOverrides ? resolveWebRootPattern(webRoot, sourceMapPathOverrides, /*warnOnMissing=*/ true) :
                resolveWebRootPattern(webRoot, DefaultWebSourceMapPathOverrides, /*warnOnMissing=*/ false);
        }
        /**
         * Returns a copy of sourceMapPathOverrides with the ${webRoot} pattern resolved in all entries.
         */
        function resolveWebRootPattern(webRoot, sourceMapPathOverrides, warnOnMissing)
        {
            const resolvedOverrides = {};
            for (let pattern in sourceMapPathOverrides)
            {
                const replacePattern = sourceMapPathOverrides[pattern];
                resolvedOverrides[pattern] = replacePattern;
                const webRootIndex = replacePattern.indexOf('${webRoot}');
                if (webRootIndex === 0)
                {
                    if (webRoot)
                    {
                        resolvedOverrides[pattern] = replacePattern.replace('${webRoot}', webRoot);
                    }
                    else if (warnOnMissing)
                    {
                        vscode_chrome_debug_core_1.logger.log('Warning: sourceMapPathOverrides entry contains ${webRoot}, but webRoot is not set');
                    }
                }
                else if (webRootIndex > 0)
                {
                    vscode_chrome_debug_core_1.logger.log('Warning: in a sourceMapPathOverrides entry, ${webRoot} is only valid at the beginning of the path');
                }
            }
            return resolvedOverrides;
        }
        exports.resolveWebRootPattern = resolveWebRootPattern;


        /***/
    },
    /* 4 */
    /***/
    function(module, exports)
    {

        module.exports = require("child_process");

        /***/
    },
    /* 5 */
    /***/
    function(module, exports, __webpack_require__)
    {

        /*---------------------------------------------------------
         * Copyright (C) Microsoft Corporation. All rights reserved.
         *--------------------------------------------------------*/
        "use strict";
        const path = __webpack_require__(2);
        const vscode_chrome_debug_core_1 = __webpack_require__(1);
        const WIN_APPDATA = process.env.LOCALAPPDATA || '/';
        const DEFAULT_CHROME_PATH = {
            LINUX: '/usr/bin/google-chrome',
            OSX: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            WIN: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            WIN_LOCALAPPDATA: path.join(WIN_APPDATA, 'Google\\Chrome\\Application\\chrome.exe'),
            WINx86: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        };

        function getBrowserPath()
        {
            const platform = vscode_chrome_debug_core_1.utils.getPlatform();
            if (platform === 1 /* OSX */ )
            {
                return vscode_chrome_debug_core_1.utils.existsSync(DEFAULT_CHROME_PATH.OSX) ? DEFAULT_CHROME_PATH.OSX : null;
            }
            else if (platform === 0 /* Windows */ )
            {
                if (vscode_chrome_debug_core_1.utils.existsSync(DEFAULT_CHROME_PATH.WINx86))
                {
                    return DEFAULT_CHROME_PATH.WINx86;
                }
                else if (vscode_chrome_debug_core_1.utils.existsSync(DEFAULT_CHROME_PATH.WIN))
                {
                    return DEFAULT_CHROME_PATH.WIN;
                }
                else if (vscode_chrome_debug_core_1.utils.existsSync(DEFAULT_CHROME_PATH.WIN_LOCALAPPDATA))
                {
                    return DEFAULT_CHROME_PATH.WIN_LOCALAPPDATA;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return vscode_chrome_debug_core_1.utils.existsSync(DEFAULT_CHROME_PATH.LINUX) ? DEFAULT_CHROME_PATH.LINUX : null;
            }
        }
        exports.getBrowserPath = getBrowserPath;
        class DebounceHelper
        {
            constructor(timeoutMs)
                {
                    this.timeoutMs = timeoutMs;
                }
                /**
                 * If not waiting already, call fn after the timeout
                 */
            wait(fn)
                {
                    if (!this.waitToken)
                    {
                        this.waitToken = setTimeout(() =>
                        {
                            this.waitToken = null;
                            fn();
                        }, this.timeoutMs);
                    }
                }
                /**
                 * If waiting for something, cancel it and call fn immediately
                 */
            doAndCancel(fn)
            {
                if (this.waitToken)
                {
                    clearTimeout(this.waitToken);
                    this.waitToken = null;
                }
                fn();
            }
        }
        exports.DebounceHelper = DebounceHelper;


        /***/
    }
    /******/
]);
//# sourceMappingURL=bundle.js.map
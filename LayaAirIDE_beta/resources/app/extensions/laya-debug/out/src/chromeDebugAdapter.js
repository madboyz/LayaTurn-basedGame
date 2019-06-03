/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
"use strict";
const vscode_chrome_debug_core_1 = require('vscode-chrome-debug-core');
const child_process_1 = require('child_process');
const utils = require('./utils');
const DefaultWebsourceMapPathOverrides = {
    'webpack:///*': '${webRoot}/*',
    'meteor://💻app/*': '${webRoot}/*',
};
class ChromeDebugAdapter extends vscode_chrome_debug_core_1.ChromeDebugAdapter
{
    launch(args)
    {
        args.sourceMapPathOverrides = args.sourceMapPathOverrides || DefaultWebsourceMapPathOverrides;
        return super.launch(args).then(() =>
        {
            // Check exists?
            const chromePath = args.runtimeExecutable || utils.getBrowserPath();
            if (!chromePath)
            {
                return vscode_chrome_debug_core_1.utils.errP(`Can't find Chrome - install it or set the "runtimeExecutable" field in the launch config.`);
            }
            // Start with remote debugging enabled
            const port = args.port || 9222;
            const chromeArgs = ['--remote-debugging-port=' + port];
            // Also start with extra stuff disabled
            chromeArgs.push(...['--no-first-run', '--no-default-browser-check']);
            if (args.runtimeArgs)
            {
                chromeArgs.push(...args.runtimeArgs);
            }
            if (args.userDataDir)
            {
                //add laya
                chromeArgs.push('--user-data-dir=' + process.env.TMPDIR || args.userDataDir);
            }
            let launchUrl;
            if (args.file)
            {
                launchUrl = vscode_chrome_debug_core_1.utils.pathToFileURL(args.file);
            }
            else if (args.url)
            {
                launchUrl = args.url;
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
                    //TODO 兼容打开devtool
                    const msg = 'replaced_with_dev_tools';
                    wing_chrome_debug_core_1.logger.log(msg);
                    this.terminateSession(msg);
                }
            });

            return this.doAttach(port, launchUrl, args.address);
        });
    }
    attach(args)
    {
        args.sourceMapPathOverrides = args.sourceMapPathOverrides || DefaultWebsourceMapPathOverrides;
        return super.attach(args);
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
}
exports.ChromeDebugAdapter = ChromeDebugAdapter;
//# sourceMappingURL=chromeDebugAdapter.js.map
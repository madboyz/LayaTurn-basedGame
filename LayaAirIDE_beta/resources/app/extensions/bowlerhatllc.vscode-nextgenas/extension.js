"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright 2016-2017 Bowler Hat LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const addImport_1 = require("./commands/addImport");
const addMXMLNamespace_1 = require("./commands/addMXMLNamespace");
const organizeImportsInUri_1 = require("./commands/organizeImportsInUri");
const organizeImportsInTextEditor_1 = require("./commands/organizeImportsInTextEditor");
const organizeImportsInDirectory_1 = require("./commands/organizeImportsInDirectory");
const createASConfigTaskRunner_1 = require("./commands/createASConfigTaskRunner");
const createInitialConfigurationsForSWFDebug_1 = require("./commands/createInitialConfigurationsForSWFDebug");
const findJava_1 = require("./utils/findJava");
const findEditorSDK_1 = require("./utils/findEditorSDK");
const validateJava_1 = require("./utils/validateJava");
const validateEditorSDK_1 = require("./utils/validateEditorSDK");
const getJavaClassPathDelimiter_1 = require("./utils/getJavaClassPathDelimiter");
const adapterExecutableCommandSWF_1 = require("./commands/adapterExecutableCommandSWF");
const child_process = require("child_process");
const net = require("net");
const path = require("path");
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const portfinder = require("portfinder");
const FLEXJSSDK_SETTING_DEPRECATED_ERROR = "nextgenas.flexjssdk in settings is deprecated. Please migrate to nextgenas.sdk.editor instead.";
const FRAMEWORKSDK_SETTING_DEPRECATED_ERROR = "nextgenas.frameworksdk in settings is deprecated. Please migrate to nextgenas.sdk.framework instead.";
const INVALID_SDK_ERROR = "nextgenas.sdk.editor in settings does not point to a valid SDK. Requires Apache FlexJS 0.7.0 or newer.";
const MISSING_SDK_ERROR = "Could not locate valid SDK. Requires Apache FlexJS 0.7.0 or newer. Configure nextgenas.sdk.editor, add to $PATH, or set $FLEX_HOME.";
const MISSING_JAVA_ERROR = "Could not locate valid Java executable. Configure nextgenas.java, add to $PATH, or set $JAVA_HOME.";
const MISSING_WORKSPACE_ROOT_ERROR = "Open a folder and create a file named asconfig.json to enable all ActionScript and MXML language features.";
const RESTART_MESSAGE = "To apply new settings for NextGen ActionScript, please restart LayaAir.";
const RESTART_BUTTON_LABEL = "Restart Now";
let savedChild;
let savedContext;
let flexHome;
let javaExecutablePath;
let frameworkSDKHome;
let killed = false;
let hasShownFlexJSSDKWarning = false;
let hasShownFrameworkSDKWarning = false;
portfinder.basePort = 55282;
function killJavaProcess() {
    if (!savedChild) {
        return;
    }
    killed = true;
    //we are killing the process on purpose, so we don't care
    //about these events anymore
    savedChild.removeListener("exit", childExitListener);
    savedChild.removeListener("error", childErrorListener);
    savedChild.kill();
    savedChild = null;
}
function onDidChangeConfiguration(event) {
    let javaSettingsPath = vscode.workspace.getConfiguration("nextgenas").get("java");
    let newJavaExecutablePath = findJava_1.default(javaSettingsPath, (javaPath) => {
        return validateJava_1.default(savedContext.extensionPath, javaPath);
    });
    let newFlexHome = findEditorSDK_1.default(getEditorSDKPathSetting(), (sdkPath) => {
        return validateEditorSDK_1.default(savedContext.extensionPath, newJavaExecutablePath, sdkPath);
    });
    let newFrameworkSDKHome = getFrameworkSDKPathSetting();
    if (flexHome != newFlexHome ||
        javaExecutablePath != newJavaExecutablePath ||
        frameworkSDKHome != newFrameworkSDKHome) {
        //on Windows, the language server doesn't restart very gracefully,
        //so force a restart. 
        vscode.window.showWarningMessage(RESTART_MESSAGE, RESTART_BUTTON_LABEL).then((action) => {
            if (action === RESTART_BUTTON_LABEL) {
                vscode.commands.executeCommand("workbench.action.reloadWindow");
            }
        });
    }
}
function getEditorSDKPathSetting() {
    let editorSDK = vscode.workspace.getConfiguration("nextgenas").get("sdk.editor");
    if (!editorSDK) {
        editorSDK = vscode.workspace.getConfiguration("nextgenas").get("flexjssdk");
        if (editorSDK && !hasShownFlexJSSDKWarning) {
            hasShownFlexJSSDKWarning = true;
            vscode.window.showWarningMessage(FLEXJSSDK_SETTING_DEPRECATED_ERROR);
        }
    }
    return editorSDK;
}
function getFrameworkSDKPathSetting() {
    let frameworkSDK = vscode.workspace.getConfiguration("nextgenas").get("sdk.framework");
    if (!frameworkSDK) {
        frameworkSDK = vscode.workspace.getConfiguration("nextgenas").get("frameworksdk");
        if (frameworkSDK && !hasShownFrameworkSDKWarning) {
            hasShownFrameworkSDKWarning = true;
            vscode.window.showWarningMessage(FRAMEWORKSDK_SETTING_DEPRECATED_ERROR);
        }
    }
    return frameworkSDK;
}
function activate(context) {
    savedContext = context;
    let javaSettingsPath = vscode.workspace.getConfiguration("nextgenas").get("java");
    javaExecutablePath = findJava_1.default(javaSettingsPath, (javaPath) => {
        return validateJava_1.default(savedContext.extensionPath, javaPath);
    });
    flexHome = path.resolve(__dirname, "node_modules", "flexjs");
    
    frameworkSDKHome = getFrameworkSDKPathSetting();
    vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration);
    vscode.commands.registerCommand("nextgenas.createASConfigTaskRunner", () => {
        let tasksHome = getFrameworkSDKPathSetting();
        if (!tasksHome) {
            tasksHome = getEditorSDKPathSetting();
        }
        createASConfigTaskRunner_1.default(tasksHome);
    });
    vscode.commands.registerCommand("nextgenas.adapterExecutableCommandSWF", () => {
        return adapterExecutableCommandSWF_1.default(javaExecutablePath, flexHome, frameworkSDKHome ? frameworkSDKHome : flexHome);
    });
    vscode.commands.registerCommand("nextgenas.createInitialConfigurationsForSWFDebug", createInitialConfigurationsForSWFDebug_1.default);
    vscode.commands.registerTextEditorCommand("nextgenas.addImport", addImport_1.default);
    vscode.commands.registerTextEditorCommand("nextgenas.addMXMLNamespace", addMXMLNamespace_1.default);
    vscode.commands.registerCommand("nextgenas.organizeImportsInUri", organizeImportsInUri_1.default);
    vscode.commands.registerCommand("nextgenas.organizeImportsInTextEditor", organizeImportsInTextEditor_1.default);
    vscode.commands.registerCommand("nextgenas.organizeImportsInDirectory", organizeImportsInDirectory_1.default);
    startClient();
}
exports.activate = activate;
function deactivate() {
    savedContext = null;
    killJavaProcess();
}
exports.deactivate = deactivate;
function childExitListener(code) {
    console.info("Child process exited", code);
    if (code === 0) {
        return;
    }
    vscode.window.showErrorMessage("NextGen ActionScript extension exited with error code " + code);
}
function childErrorListener(error) {
    vscode.window.showErrorMessage("Failed to start NextGen ActionScript extension.");
    console.error("Error connecting to child process.");
    console.error(error);
}
function showSDKError() {
    let sdkPath = getEditorSDKPathSetting();
    if (sdkPath) {
        vscode.window.showErrorMessage(INVALID_SDK_ERROR);
    }
    else {
        vscode.window.showErrorMessage(MISSING_SDK_ERROR);
    }
}
class CustomErrorHandler {
    constructor(name) {
        this.name = name;
        this.restarts = [];
    }
    error(error, message, count) {
        //this is simply the default behavior
        if (count && count <= 3) {
            return vscode_languageclient_1.ErrorAction.Continue;
        }
        return vscode_languageclient_1.ErrorAction.Shutdown;
    }
    closed() {
        if (killed) {
            //we killed the process on purpose, so we will attempt to restart manually
            killed = false;
            return vscode_languageclient_1.CloseAction.DoNotRestart;
        }
        if (!javaExecutablePath) {
            //if we can't find java, we can't restart the process
            vscode.window.showErrorMessage(MISSING_JAVA_ERROR);
            return vscode_languageclient_1.CloseAction.DoNotRestart;
        }
        if (!flexHome) {
            //if we can't find the SDK, we can't start the process
            showSDKError();
            return vscode_languageclient_1.CloseAction.DoNotRestart;
        }
        //this is the default behavior. the code above handles a special case
        //where we need to kill the process and restart it, but we don't want
        //that to be detected below.
        this.restarts.push(Date.now());
        if (this.restarts.length < 5) {
            return vscode_languageclient_1.CloseAction.Restart;
        }
        else {
            let diff = this.restarts[this.restarts.length - 1] - this.restarts[0];
            if (diff <= 3 * 60 * 1000) {
                vscode.window.showErrorMessage(`The ${this.name} server crashed 5 times in the last 3 minutes. The server will not be restarted.`);
                return vscode_languageclient_1.CloseAction.DoNotRestart;
            }
            else {
                this.restarts.shift();
                return vscode_languageclient_1.CloseAction.Restart;
            }
        }
    }
}
function createLanguageServer() {
    return new Promise((resolve, reject) => {
        //immediately reject if flexjs or java cannot be found
        if (!javaExecutablePath) {
            reject(MISSING_JAVA_ERROR);
            return;
        }
        if (!flexHome) {
            let sdkPath = getEditorSDKPathSetting();
            if (sdkPath) {
                reject(INVALID_SDK_ERROR);
            }
            else {
                reject(MISSING_SDK_ERROR);
            }
            return;
        }
        portfinder.getPort((err, port) => {
            let cpDelimiter = getJavaClassPathDelimiter_1.default();
            let args = [
                "-cp",
                //the following jars are included with the language server
                path.resolve(savedContext.extensionPath, "bin", "*") +
                    cpDelimiter +
                    //the following jars come from apache flexjs
                    path.resolve(flexHome, "lib", "*") +
                    cpDelimiter +
                    path.resolve(flexHome, "lib", "external", "*") +
                    cpDelimiter +
                    path.resolve(flexHome, "js", "lib", "*"),
                //the language server communicates with vscode on this port
                "-Dnextgeas.vscode.port=" + port,
                "com.nextgenactionscript.vscode.Main",
            ];
            if (frameworkSDKHome) {
                args.unshift("-Dflexlib=" + path.join(frameworkSDKHome, "frameworks"));
            }
            //remote java debugging
            //args.unshift("-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005");
            //failed assertions in the compiler will crash the extension,
            //so this should not be enabled by default, even for debugging
            //args.unshift("-ea");
            let server = net.createServer(socket => {
                resolve({
                    reader: socket,
                    writer: socket
                });
            });
            server.listen(port, () => {
                let options = {
                    cwd: vscode.workspace.rootPath
                };
                // Start the child java process
                savedChild = child_process.spawn(javaExecutablePath, args, options);
                savedChild.on("error", childErrorListener);
                savedChild.on("exit", childExitListener);
                if (savedChild.stdout) {
                    savedChild.stdout.on("data", (data) => {
                        console.log(data.toString("utf8"));
                    });
                }
                if (savedChild.stderr) {
                    savedChild.stderr.on("data", (data) => {
                        console.error(data.toString("utf8"));
                    });
                }
            });
        });
    });
}
function startClient() {
    if (!savedContext) {
        //something very bad happened!
        return;
    }
    if (!javaExecutablePath) {
        vscode.window.showErrorMessage(MISSING_JAVA_ERROR);
        return;
    }
    if (!flexHome) {
        showSDKError();
        return;
    }
    if (!vscode.workspace.rootPath) {
        vscode.window.showInformationMessage(MISSING_WORKSPACE_ROOT_ERROR, { title: "Help", href: "https://github.com/BowlerHatLLC/vscode-nextgenas/wiki" }).then((value) => {
            if (value && value.href) {
                let uri = vscode.Uri.parse(value.href);
                vscode.commands.executeCommand("vscode.open", uri);
            }
        });
        return;
    }
    let clientOptions = {
        documentSelector: [
            "nextgenas",
            "mxml"
        ],
        synchronize: {
            //the server will be notified when these files change
            fileEvents: [
                vscode.workspace.createFileSystemWatcher("**/asconfig.json"),
                vscode.workspace.createFileSystemWatcher("**/*.as"),
                vscode.workspace.createFileSystemWatcher("**/*.mxml"),
            ]
        },
        errorHandler: new CustomErrorHandler("NextGen ActionScript")
    };
    vscode.languages.setLanguageConfiguration("nextgenas", {
        "onEnterRules": [
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: {
                    indentAction: vscode.IndentAction.IndentOutdent,
                    appendText: " * "
                }
            },
        ]
    });
    let client = new vscode_languageclient_1.LanguageClient("nextgenas", "NextGen ActionScript Language Server", createLanguageServer, clientOptions);
    let disposable = client.start();
    savedContext.subscriptions.push(disposable);
}
//# sourceMappingURL=extension.js.map
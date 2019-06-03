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
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const getJavaClassPathDelimiter_1 = require("./getJavaClassPathDelimiter");
function hasRequiredFilesInSDK(absolutePath) {
    if (!absolutePath) {
        return false;
    }
    //the following files are required to consider this a valid SDK
    let filePaths = [
        path.join(absolutePath, "flex-sdk-description.xml"),
        path.join(absolutePath, "js", "bin", "asjsc"),
        path.join(absolutePath, "lib", "compiler.jar")
    ];
    for (let i = 0, count = filePaths.length; i < count; i++) {
        let filePath = filePaths[i];
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            return false;
        }
    }
    return true;
}
function default_1(extensionPath, javaPath, sdkPath) {
    if (!fs.existsSync(extensionPath) ||
        !fs.existsSync(javaPath) ||
        !fs.existsSync(sdkPath) ||
        !fs.statSync(sdkPath).isDirectory()) {
        return false;
    }
    let cpDelimiter = getJavaClassPathDelimiter_1.default();
    let args = [
        "-cp",
        path.resolve(sdkPath, "lib", "compiler.jar") + cpDelimiter +
            path.resolve(sdkPath, "js", "lib", "jsc.jar") + cpDelimiter +
            path.resolve(extensionPath, "bin", "check-flexjs-version.jar"),
        "com.nextgenactionscript.vscode.CheckFlexJSVersion",
    ];
    let result = child_process.spawnSync(javaPath, args);
    return result.status === 0;
}
exports.default = default_1;
//# sourceMappingURL=validateEditorSDK.js.map
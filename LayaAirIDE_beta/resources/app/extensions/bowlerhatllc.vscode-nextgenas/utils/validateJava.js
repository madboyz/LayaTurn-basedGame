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
function default_1(extensionPath, javaPath) {
    if (!fs.existsSync(javaPath)) {
        return false;
    }
    let args = [
        "-jar",
        path.join(extensionPath, "bin", "check-java-version.jar")
    ];
    let result = child_process.spawnSync(javaPath, args);
    return result.status === 0;
}
exports.default = default_1;
//# sourceMappingURL=validateJava.js.map
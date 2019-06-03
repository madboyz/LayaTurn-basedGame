"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const organizeImportsInUri_1 = require("./organizeImportsInUri");
function organizeImportsInDirectory(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        let directoryPaths = [uri.fsPath];
        for (let i = 0, dirCount = 1; i < dirCount; i++) {
            let directoryPath = directoryPaths[i];
            let files = fs.readdirSync(directoryPath);
            for (let j = 0, fileCount = files.length; j < fileCount; j++) {
                let fileBasePath = files[j];
                let fullPath = path.resolve(directoryPath, fileBasePath);
                if (fs.statSync(fullPath).isDirectory()) {
                    //add this directory to the list to search
                    directoryPaths.push(fullPath);
                    dirCount++;
                    continue;
                }
                var extname = path.extname(fileBasePath);
                if (extname !== ".as" && extname !== ".mxml") {
                    continue;
                }
                let uri = vscode.Uri.file(fullPath);
                //if we open too many editors at once, some will close before
                //finishing the task, so we wait
                yield organizeImportsInUri_1.default(uri, true, true);
            }
        }
    });
}
exports.default = organizeImportsInDirectory;
//# sourceMappingURL=organizeImportsInDirectory.js.map
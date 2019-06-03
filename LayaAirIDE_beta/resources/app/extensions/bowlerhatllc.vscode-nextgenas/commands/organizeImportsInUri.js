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
const vscode = require("vscode");
const organizeImportsInTextEditor_1 = require("./organizeImportsInTextEditor");
function organizeImportsInUri(uri, save, close) {
    return vscode.workspace.openTextDocument(uri).then((document) => {
        return vscode.window.showTextDocument(document).then((editor) => {
            return editor.edit((edit) => {
                organizeImportsInTextEditor_1.default(editor, edit);
            }).then(() => {
                if (save) {
                    return editor.document.save().then(() => {
                        if (close) {
                            return vscode.commands.executeCommand("workbench.action.closeActiveEditor");
                        }
                    });
                }
            });
        });
    });
}
exports.default = organizeImportsInUri;
//# sourceMappingURL=organizeImportsInUri.js.map
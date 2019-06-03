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
function addImport(textEditor, edit, qualifiedName, startIndex, endIndex) {
    if (!qualifiedName) {
        return;
    }
    let document = textEditor.document;
    let text = document.getText();
    let regExp = /^([ \t]*)import ([\w\.]+)/gm;
    let matches;
    let currentMatches;
    if (startIndex !== -1) {
        regExp.lastIndex = startIndex;
    }
    do {
        currentMatches = regExp.exec(text);
        if (currentMatches) {
            if (endIndex !== -1 && currentMatches.index >= endIndex) {
                break;
            }
            if (currentMatches[2] === qualifiedName) {
                //this class is already imported!
                return;
            }
            matches = currentMatches;
        }
    } while (currentMatches);
    let indent = "";
    let lineBreaks = "\n";
    let position;
    if (matches) {
        //we found existing imports
        position = document.positionAt(matches.index);
        indent = matches[1];
        position = new vscode.Position(position.line + 1, 0);
    }
    else {
        if (startIndex !== -1) {
            position = document.positionAt(startIndex);
            if (position.character > 0) {
                //go to the next line, if we're not at the start
                position = position.with(position.line + 1, 0);
            }
            //try to use the same indent as whatever follows
            let regExp = /^([ \t]*)\w/gm;
            regExp.lastIndex = startIndex;
            matches = regExp.exec(text);
            if (matches) {
                indent = matches[1];
            }
            else {
                indent = "";
            }
        }
        else {
            regExp = /^package( [\w\.]+)*\s*{[\r\n]+([ \t]*)/g;
            matches = regExp.exec(text);
            if (!matches) {
                return;
            }
            position = document.positionAt(regExp.lastIndex);
            if (position.character > 0) {
                //go to the beginning of the line, if we're not there
                position = position.with(position.line, 0);
            }
            indent = matches[2];
        }
        lineBreaks += "\n"; //add an extra line break
    }
    let textToInsert = indent + "import " + qualifiedName + ";" + lineBreaks;
    edit.insert(position, textToInsert);
}
exports.default = addImport;
//# sourceMappingURL=addImport.js.map
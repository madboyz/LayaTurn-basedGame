"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
function getDiagnosticSeverity(severity) {
    switch (severity) {
        case ' Error':
            return vscode_languageserver_1.DiagnosticSeverity.Error;
        case ' Warning':
            return vscode_languageserver_1.DiagnosticSeverity.Warning;
        default:
            return vscode_languageserver_1.DiagnosticSeverity.Error;
    }
}
function errorToDiagnostic(error) {
    let errorSplit = error.split(':');
    let fileName = errorSplit[0];
    let index = 1;
    // a full path in windows includes a : for the drive
    if (process.platform === 'win32') {
        fileName = errorSplit[0] + ':' + errorSplit[1];
        index = 2;
    }
    // tslint:disable-next-line:radix
    let line = parseInt(errorSplit[index]);
    // tslint:disable-next-line:radix
    let column = parseInt(errorSplit[index + 1]);
    let severity = getDiagnosticSeverity(errorSplit[index + 2]);
    return {
        diagnostic: {
            message: error,
            range: {
                end: {
                    character: column,
                    line: line - 1,
                },
                start: {
                    character: column,
                    line: line - 1,
                },
            },
            severity: severity,
        },
        fileName: fileName,
    };
}
exports.errorToDiagnostic = errorToDiagnostic;
//# sourceMappingURL=compilerErrors.js.map
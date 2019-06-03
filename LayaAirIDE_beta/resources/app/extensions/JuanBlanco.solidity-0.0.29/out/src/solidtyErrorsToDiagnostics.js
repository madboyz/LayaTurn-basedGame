"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode = require("vscode");
function errorsToDiagnostics(diagnosticCollection, errors) {
    let errorWarningCounts = { errors: 0, warnings: 0 };
    let diagnosticMap = new Map();
    errors.forEach(error => {
        let { diagnostic, fileName } = this.errorToDiagnostic(error);
        let targetUri = vscode.Uri.file(fileName);
        let diagnostics = diagnosticMap.get(targetUri);
        if (!diagnostics) {
            diagnostics = [];
        }
        diagnostics.push(diagnostic);
        diagnosticMap.set(targetUri, diagnostics);
    });
    let entries = [];
    diagnosticMap.forEach((diags, uri) => {
        errorWarningCounts.errors += diags.filter((diagnostic) => diagnostic.severity === vscode_languageserver_1.DiagnosticSeverity.Error).length;
        errorWarningCounts.warnings += diags.filter((diagnostic) => diagnostic.severity === vscode_languageserver_1.DiagnosticSeverity.Warning).length;
        entries.push([uri, diags]);
    });
    diagnosticCollection.set(entries);
    return errorWarningCounts;
}
exports.errorsToDiagnostics = errorsToDiagnostics;
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
exports.getDiagnosticSeverity = getDiagnosticSeverity;
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
    let severity = this.getDiagnosticSeverity(errorSplit[index + 2]);
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
//# sourceMappingURL=solidtyErrorsToDiagnostics.js.map
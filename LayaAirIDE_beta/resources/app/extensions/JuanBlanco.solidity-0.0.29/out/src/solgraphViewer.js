'use strict';
var vscode = require('vscode');
var solgraph = require('solgraph');
function showSolGraph(diagnosticCollection) {
    vscode.window.showWarningMessage(solgraph(vscode.window.activeTextEditor.document.getText()));
}
exports.showSolGraph = showSolGraph;
//# sourceMappingURL=solgraphViewer.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const solcCompiler_1 = require("./solcCompiler");
const solium_1 = require("./solium");
const completionService_1 = require("./completionService");
const vscode_languageserver_1 = require("vscode-languageserver");
// import * as path from 'path';
// Create a connection for the server
const connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);
const documents = new vscode_languageserver_1.TextDocuments();
let rootPath;
let solcCompiler;
let soliumService;
let enabledSolium = false;
let enabledAsYouTypeErrorCheck = false;
let compileUsingRemoteVersion = '';
let compileUsingLocalVersion = '';
let soliumRules = null;
let validationDelay = 3000;
// flags to avoid trigger concurrent validations (compiling is slow)
let validatingDocument = false;
let validatingAllDocuments = false;
function validate(document) {
    try {
        validatingDocument = true;
        const filePath = vscode_languageserver_1.Files.uriToFilePath(document.uri);
        const documentText = document.getText();
        let soliumDiagnostics = [];
        let compileErrorDiagnostics = [];
        if (enabledSolium) {
            soliumDiagnostics = soliumService.solium(filePath, documentText);
        }
        if (enabledAsYouTypeErrorCheck) {
            compileErrorDiagnostics = solcCompiler.compileSolidityDocumentAndGetDiagnosticErrors(filePath, documentText);
        }
        const diagnostics = soliumDiagnostics.concat(compileErrorDiagnostics);
        connection.sendDiagnostics({
            diagnostics,
            uri: document.uri,
        });
    }
    finally {
        validatingDocument = false;
    }
}
connection.onSignatureHelp((textDocumentPosition) => {
    return null;
});
connection.onCompletion((textDocumentPosition) => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items
    let completionItems = [];
    try {
        let document = documents.get(textDocumentPosition.textDocument.uri);
        const documentPath = vscode_languageserver_1.Files.uriToFilePath(textDocumentPosition.textDocument.uri);
        const documentText = document.getText();
        let lines = documentText.split(/\r?\n/g);
        let position = textDocumentPosition.position;
        let start = 0;
        let triggeredByDot = false;
        for (let i = position.character; i >= 0; i--) {
            if (lines[position.line[i]] === ' ') {
                triggeredByDot = false;
                i = 0;
                start = 0;
            }
            if (lines[position.line][i] === '.') {
                start = i;
                i = 0;
                triggeredByDot = true;
            }
        }
        if (triggeredByDot) {
            let globalVariableContext = completionService_1.GetContextualAutoCompleteByGlobalVariable(lines[position.line], start);
            if (globalVariableContext != null) {
                completionItems = completionItems.concat(globalVariableContext);
            }
            return completionItems;
        }
        const service = new completionService_1.CompletionService(rootPath);
        completionItems = completionItems.concat(service.getAllCompletionItems(documentText, documentPath));
    }
    catch (error) {
        // graceful catch
        // console.log(error);
    }
    finally {
        completionItems = completionItems.concat(completionService_1.GetCompletionTypes());
        completionItems = completionItems.concat(completionService_1.GeCompletionUnits());
        completionItems = completionItems.concat(completionService_1.GetGlobalFunctions());
        completionItems = completionItems.concat(completionService_1.GetGlobalVariables());
    }
    return completionItems;
});
// This handler resolve additional information for the item selected in
// the completion list.
// connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
//   item.
// });
function validateAllDocuments() {
    if (!validatingAllDocuments) {
        try {
            validatingAllDocuments = true;
            documents.all().forEach(document => validate(document));
        }
        finally {
            validatingAllDocuments = false;
        }
    }
}
function startValidation() {
    if (enabledAsYouTypeErrorCheck) {
        solcCompiler.intialiseCompiler(compileUsingLocalVersion, compileUsingRemoteVersion).then(() => {
            validateAllDocuments();
        });
    }
    else {
        validateAllDocuments();
    }
}
documents.onDidChangeContent(event => {
    if (!validatingDocument && !validatingAllDocuments) {
        validatingDocument = true; // control the flag at a higher level
        // slow down, give enough time to type (1.5 seconds?)
        setTimeout(() => validate(event.document), validationDelay);
    }
});
// remove diagnostics from the Problems panel when we close the file
documents.onDidClose(event => connection.sendDiagnostics({
    diagnostics: [],
    uri: event.document.uri,
}));
documents.listen(connection);
connection.onInitialize((result) => {
    rootPath = result.rootPath;
    solcCompiler = new solcCompiler_1.SolcCompiler(rootPath);
    if (soliumService == null) {
        soliumService = new solium_1.SoliumService(null, connection);
    }
    return {
        capabilities: {
            completionProvider: {
                resolveProvider: false,
                triggerCharacters: ['.'],
            },
            textDocumentSync: documents.syncKind,
        },
    };
});
connection.onDidChangeConfiguration((change) => {
    let settings = change.settings;
    enabledAsYouTypeErrorCheck = settings.solidity.enabledAsYouTypeCompilationErrorCheck;
    enabledSolium = settings.solidity.enabledSolium;
    compileUsingLocalVersion = settings.solidity.compileUsingLocalVersion;
    compileUsingRemoteVersion = settings.solidity.compileUsingRemoteVersion;
    soliumRules = settings.solidity.soliumRules;
    validationDelay = settings.solidity.validationDelay;
    if (soliumRules !== null) {
        soliumService.InitSoliumRules(soliumRules);
    }
    startValidation();
});
connection.listen();
//# sourceMappingURL=server.js.map
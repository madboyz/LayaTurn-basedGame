'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const fsex = require("fs-extra");
const solidyErrorsConvertor = require("./solErrorsToDiaganosticsClient");
const solcCompiler_1 = require("./solcCompiler");
function outputErrorsToChannel(outputChannel, errors) {
    errors.forEach(error => {
        outputChannel.appendLine(error);
    });
    outputChannel.show();
}
function compile(contracts, diagnosticCollection, buildDir, rootDir, sourceDir, excludePath, singleContractFilePath) {
    // Did we find any sol files after all?
    if (Object.keys(contracts).length === 0) {
        vscode.window.showWarningMessage('No solidity files (*.sol) found');
        return;
    }
    const solc = new solcCompiler_1.SolcCompiler(buildDir);
    let outputChannel = vscode.window.createOutputChannel('solidity compilation');
    outputChannel.clear();
    outputChannel.show();
    vscode.window.setStatusBarMessage('Compilation started');
    let remoteCompiler = vscode.workspace.getConfiguration('solidity').get('compileUsingRemoteVersion');
    let localCompiler = vscode.workspace.getConfiguration('solidity').get('compileUsingLocalVersion');
    solc.intialiseCompiler(localCompiler, remoteCompiler).then(() => {
        let output = solc.compile({ sources: contracts });
        // vscode.window.showInformationMessage('Compiling using:' +
        //                                     solc.currentCompilerType.toString() + ' settings' + solc.currentCompilerSetting);
        processCompilationOuput(output, outputChannel, diagnosticCollection, buildDir, sourceDir, excludePath, singleContractFilePath);
    }).catch((reason) => {
        vscode.window.showWarningMessage(reason);
    });
}
exports.compile = compile;
function processCompilationOuput(output, outputChannel, diagnosticCollection, buildDir, sourceDir, excludePath, singleContractFilePath) {
    if (Object.keys(output).length === 0) {
        vscode.window.showWarningMessage('No output by the compiler');
        return;
    }
    diagnosticCollection.clear();
    if (output.errors) {
        const errorWarningCounts = solidyErrorsConvertor.errorsToDiagnostics(diagnosticCollection, output.errors);
        outputErrorsToChannel(outputChannel, output.errors);
        if (errorWarningCounts.errors > 0) {
            vscode.window.showErrorMessage(`Compilation failed with ${errorWarningCounts.errors} errors`);
            if (errorWarningCounts.warnings > 0) {
                vscode.window.showWarningMessage(`Compilation had ${errorWarningCounts.warnings} warnings`);
            }
        }
        else if (errorWarningCounts.warnings > 0) {
            writeCompilationOutputToBuildDirectory(output, buildDir, sourceDir, excludePath, singleContractFilePath);
            vscode.window.showWarningMessage(`Compilation had ${errorWarningCounts.warnings} warnings`);
            vscode.window.showInformationMessage('Compilation completed succesfully!');
        }
    }
    else {
        writeCompilationOutputToBuildDirectory(output, buildDir, sourceDir, excludePath, singleContractFilePath);
        outputChannel.hide();
        vscode.window.showInformationMessage('Compilation completed succesfully!');
    }
}
function writeCompilationOutputToBuildDirectory(output, buildDir, sourceDir, excludePath, singleContractFilePath) {
    const binPath = path.join(vscode.workspace.rootPath, buildDir);
    if (!fs.existsSync(binPath)) {
        fs.mkdirSync(binPath);
    }
    // iterate through all the sources,
    // find contracts and output them into the same folder structure to avoid collisions, named as the contract
    for (let source in output.sources) {
        // TODO: ALL this validation to a method
        // Output only single contract compilation or all
        if (!singleContractFilePath || source === singleContractFilePath) {
            if (!excludePath || !source.startsWith(excludePath)) {
                // Output only source directory compilation or all (this will exclude external references)
                if (!sourceDir || source.startsWith(sourceDir)) {
                    output.sources[source].AST.children.forEach((child) => {
                        if (child.name === 'Contract' || child.name === 'ContractDefinition') {
                            const contractName = child.attributes.name;
                            const relativePath = path.relative(vscode.workspace.rootPath, source);
                            const dirName = path.dirname(path.join(binPath, relativePath));
                            if (!fs.existsSync(dirName)) {
                                fsex.mkdirsSync(dirName);
                            }
                            const contractAbiPath = path.join(dirName, contractName + '.abi');
                            const contractBinPath = path.join(dirName, contractName + '.bin');
                            const contractJsonPath = path.join(dirName, contractName + '.json');
                            const truffleArtifactPath = path.join(dirName, contractName + '.sol.js');
                            if (fs.existsSync(contractAbiPath)) {
                                fs.unlinkSync(contractAbiPath);
                            }
                            if (fs.existsSync(contractBinPath)) {
                                fs.unlinkSync(contractBinPath);
                            }
                            if (fs.existsSync(contractJsonPath)) {
                                fs.unlinkSync(contractJsonPath);
                            }
                            if (fs.existsSync(truffleArtifactPath)) {
                                fs.unlinkSync(truffleArtifactPath);
                            }
                            fs.writeFileSync(contractBinPath, output.contracts[source + ':' + contractName].bytecode);
                            fs.writeFileSync(contractAbiPath, output.contracts[source + ':' + contractName].interface);
                            const shortJsonOutput = {
                                abi: output.contracts[source + ':' + contractName].interface,
                                bytecode: output.contracts[source + ':' + contractName].bytecode,
                                functionHashes: output.contracts[source + ':' + contractName].functionHashes,
                                gasEstimates: output.contracts[source + ':' + contractName].gasEstimates,
                                runtimeBytecode: output.contracts[source + ':' + contractName].runtimeBytecode,
                            };
                            fs.writeFileSync(contractJsonPath, JSON.stringify(shortJsonOutput, null, 4));
                            /*
                            let contract_data = {
                                contract_name: contractName,
                                abi: output.contracts[source + ':' + contractName].interface,
                                unlinked_binary: output.contracts[source + ':' + contractName].bytecode,
                                };

                            artifactor.save(contract_data, truffleArtifactPath);
                            */
                        }
                    });
                }
            }
        }
    }
}
//# sourceMappingURL=compiler.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const solc = require("solc");
const fs = require("fs");
const path = require("path");
function getLocalSolcInstallation(rootPath) {
    return path.join(rootPath, 'node_modules', 'solc', 'soljson.js');
}
exports.getLocalSolcInstallation = getLocalSolcInstallation;
function isInstalledSolcLocally(rootPath) {
    return fs.existsSync(getLocalSolcInstallation(rootPath));
}
exports.isInstalledSolcLocally = isInstalledSolcLocally;
function initialiseLocalSolc(compileUsingLocalVersion, rootPath) {
    let solidityfile = '';
    if (isInstalledSolcLocally(rootPath)) {
        solidityfile = require(getLocalSolcInstallation(rootPath));
        solc.setupMethods(solidityfile);
        return true;
    }
    else {
        if (compileUsingLocalVersion !== 'undefined' || compileUsingLocalVersion !== null) {
            solidityfile = require(compileUsingLocalVersion);
            solc.setupMethods(solidityfile);
            return true;
        }
    }
}
exports.initialiseLocalSolc = initialiseLocalSolc;
function compile(contracts) {
    return solc.compile(contracts, 1);
}
exports.compile = compile;
function loadRemoteVersion(remoteCompiler, cb) {
    solc.loadRemoteVersion(remoteCompiler, cb);
}
exports.loadRemoteVersion = loadRemoteVersion;
//# sourceMappingURL=solcLoader.js.map
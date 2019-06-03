'use strict';
var path = require('path');
var Contract = (function () {
    function Contract(absoulePath, code) {
        this.absolutePath = this.formatPath(absoulePath);
        this.code = code;
        this.imports = new Array();
    }
    Contract.prototype.getAllImportFromPackages = function () {
        var _this = this;
        var importsFromPackages = new Array();
        this.imports.forEach(function (importElement) {
            if (!_this.isImportLocal(importElement)) {
                importsFromPackages.push(importElement);
            }
        });
        return importsFromPackages;
    };
    Contract.prototype.isImportLocal = function (importPath) {
        return importPath.startsWith('.');
    };
    Contract.prototype.formatPath = function (contractPath) {
        return contractPath.replace(/\\/g, '/');
    };
    Contract.prototype.replaceDependencyPath = function (importPath, depImportAbsolutePath) {
        var importRegEx = /(^\s?import\s+[^'"]*['"])(.*)(['"]\s*)/gm;
        this.code = this.code.replace(importRegEx, function (match, p1, p2, p3) {
            if (p2 === importPath) {
                return p1 + depImportAbsolutePath + p3;
            }
            else {
                return match;
            }
        });
    };
    Contract.prototype.resolveImports = function () {
        var importRegEx = /^\s?import\s+[^'"]*['"](.*)['"]\s*/gm;
        ;
        var foundImport = importRegEx.exec(this.code);
        while (foundImport != null) {
            var importPath = foundImport[1];
            if (this.isImportLocal(importPath)) {
                var importFullPath = this.formatPath(path.resolve(path.dirname(this.absolutePath), foundImport[1]));
                this.imports.push(importFullPath);
            }
            else {
                this.imports.push(importPath);
            }
            foundImport = importRegEx.exec(this.code);
        }
    };
    return Contract;
}());
exports.Contract = Contract;
//# sourceMappingURL=contract.js.map
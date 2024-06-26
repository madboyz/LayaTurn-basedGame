/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var _amdLoaderGlobal = this, AMDLoader;
!function (e) {
    e.global = _amdLoaderGlobal, e.isNode = "undefined" != typeof module && !!module.exports, e.isWindows = function () {
        return !!("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.indexOf("Windows") >= 0) || "undefined" != typeof process && "win32" === process.platform
    }(), e.isWebWorker = "function" == typeof e.global.importScripts, e.isElectronRenderer = "undefined" != typeof process && void 0 !== process.versions && void 0 !== process.versions.electron && "renderer" === process.type, e.isElectronMain = "undefined" != typeof process && void 0 !== process.versions && void 0 !== process.versions.electron && "browser" === process.type, e.hasPerformanceNow = e.global.performance && "function" == typeof e.global.performance.now
}(AMDLoader || (AMDLoader = {}));
var AMDLoader;
!function (e) {
    function t() {
        return e.hasPerformanceNow ? e.global.performance.now() : Date.now()
    }

    var n;
    !function (e) {
        e[e.LoaderAvailable = 1] = "LoaderAvailable", e[e.BeginLoadingScript = 10] = "BeginLoadingScript", e[e.EndLoadingScriptOK = 11] = "EndLoadingScriptOK", e[e.EndLoadingScriptError = 12] = "EndLoadingScriptError", e[e.BeginInvokeFactory = 21] = "BeginInvokeFactory", e[e.EndInvokeFactory = 22] = "EndInvokeFactory", e[e.NodeBeginEvaluatingScript = 31] = "NodeBeginEvaluatingScript", e[e.NodeEndEvaluatingScript = 32] = "NodeEndEvaluatingScript", e[e.NodeBeginNativeRequire = 33] = "NodeBeginNativeRequire", e[e.NodeEndNativeRequire = 34] = "NodeEndNativeRequire"
    }(n = e.LoaderEventType || (e.LoaderEventType = {})), e.getHighPerformanceTimestamp = t;
    var r = function () {
        function e(e, t, n) {
            this.type = e, this.detail = t, this.timestamp = n
        }

        return e
    }();
    e.LoaderEvent = r;
    var o = function () {
        function e(e) {
            this._events = [new r(n.LoaderAvailable, "", e)]
        }

        return e.prototype.record = function (e, n) {
            this._events.push(new r(e, n, t()))
        }, e.prototype.getEvents = function () {
            return this._events
        }, e
    }();
    e.LoaderEventRecorder = o;
    var i = function () {
        function e() {
        }

        return e.prototype.record = function (e, t) {
        }, e.prototype.getEvents = function () {
            return []
        }, e
    }();
    i.INSTANCE = new i, e.NullLoaderEventRecorder = i
}(AMDLoader || (AMDLoader = {}));
var AMDLoader;
!function (e) {
    var t = function () {
        function t() {
        }

        return t.fileUriToFilePath = function (t) {
            if (t = decodeURI(t), e.isWindows) {
                if (/^file:\/\/\//.test(t))return t.substr(8);
                if (/^file:\/\//.test(t))return t.substr(5)
            } else if (/^file:\/\//.test(t))return t.substr(7);
            return t
        }, t.startsWith = function (e, t) {
            return e.length >= t.length && e.substr(0, t.length) === t
        }, t.endsWith = function (e, t) {
            return e.length >= t.length && e.substr(e.length - t.length) === t
        }, t.containsQueryString = function (e) {
            return /^[^\#]*\?/gi.test(e)
        }, t.isAbsolutePath = function (e) {
            return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(e)
        }, t.forEachProperty = function (e, t) {
            if (e) {
                var n = void 0;
                for (n in e)e.hasOwnProperty(n) && t(n, e[n])
            }
        }, t.isEmpty = function (e) {
            var n = !0;
            return t.forEachProperty(e, function () {
                n = !1
            }), n
        }, t.recursiveClone = function (e) {
            if (!e || "object" != typeof e)return e;
            var n = Array.isArray(e) ? [] : {};
            return t.forEachProperty(e, function (e, r) {
                n[e] = r && "object" == typeof r ? t.recursiveClone(r) : r
            }), n
        }, t.generateAnonymousModule = function () {
            return "===anonymous" + t.NEXT_ANONYMOUS_ID++ + "==="
        }, t.isAnonymousModule = function (e) {
            return /^===anonymous/.test(e)
        }, t
    }();
    t.NEXT_ANONYMOUS_ID = 1, e.Utilities = t
}(AMDLoader || (AMDLoader = {}));
var AMDLoader;
!function (e) {
    var t = function () {
        function t() {
        }

        return t.validateConfigurationOptions = function (t) {
            function n(e) {
                return "load" === e.errorCode ? (console.error('Loading "' + e.moduleId + '" failed'), console.error("Detail: ", e.detail), e.detail && e.detail.stack && console.error(e.detail.stack), console.error("Here are the modules that depend on it:"), void console.error(e.neededBy)) : "factory" === e.errorCode ? (console.error('The factory method of "' + e.moduleId + '" has thrown an exception'), console.error(e.detail), void(e.detail && e.detail.stack && console.error(e.detail.stack))) : void 0
            }

            return t = t || {}, "string" != typeof t.baseUrl && (t.baseUrl = ""), "boolean" != typeof t.isBuild && (t.isBuild = !1), "object" != typeof t.paths && (t.paths = {}), "object" != typeof t.config && (t.config = {}), void 0 === t.catchError && (t.catchError = e.isWebWorker), "string" != typeof t.urlArgs && (t.urlArgs = ""), "function" != typeof t.onError && (t.onError = n), "object" == typeof t.ignoreDuplicateModules && Array.isArray(t.ignoreDuplicateModules) || (t.ignoreDuplicateModules = []), t.baseUrl.length > 0 && (e.Utilities.endsWith(t.baseUrl, "/") || (t.baseUrl += "/")), Array.isArray(t.nodeModules) || (t.nodeModules = []), ("number" != typeof t.nodeCachedDataWriteDelay || t.nodeCachedDataWriteDelay < 0) && (t.nodeCachedDataWriteDelay = 7e3), "function" != typeof t.onNodeCachedDataError && (t.onNodeCachedDataError = function (e) {
                "cachedDataRejected" === e.errorCode ? console.warn("Rejected cached data from file: " + e.path) : "unlink" !== e.errorCode && "writeFile" !== e.errorCode || (console.error("Problems writing cached data file: " + e.path), console.error(e.detail))
            }), t
        }, t.mergeConfigurationOptions = function (n, r) {
            void 0 === n && (n = null), void 0 === r && (r = null);
            var o = e.Utilities.recursiveClone(r || {});
            return e.Utilities.forEachProperty(n, function (t, n) {
                "ignoreDuplicateModules" === t && void 0 !== o.ignoreDuplicateModules ? o.ignoreDuplicateModules = o.ignoreDuplicateModules.concat(n) : "paths" === t && void 0 !== o.paths ? e.Utilities.forEachProperty(n, function (e, t) {
                    return o.paths[e] = t
                }) : "config" === t && void 0 !== o.config ? e.Utilities.forEachProperty(n, function (e, t) {
                    return o.config[e] = t
                }) : o[t] = e.Utilities.recursiveClone(n)
            }), t.validateConfigurationOptions(o)
        }, t
    }();
    e.ConfigurationOptionsUtil = t;
    var n = function () {
        function n(n) {
            if (this.options = t.mergeConfigurationOptions(n), this._createIgnoreDuplicateModulesMap(), this._createNodeModulesMap(), this._createSortedPathsRules(), "" === this.options.baseUrl) {
                if (e.isNode && this.options.nodeRequire && this.options.nodeRequire.main && this.options.nodeRequire.main.filename) {
                    var r = this.options.nodeRequire.main.filename,
                        o = Math.max(r.lastIndexOf("/"), r.lastIndexOf("\\"));
                    this.options.baseUrl = r.substring(0, o + 1)
                }
                if (e.isNode && this.options.nodeMain) {
                    var r = this.options.nodeMain, o = Math.max(r.lastIndexOf("/"), r.lastIndexOf("\\"));
                    this.options.baseUrl = r.substring(0, o + 1)
                }
            }
        }

        return n.prototype._createIgnoreDuplicateModulesMap = function () {
            this.ignoreDuplicateModulesMap = {};
            for (var e = 0; e < this.options.ignoreDuplicateModules.length; e++)this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[e]] = !0
        }, n.prototype._createNodeModulesMap = function () {
            this.nodeModulesMap = Object.create(null);
            for (var e = 0, t = this.options.nodeModules; e < t.length; e++) {
                var n = t[e];
                this.nodeModulesMap[n] = !0
            }
        }, n.prototype._createSortedPathsRules = function () {
            var t = this;
            this.sortedPathsRules = [], e.Utilities.forEachProperty(this.options.paths, function (e, n) {
                Array.isArray(n) ? t.sortedPathsRules.push({from: e, to: n}) : t.sortedPathsRules.push({
                    from: e,
                    to: [n]
                })
            }), this.sortedPathsRules.sort(function (e, t) {
                return t.from.length - e.from.length
            })
        }, n.prototype.cloneAndMerge = function (e) {
            return new n(t.mergeConfigurationOptions(e, this.options))
        }, n.prototype.getOptionsLiteral = function () {
            return this.options
        }, n.prototype._applyPaths = function (t) {
            for (var n, r = 0, o = this.sortedPathsRules.length; r < o; r++)if (n = this.sortedPathsRules[r], e.Utilities.startsWith(t, n.from)) {
                for (var i = [], s = 0, a = n.to.length; s < a; s++)i.push(n.to[s] + t.substr(n.from.length));
                return i
            }
            return [t]
        }, n.prototype._addUrlArgsToUrl = function (t) {
            return e.Utilities.containsQueryString(t) ? t + "&" + this.options.urlArgs : t + "?" + this.options.urlArgs
        }, n.prototype._addUrlArgsIfNecessaryToUrl = function (e) {
            return this.options.urlArgs ? this._addUrlArgsToUrl(e) : e
        }, n.prototype._addUrlArgsIfNecessaryToUrls = function (e) {
            if (this.options.urlArgs)for (var t = 0, n = e.length; t < n; t++)e[t] = this._addUrlArgsToUrl(e[t]);
            return e
        }, n.prototype.moduleIdToPaths = function (t) {
            if (!0 === this.nodeModulesMap[t])return this.isBuild() ? ["empty:"] : ["node|" + t];
            var n, r = t;
            if (e.Utilities.endsWith(r, ".js") || e.Utilities.isAbsolutePath(r)) e.Utilities.endsWith(r, ".js") || e.Utilities.containsQueryString(r) || (r += ".js"), n = [r]; else {
                n = this._applyPaths(r);
                for (var o = 0, i = n.length; o < i; o++)this.isBuild() && "empty:" === n[o] || (e.Utilities.isAbsolutePath(n[o]) || (n[o] = this.options.baseUrl + n[o]), e.Utilities.endsWith(n[o], ".js") || e.Utilities.containsQueryString(n[o]) || (n[o] = n[o] + ".js"))
            }
            return this._addUrlArgsIfNecessaryToUrls(n)
        }, n.prototype.requireToUrl = function (t) {
            var n = t;
            return e.Utilities.isAbsolutePath(n) || (n = this._applyPaths(n)[0], e.Utilities.isAbsolutePath(n) || (n = this.options.baseUrl + n)), this._addUrlArgsIfNecessaryToUrl(n)
        }, n.prototype.isBuild = function () {
            return this.options.isBuild
        }, n.prototype.isDuplicateMessageIgnoredFor = function (e) {
            return this.ignoreDuplicateModulesMap.hasOwnProperty(e)
        }, n.prototype.getConfigForModule = function (e) {
            if (this.options.config)return this.options.config[e]
        }, n.prototype.shouldCatchError = function () {
            return this.options.catchError
        }, n.prototype.shouldRecordStats = function () {
            return this.options.recordStats
        }, n.prototype.onError = function (e) {
            this.options.onError(e)
        }, n
    }();
    e.Configuration = n
}(AMDLoader || (AMDLoader = {}));
var AMDLoader;
!function (e) {
    var t = function () {
        function e(e) {
            this.actualScriptLoader = e, this.callbackMap = {}
        }

        return e.prototype.load = function (e, t, n, r) {
            var o = this, i = {callback: n, errorback: r};
            if (this.callbackMap.hasOwnProperty(t))return void this.callbackMap[t].push(i);
            this.callbackMap[t] = [i], this.actualScriptLoader.load(e, t, function () {
                return o.triggerCallback(t)
            }, function (e) {
                return o.triggerErrorback(t, e)
            })
        }, e.prototype.triggerCallback = function (e) {
            var t = this.callbackMap[e];
            delete this.callbackMap[e];
            for (var n = 0; n < t.length; n++)t[n].callback()
        }, e.prototype.triggerErrorback = function (e, t) {
            var n = this.callbackMap[e];
            delete this.callbackMap[e];
            for (var r = 0; r < n.length; r++)n[r].errorback(t)
        }, e
    }(), n = function () {
        function e() {
        }

        return e.prototype.attachListeners = function (e, t, n) {
            var r = function () {
                e.removeEventListener("load", o), e.removeEventListener("error", i)
            }, o = function (e) {
                r(), t()
            }, i = function (e) {
                r(), n(e)
            };
            e.addEventListener("load", o), e.addEventListener("error", i)
        }, e.prototype.load = function (e, t, n, r) {
            var o = document.createElement("script");
            o.setAttribute("async", "async"), o.setAttribute("type", "text/javascript"), this.attachListeners(o, n, r), o.setAttribute("src", t), document.getElementsByTagName("head")[0].appendChild(o)
        }, e
    }(), r = function () {
        function e() {
        }

        return e.prototype.load = function (e, t, n, r) {
            try {
                importScripts(t), n()
            } catch (e) {
                r(e)
            }
        }, e
    }(), o = function () {
        function t() {
            this._initialized = !1
        }

        return t.prototype._init = function (e) {
            this._initialized || (this._initialized = !0, this._fs = e("fs"), this._vm = e("vm"), this._path = e("path"), this._crypto = e("crypto"))
        }, t.prototype.load = function (n, r, o, i) {
            var s = this, a = n.getConfig().getOptionsLiteral(), u = a.nodeRequire || e.global.nodeRequire,
                l = a.nodeInstrumenter || function (e) {
                        return e
                    };
            this._init(u);
            var d = n.getRecorder();
            if (/^node\|/.test(r)) {
                var c = r.split("|"), f = null;
                try {
                    f = u(c[1])
                } catch (e) {
                    return void i(e)
                }
                n.enqueueDefineAnonymousModule([], function () {
                    return f
                }), o()
            } else r = e.Utilities.fileUriToFilePath(r), this._fs.readFile(r, {encoding: "utf8"}, function (u, c) {
                if (u)return void i(u);
                var f = s._path.normalize(r), p = f;
                if (e.isElectronRenderer) {
                    var h = p.match(/^([a-z])\:(.*)/i);
                    h && (p = h[1].toUpperCase() + ":" + h[2]), p = "file:///" + p.replace(/\\/g, "/")
                }
                var g, v = "(function (require, define, __filename, __dirname) { ";
                if (g = c.charCodeAt(0) === t._BOM ? v + c.substring(1) + "\n});" : v + c + "\n});", g = l(g, f), a.nodeCachedDataDir) {
                    var y = s._getCachedDataPath(a.nodeCachedDataDir, r);
                    s._fs.readFile(y, function (e, i) {
                        var u = {filename: p, produceCachedData: void 0 === i, cachedData: i},
                            l = s._loadAndEvalScript(r, p, g, u, d);
                        o(), l.cachedDataRejected ? (a.onNodeCachedDataError({
                            errorCode: "cachedDataRejected",
                            path: y
                        }), t._runSoon(function () {
                            return s._fs.unlink(y, function (e) {
                                e && n.getConfig().getOptionsLiteral().onNodeCachedDataError({
                                    errorCode: "unlink",
                                    path: y,
                                    detail: e
                                })
                            })
                        }, a.nodeCachedDataWriteDelay)) : l.cachedDataProduced && t._runSoon(function () {
                                return s._fs.writeFile(y, l.cachedData, function (e) {
                                    e && n.getConfig().getOptionsLiteral().onNodeCachedDataError({
                                        errorCode: "writeFile",
                                        path: y,
                                        detail: e
                                    })
                                })
                            }, a.nodeCachedDataWriteDelay)
                    })
                } else s._loadAndEvalScript(r, p, g, {filename: p}, d), o()
            })
        }, t.prototype._loadAndEvalScript = function (t, n, r, o, i) {
            i.record(e.LoaderEventType.NodeBeginEvaluatingScript, t);
            var s = new this._vm.Script(r, o);
            return s.runInThisContext(o).call(e.global, e.RequireFunc, e.DefineFunc, n, this._path.dirname(t)), i.record(e.LoaderEventType.NodeEndEvaluatingScript, t), s
        }, t.prototype._getCachedDataPath = function (e, t) {
            var n = this._crypto.createHash("md5").update(t, "utf8").digest("hex"),
                r = this._path.basename(t).replace(/\.js$/, "");
            return this._path.join(e, n + "-" + r + ".code")
        }, t._runSoon = function (e, t) {
            var n = t + Math.ceil(Math.random() * t);
            setTimeout(e, n)
        }, t
    }();
    o._BOM = 65279, e.scriptLoader = new t(e.isWebWorker ? new r : e.isNode ? new o : new n)
}(AMDLoader || (AMDLoader = {}));
var AMDLoader;
!function (e) {
    var t = function () {
        function t(e) {
            var t = e.lastIndexOf("/");
            this.fromModulePath = -1 !== t ? e.substr(0, t + 1) : ""
        }

        return t._normalizeModuleId = function (e) {
            var t, n = e;
            for (t = /\/\.\//; t.test(n);)n = n.replace(t, "/");
            for (n = n.replace(/^\.\//g, ""), t = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//; t.test(n);)n = n.replace(t, "/");
            return n = n.replace(/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//, "")
        }, t.prototype.resolveModule = function (n) {
            var r = n;
            return e.Utilities.isAbsolutePath(r) || (e.Utilities.startsWith(r, "./") || e.Utilities.startsWith(r, "../")) && (r = t._normalizeModuleId(this.fromModulePath + r)), r
        }, t
    }();
    t.ROOT = new t(""), e.ModuleIdResolver = t;
    var n = function () {
        function t(e, t, n, r, o, i) {
            this.id = e, this.strId = t, this.dependencies = n, this._callback = r, this._errorback = o, this.moduleIdResolver = i, this.exports = {}, this.exportsPassedIn = !1, this.unresolvedDependenciesCount = this.dependencies.length, this._isComplete = !1
        }

        return t._safeInvokeFunction = function (t, n) {
            try {
                return {returnedValue: t.apply(e.global, n), producedError: null}
            } catch (e) {
                return {returnedValue: null, producedError: e}
            }
        }, t._invokeFactory = function (t, n, r, o) {
            return t.isBuild() && !e.Utilities.isAnonymousModule(n) ? {
                returnedValue: null,
                producedError: null
            } : t.shouldCatchError() ? this._safeInvokeFunction(r, o) : {
                returnedValue: r.apply(e.global, o),
                producedError: null
            }
        }, t.prototype.complete = function (n, r, o) {
            this._isComplete = !0;
            var i = null;
            if (this._callback)if ("function" == typeof this._callback) {
                n.record(e.LoaderEventType.BeginInvokeFactory, this.strId);
                var s = t._invokeFactory(r, this.strId, this._callback, o);
                i = s.producedError, n.record(e.LoaderEventType.EndInvokeFactory, this.strId), i || void 0 === s.returnedValue || this.exportsPassedIn && !e.Utilities.isEmpty(this.exports) || (this.exports = s.returnedValue)
            } else this.exports = this._callback;
            i && r.onError({
                errorCode: "factory",
                moduleId: this.strId,
                detail: i
            }), this.dependencies = null, this._callback = null, this._errorback = null, this.moduleIdResolver = null
        }, t.prototype.onDependencyError = function (e) {
            return !!this._errorback && (this._errorback(e), !0)
        }, t.prototype.isComplete = function () {
            return this._isComplete
        }, t
    }();
    e.Module = n;
    var r = function () {
        function e() {
            this._nextId = 0, this._strModuleIdToIntModuleId = new Map, this._intModuleIdToStrModuleId = [], this.getModuleId("exports"), this.getModuleId("module"), this.getModuleId("require")
        }

        return e.prototype.getMaxModuleId = function () {
            return this._nextId
        }, e.prototype.getModuleId = function (e) {
            var t = this._strModuleIdToIntModuleId.get(e);
            return void 0 === t && (t = this._nextId++, this._strModuleIdToIntModuleId.set(e, t), this._intModuleIdToStrModuleId[t] = e), t
        }, e.prototype.getStrModuleId = function (e) {
            return this._intModuleIdToStrModuleId[e]
        }, e
    }(), o = function () {
        function e(e) {
            this.id = e
        }

        return e
    }();
    o.EXPORTS = new o(0), o.MODULE = new o(1), o.REQUIRE = new o(2), e.RegularDependency = o;
    var i = function () {
        function e(e, t, n) {
            this.id = e, this.pluginId = t, this.pluginParam = n
        }

        return e
    }();
    e.PluginDependency = i;
    var s = function () {
        function s(t, n) {
            void 0 === n && (n = 0), this._recorder = null, this._loaderAvailableTimestamp = n, this._moduleIdProvider = new r, this._config = new e.Configuration, this._scriptLoader = t, this._modules2 = [], this._knownModules2 = [], this._inverseDependencies2 = [], this._inversePluginDependencies2 = new Map, this._currentAnnonymousDefineCall = null, this._buildInfoPath = [], this._buildInfoDefineStack = [], this._buildInfoDependencies = []
        }

        return s._findRelevantLocationInStack = function (e, t) {
            for (var n = function (e) {
                return e.replace(/\\/g, "/")
            }, r = n(e), o = t.split(/\n/), i = 0; i < o.length; i++) {
                var s = o[i].match(/(.*):(\d+):(\d+)\)?$/);
                if (s) {
                    var a = s[1], u = s[2], l = s[3], d = Math.max(a.lastIndexOf(" ") + 1, a.lastIndexOf("(") + 1);
                    if (a = a.substr(d), (a = n(a)) === r) {
                        var c = {line: parseInt(u, 10), col: parseInt(l, 10)};
                        return 1 === c.line && (c.col -= "(function (require, define, __filename, __dirname) { ".length), c
                    }
                }
            }
            throw new Error("Could not correlate define call site for needle " + e)
        }, s.prototype.getBuildInfo = function () {
            if (!this._config.isBuild())return null;
            for (var e = [], t = 0, n = 0, r = this._modules2.length; n < r; n++) {
                var o = this._modules2[n];
                if (o) {
                    var i = this._buildInfoPath[o.id] || null, a = this._buildInfoDefineStack[o.id] || null,
                        u = this._buildInfoDependencies[o.id];
                    e[t++] = {
                        id: o.strId,
                        path: i,
                        defineLocation: i && a ? s._findRelevantLocationInStack(i, a) : null,
                        dependencies: u,
                        shim: null,
                        exports: o.exports
                    }
                }
            }
            return e
        }, s.prototype.getRecorder = function () {
            return this._recorder || (this._config.shouldRecordStats() ? this._recorder = new e.LoaderEventRecorder(this._loaderAvailableTimestamp) : this._recorder = e.NullLoaderEventRecorder.INSTANCE), this._recorder
        }, s.prototype.getLoaderEvents = function () {
            return this.getRecorder().getEvents()
        }, s.prototype.enqueueDefineAnonymousModule = function (e, t) {
            if (null !== this._currentAnnonymousDefineCall)throw new Error("Can only have one anonymous define call per script file");
            var n = null;
            this._config.isBuild() && (n = new Error("StackLocation").stack), this._currentAnnonymousDefineCall = {
                stack: n,
                dependencies: e,
                callback: t
            }
        }, s.prototype.defineModule = function (e, r, o, i, s, a) {
            var u = this;
            void 0 === a && (a = new t(e));
            var l = this._moduleIdProvider.getModuleId(e);
            if (this._modules2[l])return void(this._config.isDuplicateMessageIgnoredFor(e) || console.warn("Duplicate definition of module '" + e + "'"));
            var d = new n(l, e, this._normalizeDependencies(r, a), o, i, a);
            this._modules2[l] = d, this._config.isBuild() && (this._buildInfoDefineStack[l] = s, this._buildInfoDependencies[l] = d.dependencies.map(function (e) {
                return u._moduleIdProvider.getStrModuleId(e.id)
            })), this._resolve(d)
        }, s.prototype._normalizeDependency = function (e, t) {
            if ("exports" === e)return o.EXPORTS;
            if ("module" === e)return o.MODULE;
            if ("require" === e)return o.REQUIRE;
            var n = e.indexOf("!");
            if (n >= 0) {
                var r = t.resolveModule(e.substr(0, n)), s = t.resolveModule(e.substr(n + 1)),
                    a = this._moduleIdProvider.getModuleId(r + "!" + s), u = this._moduleIdProvider.getModuleId(r);
                return new i(a, u, s)
            }
            return new o(this._moduleIdProvider.getModuleId(t.resolveModule(e)))
        }, s.prototype._normalizeDependencies = function (e, t) {
            for (var n = [], r = 0, o = 0, i = e.length; o < i; o++)n[r++] = this._normalizeDependency(e[o], t);
            return n
        }, s.prototype._relativeRequire = function (t, n, r, o) {
            if ("string" == typeof n)return this.synchronousRequire(n, t);
            this.defineModule(e.Utilities.generateAnonymousModule(), n, r, o, null, t)
        }, s.prototype.synchronousRequire = function (e, n) {
            void 0 === n && (n = new t(e));
            var r = this._normalizeDependency(e, n), o = this._modules2[r.id];
            if (!o)throw new Error("Check dependency list! Synchronous require cannot resolve module '" + e + "'. This is the first mention of this module!");
            if (!o.isComplete())throw new Error("Check dependency list! Synchronous require cannot resolve module '" + e + "'. This module has not been resolved completely yet.");
            return o.exports
        }, s.prototype.configure = function (t, n) {
            var r = this._config.shouldRecordStats();
            this._config = n ? new e.Configuration(t) : this._config.cloneAndMerge(t), this._config.shouldRecordStats() && !r && (this._recorder = null)
        }, s.prototype.getConfig = function () {
            return this._config
        }, s.prototype._onLoad = function (e) {
            if (null !== this._currentAnnonymousDefineCall) {
                var t = this._currentAnnonymousDefineCall;
                this._currentAnnonymousDefineCall = null, this.defineModule(this._moduleIdProvider.getStrModuleId(e), t.dependencies, t.callback, null, t.stack)
            }
        }, s.prototype._createLoadError = function (e, t) {
            var n = this;
            return {
                errorCode: "load",
                moduleId: this._moduleIdProvider.getStrModuleId(e),
                neededBy: (this._inverseDependencies2[e] || []).map(function (e) {
                    return n._moduleIdProvider.getStrModuleId(e)
                }),
                detail: t
            }
        }, s.prototype._onLoadError = function (e, t) {
            for (var n = this._createLoadError(e, t), r = [], o = 0, i = this._moduleIdProvider.getMaxModuleId(); o < i; o++)r[o] = !1;
            var s = !1, a = [];
            for (a.push(e), r[e] = !0; a.length > 0;) {
                var u = a.shift(), l = this._modules2[u];
                l && (s = l.onDependencyError(n) || s);
                var d = this._inverseDependencies2[u];
                if (d)for (var o = 0, i = d.length; o < i; o++) {
                    var c = d[o];
                    r[c] || (a.push(c), r[c] = !0)
                }
            }
            s || this._config.onError(n)
        }, s.prototype._hasDependencyPath = function (e, t) {
            var n = this._modules2[e];
            if (!n)return !1;
            for (var r = [], o = 0, i = this._moduleIdProvider.getMaxModuleId(); o < i; o++)r[o] = !1;
            var s = [];
            for (s.push(n), r[e] = !0; s.length > 0;) {
                var a = s.shift(), u = a.dependencies;
                if (u)for (var o = 0, i = u.length; o < i; o++) {
                    var l = u[o];
                    if (l.id === t)return !0;
                    var d = this._modules2[l.id];
                    d && !r[l.id] && (r[l.id] = !0, s.push(d))
                }
            }
            return !1
        }, s.prototype._findCyclePath = function (e, t, n) {
            if (e === t || 50 === n)return [e];
            var r = this._modules2[e];
            if (!r)return null;
            for (var o = r.dependencies, i = 0, s = o.length; i < s; i++) {
                var a = this._findCyclePath(o[i].id, t, n + 1);
                if (null !== a)return a.push(e), a
            }
            return null
        }, s.prototype._createRequire = function (t) {
            var n = this, r = function (e, r, o) {
                return n._relativeRequire(t, e, r, o)
            };
            return r.toUrl = function (e) {
                return n._config.requireToUrl(t.resolveModule(e))
            }, r.getStats = function () {
                return n.getLoaderEvents()
            }, r.__$__nodeRequire = e.global.nodeRequire, r
        }, s.prototype._loadModule = function (t) {
            var n = this;
            if (!this._modules2[t] && !this._knownModules2[t]) {
                this._knownModules2[t] = !0;
                var r = this._moduleIdProvider.getStrModuleId(t), o = this._config.moduleIdToPaths(r);
                e.isNode && -1 === r.indexOf("/") && o.push("node|" + r);
                var i = -1, s = function (r) {
                    if (++i >= o.length) n._onLoadError(t, r); else {
                        var a = o[i], u = n.getRecorder();
                        if (n._config.isBuild() && "empty:" === a)return n._buildInfoPath[t] = a, n.defineModule(n._moduleIdProvider.getStrModuleId(t), [], null, null, null), void n._onLoad(t);
                        u.record(e.LoaderEventType.BeginLoadingScript, a), n._scriptLoader.load(n, a, function () {
                            n._config.isBuild() && (n._buildInfoPath[t] = a), u.record(e.LoaderEventType.EndLoadingScriptOK, a), n._onLoad(t)
                        }, function (t) {
                            u.record(e.LoaderEventType.EndLoadingScriptError, a), s(t)
                        })
                    }
                };
                s(null)
            }
        }, s.prototype._loadPluginDependency = function (e, n) {
            var r = this;
            if (!this._modules2[n.id] && !this._knownModules2[n.id]) {
                this._knownModules2[n.id] = !0;
                var o = function (e) {
                    r.defineModule(r._moduleIdProvider.getStrModuleId(n.id), [], e, null, null)
                };
                o.error = function (e) {
                    r._config.onError(r._createLoadError(n.id, e))
                }, e.load(n.pluginParam, this._createRequire(t.ROOT), o, this._config.getOptionsLiteral())
            }
        }, s.prototype._resolve = function (e) {
            for (var t = this, n = e.dependencies, r = 0, s = n.length; r < s; r++) {
                var a = n[r];
                if (a !== o.EXPORTS)if (a !== o.MODULE)if (a !== o.REQUIRE) {
                    var u = this._modules2[a.id];
                    if (u && u.isComplete()) e.unresolvedDependenciesCount--; else if (this._hasDependencyPath(a.id, e.id)) {
                        console.warn("There is a dependency cycle between '" + this._moduleIdProvider.getStrModuleId(a.id) + "' and '" + this._moduleIdProvider.getStrModuleId(e.id) + "'. The cyclic path follows:");
                        var l = this._findCyclePath(a.id, e.id, 0);
                        l.reverse(), l.push(a.id), console.warn(l.map(function (e) {
                            return t._moduleIdProvider.getStrModuleId(e)
                        }).join(" => \n")), e.unresolvedDependenciesCount--
                    } else if (this._inverseDependencies2[a.id] = this._inverseDependencies2[a.id] || [], this._inverseDependencies2[a.id].push(e.id), a instanceof i) {
                        var d = this._modules2[a.pluginId];
                        if (d && d.isComplete()) {
                            this._loadPluginDependency(d.exports, a);
                            continue
                        }
                        var c = this._inversePluginDependencies2.get(a.pluginId);
                        c || (c = [], this._inversePluginDependencies2.set(a.pluginId, c)), c.push(a), this._loadModule(a.pluginId)
                    } else this._loadModule(a.id)
                } else e.unresolvedDependenciesCount--; else e.unresolvedDependenciesCount--; else e.exportsPassedIn = !0, e.unresolvedDependenciesCount--
            }
            0 === e.unresolvedDependenciesCount && this._onModuleComplete(e)
        }, s.prototype._onModuleComplete = function (e) {
            var t = this, n = this.getRecorder();
            if (!e.isComplete()) {
                for (var r = e.dependencies, i = [], s = 0, a = r.length; s < a; s++) {
                    var u = r[s];
                    if (u !== o.EXPORTS)if (u !== o.MODULE)if (u !== o.REQUIRE) {
                        var l = this._modules2[u.id];
                        i[s] = l ? l.exports : null
                    } else i[s] = this._createRequire(e.moduleIdResolver); else i[s] = {
                        id: e.strId,
                        config: function () {
                            return t._config.getConfigForModule(e.strId)
                        }
                    }; else i[s] = e.exports
                }
                e.complete(n, this._config, i);
                var d = this._inverseDependencies2[e.id];
                if (this._inverseDependencies2[e.id] = null, d)for (var s = 0, a = d.length; s < a; s++) {
                    var c = d[s], f = this._modules2[c];
                    f.unresolvedDependenciesCount--, 0 === f.unresolvedDependenciesCount && this._onModuleComplete(f)
                }
                var p = this._inversePluginDependencies2.get(e.id);
                if (p) {
                    this._inversePluginDependencies2.delete(e.id);
                    for (var s = 0, a = p.length; s < a; s++)this._loadPluginDependency(e.exports, p[s])
                }
            }
        }, s
    }();
    e.ModuleManager = s
}(AMDLoader || (AMDLoader = {}));
var define, AMDLoader;
!function (e) {
    var t, n, r = function () {
        function e(e, n, r) {
            "string" != typeof e && (r = n, n = e, e = null), "object" == typeof n && Array.isArray(n) || (r = n, n = null), n || (n = ["require", "exports", "module"]), e ? t.defineModule(e, n, r, null, null) : t.enqueueDefineAnonymousModule(n, r)
        }

        return e
    }();
    r.amd = {jQuery: !0}, e.DefineFunc = r;
    var o = function () {
        function r() {
            if (1 === arguments.length) {
                if (arguments[0] instanceof Object && !Array.isArray(arguments[0]))return void r.config(arguments[0]);
                if ("string" == typeof arguments[0])return t.synchronousRequire(arguments[0])
            }
            if ((2 === arguments.length || 3 === arguments.length) && Array.isArray(arguments[0]))return void t.defineModule(e.Utilities.generateAnonymousModule(), arguments[0], arguments[1], arguments[2], null);
            throw new Error("Unrecognized require call")
        }

        return r.config = function (e, n) {
            void 0 === n && (n = !1), t.configure(e, n)
        }, r.getConfig = function () {
            return t.getConfig().getOptionsLiteral()
        }, r.reset = function () {
            t = new e.ModuleManager(e.scriptLoader, n)
        }, r.getBuildInfo = function () {
            return t.getBuildInfo()
        }, r.getStats = function () {
            return t.getLoaderEvents()
        }, r
    }();
    e.RequireFunc = o, "function" == typeof e.global.define && e.global.define.amd || (!function () {
        if (t = new e.ModuleManager(e.scriptLoader, n), e.isNode) {
            var i = e.global.require || require, s = function (n) {
                t.getRecorder().record(e.LoaderEventType.NodeBeginNativeRequire, n);
                try {
                    return i(n)
                } finally {
                    t.getRecorder().record(e.LoaderEventType.NodeEndNativeRequire, n)
                }
            };
            e.global.nodeRequire = s, o.nodeRequire = s
        }
        e.isNode && !e.isElectronRenderer ? (module.exports = o, define = function () {
            r.apply(null, arguments)
        }, require = o) : (void 0 !== e.global.require && "function" != typeof e.global.require && o.config(e.global.require), e.isElectronRenderer ? define = function () {
            r.apply(null, arguments)
        } : e.global.define = define = r, e.global.require = o, e.global.require.__$__nodeRequire = s)
    }(), n = e.getHighPerformanceTimestamp())
}(AMDLoader || (AMDLoader = {}));
var _cssPluginGlobal = this, CSSLoaderPlugin;
!function (e) {
    var t = _cssPluginGlobal || {}, n = function () {
        function e() {
            this._pendingLoads = 0
        }

        return e.prototype.attachListeners = function (e, t, n, r) {
            var o = function () {
                t.removeEventListener("load", i), t.removeEventListener("error", s)
            }, i = function (e) {
                o(), n()
            }, s = function (e) {
                o(), r(e)
            };
            t.addEventListener("load", i), t.addEventListener("error", s)
        }, e.prototype._onLoad = function (e, t) {
            this._pendingLoads--, t()
        }, e.prototype._onLoadError = function (e, t, n) {
            this._pendingLoads--, t(n)
        }, e.prototype._insertLinkNode = function (e) {
            this._pendingLoads++;
            var t = document.head || document.getElementsByTagName("head")[0],
                n = t.getElementsByTagName("link") || document.head.getElementsByTagName("script");
            n.length > 0 ? t.insertBefore(e, n[n.length - 1]) : t.appendChild(e)
        }, e.prototype.createLinkTag = function (e, t, n, r) {
            var o = this, i = document.createElement("link");
            i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("data-name", e);
            var s = function () {
                return o._onLoad(e, n)
            }, a = function (t) {
                return o._onLoadError(e, r, t)
            };
            return this.attachListeners(e, i, s, a), i.setAttribute("href", t), i
        }, e.prototype._linkTagExists = function (e, t) {
            var n, r, o, i, s = document.getElementsByTagName("link");
            for (n = 0, r = s.length; n < r; n++)if (o = s[n].getAttribute("data-name"), i = s[n].getAttribute("href"), o === e || i === t)return !0;
            return !1
        }, e.prototype.load = function (e, t, n, r) {
            if (this._linkTagExists(e, t))return void n();
            var o = this.createLinkTag(e, t, n, r);
            this._insertLinkNode(o)
        }, e
    }(), r = function () {
        function e() {
            this.fs = require.nodeRequire("fs")
        }

        return e.prototype.load = function (t, n, r, o) {
            var i = this.fs.readFileSync(n, "utf8");
            i.charCodeAt(0) === e.BOM_CHAR_CODE && (i = i.substring(1)), r(i)
        }, e
    }();
    r.BOM_CHAR_CODE = 65279;
    var o = function () {
        function e(e) {
            this.cssLoader = e
        }

        return e.prototype.load = function (n, r, o, i) {
            i = i || {};
            var s = i["vs/css"] || {};
            t.inlineResources = s.inlineResources, t.inlineResourcesLimit = s.inlineResourcesLimit || 5e3;
            var a = r.toUrl(n + ".css");
            this.cssLoader.load(n, a, function (t) {
                i.isBuild && (e.BUILD_MAP[n] = t, e.BUILD_PATH_MAP[n] = a), o({})
            }, function (e) {
                "function" == typeof o.error && o.error("Could not find " + a + " or it was empty")
            })
        }, e.prototype.write = function (n, r, o) {
            var i = o.getEntryPoint();
            t.cssPluginEntryPoints = t.cssPluginEntryPoints || {}, t.cssPluginEntryPoints[i] = t.cssPluginEntryPoints[i] || [], t.cssPluginEntryPoints[i].push({
                moduleName: r,
                contents: e.BUILD_MAP[r],
                fsPath: e.BUILD_PATH_MAP[r]
            }), o.asModule(n + "!" + r, "define(['vs/css!" + i + "'], {});")
        }, e.prototype.writeFile = function (e, n, r, o, s) {
            if (t.cssPluginEntryPoints && t.cssPluginEntryPoints.hasOwnProperty(n)) {
                for (var a = r.toUrl(n + ".css"), u = ["/*---------------------------------------------------------", " * Copyright (c) Microsoft Corporation. All rights reserved.", " *--------------------------------------------------------*/"], l = t.cssPluginEntryPoints[n], d = 0; d < l.length; d++)t.inlineResources ? u.push(i.rewriteOrInlineUrls(l[d].fsPath, l[d].moduleName, n, l[d].contents, "base64" === t.inlineResources, t.inlineResourcesLimit)) : u.push(i.rewriteUrls(l[d].moduleName, n, l[d].contents));
                o(a, u.join("\r\n"))
            }
        }, e.prototype.getInlinedResources = function () {
            return t.cssInlinedResources || []
        }, e
    }();
    o.BUILD_MAP = {}, o.BUILD_PATH_MAP = {}, e.CSSPlugin = o;
    var i = function () {
        function e() {
        }

        return e.startsWith = function (e, t) {
            return e.length >= t.length && e.substr(0, t.length) === t
        }, e.pathOf = function (e) {
            var t = e.lastIndexOf("/");
            return -1 !== t ? e.substr(0, t + 1) : ""
        }, e.joinPaths = function (t, n) {
            function r(t, n) {
                return e.startsWith(t, n) ? Math.max(n.length, t.indexOf("/", n.length)) : 0
            }

            function o(e, t) {
                if ("./" !== t) {
                    if ("../" === t) {
                        var n = e.length > 0 ? e[e.length - 1] : null;
                        if (n && "/" === n)return;
                        if (n && "../" !== n)return void e.pop()
                    }
                    e.push(t)
                }
            }

            function i(e, t) {
                for (; t.length > 0;) {
                    var n = t.indexOf("/"), r = n >= 0 ? t.substring(0, n + 1) : t;
                    t = n >= 0 ? t.substring(n + 1) : "", o(e, r)
                }
            }

            var s = 0;
            s = s || r(t, "//"), s = s || r(t, "http://"), s = s || r(t, "https://");
            var a = [];
            return i(a, t.substr(s)), n.length > 0 && "/" === n.charAt(0) && (a = []), i(a, n), t.substring(0, s) + a.join("")
        }, e.commonPrefix = function (e, t) {
            for (var n = Math.min(e.length, t.length), r = 0; r < n && e.charCodeAt(r) === t.charCodeAt(r); r++);
            return e.substring(0, r)
        }, e.commonFolderPrefix = function (t, n) {
            var r = e.commonPrefix(t, n), o = r.lastIndexOf("/");
            return -1 === o ? "" : r.substring(0, o + 1)
        }, e.relativePath = function (t, n) {
            if (e.startsWith(n, "/") || e.startsWith(n, "http://") || e.startsWith(n, "https://"))return n;
            var r = e.commonFolderPrefix(t, n);
            t = t.substr(r.length), n = n.substr(r.length);
            for (var o = t.split("/").length, i = "", s = 1; s < o; s++)i += "../";
            return i + n
        }, e._replaceURL = function (t, n) {
            return t.replace(/url\(\s*([^\)]+)\s*\)?/g, function (t) {
                for (var r = [], o = 1; o < arguments.length; o++)r[o - 1] = arguments[o];
                var i = r[0];
                for ('"' !== i.charAt(0) && "'" !== i.charAt(0) || (i = i.substring(1)); i.length > 0 && (" " === i.charAt(i.length - 1) || "\t" === i.charAt(i.length - 1));)i = i.substring(0, i.length - 1);
                return '"' !== i.charAt(i.length - 1) && "'" !== i.charAt(i.length - 1) || (i = i.substring(0, i.length - 1)), e.startsWith(i, "data:") || e.startsWith(i, "http://") || e.startsWith(i, "https://") || (i = n(i)), "url(" + i + ")"
            })
        }, e.rewriteUrls = function (t, n, r) {
            return this._replaceURL(r, function (r) {
                var o = e.joinPaths(e.pathOf(t), r);
                return e.relativePath(n, o)
            })
        }, e.rewriteOrInlineUrls = function (n, r, o, i, s, a) {
            var u = require.nodeRequire("fs"), l = require.nodeRequire("path");
            return this._replaceURL(i, function (i) {
                if (/\.(svg|png)$/.test(i)) {
                    var d = l.join(l.dirname(n), i), c = u.readFileSync(d);
                    if (c.length < a) {
                        t.cssInlinedResources = t.cssInlinedResources || [];
                        var f = d.replace(/\\/g, "/");
                        t.cssInlinedResources.indexOf(f) >= 0 && console.warn("CSS INLINING IMAGE AT " + d + " MORE THAN ONCE. CONSIDER CONSOLIDATING CSS RULES"), t.cssInlinedResources.push(f);
                        var p = /\.svg$/.test(i) ? "image/svg+xml" : "image/png", h = ";base64," + c.toString("base64");
                        if (!s && /\.svg$/.test(i)) {
                            var g = c.toString().replace(/"/g, "'").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\s+/g, " "),
                                v = "," + g;
                            v.length < h.length && (h = v)
                        }
                        return '"data:' + p + h + '"'
                    }
                }
                var y = e.joinPaths(e.pathOf(r), i);
                return e.relativePath(o, y)
            })
        }, e
    }();
    e.Utilities = i, function () {
        var e = null,
            t = "undefined" != typeof process && void 0 !== process.versions && void 0 !== process.versions.electron;
        e = "undefined" != typeof process && process.versions && process.versions.node && !t ? new r : new n, define("vs/css", new o(e))
    }()
}(CSSLoaderPlugin || (CSSLoaderPlugin = {}));
var _nlsPluginGlobal = this, NLSLoaderPlugin;
!function (e) {
    function t(e, t) {
        var n;
        return n = 0 === t.length ? e : e.replace(/\{(\d+)\}/g, function (e, n) {
            var r = n[0];
            return void 0 !== t[r] ? t[r] : e
        }), a && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n
    }

    function n(e, t) {
        var n = e[t];
        return n || ((n = e["*"]) || null)
    }

    function r(e, n) {
        for (var r = [], o = 0; o < arguments.length - 2; o++)r[o] = arguments[o + 2];
        return t(n, r)
    }

    function o(e) {
        return function (n, r) {
            var o = u.call(arguments, 2);
            return t(e[n], o)
        }
    }

    var i = _nlsPluginGlobal || {}, s = i.Plugin && i.Plugin.Resources ? i.Plugin.Resources : void 0,
        a = i && i.document && i.document.location && i.document.location.hash.indexOf("pseudo=true") >= 0,
        u = Array.prototype.slice, l = function () {
            function e() {
                this.localize = r
            }

            return e.prototype.setPseudoTranslation = function (e) {
                a = e
            }, e.prototype.create = function (e, t) {
                return {localize: o(t[e])}
            }, e.prototype.load = function (t, i, a, u) {
                if (u = u || {}, t && 0 !== t.length) {
                    var l = void 0;
                    if (s && s.getString) l = ".nls.keys", i([t + l], function (e) {
                        a({
                            localize: function (t, n) {
                                if (!e[t])return "NLS error: unknown key " + t;
                                var r = e[t].keys;
                                if (n >= r.length)return "NLS error unknow index " + n;
                                var o = r[n], i = [];
                                i[0] = t + "_" + o;
                                for (var a = 0; a < arguments.length - 2; a++)i[a + 1] = arguments[a + 2];
                                return s.getString.apply(s, i)
                            }
                        })
                    }); else if (u.isBuild) i([t + ".nls", t + ".nls.keys"], function (n, r) {
                        e.BUILD_MAP[t] = n, e.BUILD_MAP_KEYS[t] = r, a(n)
                    }); else {
                        var d = u["vs/nls"] || {}, c = d.availableLanguages ? n(d.availableLanguages, t) : null;
                        l = ".nls", null !== c && "i-default" !== c && (l = l + "." + c), i([t + l], function (e) {
                            Array.isArray(e) ? e.localize = o(e) : e.localize = o(e[t]), a(e)
                        })
                    }
                } else a({localize: r})
            }, e.prototype._getEntryPointsMap = function () {
                return i.nlsPluginEntryPoints = i.nlsPluginEntryPoints || {}, i.nlsPluginEntryPoints
            }, e.prototype.write = function (e, t, n) {
                var r = n.getEntryPoint(), o = this._getEntryPointsMap();
                o[r] = o[r] || [], o[r].push(t), t !== r && n.asModule(e + "!" + t, "define(['vs/nls', 'vs/nls!" + r + "'], function(nls, data) { return nls.create(\"" + t + '", data); });')
            }, e.prototype.writeFile = function (t, n, r, o, i) {
                var s = this._getEntryPointsMap();
                if (s.hasOwnProperty(n)) {
                    for (var a = r.toUrl(n + ".nls.js"), u = ["/*---------------------------------------------------------", " * Copyright (c) Microsoft Corporation. All rights reserved.", " *--------------------------------------------------------*/"], l = s[n], d = {}, c = 0; c < l.length; c++)d[l[c]] = e.BUILD_MAP[l[c]];
                    u.push('define("' + n + '.nls", ' + JSON.stringify(d, null, "\t") + ");"), o(a, u.join("\r\n"))
                }
            }, e.prototype.finishBuild = function (t) {
                t("nls.metadata.json", JSON.stringify({
                    keys: e.BUILD_MAP_KEYS,
                    messages: e.BUILD_MAP,
                    bundles: this._getEntryPointsMap()
                }, null, "\t"))
            }, e
        }();
    l.BUILD_MAP = {}, l.BUILD_MAP_KEYS = {}, e.NLSPlugin = l, function () {
        define("vs/nls", new l)
    }()
}(NLSLoaderPlugin || (NLSLoaderPlugin = {}));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/19222cdc84ce72202478ba1cec5cb557b71163de/core/vs\loader.js.map

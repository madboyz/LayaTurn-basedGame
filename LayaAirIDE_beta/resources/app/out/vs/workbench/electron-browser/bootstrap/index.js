/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
    EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);
const ____dispacher = new MyEmitter();
var fs = require('fs');
var path = require('path');
var electron = require('electron');
var remote = electron.remote;
var ipc = electron.ipcRenderer;
var childProcess = require("child_process");
var layaunzip = require("unzip");
var layarequest = require('request');
var windowId = remote.getCurrentWindow().id;
var layaTopClip = "60px";
var layaIDEMode = 0; //代码模式
var layaideconfig = {};
var dialogLaya = electron.remote.dialog;
var layaIDEVersion = "1.6.2beta";
var uiConfigName = ".laya";
var layawindowDebug;
var layaWindowResutl = 4;
var layaEditeVscode;
var httpserver = require("http");
function onError(e, t)
{
	t && remote.getCurrentWebContents().openDevTools(), console.error("[uncaught exception]: " + e), e.stack && console.error(e.stack)
}

function assign(e, t)
{
	return Object.keys(t).reduce(function(e, n)
	{
		return e[n] = t[n], e
	}, e)
}

function parseURLQueryArgs()
{
	const e = window.location.search || "";
	return e.split(/[?&]/).filter(function(e)
	{
		return !!e
	}).map(function(e)
	{
		return e.split("=")
	}).filter(function(e)
	{
		return 2 === e.length
	}).reduce(function(e, t)
	{
		return e[t[0]] = decodeURIComponent(t[1]), e
	},
	{})
}

function createScript(e, t)
{
	const n = document.createElement("script");
	n.src = e, n.addEventListener("load", t);
	const r = document.getElementsByTagName("head")[0];
	r.insertBefore(n, r.lastChild)
}

function uriFromPath(e)
{
	var t = path.resolve(e).replace(/\\/g, "/");
	return t.length > 0 && "/" !== t.charAt(0) && (t = "/" + t), encodeURI("file://" + t)
}

function registerListeners(e)
{
	var t;
	if (e)
	{
		const n = function(e)
			{
				return [e.ctrlKey ? "ctrl-" : "", e.metaKey ? "meta-" : "", e.altKey ? "alt-" : "", e.shiftKey ? "shift-" : "", e.keyCode].join("")
			},
			r = "darwin" === process.platform ? "meta-alt-73" : "ctrl-shift-73",
			o = "darwin" === process.platform ? "meta-82" : "ctrl-82";
		t = function(e)
		{
			const t = n(e);
			t === r ? remote.getCurrentWebContents().toggleDevTools() : t === o && remote.getCurrentWindow().reload()
		}, window.addEventListener("keydown", t)
	}
	return process.on("uncaughtException", function(t)
		{
			onError(t, e)
		}),
		function()
		{
			t && (window.removeEventListener("keydown", t), t = void 0)
		}
}

function main()
{
	const e = require("electron").webFrame,
		t = parseURLQueryArgs(),
		n = JSON.parse(t.config || "{}") ||
		{};
	assign(process.env, n.userEnv);
	var r = {
		availableLanguages:
		{}
	};
	const o = process.env.VSCODE_NLS_CONFIG;
	if (o)
	{
		process.env.VSCODE_NLS_CONFIG = o;
		try
		{
			r = JSON.parse(o)
		}
		catch (e)
		{}
	}
	var s = r.availableLanguages["*"] || "en";
	"zh-tw" === s ? s = "zh-Hant" : "zh-cn" === s && (s = "zh-Hans"), window.document.documentElement.setAttribute("lang", s);
	const a = process.env.VSCODE_DEV || !!n.extensionDevelopmentPath,
		i = registerListeners(a),
		c = n.zoomLevel;
	if (e.setZoomLevelLimits(1, 1), "number" == typeof c && 0 !== c && e.setZoomLevel(c), n.highContrast)
	{
		var l = "storage://global/workbench.theme",
			d = "hc-black vscode-theme-defaults-themes-hc_black-json";
		window.localStorage.getItem(l) !== d && (window.localStorage.setItem(l, d), window.document.body.className = "monaco-shell " + d)
	}
	const u = uriFromPath(n.appRoot) + "/out";
	createScript(u + "/vs/loader.js", function()
	{
		define("fs", ["original-fs"], function(e)
		{
			return e
		}), window.MonacoEnvironment = {};
		const e = window.MonacoEnvironment.nodeCachedDataErrors = [];
		require.config(
		{
			baseUrl: u,
			"vs/nls": r,
			recordStats: !!n.performance,
			nodeCachedDataDir: n.nodeCachedDataDir,
			onNodeCachedDataError: function(t)
			{
				e.push(t)
			},
			nodeModules: ["electron", "original-fs", "agent-base", "anymatch", "applicationinsights", "arr-diff", "arr-flatten", "array-unique", "arrify", "async-each", "balanced-match", "binary-extensions", "brace-expansion", "braces", "buffer-shims", "chokidar", "concat-map", "core-util-is", "debug", "emmet", "expand-brackets", "expand-range", "extend", "extglob", "extract-opts", "fast-plist", "fd-slicer", "filename-regex", "fill-range", "for-in", "for-own", "fsevents", "gc-signals", "getmac", "glob-base", "glob-parent", "graceful-fs", "http-proxy-agent", "https-proxy-agent", "iconv-lite", "inherits", "is-binary-path", "is-buffer", "is-dotfile", "is-equal-shallow", "is-extendable", "is-extglob", "is-glob", "is-number", "is-posix-bracket", "is-primitive", "isarray", "isobject", "kind-of", "micromatch", "minimatch", "minimist", "ms", "nan", "native-keymap", "normalize-path", "object.omit", "oniguruma", "parse-glob", "path-is-absolute", "pend", "preserve", "process-nextick-args", "node-pty", "randomatic", "readable-stream", "readdirp", "regex-cache", "repeat-element", "repeat-string", "semver", "set-immediate-shim", "string_decoder", "typechecker", "util-deprecate", "vscode-debugprotocol", "vscode-textmate", "windows-foreground-love", "windows-mutex", "winreg", "xterm", "yauzl", "vsda", "assert", "buffer", "child_process", "console", "constants", "crypto", "cluster", "dgram", "dns", "domain", "events", "freelist", "fs", "http", "https", "module", "net", "os", "path", "process", "punycode", "querystring", "readline", "repl", "stream", "string_decoder", "sys", "timers", "tls", "tty", "url", "util", "v8", "vm", "zlib"]
		}), r.pseudo && require(["vs/nls"], function(e)
		{
			e.setPseudoTranslation(r.pseudo)
		});
		const t = window.MonacoEnvironment.timers = {
			isInitialStartup: !!n.isInitialStartup,
			hasAccessibilitySupport: !!n.accessibilitySupport,
			start: new Date(n.perfStartTime),
			appReady: new Date(n.perfAppReady),
			windowLoad: new Date(n.perfWindowLoadTime),
			beforeLoadWorkbenchMain: new Date
		};
		require(["vs/workbench/electron-browser/workbench.main", "vs/nls!vs/workbench/electron-browser/workbench.main", "vs/css!vs/workbench/electron-browser/workbench.main"], function()
		{
			t.afterLoadWorkbenchMain = new Date, process.lazyEnv.then(function()
			{
				require("vs/workbench/electron-browser/main").startup(n).done(function()
				{
					i()
				}, function(e)
				{
					onError(e, a)
				})
			})
		})
	})
}
const path = require("path"),
	electron = require("electron"),
	remote = electron.remote,
	ipc = electron.ipcRenderer;
process.lazyEnv = new Promise(function(e)
{
	ipc.once("vscode:acceptShellEnv", function(t, n)
	{
		assign(process.env, n), e(process.env)
	}), ipc.send("vscode:fetchShellEnv", remote.getCurrentWindow().id)
});
////////////////////////
////改造vscode入口类
const EventEmitter = require('events');
class CodeMain extends EventEmitter {
	constructor() {
		// code
		super()
		this.version = "1.9.0";
		this.mode = "code";
		this.clipW = 0;
		this.clipH = 50;
		if(this.workspacePath)
		{
			main()
		}
	}
    get workspacePath()
    {
    	const e = require("electron").webFrame,
		t = parseURLQueryArgs(),
		n = JSON.parse(t.config || "{}") ||
		{};
		return n.workspacePath;
    }
	// methods
}
var codeMain =new CodeMain()

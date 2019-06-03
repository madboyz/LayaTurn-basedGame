/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

function stripComments(e)
{
	return e.replace(/("(?:[^\\\"]*(?:\\.)?)*")|('(?:[^\\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g, function(e, r, a, n, t)
	{
		if (n) return "";
		if (t)
		{
			var o = t.length;
			return o > 2 && "\n" === t[o - 1] ? "\r" === t[o - 2] ? "\r\n" : "\n" : ""
		}
		return e
	})
}

function getNLSConfiguration()
{
	function e(e)
	{
		for (; e;)
		{
			var r = path.join(__dirname, "vs", "code", "electron-main", "main.nls.") + e + ".js";
			if (fs.existsSync(r)) return {
				locale: s,
				availableLanguages:
				{
					"*": e
				}
			};
			var a = e.lastIndexOf("-");
			e = a > 0 ? e.substring(0, a) : null
		}
		return null
	}
	var r = args.locale;
	if (!r)
	{
		var a = app.getPath("userData"),
			n = path.join(a, "User", "locale.json");
		if (fs.existsSync(n)) try
		{
			var t = stripComments(fs.readFileSync(n, "utf8")),
				o = JSON.parse(t).locale;
			o && "string" == typeof o && (r = o)
		}
		catch (e)
		{}
	}
	var i = app.getLocale();
	if (r = r || i, "pseudo" === (r = r ? r.toLowerCase() : r)) return {
		locale: r,
		availableLanguages:
		{},
		pseudo: !0
	};
	var s = r;
	if (process.env.VSCODE_DEV) return {
		locale: r,
		availableLanguages:
		{}
	};
	if (r && ("en" == r || r.startsWith("en-"))) return {
		locale: r,
		availableLanguages:
		{}
	};
	var p = e(r);
	return !p && i && i !== r && (p = e(i)), p ||
	{
		locale: s,
		availableLanguages:
		{}
	}
}

function getNodeCachedDataDir()
{
	if (process.env.VSCODE_DEV) return Promise.resolve(void 0);
	var e = require(path.join(__dirname, "../product.json"));
	return e.commit ? mkdirp(path.join(app.getPath("userData"), "CachedData", e.commit)).then(void 0, function(e) {}) : Promise.resolve(void 0)
}

function mkdirp(e)
{
	return mkdir(e).then(null, function(r)
	{
		if (r && "ENOENT" === r.code)
		{
			var a = path.dirname(e);
			if (a !== e) return mkdirp(a).then(function()
			{
				return mkdir(e)
			})
		}
		throw r
	})
}

function mkdir(e)
{
	return new Promise(function(r, a)
	{
		fs.mkdir(e, function(n)
		{
			n && "EEXIST" !== n.code ? a(n) : r(e)
		})
	})
}
if (process.argv.indexOf("--prof-startup") >= 0)
{
	var profiler = require("v8-profiler"),
		prefix = require("crypto").randomBytes(2).toString("hex");
	process.env.VSCODE_PROFILES_PREFIX = prefix, profiler.startProfiling("main", !0)
}
process.env.LC_NUMERIC = "C", global.perfStartTime = Date.now();
var app = require("electron").app,
	fs = require("fs"),
	path = require("path"),
	minimist = require("minimist"),
	paths = require("./paths"),
	args = minimist(process.argv,
	{
		string: ["user-data-dir", "locale"]
	}),
	userData = path.resolve(args["user-data-dir"] || paths.getDefaultUserDataPath(process.platform));
app.setPath("userData", userData);
try
{
	"win32" === process.platform ? (process.env.VSCODE_CWD = process.cwd(), process.chdir(path.dirname(app.getPath("exe")))) : process.env.VSCODE_CWD && process.chdir(process.env.VSCODE_CWD)
}
catch (e)
{
	console.error(e)
}
global.macOpenFiles = [], app.on("open-file", function(e, r)
{
	global.macOpenFiles.push(r)
});
var openUrls = [],
	onOpenUrl = function(e, r)
	{
		e.preventDefault(), openUrls.push(r)
	};
app.on("will-finish-launching", function()
{
	app.on("open-url", onOpenUrl)
}), global.getOpenUrls = function()
{
	return app.removeListener("open-url", onOpenUrl), openUrls
};
var nodeCachedDataDir = getNodeCachedDataDir().then(function(e)
{
	e && (process.env["VSCODE_NODE_CACHED_DATA_DIR_" + process.pid] = e, app.commandLine.appendSwitch("--js-flags", "--nolazy"))
});
app.once("ready", function()
{
	global.perfAppReady = Date.now();
	var e = getNLSConfiguration();
	process.env.VSCODE_NLS_CONFIG = JSON.stringify(e), nodeCachedDataDir.then(function()
	{
		require("./bootstrap-amd").bootstrap("vs/code/electron-main/main")
	}, console.error)
});
app.emit("ready");
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/19222cdc84ce72202478ba1cec5cb557b71163de/core/main.js.map
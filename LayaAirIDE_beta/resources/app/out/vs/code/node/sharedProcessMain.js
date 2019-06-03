/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function()
{
	var e = ["exports", "require", "vs/base/common/winjs.base", "vs/platform/instantiation/common/instantiation", "vs/base/common/event", "vs/base/common/objects", "vs/base/common/types", "vs/base/common/errors", "vs/nls", "vs/nls!vs/code/node/sharedProcessMain", "path", "vs/base/common/platform", "vs/base/common/lifecycle", "vs/platform/platform", "vs/base/common/strings", "vs/base/common/paths", "vs/platform/configuration/common/configuration", "vs/base/common/uri", "os", "fs", "vs/base/common/arrays", "vs/platform/node/package", "vs/platform/configuration/common/configurationRegistry", "vs/platform/extensionManagement/common/extensionManagement", "vs/base/common/async", "vs/base/parts/ipc/common/ipc", "vs/base/common/map", "vs/platform/environment/common/environment", "vs/base/common/uuid", "vs/platform/message/common/message", "vs/platform/node/product", "vs/base/common/collections", "vs/platform/instantiation/common/descriptors", "vs/base/common/json", "vs/base/node/pfs", "vs/platform/instantiation/common/serviceCollection", "crypto", "vs/base/node/request", "vs/base/common/eventEmitter", "vs/base/common/severity", "vs/platform/jsonschemas/common/jsonContributionRegistry", "vs/base/common/assert", "vs/platform/request/node/request", "vs/platform/storage/common/storage", "vs/platform/telemetry/common/telemetry", "vs/platform/telemetry/common/telemetryUtils", "vs/platform/windows/common/windows", "vs/platform/workspace/common/workspace", "vs/platform/telemetry/common/telemetryService", "vs/nls!vs/base/common/json", "vs/base/common/decorators", "vs/base/common/events", "vs/platform/request/node/requestService", "vs/base/node/config", "vs/nls!vs/base/common/severity", "vs/base/common/actions", "vs/nls!vs/base/node/zip", "vs/nls!vs/platform/configuration/common/configurationRegistry", "vs/base/common/callbackList", "vs/nls!vs/platform/extensionManagement/node/extensionGalleryService", "vs/nls!vs/platform/extensionManagement/node/extensionManagementService", "vs/nls!vs/platform/extensions/common/extensionsRegistry", "vs/nls!vs/platform/extensions/node/extensionValidator", "vs/nls!vs/platform/message/common/message", "vs/nls!vs/platform/request/node/request", "vs/nls!vs/platform/telemetry/common/telemetryService", "vs/platform/extensionManagement/common/extensionManagementIpc", "vs/platform/extensionManagement/common/extensionNls", "vs/platform/extensionManagement/common/extensionTelemetry", "vs/platform/extensions/node/extensionValidator", "semver", "vs/base/node/event", "vs/base/node/flow", "vs/platform/extensionManagement/node/extensionGalleryService", "vs/base/node/extfs", "vs/base/common/set", "vs/base/common/cancellation", "vs/platform/instantiation/common/instantiationService", "vs/platform/keybinding/common/keybinding", "vs/platform/lifecycle/common/lifecycle", "vs/base/node/id", "vs/platform/message/common/messageIpc", "vs/base/common/functional", "vs/platform/environment/node/http", "vs/base/common/graph", "vs/platform/environment/node/environmentService", "vs/base/common/mime", "vs/base/node/paths", "vs/platform/extensions/common/extensionsRegistry", "vs/nls!vs/platform/extensionManagement/common/extensionManagement", "vs/platform/configuration/common/model", "vs/platform/configuration/node/configurationService", "vs/base/node/proxy", "url", "vs/platform/extensionManagement/node/extensionManagementService", "vs/platform/telemetry/common/telemetryIpc", "vs/platform/telemetry/node/appInsightsAppender", "vs/base/node/zip", "vs/platform/telemetry/node/commonProperties", "vs/base/common/glob", "vs/code/common/windows", "vs/platform/windows/common/windowsIpc", "vs/base/parts/ipc/node/ipc.net", "vs/platform/storage/common/storageService", "https", "applicationinsights", "https-proxy-agent", "yauzl", "http-proxy-agent", "getmac", "net", "http", "zlib", "assert", "vs/base/common/winjs.base.raw", "vs/code/node/sharedProcessMain"],
		t = function(t)
		{
			for (var n = [], r = 0, i = t.length; r < i; r++) n[r] = e[t[r]];
			return n
		};
	define(e[20], t([1, 0]), function(e, t)
	{
		"use strict";

		function n(e, t)
		{
			return void 0 === t && (t = 0), e[e.length - (1 + t)]
		}

		function r(e, t, n)
		{
			if (void 0 === n && (n = function(e, t)
				{
					return e === t
				}), e.length !== t.length) return !1;
			for (var r = 0, i = e.length; r < i; r++)
				if (!n(e[r], t[r])) return !1;
			return !0
		}

		function i(e, t, n)
		{
			for (var r = 0, i = e.length - 1; r <= i;)
			{
				var o = (r + i) / 2 | 0,
					s = n(e[o], t);
				if (s < 0) r = o + 1;
				else
				{
					if (!(s > 0)) return o;
					i = o - 1
				}
			}
			return -(r + 1)
		}

		function o(e, t)
		{
			var n = 0,
				r = e.length;
			if (0 === r) return 0;
			for (; n < r;)
			{
				var i = Math.floor((n + r) / 2);
				t(e[i]) ? r = i : n = i + 1
			}
			return n
		}

		function s(e, t, n)
		{
			if (0 === n) return [];
			for (var r = e.slice(0, n).sort(t), i = function(i, s)
				{
					var a = e[i];
					if (t(a, r[n - 1]) < 0)
					{
						r.pop();
						var u = o(r, function(e)
						{
							return t(a, e) < 0
						});
						r.splice(u, 0, a)
					}
				}, s = n, a = e.length; s < a; s++) i(s, a);
			return r
		}

		function a(e)
		{
			return e ? e.filter(function(e)
			{
				return !!e
			}) : e
		}

		function u(e, t, n)
		{
			e.splice(n, 0, e.splice(t, 1)[0])
		}

		function c(e)
		{
			return !Array.isArray(e) || 0 === e.length
		}

		function l(e, t)
		{
			if (!t) return e.filter(function(t, n)
			{
				return e.indexOf(t) === n
			});
			var n = Object.create(null);
			return e.filter(function(e)
			{
				var r = t(e);
				return !n[r] && (n[r] = !0, !0)
			})
		}

		function f(e)
		{
			var t = Object.create(null);
			return function(n)
			{
				var r = e(n);
				return !t[r] && (t[r] = !0, !0)
			}
		}

		function p(e, t)
		{
			for (var n = 0; n < e.length; n++)
			{
				var r = e[n];
				if (t(r)) return n
			}
			return -1
		}

		function h(e, t, n)
		{
			void 0 === n && (n = null);
			var r = p(e, t);
			return r < 0 ? n : e[r]
		}

		function d(e, t, n)
		{
			void 0 === n && (n = function(e, t)
			{
				return e === t
			});
			for (var r = 0, i = 0, o = Math.min(e.length, t.length); i < o && n(e[i], t[i]); i++) r++;
			return r
		}

		function m(e)
		{
			return e.reduce(function(e, t)
			{
				return e.concat(t)
			}, [])
		}

		function v(e, t)
		{
			void 0 === t && (t = 0);
			for (var n = [], r = t; r < e; r++) n.push(r);
			return n
		}

		function g(e, t, n)
		{
			void 0 === n && (n = []);
			for (var r = 0; r < e; r++) n[r] = t();
			return n
		}

		function y(e, t, n)
		{
			return void 0 === n && (n = function(e)
			{
				return e
			}), e.reduce(function(e, r)
			{
				var i = t(r);
				return e[i] = n(r, e[i]), e
			}, Object.create(null))
		}

		function b(e, t)
		{
			return e.push(t),
				function()
				{
					var n = e.indexOf(t);
					n > -1 && e.splice(n, 1)
				}
		}
		t.tail = n, t.equals = r, t.binarySearch = i, t.findFirst = o, t.top = s, t.coalesce = a, t.move = u, t.isFalsyOrEmpty = c, t.distinct = l, t.uniqueFilter = f, t.firstIndex = p, t.first = h, t.commonPrefixLength = d, t.flatten = m, t.range = v, t.fill = g, t.index = y, t.insert = b
	}), define(e[41], t([1, 0]), function(e, t)
	{
		"use strict";

		function n(e, t)
		{
			if (!e || null === e) throw new Error(t ? "Assertion failed (" + t + ")" : "Assertion Failed")
		}
		t.ok = n
	}), define(e[31], t([1, 0]), function(e, t)
	{
		"use strict";

		function n(e)
		{
			var t = [];
			for (var n in e) s.call(e, n) && t.push(e[n]);
			return t
		}

		function r(e, t)
		{
			for (var n in e)
				if (s.call(e, n))
				{
					var r = t(
					{
						key: n,
						value: e[n]
					}, function()
					{
						delete e[n]
					});
					if (r === !1) return
				}
		}

		function i(e, t)
		{
			return !!s.call(e, t) && (delete e[t], !0)
		}

		function o(e, t)
		{
			for (var n = Object.create(null), r = 0, i = e; r < i.length; r++)
			{
				var o = i[r],
					s = t(o),
					a = n[s];
				a || (a = n[s] = []), a.push(o)
			}
			return n
		}
		var s = Object.prototype.hasOwnProperty;
		t.values = n, t.forEach = r, t.remove = i, t.groupBy = o
	}), define(e[50], t([1, 0]), function(e, t)
	{
		"use strict";

		function n(e, t, n)
		{
			var r = null,
				i = null;
			if ("function" == typeof n.value ? (r = "value", i = n.value) : "function" == typeof n.get && (r = "get", i = n.get), !i) throw new Error("not supported");
			var o = "$memoize$" + t;
			n[r] = function()
			{
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				return this.hasOwnProperty(o) || Object.defineProperty(this, o,
				{
					configurable: !1,
					enumerable: !1,
					writable: !1,
					value: i.apply(this, e)
				}), this[o]
			}
		}
		t.memoize = n
	});
	var n = this && this.__extends || function(e, t)
	{
		function n()
		{
			this.constructor = e
		}
		for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
		e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
	};
	define(e[51], t([1, 0]), function(e, t)
		{
			"use strict";
			var r = function()
			{
				function e(e)
				{
					this.time = (new Date).getTime(), this.originalEvent = e, this.source = null
				}
				return e
			}();
			t.Event = r;
			var i = function(e)
			{
				function t(t, n, r, i)
				{
					var o = e.call(this, i) || this;
					return o.key = t, o.oldValue = n, o.newValue = r, o
				}
				return n(t, e), t
			}(r);
			t.PropertyChangeEvent = i;
			var o = function(e)
			{
				function t(t, n)
				{
					var r = e.call(this, n) || this;
					return r.element = t, r
				}
				return n(t, e), t
			}(r);
			t.ViewerEvent = o, t.EventType = {
				PROPERTY_CHANGED: "propertyChanged",
				SELECTION: "selection",
				FOCUS: "focus",
				BLUR: "blur",
				HIGHLIGHT: "highlight",
				EXPAND: "expand",
				COLLAPSE: "collapse",
				TOGGLE: "toggle",
				BEFORE_RUN: "beforeRun",
				RUN: "run",
				EDIT: "edit",
				SAVE: "save",
				CANCEL: "cancel",
				CHANGE: "change",
				DISPOSE: "dispose"
			}
		}), define(e[82], t([1, 0]), function(e, t)
		{
			"use strict";

			function n(e)
			{
				return function()
				{
					for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
					return !e.apply(void 0, t)
				}
			}

			function r(e)
			{
				var t, n = this,
					r = !1;
				return function()
				{
					return r ? t : (r = !0, t = e.apply(n, arguments))
				}
			}
			t.not = n, t.once = r
		}), define(e[12], t([1, 0]), function(e, t)
		{
			"use strict";

			function r(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				return Array.isArray(e) ? (e.forEach(function(e)
				{
					return e && e.dispose()
				}), []) : 0 !== t.length ? (r(e), r(t), []) : e ? (e.dispose(), e) : void 0
			}

			function i(e)
			{
				return {
					dispose: function()
					{
						return r(e)
					}
				}
			}

			function o()
			{
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				return i(e.map(function(e)
				{
					return {
						dispose: e
					}
				}))
			}
			t.empty = Object.freeze(
			{
				dispose: function() {}
			}), t.dispose = r, t.combinedDisposable = i, t.toDisposable = o;
			var s = function()
			{
				function e()
				{
					this._toDispose = []
				}
				return e.prototype.dispose = function()
				{
					this._toDispose = r(this._toDispose)
				}, e.prototype._register = function(e)
				{
					return this._toDispose.push(e), e
				}, e
			}();
			t.Disposable = s;
			var a = function(e)
			{
				function t()
				{
					return null !== e && e.apply(this, arguments) || this
				}
				return n(t, e), t.prototype.add = function(e)
				{
					if (!Array.isArray(e)) return this._register(e);
					for (var t = 0, n = e; t < n.length; t++)
					{
						var r = n[t];
						return this._register(r)
					}
				}, t
			}(s);
			t.Disposables = a;
			var u = function()
			{
				function e()
				{}
				return Object.defineProperty(e.prototype, "value",
				{
					set: function(e)
					{
						this._value && this._value.dispose(), this._value = e
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.dispose = function()
				{
					this.value = null
				}, e
			}();
			t.OneDisposable = u;
			var c = function()
			{
				function e()
				{
					this.references = Object.create(null)
				}
				return e.prototype.acquire = function(e)
				{
					var t = this,
						n = this.references[e];
					n || (n = this.references[e] = {
						counter: 0,
						object: this.createReferencedObject(e)
					});
					var r = n.object,
						i = function()
						{
							0 === --n.counter && (t.destroyReferencedObject(n.object), delete t.references[e])
						};
					return n.counter++,
					{
						object: r,
						dispose: i
					}
				}, e
			}();
			t.ReferenceCollection = c;
			var l = function()
			{
				function e(e)
				{
					this.object = e
				}
				return e.prototype.dispose = function() {}, e
			}();
			t.ImmortalReference = l
		}), define(e[26], t([1, 0]), function(e, t)
		{
			"use strict";
			var r = function()
			{
				function e()
				{
					this.map = Object.create(null), this._size = 0
				}
				return Object.defineProperty(e.prototype, "size",
				{
					get: function()
					{
						return this._size
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.get = function(e)
				{
					var t = this.peek(e);
					return t ? t : null
				}, e.prototype.getOrSet = function(e, t)
				{
					var n = this.get(e);
					return n ? n : (this.set(e, t), t)
				}, e.prototype.keys = function()
				{
					var e = [];
					for (var t in this.map) e.push(this.map[t].key);
					return e
				}, e.prototype.values = function()
				{
					var e = [];
					for (var t in this.map) e.push(this.map[t].value);
					return e
				}, e.prototype.entries = function()
				{
					var e = [];
					for (var t in this.map) e.push(this.map[t]);
					return e
				}, e.prototype.set = function(e, t)
				{
					return !this.get(e) && (this.push(e, t), !0)
				}, e.prototype.delete = function(e)
				{
					var t = this.get(e);
					return t ? (this.pop(e), t) : null
				}, e.prototype.has = function(e)
				{
					return !!this.get(e)
				}, e.prototype.clear = function()
				{
					this.map = Object.create(null), this._size = 0
				}, e.prototype.push = function(e, t)
				{
					var n = {
						key: e,
						value: t
					};
					this.map[e.toString()] = n, this._size++
				}, e.prototype.pop = function(e)
				{
					delete this.map[e.toString()], this._size--
				}, e.prototype.peek = function(e)
				{
					var t = this.map[e.toString()];
					return t ? t.value : null
				}, e
			}();
			t.LinkedMap = r;
			var i = function()
			{
				function e(e, t)
				{
					void 0 === e && (e = Number.MAX_VALUE), void 0 === t && (t = 1), this.limit = e, this.map = Object.create(null), this._size = 0, this.ratio = e * t
				}
				return Object.defineProperty(e.prototype, "size",
				{
					get: function()
					{
						return this._size
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.set = function(e, t)
				{
					if (this.map[e]) return !1;
					var n = {
						key: e,
						value: t
					};
					return this.push(n), this._size > this.limit && this.trim(), !0
				}, e.prototype.get = function(e)
				{
					var t = this.map[e];
					return t ? t.value : null
				}, e.prototype.getOrSet = function(e, t)
				{
					var n = this.get(e);
					return n ? n : (this.set(e, t), t)
				}, e.prototype.delete = function(e)
				{
					var t = this.map[e];
					return t ? (this.map[e] = void 0, this._size--, t.next ? t.next.prev = t.prev : this.head = t.prev, t.prev ? t.prev.next = t.next : this.tail = t.next, t.value) : null
				}, e.prototype.has = function(e)
				{
					return !!this.map[e]
				}, e.prototype.clear = function()
				{
					this.map = Object.create(null), this._size = 0, this.head = null, this.tail = null
				}, e.prototype.push = function(e)
				{
					this.head && (e.prev = this.head, this.head.next = e), this.tail || (this.tail = e), this.head = e, this.map[e.key] = e, this._size++
				}, e.prototype.trim = function()
				{
					if (this.tail)
						if (this.ratio < this.limit)
							for (var e = 0, t = this.tail; t.next;)
							{
								if (this.map[t.key] = void 0, this._size--, e === this.ratio)
								{
									this.tail = t.next, this.tail.prev = null;
									break
								}
								t = t.next, e++
							}
						else this.map[this.tail.key] = void 0, this._size--, this.tail = this.tail.next, this.tail.prev = null
				}, e
			}();
			t.BoundedLinkedMap = i;
			var o = function(e)
			{
				function t(t)
				{
					return e.call(this, t) || this
				}
				return n(t, e), t.prototype.get = function(e)
				{
					var t = this.map[e];
					return t ? (this.delete(e), this.push(t), t.value) : null
				}, t
			}(i);
			t.LRUCache = o;
			var s = function()
				{
					function e()
					{
						this.children = new Map
					}
					return e
				}(),
				a = function()
				{
					function e(e)
					{
						this._root = new s, this._splitter = e
					}
					return e.prototype.insert = function(e, t)
					{
						for (var n = this._splitter(e), r = 0, i = this._root; r < n.length; r++)
						{
							var o = i.children[n[r]];
							{
								if (!o) break;
								i = o
							}
						}
						for (var a; r < n.length; r++) a = new s, i.children[n[r]] = a, i = a;
						i.element = t
					}, e.prototype.lookUp = function(e)
					{
						for (var t, n = this._splitter(e), r = this._root.children, i = 0, o = n; i < o.length; i++)
						{
							var s = o[i];
							if (t = r[s], !t) return;
							r = t.children
						}
						return t.element
					}, e.prototype.findSubstr = function(e)
					{
						for (var t, n = this._splitter(e), r = this._root.children, i = 0, o = n; i < o.length; i++)
						{
							var s = o[i],
								a = r[s];
							if (!a) break;
							a.element && (t = a), r = a.children
						}
						if (t) return t.element
					}, e.prototype.findSuperstr = function(t)
					{
						for (var n, r = this._splitter(t), i = this._root.children, o = 0, s = r; o < s.length; o++)
						{
							var a = s[o];
							if (n = i[a], !n) return;
							i = n.children
						}
						var u = new e(this._splitter);
						return u._root = n, u
					}, e
				}();
			a.PathSplitter = function(e)
			{
				return e.split(/[\\/]/).filter(function(e)
				{
					return !!e
				})
			}, t.TrieMap = a
		}), define(e[11], t([1, 0]), function(e, t)
		{
			"use strict";

			function n()
			{
				return "undefined" != typeof g.Worker
			}
			var r = !1,
				i = !1,
				o = !1,
				s = !1,
				a = !1,
				u = !1,
				c = !1,
				l = void 0,
				f = void 0;
			if (t.LANGUAGE_DEFAULT = "en", "object" == typeof process)
			{
				r = "win32" === process.platform, i = "darwin" === process.platform, o = "linux" === process.platform, s = !r && 0 === process.getuid();
				var p = process.env.VSCODE_NLS_CONFIG;
				if (p) try
				{
					var h = JSON.parse(p),
						d = h.availableLanguages["*"];
					l = h.locale, f = d ? d : t.LANGUAGE_DEFAULT
				}
				catch (e)
				{}
				a = !0
			}
			else if ("object" == typeof navigator)
			{
				var m = navigator.userAgent;
				r = m.indexOf("Windows") >= 0, i = m.indexOf("Macintosh") >= 0, o = m.indexOf("Linux") >= 0, u = !0, l = navigator.language, f = l, c = !!self.QUnit
			}
			var v;
			! function(e)
			{
				e[e.Web = 0] = "Web", e[e.Mac = 1] = "Mac", e[e.Linux = 2] = "Linux", e[e.Windows = 3] = "Windows"
			}(v = t.Platform || (t.Platform = {})), t._platform = v.Web, a && (i ? t._platform = v.Mac : r ? t._platform = v.Windows : o && (t._platform = v.Linux)), t.isWindows = r, t.isMacintosh = i, t.isLinux = o, t.isRootUser = s, t.isNative = a, t.isWeb = u, t.isQunit = c, t.platform = t._platform, t.language = f, t.locale = l;
			var g = "object" == typeof self ? self : global;
			t.globals = g, t.hasWebWorkerSupport = n, t.setTimeout = g.setTimeout.bind(g), t.clearTimeout = g.clearTimeout.bind(g), t.setInterval = g.setInterval.bind(g), t.clearInterval = g.clearInterval.bind(g)
		}), define(e[75], t([1, 0]), function(e, t)
		{
			"use strict";
			var n = function()
			{
				function e(e)
				{
					void 0 === e && (e = []), this._elements = e.slice()
				}
				return Object.defineProperty(e.prototype, "size",
				{
					get: function()
					{
						return this._elements.length
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.set = function(e)
				{
					this.unset(e), this._elements.push(e)
				}, e.prototype.contains = function(e)
				{
					return this._elements.indexOf(e) > -1
				}, e.prototype.unset = function(e)
				{
					var t = this._elements.indexOf(e);
					t > -1 && this._elements.splice(t, 1)
				}, Object.defineProperty(e.prototype, "elements",
				{
					get: function()
					{
						return this._elements.slice()
					},
					enumerable: !0,
					configurable: !0
				}), e
			}();
			t.ArraySet = n
		}), define(e[14], t([1, 0, 26]), function(e, t, n)
		{
			"use strict";

			function r(e)
			{
				return !e || "string" != typeof e || 0 === e.trim().length
			}

			function i(e, t, n)
			{
				void 0 === n && (n = "0");
				for (var r = "" + e, i = [r], o = r.length; o < t; o++) i.push(n);
				return i.reverse().join("")
			}

			function o(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				return 0 === t.length ? e : e.replace(M, function(e, n)
				{
					var r = parseInt(n, 10);
					return isNaN(r) || r < 0 || r >= t.length ? e : t[r]
				})
			}

			function s(e)
			{
				return e.replace(/[<|>|&]/g, function(e)
				{
					switch (e)
					{
						case "<":
							return "&lt;";
						case ">":
							return "&gt;";
						case "&":
							return "&amp;";
						default:
							return e
					}
				})
			}

			function a(e)
			{
				return e.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&")
			}

			function u(e, t)
			{
				void 0 === t && (t = " ");
				var n = c(e, t);
				return l(n, t)
			}

			function c(e, t)
			{
				if (!e || !t) return e;
				var n = t.length;
				if (0 === n || 0 === e.length) return e;
				for (var r = 0, i = -1;
					(i = e.indexOf(t, r)) === r;) r += n;
				return e.substring(r)
			}

			function l(e, t)
			{
				if (!e || !t) return e;
				var n = t.length,
					r = e.length;
				if (0 === n || 0 === r) return e;
				for (var i = r, o = -1;;)
				{
					if (o = e.lastIndexOf(t, i - 1), o === -1 || o + n !== i) break;
					if (0 === o) return "";
					i = o
				}
				return e.substring(0, i)
			}

			function f(e)
			{
				return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*")
			}

			function p(e)
			{
				return e.replace(/\*/g, "")
			}

			function h(e, t)
			{
				if (e.length < t.length) return !1;
				for (var n = 0; n < t.length; n++)
					if (e[n] !== t[n]) return !1;
				return !0
			}

			function d(e, t)
			{
				var n = e.length - t.length;
				return n > 0 ? e.indexOf(t, n) === n : 0 === n && e === t
			}

			function m(e, t, n)
			{
				void 0 === n && (n = 0);
				var r = e.indexOf(t, n);
				return r < 0 && (n > 0 && (e = e.substr(n)), t = a(t), r = e.search(new RegExp(t, "i"))), r
			}

			function v(e, t, n)
			{
				if (void 0 === n && (n = {}), "" === e) throw new Error("Cannot create regex from empty string");
				t || (e = e.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&")), n.wholeWord && (/\B/.test(e.charAt(0)) || (e = "\\b" + e), /\B/.test(e.charAt(e.length - 1)) || (e += "\\b"));
				var r = "";
				return n.global && (r += "g"), n.matchCase || (r += "i"), n.multiline && (r += "m"), new RegExp(e, r)
			}

			function g(e)
			{
				if ("^" === e.source || "^$" === e.source || "$" === e.source) return !1;
				var t = e.exec("");
				return t && 0 === e.lastIndex
			}

			function y(e)
			{
				if (!t.canNormalize || !e) return e;
				var n = q.get(e);
				if (n) return n;
				var r;
				return r = z.test(e) ? e.normalize("NFC") : e, q.set(e, r), r
			}

			function b(e)
			{
				for (var t = 0, n = e.length; t < n; t++)
				{
					var r = e.charCodeAt(t);
					if (32 !== r && 9 !== r) return t
				}
				return -1
			}

			function _(e)
			{
				for (var t = 0, n = e.length; t < n; t++)
				{
					var r = e.charCodeAt(t);
					if (32 !== r && 9 !== r) return e.substring(0, t)
				}
				return e
			}

			function E(e, t)
			{
				void 0 === t && (t = e.length - 1);
				for (var n = t; n >= 0; n--)
				{
					var r = e.charCodeAt(n);
					if (32 !== r && 9 !== r) return n
				}
				return -1
			}

			function w(e, t)
			{
				return e < t ? -1 : e > t ? 1 : 0
			}

			function C(e, t)
			{
				for (var n = Math.min(e.length, t.length), r = 0; r < n; r++)
				{
					var i = e.charCodeAt(r),
						o = t.charCodeAt(r);
					if (i !== o)
					{
						var s = i - o;
						if (32 !== s && s !== -32 || !S(i) || !S(o)) return w(e[r].toLowerCase(), t[r].toLowerCase())
					}
				}
				return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
			}

			function S(e)
			{
				return e >= 97 && e <= 122 || e >= 65 && e <= 90
			}

			function x(e, t)
			{
				var n = e.length,
					r = t.length;
				if (n !== r) return !1;
				for (var i = 0; i < n; i++)
				{
					var o = e.charCodeAt(i),
						s = t.charCodeAt(i);
					if (o !== s)
						if (S(o) && S(s))
						{
							var a = Math.abs(o - s);
							if (0 !== a && 32 !== a) return !1
						}
						else if (String.fromCharCode(o).toLocaleLowerCase() !== String.fromCharCode(s).toLocaleLowerCase()) return !1
				}
				return !0
			}

			function P(e, t)
			{
				var n, r = Math.min(e.length, t.length);
				for (n = 0; n < r; n++)
					if (e.charCodeAt(n) !== t.charCodeAt(n)) return n;
				return r
			}

			function O(e, t)
			{
				var n, r = Math.min(e.length, t.length),
					i = e.length - 1,
					o = t.length - 1;
				for (n = 0; n < r; n++)
					if (e.charCodeAt(i - n) !== t.charCodeAt(o - n)) return n;
				return r
			}

			function k(e)
			{
				return 55296 <= e && e <= 56319
			}

			function I(e)
			{
				return 56320 <= e && e <= 57343
			}

			function T(e)
			{
				return V.test(e)
			}

			function D(e)
			{
				return H.test(e)
			}

			function A(e)
			{
				return e = +e, e >= 11904 && e <= 55215 || e >= 63744 && e <= 64255 || e >= 65281 && e <= 65374
			}

			function j(e, t, n)
			{
				void 0 === n && (n = 4);
				var r = Math.abs(e.length - t.length);
				if (r > n) return 0;
				var i, o, s = [],
					a = [];
				for (i = 0; i < t.length + 1; ++i) a.push(0);
				for (i = 0; i < e.length + 1; ++i) s.push(a);
				for (i = 1; i < e.length + 1; ++i)
					for (o = 1; o < t.length + 1; ++o) e[i - 1] === t[o - 1] ? s[i][o] = s[i - 1][o - 1] + 1 : s[i][o] = Math.max(s[i - 1][o], s[i][o - 1]);
				return s[e.length][t.length] - Math.sqrt(r)
			}

			function L(e)
			{
				for (var t, n = /\r\n|\r|\n/g, r = [0]; t = n.exec(e);) r.push(n.lastIndex);
				return r
			}

			function N(e, n)
			{
				if (e.length < n) return e;
				for (var r = e.split(/\b/), i = 0, o = r.length - 1; o >= 0; o--)
					if (i += r[o].length, i > n)
					{
						r.splice(0, o);
						break
					}
				return r.join(t.empty).replace(/^\s/, t.empty)
			}

			function R(e)
			{
				return e && (e = e.replace(G, ""), e = e.replace(J, ""), e = e.replace(K, "")), e
			}

			function F(e)
			{
				return e && e.length > 0 && 65279 === e.charCodeAt(0)
			}

			function U(e, t, n)
			{
				var r = e.length + t.length;
				return r > n && (e = "..." + e.substr(r - n)), e += t.length > n ? t.substr(t.length - n) : t
			}

			function W(e)
			{
				return btoa(encodeURIComponent(e))
			}

			function B(e, t)
			{
				for (var n = "", r = 0; r < t; r++) n += e;
				return n
			}
			t.empty = "", t.isFalsyOrWhitespace = r, t.pad = i;
			var M = /{(\d+)}/g;
			t.format = o, t.escape = s, t.escapeRegExpCharacters = a, t.trim = u, t.ltrim = c, t.rtrim = l, t.convertSimple2RegExpPattern = f, t.stripWildcards = p, t.startsWith = h, t.endsWith = d, t.indexOfIgnoreCase = m, t.createRegExp = v, t.regExpLeadsToEndlessLoop = g, t.canNormalize = "function" == typeof "".normalize;
			var z = /[^\u0000-\u0080]/,
				q = new n.BoundedLinkedMap(1e4);
			t.normalizeNFC = y, t.firstNonWhitespaceIndex = b, t.getLeadingWhitespace = _, t.lastNonWhitespaceIndex = E, t.compare = w, t.compareIgnoreCase = C, t.equalsIgnoreCase = x, t.commonPrefixLength = P, t.commonSuffixLength = O, t.isHighSurrogate = k, t.isLowSurrogate = I;
			var V = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
			t.containsRTL = T;
			var H = /^[\t\n\r\x20-\x7E]*$/;
			t.isBasicASCII = D, t.isFullWidthCharacter = A, t.difference = j, t.computeLineStarts = L, t.lcut = N;
			var G = /\x1B\x5B[12]?K/g,
				J = /\x1b\[\d+m/g,
				K = /\x1b\[0?m/g;
			t.removeAnsiEscapeCodes = R, t.UTF8_BOM_CHARACTER = String.fromCharCode(65279), t.startsWithUTF8BOM = F, t.appendWithLimit = U, t.safeBtoa = W, t.repeat = B
		}), define(e[15], t([1, 0, 11, 20, 14]), function(e, t, n, r, i)
		{
			"use strict";

			function o(e, o)
			{
				for (var s = i.rtrim(l(e), t.sep), a = i.rtrim(l(o), t.sep), u = n.isLinux ? s : s.toLowerCase(), c = n.isLinux ? a : a.toLowerCase(), f = u.split(t.sep), p = c.split(t.sep), h = 0, d = Math.min(f.length, p.length); h < d && f[h] === p[h]; h++);
				var m = r.fill(f.length - h, function()
				{
					return ".."
				}).concat(a.split(t.sep).slice(h));
				return m.join(t.sep)
			}

			function s(e)
			{
				var t = ~e.lastIndexOf("/") || ~e.lastIndexOf("\\");
				return 0 === t ? "." : 0 === ~t ? e[0] : e.substring(0, ~t)
			}

			function a(e)
			{
				var t = ~e.lastIndexOf("/") || ~e.lastIndexOf("\\");
				return 0 === t ? e : ~t === e.length - 1 ? a(e.substring(0, e.length - 1)) : e.substr(~t + 1)
			}

			function u(e)
			{
				e = a(e);
				var t = ~e.lastIndexOf(".");
				return t ? e.substring(~t) : ""
			}

			function c(e, t)
			{
				return t ? !_.test(e) : !b.test(e)
			}

			function l(e, t)
			{
				if (null === e || void 0 === e) return e;
				var r = e.length;
				if (0 === r) return ".";
				var i = n.isWindows && t;
				if (c(e, i)) return e;
				for (var o = i ? "\\" : "/", s = p(e, o), a = s.length, u = !1, l = "", h = s.length; h <= r; h++)
					if (h === r || 47 === e.charCodeAt(h) || 92 === e.charCodeAt(h))
					{
						if (f(e, a, h, ".."))
						{
							var d = l.lastIndexOf(o),
								m = l.slice(d + 1);
							(s || m.length > 0) && ".." !== m && (l = d === -1 ? "" : l.slice(0, d), u = !0)
						}
						else f(e, a, h, ".") && (s || l || h < r - 1) && (u = !0);
						if (!u)
						{
							var v = e.slice(a, h);
							"" !== l && l[l.length - 1] !== o && (l += o), l += v
						}
						a = h + 1, u = !1
					}
				return s + l
			}

			function f(e, t, n, r)
			{
				return t + r.length === n && e.indexOf(r, t) === t
			}

			function p(e, t)
			{
				if (void 0 === t && (t = "/"), !e) return "";
				var n = e.length,
					r = e.charCodeAt(0);
				if (47 === r || 92 === r)
				{
					if (r = e.charCodeAt(1), (47 === r || 92 === r) && (r = e.charCodeAt(2), 47 !== r && 92 !== r))
					{
						for (var i = 3, o = i; i < n && (r = e.charCodeAt(i), 47 !== r && 92 !== r); i++);
						if (r = e.charCodeAt(i + 1), o !== i && 47 !== r && 92 !== r)
							for (i += 1; i < n; i++)
								if (r = e.charCodeAt(i), 47 === r || 92 === r) return e.slice(0, i + 1).replace(/[\\/]/g, t)
					}
					return t
				}
				if ((r >= 65 && r <= 90 || r >= 97 && r <= 122) && 58 === e.charCodeAt(1)) return r = e.charCodeAt(2), 47 === r || 92 === r ? e.slice(0, 2) + t : e.slice(0, 2);
				var s = e.indexOf("://");
				if (s !== -1)
					for (s += 3; s < n; s++)
						if (r = e.charCodeAt(s), 47 === r || 92 === r) return e.slice(0, s + 1);
				return ""
			}

			function h(e)
			{
				if (!n.isWindows) return !1;
				if (!e || e.length < 5) return !1;
				var t = e.charCodeAt(0);
				if (92 !== t) return !1;
				if (t = e.charCodeAt(1), 92 !== t) return !1;
				for (var r = 2, i = r; r < e.length && (t = e.charCodeAt(r), 92 !== t); r++);
				return i !== r && (t = e.charCodeAt(r + 1), !isNaN(t) && 92 !== t)
			}

			function d(e)
			{
				return e && "/" === e[0]
			}

			function m(e)
			{
				return d(l(e)) ? e : t.sep + e
			}

			function v(e, t)
			{
				if (e === t) return !0;
				e = l(e), t = l(t);
				var r = t.length,
					i = t.charCodeAt(r - 1);
				if (47 === i && (t = t.substring(0, r - 1), r -= 1), e === t) return !0;
				if (n.isLinux || (e = e.toLowerCase(), t = t.toLowerCase()), e === t) return !0;
				if (0 !== e.indexOf(t)) return !1;
				var o = e.charCodeAt(r);
				return 47 === o
			}

			function g(e)
			{
				return !(!e || 0 === e.length || /^\s+$/.test(e)) && (E.lastIndex = 0, !E.test(e) && ((!n.isWindows || !w.test(e)) && ("." !== e && ".." !== e && ((!n.isWindows || "." !== e[e.length - 1]) && (!n.isWindows || e.length === e.trim().length)))))
			}

			function y(e)
			{
				return t.isAbsoluteRegex.test(e)
			}
			t.sep = "/", t.nativeSep = n.isWindows ? "\\" : "/", t.relative = o, t.dirname = s, t.basename = a, t.extname = u;
			var b = /(\/\.\.?\/)|(\/\.\.?)$|^(\.\.?\/)|(\/\/+)|(\\)/,
				_ = /(\\\.\.?\\)|(\\\.\.?)$|^(\.\.?\\)|(\\\\+)|(\/)/;
			t.normalize = l, t.getRoot = p, t.join = function()
			{
				for (var e = "", n = 0; n < arguments.length; n++)
				{
					var r = arguments[n];
					if (n > 0)
					{
						var i = e.charCodeAt(e.length - 1);
						if (47 !== i && 92 !== i)
						{
							var o = r.charCodeAt(0);
							47 !== o && 92 !== o && (e += t.sep)
						}
					}
					e += r
				}
				return l(e)
			}, t.isUNC = h, t.makePosixAbsolute = m, t.isEqualOrParent = v;
			var E = n.isWindows ? /[\\/:\*\?"<>\|]/g : /[\\/]/g,
				w = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])$/i;
			t.isValidBasename = g, t.isAbsoluteRegex = /^((\/|[a-zA-Z]:\\)[^\(\)<>\\'\"\[\]]+)/, t.isAbsolute = y
		}), define(e[99], t([1, 0, 20, 14, 15, 26]), function(e, t, n, r, i, o)
		{
			"use strict";

			function s(e)
			{
				switch (e)
				{
					case 0:
						return "";
					case 1:
						return C + "*?";
					default:
						return "(?:" + w + "|" + C + "+" + w + "|" + w + C + "+)*?"
				}
			}

			function a(e, t)
			{
				if (!e) return [];
				for (var n, r = [], i = !1, o = !1, s = "", a = 0; a < e.length; a++)
				{
					switch (n = e[a])
					{
						case t:
							if (!i && !o)
							{
								r.push(s), s = "";
								continue
							}
							break;
						case "{":
							i = !0;
							break;
						case "}":
							i = !1;
							break;
						case "[":
							o = !0;
							break;
						case "]":
							o = !1
					}
					s += n
				}
				return s && r.push(s), r
			}

			function u(e)
			{
				if (!e) return "";
				var t = "",
					n = a(e, "/");
				if (n.every(function(e)
					{
						return "**" === e
					})) t = ".*";
				else
				{
					var i = !1;
					n.forEach(function(e, o)
					{
						if ("**" === e) return void(i || (t += s(2), i = !0));
						for (var c, l = !1, f = "", p = !1, h = "", d = 0; d < e.length; d++)
							if (c = e[d], "}" !== c && l) f += c;
							else if ("]" !== c && p)
						{
							var m = void 0;
							switch (c)
							{
								case "-":
									m = c;
									break;
								case "^":
									m = c;
									break;
								default:
									m = r.escapeRegExpCharacters(c)
							}
							h += m
						}
						else switch (c)
						{
							case "{":
								l = !0;
								continue;
							case "[":
								p = !0;
								continue;
							case "}":
								var v = a(f, ","),
									g = "(?:" + v.map(function(e)
									{
										return u(e)
									}).join("|") + ")";
								t += g, l = !1, f = "";
								break;
							case "]":
								t += "[" + h + "]", p = !1, h = "";
								break;
							case "?":
								t += C;
								continue;
							case "*":
								t += s(1);
								continue;
							default:
								t += r.escapeRegExpCharacters(c)
						}
						o < n.length - 1 && "**" !== n[o + 1] && (t += w), i = !1
					})
				}
				return t
			}

			function c(e, t)
			{
				if (!e) return j;
				e = e.trim();
				var n = e + "_" + !!t.trimForExclusions,
					i = D.get(n);
				if (i) return i;
				var o;
				if (x.test(e))
				{
					var s = e.substr(4);
					i = function(t, n)
					{
						return t && r.endsWith(t, s) ? e : null
					}
				}
				else i = (o = P.exec(l(e, t))) ? f(o[1], e) : (t.trimForExclusions ? k : O).test(e) ? p(e, t) : (o = I.exec(l(e, t))) ? h(o[1].substr(1), e, !0) : (o = T.exec(l(e, t))) ? h(o[1], e, !1) : d(e);
				return D.set(n, i), i
			}

			function l(e, t)
			{
				return t.trimForExclusions && r.endsWith(e, "/**") ? e.substr(0, e.length - 2) : e
			}

			function f(e, t)
			{
				var n = "/" + e,
					i = "\\" + e,
					o = function(o, s)
					{
						return o ? s ? s === e ? t : null : o === e || r.endsWith(o, n) || r.endsWith(o, i) ? t : null : null
					},
					s = [e];
				return o.basenames = s, o.patterns = [t], o.allBasenames = s, o
			}

			function p(e, t)
			{
				var r = E(e.slice(1, -1).split(",").map(function(e)
					{
						return c(e, t)
					}).filter(function(e)
					{
						return e !== j
					}), e),
					i = r.length;
				if (!i) return j;
				if (1 === i) return r[0];
				var o = function(t, n)
					{
						for (var i = 0, o = r.length; i < o; i++)
							if (r[i](t, n)) return e;
						return null
					},
					s = n.first(r, function(e)
					{
						return !!e.allBasenames
					});
				s && (o.allBasenames = s.allBasenames);
				var a = r.reduce(function(e, t)
				{
					return t.allPaths ? e.concat(t.allPaths) : e
				}, []);
				return a.length && (o.allPaths = a), o
			}

			function h(e, t, n)
			{
				var o = i.nativeSep !== i.sep ? e.replace(S, i.nativeSep) : e,
					s = i.nativeSep + o,
					a = n ? function(e, n)
					{
						return e && (e === o || r.endsWith(e, s)) ? t : null
					} : function(e, n)
					{
						return e && e === o ? t : null
					};
				return a.allPaths = [(n ? "*/" : "./") + e], a
			}

			function d(e)
			{
				try
				{
					var t = new RegExp("^" + u(e) + "$");
					return function(n, r)
					{
						return t.lastIndex = 0, n && t.test(n) ? e : null
					}
				}
				catch (e)
				{
					return j
				}
			}

			function m(e, t, n)
			{
				return !(!e || !t) && v(e)(t, void 0, n)
			}

			function v(e, t)
			{
				if (void 0 === t && (t = {}), !e) return A;
				if ("string" == typeof e)
				{
					var n = c(e, t);
					if (n === j) return A;
					var r = function(e, t)
					{
						return !!n(e, t)
					};
					return n.allBasenames && (r.allBasenames = n.allBasenames), n.allPaths && (r.allPaths = n.allPaths), r
				}
				return b(e, t)
			}

			function g(e)
			{
				return e.allBasenames || []
			}

			function y(e)
			{
				return e.allPaths || []
			}

			function b(e, t)
			{
				var r = E(Object.getOwnPropertyNames(e).map(function(n)
					{
						return _(n, e[n], t)
					}).filter(function(e)
					{
						return e !== j
					})),
					o = r.length;
				if (!o) return j;
				if (!r.some(function(e)
					{
						return e.requiresSiblings
					}))
				{
					if (1 === o) return r[0];
					var s = function(e, t, n)
						{
							for (var i = 0, o = r.length; i < o; i++)
							{
								var s = r[i](e, t);
								if (s) return s
							}
							return null
						},
						a = n.first(r, function(e)
						{
							return !!e.allBasenames
						});
					a && (s.allBasenames = a.allBasenames);
					var u = r.reduce(function(e, t)
					{
						return t.allPaths ? e.concat(t.allPaths) : e
					}, []);
					return u.length && (s.allPaths = u), s
				}
				var c = function(e, t, n)
					{
						function o()
						{
							if (!a)
							{
								a = !0;
								var r = n();
								if (r && r.length)
								{
									t || (t = i.basename(e));
									var o = t.substr(0, t.length - i.extname(e).length);
									s = {
										siblings: r,
										name: o
									}
								}
							}
							return s
						}
						for (var s, a = !n, u = 0, c = r.length; u < c; u++)
						{
							var l = r[u](e, t, o);
							if (l) return l
						}
						return null
					},
					l = n.first(r, function(e)
					{
						return !!e.allBasenames
					});
				l && (c.allBasenames = l.allBasenames);
				var f = r.reduce(function(e, t)
				{
					return t.allPaths ? e.concat(t.allPaths) : e
				}, []);
				return f.length && (c.allPaths = f), c
			}

			function _(e, t, n)
			{
				if (t === !1) return j;
				var r = c(e, n);
				if (r === j) return j;
				if ("boolean" == typeof t) return r;
				if (t)
				{
					var i = t.when;
					if ("string" == typeof i)
					{
						var o = function(t, n, o)
						{
							if (!r(t, n)) return null;
							var s = o();
							if (!s) return null;
							var a = i.replace("$(basename)", s.name);
							return s.siblings.indexOf(a) !== -1 ? e : null
						};
						return o.requiresSiblings = !0, o
					}
				}
				return r
			}

			function E(e, t)
			{
				var n = e.filter(function(e)
				{
					return !!e.basenames
				});
				if (n.length < 2) return e;
				var r, i = n.reduce(function(e, t)
				{
					return e.concat(t.basenames)
				}, []);
				if (t)
				{
					r = [];
					for (var o = 0, s = i.length; o < s; o++) r.push(t)
				}
				else r = n.reduce(function(e, t)
				{
					return e.concat(t.patterns)
				}, []);
				var a = function(e, t)
				{
					if (!e) return null;
					if (!t)
					{
						var n = void 0;
						for (n = e.length; n > 0; n--)
						{
							var o = e.charCodeAt(n - 1);
							if (47 === o || 92 === o) break
						}
						t = e.substr(n)
					}
					var s = i.indexOf(t);
					return s !== -1 ? r[s] : null
				};
				a.basenames = i, a.patterns = r, a.allBasenames = i;
				var u = e.filter(function(e)
				{
					return !e.basenames
				});
				return u.push(a), u
			}
			var w = "[/\\\\]",
				C = "[^/\\\\]",
				S = /\//g;
			t.splitGlobAware = a;
			var x = /^\*\*\/\*\.[\w\.-]+$/,
				P = /^\*\*\/([\w\.-]+)\/?$/,
				O = /^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/,
				k = /^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/,
				I = /^\*\*((\/[\w\.-]+)+)\/?$/,
				T = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/,
				D = new o.BoundedLinkedMap(1e4),
				A = function()
				{
					return !1
				},
				j = function()
				{
					return null
				};
			t.match = m, t.parse = v, t.getBasenameTerms = g, t.getPathTerms = y
		}), define(e[6], t([1, 0]), function(e, t)
		{
			"use strict";

			function n(e)
			{
				return Array.isArray ? Array.isArray(e) : !(!e || typeof e.length !== v.number || e.constructor !== Array)
			}

			function r(e)
			{
				return typeof e === v.string || e instanceof String
			}

			function i(e)
			{
				return n(e) && e.every(function(e)
				{
					return r(e)
				})
			}

			function o(e)
			{
				return !(typeof e !== v.object || null === e || Array.isArray(e) || e instanceof RegExp || e instanceof Date)
			}

			function s(e)
			{
				return (typeof e === v.number || e instanceof Number) && !isNaN(e)
			}

			function a(e)
			{
				return e === !0 || e === !1
			}

			function u(e)
			{
				return typeof e === v.undefined
			}

			function c(e)
			{
				return u(e) || null === e
			}

			function l(e)
			{
				if (!o(e)) return !1;
				for (var t in e)
					if (g.call(e, t)) return !1;
				return !0
			}

			function f(e)
			{
				return typeof e === v.function
			}

			function p()
			{
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				return e && e.length > 0 && e.every(f)
			}

			function h(e, t)
			{
				for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) d(e[r], t[r])
			}

			function d(e, t)
			{
				if (r(t))
				{
					if (typeof e !== t) throw new Error("argument does not match constraint: typeof " + t)
				}
				else if (f(t))
				{
					if (e instanceof t) return;
					if (e && e.constructor === t) return;
					if (1 === t.length && t.call(void 0, e) === !0) return;
					throw new Error("argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true")
				}
			}

			function m(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				var r = Object.create(e.prototype);
				return e.apply(r, t), r
			}
			var v = {
				number: "number",
				string: "string",
				undefined: "undefined",
				object: "object",
				function: "function"
			};
			t.isArray = n, t.isString = r,
				t.isStringArray = i, t.isObject = o, t.isNumber = s, t.isBoolean = a, t.isUndefined = u, t.isUndefinedOrNull = c;
			var g = Object.prototype.hasOwnProperty;
			t.isEmptyObject = l, t.isFunction = f, t.areFunctions = p, t.validateConstraints = h, t.validateConstraint = d, t.create = m
		}), define(e[7], t([1, 0, 11, 6]), function(e, t, n, r)
		{
			"use strict";

			function i(e)
			{
				t.errorHandler.setUnexpectedErrorHandler(e)
			}

			function o(e)
			{
				c(e) || t.errorHandler.onUnexpectedError(e)
			}

			function s(e)
			{
				c(e) || t.errorHandler.onUnexpectedExternalError(e)
			}

			function a(e)
			{
				return e.then(null, o)
			}

			function u(e)
			{
				if (e instanceof Error)
				{
					var t = e.name,
						n = e.message,
						r = e.stacktrace || e.stack;
					return {
						$isError: !0,
						name: t,
						message: n,
						stack: r
					}
				}
				return e
			}

			function c(e)
			{
				return e instanceof Error && e.name === y && e.message === y
			}

			function l()
			{
				var e = new Error(y);
				return e.name = e.message, e
			}

			function f()
			{
				return new Error("Not Implemented")
			}

			function p(e)
			{
				return e ? new Error("Illegal argument: " + e) : new Error("Illegal argument")
			}

			function h(e)
			{
				return e ? new Error("Illegal state: " + e) : new Error("Illegal state")
			}

			function d(e)
			{
				return e ? new Error("readonly property '" + e + " cannot be changed'") : new Error("readonly property cannot be changed")
			}

			function m(e, t)
			{
				void 0 === t && (t = {});
				var n = new Error(e);
				return r.isNumber(t.severity) && (n.severity = t.severity), t.actions && (n.actions = t.actions), n
			}

			function v(e)
			{
				return e ? e.message ? e.message : e.stack ? e.stack.split("\n")[0] : String(e) : "Error"
			}
			var g = function()
			{
				function e()
				{
					this.listeners = [], this.unexpectedErrorHandler = function(e)
					{
						n.setTimeout(function()
						{
							if (e.stack) throw new Error(e.message + "\n\n" + e.stack);
							throw e
						}, 0)
					}
				}
				return e.prototype.addListener = function(e)
				{
					var t = this;
					return this.listeners.push(e),
						function()
						{
							t._removeListener(e)
						}
				}, e.prototype.emit = function(e)
				{
					this.listeners.forEach(function(t)
					{
						t(e)
					})
				}, e.prototype._removeListener = function(e)
				{
					this.listeners.splice(this.listeners.indexOf(e), 1)
				}, e.prototype.setUnexpectedErrorHandler = function(e)
				{
					this.unexpectedErrorHandler = e
				}, e.prototype.getUnexpectedErrorHandler = function()
				{
					return this.unexpectedErrorHandler
				}, e.prototype.onUnexpectedError = function(e)
				{
					this.unexpectedErrorHandler(e), this.emit(e)
				}, e.prototype.onUnexpectedExternalError = function(e)
				{
					this.unexpectedErrorHandler(e)
				}, e
			}();
			t.ErrorHandler = g, t.errorHandler = new g, t.setUnexpectedErrorHandler = i, t.onUnexpectedError = o, t.onUnexpectedExternalError = s, t.onUnexpectedPromiseError = a, t.transformErrorForSerialization = u;
			var y = "Canceled";
			t.isPromiseCanceledError = c, t.canceled = l, t.notImplemented = f, t.illegalArgument = p, t.illegalState = h, t.readonly = d, t.create = m, t.getErrorMessage = v
		}), define(e[58], t([1, 0, 7]), function(e, t, n)
		{
			"use strict";
			var r = function()
			{
				function e()
				{}
				return e.prototype.add = function(e, t, n)
				{
					var r = this;
					void 0 === t && (t = null), this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(t), Array.isArray(n) && n.push(
					{
						dispose: function()
						{
							return r.remove(e, t)
						}
					})
				}, e.prototype.remove = function(e, t)
				{
					if (void 0 === t && (t = null), this._callbacks)
					{
						for (var n = !1, r = 0, i = this._callbacks.length; r < i; r++)
							if (this._callbacks[r] === e)
							{
								if (this._contexts[r] === t) return this._callbacks.splice(r, 1), void this._contexts.splice(r, 1);
								n = !0
							}
						if (n) throw new Error("When adding a listener with a context, you should remove it with the same context")
					}
				}, e.prototype.invoke = function()
				{
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					if (this._callbacks)
					{
						for (var r = [], i = this._callbacks.slice(0), o = this._contexts.slice(0), s = 0, a = i.length; s < a; s++) try
						{
							r.push(i[s].apply(o[s], e))
						}
						catch (e)
						{
							n.onUnexpectedError(e)
						}
						return r
					}
				}, e.prototype.isEmpty = function()
				{
					return !this._callbacks || 0 === this._callbacks.length
				}, e.prototype.entries = function()
				{
					var e = this;
					return this._callbacks ? this._callbacks.map(function(t, n)
					{
						return [t, e._contexts[n]]
					}) : []
				}, e.prototype.dispose = function()
				{
					this._callbacks = void 0, this._contexts = void 0
				}, e
			}();
			Object.defineProperty(t, "__esModule",
			{
				value: !0
			}), t.default = r
		}), define(e[4], t([1, 0, 12, 58, 82]), function(e, t, n, r, i)
		{
			"use strict";

			function o(e, t)
			{
				return function(n, r, i)
				{
					var o = e.addListener2(t, function()
					{
						n.apply(r, arguments)
					});
					return Array.isArray(i) && i.push(o), o
				}
			}

			function s(e)
			{
				var t, n = new y(
				{
					onFirstListenerAdd: function()
					{
						return t = e(function(e)
						{
							return n.fire(e)
						})
					},
					onLastListenerRemove: function()
					{
						return t.dispose()
					}
				});
				return n.event
			}

			function a(e)
			{
				var t = new y,
					n = !1;
				return e.then(null, function()
				{
					return null
				}).then(function()
				{
					n ? t.fire() : setTimeout(function()
					{
						return t.fire()
					}, 0)
				}), n = !0, t.event
			}

			function u(e)
			{
				var t = null,
					n = null,
					r = new y(
					{
						onFirstListenerAdd: function()
						{
							t = e.then(function(e)
							{
								return n = e(function(e)
								{
									return r.fire(e)
								})
							}, function()
							{
								return null
							})
						},
						onLastListenerRemove: function()
						{
							t && (t.cancel(), t = null), n && (n.dispose(), n = null)
						}
					});
				return r.event
			}

			function c(e)
			{
				return function(t, n, r)
				{
					void 0 === n && (n = null);
					var i = e(function(e)
					{
						return i.dispose(), t.call(n, e)
					}, null, r);
					return i
				}
			}

			function l()
			{
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				var r = [],
					i = new y(
					{
						onFirstListenerAdd: function()
						{
							r = e.map(function(e)
							{
								return e(function(e)
								{
									return i.fire(e)
								})
							})
						},
						onLastListenerRemove: function()
						{
							r = n.dispose(r)
						}
					});
				return i.event
			}

			function f(e, t, n)
			{
				void 0 === n && (n = 100);
				var r, i, o, s = new y(
				{
					onFirstListenerAdd: function()
					{
						r = e(function(e)
						{
							i = t(i, e), clearTimeout(o), o = setTimeout(function()
							{
								var e = i;
								i = void 0, s.fire(e)
							}, n)
						})
					},
					onLastListenerRemove: function()
					{
						r.dispose()
					}
				});
				return s.event
			}

			function p(e, t)
			{
				return function(n, r, i)
				{
					return void 0 === r && (r = null), e(function(e)
					{
						return n.call(r, t(e))
					}, null, i)
				}
			}

			function h(e, t)
			{
				return function(n, r, i)
				{
					return void 0 === r && (r = null), e(function(e)
					{
						return t(e) && n.call(r, e)
					}, null, i)
				}
			}

			function d(e)
			{
				return new E(e)
			}

			function m(e)
			{
				var t = (new Date).getTime();
				return p(c(e), function(e)
				{
					return (new Date).getTime() - t
				})
			}

			function v(e, t, n)
			{
				void 0 === t && (t = !1), void 0 === n && (n = []), n = n.slice();
				var r = e(function(e)
					{
						n ? n.push(e) : o.fire(e)
					}),
					i = function()
					{
						n.forEach(function(e)
						{
							return o.fire(e)
						}), n = null
					},
					o = new y(
					{
						onFirstListenerAdd: function()
						{
							r || (r = e(function(e)
							{
								return o.fire(e)
							}))
						},
						onFirstListenerDidAdd: function()
						{
							n && (t ? setTimeout(i) : i())
						},
						onLastListenerRemove: function()
						{
							r.dispose(), r = null
						}
					});
				return o.event
			}
			var g;
			! function(e)
			{
				var t = {
					dispose: function() {}
				};
				e.None = function()
				{
					return t
				}
			}(g || (g = {})), Object.defineProperty(t, "__esModule",
			{
				value: !0
			}), t.default = g;
			var y = function()
			{
				function e(e)
				{
					this._options = e
				}
				return Object.defineProperty(e.prototype, "event",
				{
					get: function()
					{
						var t = this;
						return this._event || (this._event = function(n, i, o)
						{
							t._callbacks || (t._callbacks = new r.default);
							var s = t._callbacks.isEmpty();
							s && t._options && t._options.onFirstListenerAdd && t._options.onFirstListenerAdd(t), t._callbacks.add(n, i), s && t._options && t._options.onFirstListenerDidAdd && t._options.onFirstListenerDidAdd(t);
							var a;
							return a = {
								dispose: function()
								{
									a.dispose = e._noop, t._disposed || (t._callbacks.remove(n, i), t._options && t._options.onLastListenerRemove && t._callbacks.isEmpty() && t._options.onLastListenerRemove(t))
								}
							}, Array.isArray(o) && o.push(a), a
						}), this._event
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.fire = function(e)
				{
					this._callbacks && this._callbacks.invoke.call(this._callbacks, e)
				}, e.prototype.dispose = function()
				{
					this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0, this._disposed = !0)
				}, e
			}();
			y._noop = function() {}, t.Emitter = y;
			var b = function()
			{
				function e()
				{
					var e = this;
					this.hasListeners = !1, this.events = [], this.emitter = new y(
					{
						onFirstListenerAdd: function()
						{
							return e.onFirstListenerAdd()
						},
						onLastListenerRemove: function()
						{
							return e.onLastListenerRemove()
						}
					})
				}
				return Object.defineProperty(e.prototype, "event",
				{
					get: function()
					{
						return this.emitter.event
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.add = function(e)
				{
					var t = this,
						r = {
							event: e,
							listener: null
						};
					this.events.push(r), this.hasListeners && this.hook(r);
					var o = function()
					{
						t.hasListeners && t.unhook(r);
						var e = t.events.indexOf(r);
						t.events.splice(e, 1)
					};
					return n.toDisposable(i.once(o))
				}, e.prototype.onFirstListenerAdd = function()
				{
					var e = this;
					this.hasListeners = !0, this.events.forEach(function(t)
					{
						return e.hook(t)
					})
				}, e.prototype.onLastListenerRemove = function()
				{
					var e = this;
					this.hasListeners = !1, this.events.forEach(function(t)
					{
						return e.unhook(t)
					})
				}, e.prototype.hook = function(e)
				{
					var t = this;
					e.listener = e.event(function(e)
					{
						return t.emitter.fire(e)
					})
				}, e.prototype.unhook = function(e)
				{
					e.listener.dispose(), e.listener = null
				}, e.prototype.dispose = function()
				{
					this.emitter.dispose()
				}, e
			}();
			t.EventMultiplexer = b, t.fromEventEmitter = o, t.fromCallback = s, t.fromPromise = a, t.delayed = u, t.once = c, t.any = l, t.debounceEvent = f;
			var _ = function()
			{
				function e()
				{
					this.buffers = []
				}
				return e.prototype.wrapEvent = function(e)
				{
					var t = this;
					return function(n, r, i)
					{
						return e(function(e)
						{
							var i = t.buffers[t.buffers.length - 1];
							i ? i.push(function()
							{
								return n.call(r, e)
							}) : n.call(r, e)
						}, void 0, i)
					}
				}, e.prototype.bufferEvents = function(e)
				{
					var t = [];
					this.buffers.push(t), e(), this.buffers.pop(), t.forEach(function(e)
					{
						return e()
					})
				}, e
			}();
			t.EventBufferer = _, t.mapEvent = p, t.filterEvent = h;
			var E = function()
			{
				function e(e)
				{
					this._event = e
				}
				return Object.defineProperty(e.prototype, "event",
				{
					get: function()
					{
						return this._event
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.map = function(t)
				{
					return new e(p(this._event, t))
				}, e.prototype.filter = function(t)
				{
					return new e(h(this._event, t))
				}, e.prototype.on = function(e, t, n)
				{
					return this._event(e, t, n)
				}, e
			}();
			t.chain = d, t.stopwatch = m, t.buffer = v
		}), define(e[76], t([1, 0, 4]), function(e, t, n)
		{
			"use strict";
			var r, i = Object.freeze(function(e, t)
			{
				var n = setTimeout(e.bind(t), 0);
				return {
					dispose: function()
					{
						clearTimeout(n)
					}
				}
			});
			! function(e)
			{
				e.None = Object.freeze(
				{
					isCancellationRequested: !1,
					onCancellationRequested: n.default.None
				}), e.Cancelled = Object.freeze(
				{
					isCancellationRequested: !0,
					onCancellationRequested: i
				})
			}(r = t.CancellationToken || (t.CancellationToken = {}));
			var o = function()
				{
					function e()
					{
						this._isCancelled = !1
					}
					return e.prototype.cancel = function()
					{
						this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this._emitter = void 0))
					}, Object.defineProperty(e.prototype, "isCancellationRequested",
					{
						get: function()
						{
							return this._isCancelled
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(e.prototype, "onCancellationRequested",
					{
						get: function()
						{
							return this._isCancelled ? i : (this._emitter || (this._emitter = new n.Emitter), this._emitter.event)
						},
						enumerable: !0,
						configurable: !0
					}), e
				}(),
				s = function()
				{
					function e()
					{}
					return Object.defineProperty(e.prototype, "token",
					{
						get: function()
						{
							return this._token || (this._token = new o), this._token
						},
						enumerable: !0,
						configurable: !0
					}), e.prototype.cancel = function()
					{
						this._token ? this._token.cancel() : this._token = r.Cancelled
					}, e.prototype.dispose = function()
					{
						this.cancel()
					}, e
				}();
			t.CancellationTokenSource = s
		}), define(e[38], t([1, 0, 7]), function(e, t, r)
		{
			"use strict";

			function i(e)
			{
				try
				{
					return e()
				}
				catch (e)
				{
					r.onUnexpectedError(e)
				}
			}

			function o(e, t)
			{
				try
				{
					return e(t)
				}
				catch (e)
				{
					r.onUnexpectedError(e)
				}
			}
			var s = function()
			{
				function e(e, t)
				{
					void 0 === e && (e = null), void 0 === t && (t = null), this._type = e, this._data = t
				}
				return e.prototype.getType = function()
				{
					return this._type
				}, e.prototype.getData = function()
				{
					return this._data
				}, e
			}();
			t.EmitterEvent = s;
			var a = function()
			{
				function e(e)
				{
					if (void 0 === e && (e = null), this._listeners = {}, this._bulkListeners = [], this._collectedEvents = [], this._deferredCnt = 0, e)
					{
						this._allowedEventTypes = {};
						for (var t = 0; t < e.length; t++) this._allowedEventTypes[e[t]] = !0
					}
					else this._allowedEventTypes = null
				}
				return e.prototype.dispose = function()
				{
					this._listeners = {}, this._bulkListeners = [], this._collectedEvents = [], this._deferredCnt = 0, this._allowedEventTypes = null
				}, e.prototype.addListener = function(e, t)
				{
					if ("*" === e) throw new Error("Use addBulkListener(listener) to register your listener!");
					if (this._allowedEventTypes && !this._allowedEventTypes.hasOwnProperty(e)) throw new Error("This object will never emit this event type!");
					this._listeners.hasOwnProperty(e) ? this._listeners[e].push(t) : this._listeners[e] = [t];
					var n = this;
					return {
						dispose: function()
						{
							n && (n._removeListener(e, t), n = null, t = null)
						}
					}
				}, e.prototype.addListener2 = function(e, t)
				{
					return this.addListener(e, t)
				}, e.prototype.addOneTimeDisposableListener = function(e, t)
				{
					var n = this.addListener(e, function(e)
					{
						n.dispose(), t(e)
					});
					return n
				}, e.prototype.addBulkListener = function(e)
				{
					var t = this;
					return this._bulkListeners.push(e),
					{
						dispose: function()
						{
							t._removeBulkListener(e)
						}
					}
				}, e.prototype.addBulkListener2 = function(e)
				{
					return this.addBulkListener(e)
				}, e.prototype.addEmitter = function(e)
				{
					var t = this;
					return e.addBulkListener2(function(e)
					{
						var n = e;
						0 === t._deferredCnt ? t._emitEvents(n) : t._collectedEvents.push.apply(t._collectedEvents, n)
					})
				}, e.prototype.addEmitter2 = function(e)
				{
					return this.addEmitter(e)
				}, e.prototype._removeListener = function(e, t)
				{
					if (this._listeners.hasOwnProperty(e))
						for (var n = this._listeners[e], r = 0, i = n.length; r < i; r++)
							if (n[r] === t)
							{
								n.splice(r, 1);
								break
							}
				}, e.prototype._removeBulkListener = function(e)
				{
					for (var t = 0, n = this._bulkListeners.length; t < n; t++)
						if (this._bulkListeners[t] === e)
						{
							this._bulkListeners.splice(t, 1);
							break
						}
				}, e.prototype._emitToSpecificTypeListeners = function(e, t)
				{
					if (this._listeners.hasOwnProperty(e))
						for (var n = this._listeners[e].slice(0), r = 0, i = n.length; r < i; r++) o(n[r], t)
				}, e.prototype._emitToBulkListeners = function(e)
				{
					for (var t = this._bulkListeners.slice(0), n = 0, r = t.length; n < r; n++) o(t[n], e)
				}, e.prototype._emitEvents = function(e)
				{
					this._bulkListeners.length > 0 && this._emitToBulkListeners(e);
					for (var t = 0, n = e.length; t < n; t++)
					{
						var r = e[t];
						this._emitToSpecificTypeListeners(r.getType(), r.getData())
					}
				}, e.prototype.emit = function(e, t)
				{
					if (void 0 === t && (t = {}), this._allowedEventTypes && !this._allowedEventTypes.hasOwnProperty(e)) throw new Error("Cannot emit this event type because it wasn't white-listed!");
					if (this._listeners.hasOwnProperty(e) || 0 !== this._bulkListeners.length)
					{
						var n = new s(e, t);
						0 === this._deferredCnt ? this._emitEvents([n]) : this._collectedEvents.push(n)
					}
				}, e.prototype._beginDeferredEmit = function()
				{
					this._deferredCnt = this._deferredCnt + 1
				}, e.prototype._endDeferredEmit = function()
				{
					this._deferredCnt = this._deferredCnt - 1, 0 === this._deferredCnt && this._emitCollected()
				}, e.prototype.deferredEmit = function(e)
				{
					this._beginDeferredEmit();
					var t = i(e);
					return this._endDeferredEmit(), t
				}, e.prototype._emitCollected = function()
				{
					var e = this._collectedEvents;
					this._collectedEvents = [], e.length > 0 && this._emitEvents(e)
				}, e
			}();
			t.EventEmitter = a;
			var u = function()
				{
					function e(e, t)
					{
						this.target = e, this.arg = t
					}
					return e
				}(),
				c = function(e)
				{
					function t(t)
					{
						void 0 === t && (t = null);
						var n = e.call(this, t) || this;
						return n._emitQueue = [], n
					}
					return n(t, e), t.prototype._emitToSpecificTypeListeners = function(e, t)
					{
						if (this._listeners.hasOwnProperty(e))
							for (var n = this._listeners[e], r = 0, i = n.length; r < i; r++) this._emitQueue.push(new u(n[r], t))
					}, t.prototype._emitToBulkListeners = function(e)
					{
						for (var t = this._bulkListeners, n = 0, r = t.length; n < r; n++) this._emitQueue.push(new u(t[n], e))
					}, t.prototype._emitEvents = function(t)
					{
						for (e.prototype._emitEvents.call(this, t); this._emitQueue.length > 0;)
						{
							var n = this._emitQueue.shift();
							o(n.target, n.arg)
						}
					}, t
				}(a);
			t.OrderGuaranteeEventEmitter = c
		}), define(e[84], t([1, 0, 6, 31]), function(e, t, n, r)
		{
			"use strict";

			function i(e)
			{
				return {
					data: e,
					incoming: Object.create(null),
					outgoing: Object.create(null)
				}
			}
			var o = function()
			{
				function e(e)
				{
					this._hashFn = e, this._nodes = Object.create(null)
				}
				return e.prototype.roots = function()
				{
					var e = [];
					return r.forEach(this._nodes, function(t)
					{
						n.isEmptyObject(t.value.outgoing) && e.push(t.value)
					}), e
				}, e.prototype.traverse = function(e, t, n)
				{
					var r = this.lookup(e);
					r && this._traverse(r, t, Object.create(null), n)
				}, e.prototype._traverse = function(e, t, n, i)
				{
					var o = this,
						s = this._hashFn(e.data);
					if (!n[s])
					{
						n[s] = !0, i(e.data);
						var a = t ? e.outgoing : e.incoming;
						r.forEach(a, function(e)
						{
							return o._traverse(e.value, t, n, i)
						})
					}
				}, e.prototype.insertEdge = function(e, t)
				{
					var n = this.lookupOrInsertNode(e),
						r = this.lookupOrInsertNode(t);
					n.outgoing[this._hashFn(t)] = r, r.incoming[this._hashFn(e)] = n
				}, e.prototype.removeNode = function(e)
				{
					var t = this._hashFn(e);
					delete this._nodes[t], r.forEach(this._nodes, function(e)
					{
						delete e.value.outgoing[t], delete e.value.incoming[t]
					})
				}, e.prototype.lookupOrInsertNode = function(e)
				{
					var t = this._hashFn(e),
						n = this._nodes[t];
					return n || (n = i(e), this._nodes[t] = n), n
				}, e.prototype.lookup = function(e)
				{
					return this._nodes[this._hashFn(e)]
				}, Object.defineProperty(e.prototype, "length",
				{
					get: function()
					{
						return Object.keys(this._nodes).length
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.toString = function()
				{
					var e = [];
					return r.forEach(this._nodes, function(t)
					{
						e.push(t.key + ", (incoming)[" + Object.keys(t.value.incoming).join(", ") + "], (outgoing)[" + Object.keys(t.value.outgoing).join(",") + "]")
					}), e.join("\n")
				}, e
			}();
			t.Graph = o
		}), define(e[86], t([1, 0, 15, 6, 14, 99]), function(e, t, n, r, i, o)
		{
			"use strict";

			function s(e)
			{
				var t = a(e);
				m.push(t), t.userConfigured ? g.push(t) : v.push(t), t.userConfigured || m.forEach(function(e)
				{
					e.mime === t.mime || e.userConfigured || (t.extension && e.extension === t.extension && console.warn("Overwriting extension <<" + t.extension + ">> to now point to mime <<" + t.mime + ">>"), t.filename && e.filename === t.filename && console.warn("Overwriting filename <<" + t.filename + ">> to now point to mime <<" + t.mime + ">>"), t.filepattern && e.filepattern === t.filepattern && console.warn("Overwriting filepattern <<" + t.filepattern + ">> to now point to mime <<" + t.mime + ">>"), t.firstline && e.firstline === t.firstline && console.warn("Overwriting firstline <<" + t.firstline + ">> to now point to mime <<" + t.mime + ">>"))
				})
			}

			function a(e)
			{
				return {
					id: e.id,
					mime: e.mime,
					filename: e.filename,
					extension: e.extension,
					filepattern: e.filepattern,
					firstline: e.firstline,
					userConfigured: e.userConfigured,
					filenameLowercase: e.filename ? e.filename.toLowerCase() : void 0,
					extensionLowercase: e.extension ? e.extension.toLowerCase() : void 0,
					filepatternLowercase: e.filepattern ? e.filepattern.toLowerCase() : void 0,
					filepatternOnPath: !!e.filepattern && e.filepattern.indexOf(n.sep) >= 0
				}
			}

			function u(e)
			{
				e ? (m = m.filter(function(e)
				{
					return !e.userConfigured
				}), g = []) : (m = [], v = [], g = [])
			}

			function c(e, r)
			{
				if (!e) return [t.MIME_UNKNOWN];
				e = e.toLowerCase();
				var i = n.basename(e),
					o = l(e, i, g);
				if (o) return [o, t.MIME_TEXT];
				var s = l(e, i, v);
				if (s) return [s, t.MIME_TEXT];
				if (r)
				{
					var a = f(r);
					if (a) return [a, t.MIME_TEXT]
				}
				return [t.MIME_UNKNOWN]
			}

			function l(e, t, n)
			{
				for (var r, s, a, u = 0; u < n.length; u++)
				{
					var c = n[u];
					if (t === c.filenameLowercase)
					{
						r = c;
						break
					}
					if (c.filepattern && (!s || c.filepattern.length > s.filepattern.length))
					{
						var l = c.filepatternOnPath ? e : t;
						o.match(c.filepatternLowercase, l) && (s = c)
					}
					c.extension && (!a || c.extension.length > a.extension.length) && i.endsWith(t, c.extensionLowercase) && (a = c)
				}
				return r ? r.mime : s ? s.mime : a ? a.mime : null
			}

			function f(e)
			{
				if (i.startsWithUTF8BOM(e) && (e = e.substr(1)), e.length > 0)
					for (var t = 0; t < m.length; ++t)
					{
						var n = m[t];
						if (n.firstline)
						{
							var r = e.match(n.firstline);
							if (r && r.length > 0 && r[0].length === e.length) return n.mime
						}
					}
				return null
			}

			function p(e)
			{
				if (!e) return !1;
				var n;
				return n = r.isArray(e) ? e : e.split(",").map(function(e)
				{
					return e.trim()
				}), n.indexOf(t.MIME_BINARY) >= 0
			}

			function h(e)
			{
				return !e || ("string" == typeof e ? e === t.MIME_BINARY || e === t.MIME_TEXT || e === t.MIME_UNKNOWN : 1 === e.length && h(e[0]))
			}

			function d(e, t)
			{
				for (var n = 0; n < m.length; n++)
				{
					var r = m[n];
					if (!r.userConfigured && r.id === e && r.extension) return t + r.extension
				}
				return t
			}
			t.MIME_TEXT = "text/plain", t.MIME_BINARY = "application/octet-stream", t.MIME_UNKNOWN = "application/unknown";
			var m = [],
				v = [],
				g = [];
			t.registerTextMime = s, t.clearTextMimes = u, t.guessMimeTypes = c, t.isBinaryMime = p, t.isUnspecific = h, t.suggestFilename = d
		}), define(e[5], t([1, 0, 6]), function(e, t, n)
		{
			"use strict";

			function r(e)
			{
				if (!e || "object" != typeof e) return e;
				if (e instanceof RegExp) return e;
				var t = Array.isArray(e) ? [] :
				{};
				return Object.keys(e).forEach(function(n)
				{
					e[n] && "object" == typeof e[n] ? t[n] = r(e[n]) : t[n] = e[n]
				}), t
			}

			function i(e)
			{
				if (!e || "object" != typeof e) return e;
				var t = Array.isArray(e) ? [] :
				{};
				return Object.getOwnPropertyNames(e).forEach(function(n)
				{
					e[n] && "object" == typeof e[n] ? t[n] = i(e[n]) : t[n] = e[n]
				}), t
			}

			function o(e, t)
			{
				return s(e, t, [])
			}

			function s(e, t, r)
			{
				if (n.isUndefinedOrNull(e)) return e;
				var i = t(e);
				if ("undefined" != typeof i) return i;
				if (n.isArray(e))
				{
					for (var o = [], a = 0; a < e.length; a++) o.push(s(e[a], t, r));
					return o
				}
				if (n.isObject(e))
				{
					if (r.indexOf(e) >= 0) throw new Error("Cannot clone recursive data-structure");
					r.push(e);
					var u = {};
					for (var c in e) g.call(e, c) && (u[c] = s(e[c], t, r));
					return r.pop(), u
				}
				return e
			}

			function a(e, t, r)
			{
				return void 0 === r && (r = !0), n.isObject(e) ? (n.isObject(t) && Object.keys(t).forEach(function(i)
				{
					i in e ? r && (n.isObject(e[i]) && n.isObject(t[i]) ? a(e[i], t[i], r) : e[i] = t[i]) : e[i] = t[i]
				}), e) : t
			}

			function u(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				return t.forEach(function(t)
				{
					return Object.keys(t).forEach(function(n)
					{
						return e[n] = t[n]
					})
				}), e
			}

			function c(e, t, n)
			{
				return void 0 === n && (n = function(e)
				{
					return e
				}), e.reduce(function(e, r)
				{
					return u(e, (i = {}, i[t(r)] = n(r), i));
					var i
				}, Object.create(null))
			}

			function l(e, t)
			{
				if (e === t) return !0;
				if (null === e || void 0 === e || null === t || void 0 === t) return !1;
				if (typeof e != typeof t) return !1;
				if ("object" != typeof e) return !1;
				if (Array.isArray(e) !== Array.isArray(t)) return !1;
				var n, r;
				if (Array.isArray(e))
				{
					if (e.length !== t.length) return !1;
					for (n = 0; n < e.length; n++)
						if (!l(e[n], t[n])) return !1
				}
				else
				{
					var i = [];
					for (r in e) i.push(r);
					i.sort();
					var o = [];
					for (r in t) o.push(r);
					if (o.sort(), !l(i, o)) return !1;
					for (n = 0; n < i.length; n++)
						if (!l(e[i[n]], t[i[n]])) return !1
				}
				return !0
			}

			function f(e, t, n)
			{
				"undefined" == typeof e[t] && (e[t] = n)
			}

			function p(e)
			{
				for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = !0;
				return t
			}

			function h(e, t)
			{
				void 0 === t && (t = !1), t && (e = e.map(function(e)
				{
					return e.toLowerCase()
				}));
				var n = p(e);
				return t ? function(e)
				{
					return void 0 !== n[e.toLowerCase()] && n.hasOwnProperty(e.toLowerCase())
				} : function(e)
				{
					return void 0 !== n[e] && n.hasOwnProperty(e)
				}
			}

			function d(e, t)
			{
				for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
				t = t || function() {};
				var r = e.prototype,
					i = t.prototype;
				t.prototype = Object.create(r);
				for (var n in i) i.hasOwnProperty(n) && Object.defineProperty(t.prototype, n, Object.getOwnPropertyDescriptor(i, n));
				Object.defineProperty(t.prototype, "constructor",
				{
					value: t,
					writable: !0,
					configurable: !0,
					enumerable: !0
				})
			}

			function m(e)
			{
				var t = [];
				return JSON.stringify(e, function(e, r)
				{
					if (n.isObject(r) || Array.isArray(r))
					{
						if (t.indexOf(r) !== -1) return "[Circular]";
						t.push(r)
					}
					return r
				})
			}

			function v(e, t, n)
			{
				void 0 === n && (n = null);
				var r = t(e);
				return "undefined" == typeof r ? n : r
			}
			t.clone = r, t.deepClone = i;
			var g = Object.prototype.hasOwnProperty;
			t.cloneAndChange = o, t.mixin = a, t.assign = u, t.toObject = c, t.equals = l, t.ensureProperty = f, t.arrayToHash = p, t.createKeywordMatcher = h, t.derive = d, t.safeStringify = m, t.getOrDefault = v
		}), define(e[17], t([1, 0, 11]), function(e, t, n)
		{
			"use strict";

			function r(e)
			{
				return "%" + e.charCodeAt(0).toString(16).toUpperCase()
			}

			function i(e)
			{
				return encodeURIComponent(e).replace(/[!'()*]/g, r)
			}

			function o(e)
			{
				return e
			}
			var s = function()
			{
				function e()
				{
					this._scheme = e._empty, this._authority = e._empty, this._path = e._empty, this._query = e._empty, this._fragment = e._empty, this._formatted = null, this._fsPath = null
				}
				return e.isUri = function(t)
				{
					return t instanceof e || !!t && ("string" == typeof t.authority && "string" == typeof t.fragment && "string" == typeof t.path && "string" == typeof t.query && "string" == typeof t.scheme)
				}, Object.defineProperty(e.prototype, "scheme",
				{
					get: function()
					{
						return this._scheme
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "authority",
				{
					get: function()
					{
						return this._authority
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "path",
				{
					get: function()
					{
						return this._path
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "query",
				{
					get: function()
					{
						return this._query
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "fragment",
				{
					get: function()
					{
						return this._fragment
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "fsPath",
				{
					get: function()
					{
						if (!this._fsPath)
						{
							var t;
							t = this._authority && this._path && "file" === this.scheme ? "//" + this._authority + this._path : e._driveLetterPath.test(this._path) ? this._path[1].toLowerCase() + this._path.substr(2) : this._path, n.isWindows && (t = t.replace(/\//g, "\\")), this._fsPath = t
						}
						return this._fsPath
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.with = function(t)
				{
					if (!t) return this;
					var n = t.scheme,
						r = t.authority,
						i = t.path,
						o = t.query,
						s = t.fragment;
					if (void 0 === n ? n = this.scheme : null === n && (n = ""), void 0 === r ? r = this.authority : null === r && (r = ""), void 0 === i ? i = this.path : null === i && (i = ""), void 0 === o ? o = this.query : null === o && (o = ""), void 0 === s ? s = this.fragment : null === s && (s = ""), n === this.scheme && r === this.authority && i === this.path && o === this.query && s === this.fragment) return this;
					var a = new e;
					return a._scheme = n, a._authority = r, a._path = i, a._query = o, a._fragment = s, e._validate(a), a
				}, e.parse = function(t)
				{
					var n = new e,
						r = e._parseComponents(t);
					return n._scheme = r.scheme, n._authority = decodeURIComponent(r.authority), n._path = decodeURIComponent(r.path), n._query = decodeURIComponent(r.query), n._fragment = decodeURIComponent(r.fragment), e._validate(n), n
				}, e.file = function(t)
				{
					var n = new e;
					if (n._scheme = "file", t = t.replace(/\\/g, e._slash), t[0] === e._slash && t[0] === t[1])
					{
						var r = t.indexOf(e._slash, 2);
						r === -1 ? n._authority = t.substring(2) : (n._authority = t.substring(2, r), n._path = t.substring(r))
					}
					else n._path = t;
					return n._path[0] !== e._slash && (n._path = e._slash + n._path), e._validate(n), n
				}, e._parseComponents = function(t)
				{
					var n = {
							scheme: e._empty,
							authority: e._empty,
							path: e._empty,
							query: e._empty,
							fragment: e._empty
						},
						r = e._regexp.exec(t);
					return r && (n.scheme = r[2] || n.scheme, n.authority = r[4] || n.authority, n.path = r[5] || n.path, n.query = r[7] || n.query, n.fragment = r[9] || n.fragment), n
				}, e.from = function(t)
				{
					return (new e).with(t)
				}, e._validate = function(t)
				{
					if (t.scheme && !e._schemePattern.test(t.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
					if (t.path)
						if (t.authority)
						{
							if (!e._singleSlashStart.test(t.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')
						}
						else if (e._doubleSlashStart.test(t.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')
				}, e.prototype.toString = function(t)
				{
					return void 0 === t && (t = !1), t ? e._asFormatted(this, !0) : (this._formatted || (this._formatted = e._asFormatted(this, !1)), this._formatted)
				}, e._asFormatted = function(t, n)
				{
					var s = n ? o : i,
						a = [],
						u = t.scheme,
						c = t.authority,
						l = t.path,
						f = t.query,
						p = t.fragment;
					if (u && a.push(u, ":"), (c || "file" === u) && a.push("//"), c)
					{
						c = c.toLowerCase();
						var h = c.indexOf(":");
						h === -1 ? a.push(s(c)) : a.push(s(c.substr(0, h)), c.substr(h))
					}
					if (l)
					{
						var d = e._upperCaseDrive.exec(l);
						d && (l = d[1] ? "/" + d[2].toLowerCase() + l.substr(3) : d[2].toLowerCase() + l.substr(2));
						for (var m = 0;;)
						{
							var h = l.indexOf(e._slash, m);
							if (h === -1)
							{
								a.push(s(l.substring(m)).replace(/[#?]/, r));
								break
							}
							a.push(s(l.substring(m, h)).replace(/[#?]/, r), e._slash), m = h + 1
						}
					}
					return f && a.push("?", s(f)), p && a.push("#", s(p)), a.join(e._empty)
				}, e.prototype.toJSON = function()
				{
					var e = {
						fsPath: this.fsPath,
						external: this.toString(),
						$mid: 1
					};
					return this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e
				}, e.revive = function(t)
				{
					var n = new e;
					return n._scheme = t.scheme || e._empty, n._authority = t.authority || e._empty, n._path = t.path || e._empty, n._query = t.query || e._empty, n._fragment = t.fragment || e._empty, n._fsPath = t.fsPath, n._formatted = t.external, e._validate(n), n
				}, e
			}();
			s._empty = "", s._slash = "/", s._regexp = /^(([^:\/?#]+?):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, s._driveLetterPath = /^\/[a-zA-z]:/, s._upperCaseDrive = /^(\/)?([A-Z]:)/, s._schemePattern = /^\w[\w\d+.-]*$/, s._singleSlashStart = /^\//, s._doubleSlashStart = /^\/\//, Object.defineProperty(t, "__esModule",
			{
				value: !0
			}), t.default = s
		}), define(e[28], t([1, 0]), function(e, t)
		{
			"use strict";

			function r()
			{
				return new u
			}

			function i(e)
			{
				return c.test(e)
			}

			function o(e)
			{
				if (!i(e)) throw new Error("invalid uuid");
				return new a(e)
			}

			function s()
			{
				return r().asHex()
			}
			var a = function()
				{
					function e(e)
					{
						this._value = e
					}
					return e.prototype.asHex = function()
					{
						return this._value
					}, e.prototype.equals = function(e)
					{
						return this.asHex() === e.asHex()
					}, e
				}(),
				u = function(e)
				{
					function t()
					{
						return e.call(this, [t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), "-", t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), "-", "4", t._randomHex(), t._randomHex(), t._randomHex(), "-", t._oneOf(t._timeHighBits), t._randomHex(), t._randomHex(), t._randomHex(), "-", t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex()].join("")) || this
					}
					return n(t, e), t._oneOf = function(e)
					{
						return e[Math.floor(e.length * Math.random())]
					}, t._randomHex = function()
					{
						return t._oneOf(t._chars)
					}, t
				}(a);
			u._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], u._timeHighBits = ["8", "9", "a", "b"], t.empty = new a("00000000-0000-0000-0000-000000000000"), t.v4 = r;
			var c = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
			t.isUUID = i, t.parse = o, t.generateUuid = s
		}),
		function()
		{
			var e = {};
			e["WinJS/Core/_WinJS"] = {};
			var t = function(t, n, r)
			{
				var i = {},
					o = !1,
					s = n.map(function(t)
					{
						return "exports" === t ? (o = !0, i) : e[t]
					}),
					a = r.apply(
					{}, s);
				e[t] = o ? i : a
			};
			t("WinJS/Core/_Global", [], function()
			{
				"use strict";
				var e = "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof global ? global :
				{};
				return e
			}), t("WinJS/Core/_BaseCoreUtils", ["WinJS/Core/_Global"], function(e)
			{
				"use strict";

				function t(e)
				{
					return e.supportedForProcessing = !0, e
				}
				var n = !!e.Windows;
				return {
					hasWinRT: n,
					markSupportedForProcessing: t,
					_setImmediate: e.setImmediate ? e.setImmediate.bind(e) : function(t)
					{
						e.setTimeout(t, 0)
					}
				}
			}), t("WinJS/Core/_WriteProfilerMark", ["WinJS/Core/_Global"], function(e)
			{
				"use strict";
				return e.msWriteProfilerMark || function() {}
			}), t("WinJS/Core/_Base", ["WinJS/Core/_WinJS", "WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_WriteProfilerMark"], function(e, t, n, r)
			{
				"use strict";

				function i(e, t, n)
				{
					var r, i, o, s = Object.keys(t),
						a = Array.isArray(e);
					for (i = 0, o = s.length; i < o; i++)
					{
						var u = s[i],
							c = 95 !== u.charCodeAt(0),
							l = t[u];
						!l || "object" != typeof l || void 0 === l.value && "function" != typeof l.get && "function" != typeof l.set ? c ? a ? e.forEach(function(e)
						{
							e[u] = l
						}) : e[u] = l : (r = r ||
						{}, r[u] = {
							value: l,
							enumerable: c,
							configurable: !0,
							writable: !0
						}) : (void 0 === l.enumerable && (l.enumerable = c), n && l.setName && "function" == typeof l.setName && l.setName(n + "." + u), r = r ||
						{}, r[u] = l)
					}
					r && (a ? e.forEach(function(e)
					{
						Object.defineProperties(e, r)
					}) : Object.defineProperties(e, r))
				}
				return function()
					{
						function n(n, r)
						{
							var i = n ||
							{};
							if (r)
							{
								var o = r.split(".");
								i === t && "WinJS" === o[0] && (i = e, o.splice(0, 1));
								for (var s = 0, a = o.length; s < a; s++)
								{
									var u = o[s];
									i[u] || Object.defineProperty(i, u,
									{
										value:
										{},
										writable: !1,
										enumerable: !0,
										configurable: !0
									}), i = i[u]
								}
							}
							return i
						}

						function o(e, t, r)
						{
							var o = n(e, t);
							return r && i(o, r, t || "<ANONYMOUS>"), o
						}

						function s(e, n)
						{
							return o(t, e, n)
						}

						function a(e)
						{
							var t, n, i = l.uninitialized;
							return {
								setName: function(e)
								{
									t = e
								},
								get: function()
								{
									switch (i)
									{
										case l.initialized:
											return n;
										case l.uninitialized:
											i = l.working;
											try
											{
												r("WinJS.Namespace._lazy:" + t + ",StartTM"), n = e()
											}
											finally
											{
												r("WinJS.Namespace._lazy:" + t + ",StopTM"), i = l.uninitialized
											}
											return e = null, i = l.initialized, n;
										case l.working:
											throw "Illegal: reentrancy on initialization";
										default:
											throw "Illegal"
									}
								},
								set: function(e)
								{
									switch (i)
									{
										case l.working:
											throw "Illegal: reentrancy on initialization";
										default:
											i = l.initialized, n = e
									}
								},
								enumerable: !0,
								configurable: !0
							}
						}

						function u(e, r, o)
						{
							var s = [e],
								a = null;
							return r && (a = n(t, r), s.push(a)), i(s, o, r || "<ANONYMOUS>"), a
						}
						var c = e;
						c.Namespace || (c.Namespace = Object.create(Object.prototype));
						var l = {
							uninitialized: 1,
							working: 2,
							initialized: 3
						};
						Object.defineProperties(c.Namespace,
						{
							defineWithParent:
							{
								value: o,
								writable: !0,
								enumerable: !0,
								configurable: !0
							},
							define:
							{
								value: s,
								writable: !0,
								enumerable: !0,
								configurable: !0
							},
							_lazy:
							{
								value: a,
								writable: !0,
								enumerable: !0,
								configurable: !0
							},
							_moduleDefine:
							{
								value: u,
								writable: !0,
								enumerable: !0,
								configurable: !0
							}
						})
					}(),
					function()
					{
						function t(e, t, r)
						{
							return e = e || function() {}, n.markSupportedForProcessing(e), t && i(e.prototype, t), r && i(e, r), e
						}

						function r(e, r, o, s)
						{
							if (e)
							{
								r = r || function() {};
								var a = e.prototype;
								return r.prototype = Object.create(a), n.markSupportedForProcessing(r), Object.defineProperty(r.prototype, "constructor",
								{
									value: r,
									writable: !0,
									configurable: !0,
									enumerable: !0
								}), o && i(r.prototype, o), s && i(r, s), r
							}
							return t(r, o, s)
						}

						function o(e)
						{
							e = e || function() {};
							var t, n;
							for (t = 1, n = arguments.length; t < n; t++) i(e.prototype, arguments[t]);
							return e
						}
						e.Namespace.define("WinJS.Class",
						{
							define: t,
							derive: r,
							mix: o
						})
					}(),
					{
						Namespace: e.Namespace,
						Class: e.Class
					}
			}), t("WinJS/Core/_ErrorFromName", ["WinJS/Core/_Base"], function(e)
			{
				"use strict";
				var t = e.Class.derive(Error, function(e, t)
				{
					this.name = e, this.message = t || e
				},
				{},
				{
					supportedForProcessing: !1
				});
				return e.Namespace.define("WinJS",
				{
					ErrorFromName: t
				}), t
			}), t("WinJS/Core/_Events", ["exports", "WinJS/Core/_Base"], function(e, t)
			{
				"use strict";

				function n(e)
				{
					var t = "_on" + e + "state";
					return {
						get: function()
						{
							var e = this[t];
							return e && e.userHandler
						},
						set: function(n)
						{
							var r = this[t];
							n ? (r || (r = {
								wrapper: function(e)
								{
									return r.userHandler(e)
								},
								userHandler: n
							}, Object.defineProperty(this, t,
							{
								value: r,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}), this.addEventListener(e, r.wrapper, !1)), r.userHandler = n) : r && (this.removeEventListener(e, r.wrapper, !1), this[t] = null)
						},
						enumerable: !0
					}
				}

				function r()
				{
					for (var e = {}, t = 0, r = arguments.length; t < r; t++)
					{
						var i = arguments[t];
						e["on" + i] = n(i)
					}
					return e
				}
				var i = t.Class.define(function(e, t, n)
					{
						this.detail = t, this.target = n, this.timeStamp = Date.now(), this.type = e
					},
					{
						bubbles:
						{
							value: !1,
							writable: !1
						},
						cancelable:
						{
							value: !1,
							writable: !1
						},
						currentTarget:
						{
							get: function()
							{
								return this.target
							}
						},
						defaultPrevented:
						{
							get: function()
							{
								return this._preventDefaultCalled
							}
						},
						trusted:
						{
							value: !1,
							writable: !1
						},
						eventPhase:
						{
							value: 0,
							writable: !1
						},
						target: null,
						timeStamp: null,
						type: null,
						preventDefault: function()
						{
							this._preventDefaultCalled = !0
						},
						stopImmediatePropagation: function()
						{
							this._stopImmediatePropagationCalled = !0
						},
						stopPropagation: function() {}
					},
					{
						supportedForProcessing: !1
					}),
					o = {
						_listeners: null,
						addEventListener: function(e, t, n)
						{
							n = n || !1, this._listeners = this._listeners ||
							{};
							for (var r = this._listeners[e] = this._listeners[e] || [], i = 0, o = r.length; i < o; i++)
							{
								var s = r[i];
								if (s.useCapture === n && s.listener === t) return
							}
							r.push(
							{
								listener: t,
								useCapture: n
							})
						},
						dispatchEvent: function(e, t)
						{
							var n = this._listeners && this._listeners[e];
							if (n)
							{
								var r = new i(e, t, this);
								n = n.slice(0, n.length);
								for (var o = 0, s = n.length; o < s && !r._stopImmediatePropagationCalled; o++) n[o].listener(r);
								return r.defaultPrevented || !1
							}
							return !1
						},
						removeEventListener: function(e, t, n)
						{
							n = n || !1;
							var r = this._listeners && this._listeners[e];
							if (r)
								for (var i = 0, o = r.length; i < o; i++)
								{
									var s = r[i];
									if (s.listener === t && s.useCapture === n)
									{
										r.splice(i, 1), 0 === r.length && delete this._listeners[e];
										break
									}
								}
						}
					};
				t.Namespace._moduleDefine(e, "WinJS.Utilities",
				{
					_createEventProperty: n,
					createEventProperties: r,
					eventMixin: o
				})
			}), t("WinJS/Core/_Trace", ["WinJS/Core/_Global"], function(e)
			{
				"use strict";

				function t(e)
				{
					return e
				}
				return {
					_traceAsyncOperationStarting: e.Debug && e.Debug.msTraceAsyncOperationStarting && e.Debug.msTraceAsyncOperationStarting.bind(e.Debug) || t,
					_traceAsyncOperationCompleted: e.Debug && e.Debug.msTraceAsyncOperationCompleted && e.Debug.msTraceAsyncOperationCompleted.bind(e.Debug) || t,
					_traceAsyncCallbackStarting: e.Debug && e.Debug.msTraceAsyncCallbackStarting && e.Debug.msTraceAsyncCallbackStarting.bind(e.Debug) || t,
					_traceAsyncCallbackCompleted: e.Debug && e.Debug.msTraceAsyncCallbackCompleted && e.Debug.msTraceAsyncCallbackCompleted.bind(e.Debug) || t
				}
			}), t("WinJS/Promise/_StateMachine", ["WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_Base", "WinJS/Core/_ErrorFromName", "WinJS/Core/_Events", "WinJS/Core/_Trace"], function(e, t, n, r, i, o)
			{
				"use strict";

				function s()
				{}

				function a(e, t)
				{
					var n;
					n = t && "object" == typeof t && "function" == typeof t.then ? L : U, e._value = t, e._setState(n)
				}

				function u(e, t, n, r, i, o)
				{
					return {
						exception: e,
						error: t,
						promise: n,
						handler: o,
						id: r,
						parent: i
					}
				}

				function c(e, t, n, r)
				{
					var i = n._isException,
						o = n._errorId;
					return u(i ? t : null, i ? null : t, e, o, n, r)
				}

				function l(e, t, n)
				{
					var r = n._isException,
						i = n._errorId;
					return _(e, i, r), u(r ? t : null, r ? null : t, e, i, n)
				}

				function f(e, t)
				{
					var n = ++z;
					return _(e, n), u(null, t, e, n)
				}

				function p(e, t)
				{
					var n = ++z;
					return _(e, n, !0), u(t, null, e, n)
				}

				function h(e, t, n, r)
				{
					var i = o._traceAsyncOperationStarting("WinJS.Promise.done");
					b(e,
					{
						c: t,
						e: n,
						p: r,
						asyncOpID: i
					})
				}

				function d(e, t, n, r)
				{
					e._value = t, g(e, t, n, r), e._setState(B)
				}

				function m(t, n)
				{
					var r = t._value,
						i = t._listeners;
					if (i)
					{
						t._listeners = null;
						var s, a;
						for (s = 0, a = Array.isArray(i) ? i.length : 1; s < a; s++)
						{
							var u = 1 === a ? i : i[s],
								c = u.c,
								l = u.promise;
							if (o._traceAsyncOperationCompleted(u.asyncOpID, e.Debug && e.Debug.MS_ASYNC_OP_STATUS_SUCCESS), l)
							{
								o._traceAsyncCallbackStarting(u.asyncOpID);
								try
								{
									l._setCompleteValue(c ? c(r) : r)
								}
								catch (e)
								{
									l._setExceptionValue(e)
								}
								finally
								{
									o._traceAsyncCallbackCompleted()
								}
								l._state !== L && l._listeners && n.push(l)
							}
							else K.prototype.done.call(t, c)
						}
					}
				}

				function v(t, n)
				{
					var r = t._value,
						i = t._listeners;
					if (i)
					{
						t._listeners = null;
						var s, a;
						for (s = 0, a = Array.isArray(i) ? i.length : 1; s < a; s++)
						{
							var u = 1 === a ? i : i[s],
								l = u.e,
								f = u.promise,
								p = e.Debug && (r && r.name === I ? e.Debug.MS_ASYNC_OP_STATUS_CANCELED : e.Debug.MS_ASYNC_OP_STATUS_ERROR);
							if (o._traceAsyncOperationCompleted(u.asyncOpID, p), f)
							{
								var h = !1;
								try
								{
									l ? (o._traceAsyncCallbackStarting(u.asyncOpID), h = !0, l.handlesOnError || g(f, r, c, t, l), f._setCompleteValue(l(r))) : f._setChainedErrorValue(r, t)
								}
								catch (e)
								{
									f._setExceptionValue(e)
								}
								finally
								{
									h && o._traceAsyncCallbackCompleted()
								}
								f._state !== L && f._listeners && n.push(f)
							}
							else G.prototype.done.call(t, null, l)
						}
					}
				}

				function g(e, t, n, r, i)
				{
					if (O._listeners[k])
					{
						if (t instanceof Error && t.message === I) return;
						O.dispatchEvent(k, n(e, t, r, i))
					}
				}

				function y(e, t)
				{
					var n = e._listeners;
					if (n)
					{
						var r, i;
						for (r = 0, i = Array.isArray(n) ? n.length : 1; r < i; r++)
						{
							var o = 1 === i ? n : n[r],
								s = o.p;
							if (s) try
							{
								s(t)
							}
							catch (e)
							{}
							o.c || o.e || !o.promise || o.promise._progress(t)
						}
					}
				}

				function b(e, t)
				{
					var n = e._listeners;
					n ? (n = Array.isArray(n) ? n : [n], n.push(t)) : n = t, e._listeners = n
				}

				function _(e, t, n)
				{
					e._isException = n || !1, e._errorId = t
				}

				function E(e, t, n, r)
				{
					e._value = t, g(e, t, n, r), e._setState(M)
				}

				function w(e, t)
				{
					var n;
					n = t && "object" == typeof t && "function" == typeof t.then ? L : W, e._value = t, e._setState(n)
				}

				function C(e, t, n, r)
				{
					var i = new H(e),
						s = o._traceAsyncOperationStarting("WinJS.Promise.then");
					return b(e,
					{
						promise: i,
						c: t,
						e: n,
						p: r,
						asyncOpID: s
					}), i
				}

				function S(n)
				{
					var r;
					return new $(function(i)
					{
						n ? r = e.setTimeout(i, n) : t._setImmediate(i)
					}, function()
					{
						r && e.clearTimeout(r)
					})
				}

				function x(e, t)
				{
					var n = function()
						{
							t.cancel()
						},
						r = function()
						{
							e.cancel()
						};
					return e.then(n), t.then(r, r), t
				}
				e.Debug && (e.Debug.setNonUserCodeExceptions = !0);
				var P = n.Class.mix(n.Class.define(null,
					{},
					{
						supportedForProcessing: !1
					}), i.eventMixin),
					O = new P;
				O._listeners = {};
				var k = "error",
					I = "Canceled",
					T = !1,
					D = {
						promise: 1,
						thenPromise: 2,
						errorPromise: 4,
						exceptionPromise: 8,
						completePromise: 16
					};
				D.all = D.promise | D.thenPromise | D.errorPromise | D.exceptionPromise | D.completePromise;
				var A, j, L, N, R, F, U, W, B, M, z = 1;
				A = {
					name: "created",
					enter: function(e)
					{
						e._setState(j)
					},
					cancel: s,
					done: s,
					then: s,
					_completed: s,
					_error: s,
					_notify: s,
					_progress: s,
					_setCompleteValue: s,
					_setErrorValue: s
				}, j = {
					name: "working",
					enter: s,
					cancel: function(e)
					{
						e._setState(R)
					},
					done: h,
					then: C,
					_completed: a,
					_error: d,
					_notify: s,
					_progress: y,
					_setCompleteValue: w,
					_setErrorValue: E
				}, L = {
					name: "waiting",
					enter: function(e)
					{
						var t = e._value;
						if (t instanceof H && t._state !== M && t._state !== W) b(t,
						{
							promise: e
						});
						else
						{
							var n = function(r)
							{
								t._errorId ? e._chainedError(r, t) : (g(e, r, c, t, n), e._error(r))
							};
							n.handlesOnError = !0, t.then(e._completed.bind(e), n, e._progress.bind(e))
						}
					},
					cancel: function(e)
					{
						e._setState(N)
					},
					done: h,
					then: C,
					_completed: a,
					_error: d,
					_notify: s,
					_progress: y,
					_setCompleteValue: w,
					_setErrorValue: E
				}, N = {
					name: "waiting_canceled",
					enter: function(e)
					{
						e._setState(F);
						var t = e._value;
						t.cancel && t.cancel()
					},
					cancel: s,
					done: h,
					then: C,
					_completed: a,
					_error: d,
					_notify: s,
					_progress: y,
					_setCompleteValue: w,
					_setErrorValue: E
				}, R = {
					name: "canceled",
					enter: function(e)
					{
						e._setState(F), e._cancelAction()
					},
					cancel: s,
					done: h,
					then: C,
					_completed: a,
					_error: d,
					_notify: s,
					_progress: y,
					_setCompleteValue: w,
					_setErrorValue: E
				}, F = {
					name: "canceling",
					enter: function(e)
					{
						var t = new Error(I);
						t.name = t.message, e._value = t, e._setState(B)
					},
					cancel: s,
					done: s,
					then: s,
					_completed: s,
					_error: s,
					_notify: s,
					_progress: s,
					_setCompleteValue: s,
					_setErrorValue: s
				}, U = {
					name: "complete_notify",
					enter: function(e)
					{
						if (e.done = K.prototype.done, e.then = K.prototype.then, e._listeners)
							for (var t, n = [e]; n.length;) t = n.shift(), t._state._notify(t, n);
						e._setState(W)
					},
					cancel: s,
					done: null,
					then: null,
					_completed: s,
					_error: s,
					_notify: m,
					_progress: s,
					_setCompleteValue: s,
					_setErrorValue: s
				}, W = {
					name: "success",
					enter: function(e)
					{
						e.done = K.prototype.done, e.then = K.prototype.then, e._cleanupAction()
					},
					cancel: s,
					done: null,
					then: null,
					_completed: s,
					_error: s,
					_notify: m,
					_progress: s,
					_setCompleteValue: s,
					_setErrorValue: s
				}, B = {
					name: "error_notify",
					enter: function(e)
					{
						if (e.done = G.prototype.done, e.then = G.prototype.then, e._listeners)
							for (var t, n = [e]; n.length;) t = n.shift(), t._state._notify(t, n);
						e._setState(M)
					},
					cancel: s,
					done: null,
					then: null,
					_completed: s,
					_error: s,
					_notify: v,
					_progress: s,
					_setCompleteValue: s,
					_setErrorValue: s
				}, M = {
					name: "error",
					enter: function(e)
					{
						e.done = G.prototype.done, e.then = G.prototype.then, e._cleanupAction()
					},
					cancel: s,
					done: null,
					then: null,
					_completed: s,
					_error: s,
					_notify: v,
					_progress: s,
					_setCompleteValue: s,
					_setErrorValue: s
				};
				var q, V = n.Class.define(null,
					{
						_listeners: null,
						_nextState: null,
						_state: null,
						_value: null,
						cancel: function()
						{
							this._state.cancel(this), this._run()
						},
						done: function(e, t, n)
						{
							this._state.done(this, e, t, n)
						},
						then: function(e, t, n)
						{
							return this._state.then(this, e, t, n)
						},
						_chainedError: function(e, t)
						{
							var n = this._state._error(this, e, l, t);
							return this._run(), n
						},
						_completed: function(e)
						{
							var t = this._state._completed(this, e);
							return this._run(), t
						},
						_error: function(e)
						{
							var t = this._state._error(this, e, f);
							return this._run(), t
						},
						_progress: function(e)
						{
							this._state._progress(this, e)
						},
						_setState: function(e)
						{
							this._nextState = e
						},
						_setCompleteValue: function(e)
						{
							this._state._setCompleteValue(this, e), this._run()
						},
						_setChainedErrorValue: function(e, t)
						{
							var n = this._state._setErrorValue(this, e, l, t);
							return this._run(), n
						},
						_setExceptionValue: function(e)
						{
							var t = this._state._setErrorValue(this, e, p);
							return this._run(), t
						},
						_run: function()
						{
							for (; this._nextState;) this._state = this._nextState, this._nextState = null, this._state.enter(this)
						}
					},
					{
						supportedForProcessing: !1
					}),
					H = n.Class.derive(V, function(e)
					{
						T && (T === !0 || T & D.thenPromise) && (this._stack = $._getStack()), this._creator = e, this._setState(A), this._run()
					},
					{
						_creator: null,
						_cancelAction: function()
						{
							this._creator && this._creator.cancel()
						},
						_cleanupAction: function()
						{
							this._creator = null
						}
					},
					{
						supportedForProcessing: !1
					}),
					G = n.Class.define(function(e)
					{
						T && (T === !0 || T & D.errorPromise) && (this._stack = $._getStack()), this._value = e, g(this, e, f)
					},
					{
						cancel: function() {},
						done: function(e, t)
						{
							var n = this._value;
							if (t) try
							{
								t.handlesOnError || g(null, n, c, this, t);
								var r = t(n);
								return void(r && "object" == typeof r && "function" == typeof r.done && r.done())
							}
							catch (e)
							{
								n = e
							}
							n instanceof Error && n.message === I || $._doneHandler(n)
						},
						then: function(e, t)
						{
							if (!t) return this;
							var n, r = this._value;
							try
							{
								t.handlesOnError || g(null, r, c, this, t), n = new K(t(r))
							}
							catch (e)
							{
								n = e === r ? this : new J(e)
							}
							return n
						}
					},
					{
						supportedForProcessing: !1
					}),
					J = n.Class.derive(G, function(e)
					{
						T && (T === !0 || T & D.exceptionPromise) && (this._stack = $._getStack()), this._value = e, g(this, e, p)
					},
					{},
					{
						supportedForProcessing: !1
					}),
					K = n.Class.define(function(e)
					{
						if (T && (T === !0 || T & D.completePromise) && (this._stack = $._getStack()), e && "object" == typeof e && "function" == typeof e.then)
						{
							var t = new H(null);
							return t._setCompleteValue(e), t
						}
						this._value = e
					},
					{
						cancel: function() {},
						done: function(e)
						{
							if (e) try
							{
								var t = e(this._value);
								t && "object" == typeof t && "function" == typeof t.done && t.done()
							}
							catch (e)
							{
								$._doneHandler(e)
							}
						},
						then: function(e)
						{
							try
							{
								var t = e ? e(this._value) : this._value;
								return t === this._value ? this : new K(t)
							}
							catch (e)
							{
								return new J(e)
							}
						}
					},
					{
						supportedForProcessing: !1
					}),
					$ = n.Class.derive(V, function(e, t)
					{
						T && (T === !0 || T & D.promise) && (this._stack = $._getStack()), this._oncancel = t, this._setState(A), this._run();
						try
						{
							var n = this._completed.bind(this),
								r = this._error.bind(this),
								i = this._progress.bind(this);
							e(n, r, i)
						}
						catch (e)
						{
							this._setExceptionValue(e)
						}
					},
					{
						_oncancel: null,
						_cancelAction: function()
						{
							try
							{
								if (!this._oncancel) throw new Error("Promise did not implement oncancel");
								this._oncancel()
							}
							catch (e)
							{
								e.message, e.stack;
								O.dispatchEvent("error", e)
							}
						},
						_cleanupAction: function()
						{
							this._oncancel = null
						}
					},
					{
						addEventListener: function(e, t, n)
						{
							O.addEventListener(e, t, n)
						},
						any: function(e)
						{
							return new $(function(t, n)
							{
								var r = Object.keys(e);
								0 === r.length && t();
								var i = 0;
								r.forEach(function(o)
								{
									$.as(e[o]).then(function()
									{
										t(
										{
											key: o,
											value: e[o]
										})
									}, function(s)
									{
										return s instanceof Error && s.name === I ? void(++i === r.length && t($.cancel)) : void n(
										{
											key: o,
											value: e[o]
										})
									})
								})
							}, function()
							{
								var t = Object.keys(e);
								t.forEach(function(t)
								{
									var n = $.as(e[t]);
									"function" == typeof n.cancel && n.cancel()
								})
							})
						},
						as: function(e)
						{
							return e && "object" == typeof e && "function" == typeof e.then ? e : new K(e)
						},
						cancel:
						{
							get: function()
							{
								return q = q || new G(new r(I))
							}
						},
						dispatchEvent: function(e, t)
						{
							return O.dispatchEvent(e, t)
						},
						is: function(e)
						{
							return e && "object" == typeof e && "function" == typeof e.then
						},
						join: function(e)
						{
							return new $(function(t, n, r)
							{
								var i = Object.keys(e),
									o = Array.isArray(e) ? [] :
									{},
									s = Array.isArray(e) ? [] :
									{},
									a = 0,
									u = i.length,
									c = function(e)
									{
										if (0 === --u)
										{
											var a = Object.keys(o).length;
											if (0 === a) t(s);
											else
											{
												var c = 0;
												i.forEach(function(e)
												{
													var t = o[e];
													t instanceof Error && t.name === I && c++
												}), c === a ? t($.cancel) : n(o)
											}
										}
										else r(
										{
											Key: e,
											Done: !0
										})
									};
								if (i.forEach(function(t)
									{
										var n = e[t];
										void 0 === n ? a++ : $.then(n, function(e)
										{
											s[t] = e, c(t)
										}, function(e)
										{
											o[t] = e, c(t)
										})
									}), u -= a, 0 === u) return void t(s)
							}, function()
							{
								Object.keys(e).forEach(function(t)
								{
									var n = $.as(e[t]);
									"function" == typeof n.cancel && n.cancel()
								})
							})
						},
						removeEventListener: function(e, t, n)
						{
							O.removeEventListener(e, t, n)
						},
						supportedForProcessing: !1,
						then: function(e, t, n, r)
						{
							return $.as(e).then(t, n, r)
						},
						thenEach: function(e, t, n, r)
						{
							var i = Array.isArray(e) ? [] :
							{};
							return Object.keys(e).forEach(function(o)
							{
								i[o] = $.as(e[o]).then(t, n, r)
							}), $.join(i)
						},
						timeout: function(e, t)
						{
							var n = S(e);
							return t ? x(n, t) : n
						},
						wrap: function(e)
						{
							return new K(e)
						},
						wrapError: function(e)
						{
							return new G(e)
						},
						_veryExpensiveTagWithStack:
						{
							get: function()
							{
								return T
							},
							set: function(e)
							{
								T = e
							}
						},
						_veryExpensiveTagWithStack_tag: D,
						_getStack: function()
						{
							if (e.Debug && e.Debug.debuggerEnabled) try
							{
								throw new Error
							}
							catch (e)
							{
								return e.stack
							}
						},
						_cancelBlocker: function(e, t)
						{
							if (!$.is(e)) return $.wrap(e);
							var n, r, i = new $(function(e, t)
							{
								n = e, r = t
							}, function()
							{
								n = null, r = null, t && t()
							});
							return e.then(function(e)
							{
								n && n(e)
							}, function(e)
							{
								r && r(e)
							}), i
						}
					});
				return Object.defineProperties($, i.createEventProperties(k)), $._doneHandler = function(e)
				{
					t._setImmediate(function()
					{
						throw e
					})
				},
				{
					PromiseStateMachine: V,
					Promise: $,
					state_created: A
				}
			}), t("WinJS/Promise", ["WinJS/Core/_Base", "WinJS/Promise/_StateMachine"], function(e, t)
			{
				"use strict";
				return e.Namespace.define("WinJS",
				{
					Promise: t.Promise
				}), t.Promise
			});
			var n = e["WinJS/Core/_WinJS"];
			"undefined" == typeof exports && "function" == typeof define && define.amd ? define("vs/base/common/winjs.base.raw", n) : module.exports = n, "undefined" != typeof process && "function" == typeof process.nextTick && (e["WinJS/Core/_BaseCoreUtils"]._setImmediate = function(e)
			{
				return process.nextTick(e)
			})
		}(), define(e[2], t([114, 7]), function(e, t)
		{
			"use strict";

			function n(e)
			{
				var n = e.detail,
					i = n.id;
				return n.parent ? void(n.handler && r && delete r[i]) : (r[i] = n, void(1 === Object.keys(r).length && setTimeout(function()
				{
					var e = r;
					r = {}, Object.keys(e).forEach(function(n)
					{
						var r = e[n];
						r.exception ? t.onUnexpectedError(r.exception) : r.error && t.onUnexpectedError(r.error), console.log("WARNING: Promise with no error callback:" + r.id), console.log(r), r.exception && console.log(r.exception.stack)
					})
				}, 0)))
			}
			var r = {};
			return e.Promise.addEventListener("error", n),
			{
				Promise: e.Promise,
				TPromise: e.Promise,
				PPromise: e.Promise
			}
		}), define(e[55], t([1, 0, 2, 38, 51, 4]), function(e, t, r, i, o, s)
		{
			"use strict";

			function a(e)
			{
				return !!e && (e instanceof u || "string" == typeof e.id && ("string" == typeof e.label && ("string" == typeof e.class && ("boolean" == typeof e.enabled && ("boolean" == typeof e.checked && "function" == typeof e.run)))))
			}
			t.isAction = a;
			var u = function()
			{
				function e(e, t, n, r, i)
				{
					void 0 === t && (t = ""), void 0 === n && (n = ""), void 0 === r && (r = !0), this._onDidChange = new s.Emitter, this._id = e, this._label = t, this._cssClass = n, this._enabled = r, this._actionCallback = i
				}
				return e.prototype.dispose = function()
				{
					this._onDidChange.dispose()
				}, Object.defineProperty(e.prototype, "onDidChange",
				{
					get: function()
					{
						return this._onDidChange.event
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "id",
				{
					get: function()
					{
						return this._id
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "label",
				{
					get: function()
					{
						return this._label
					},
					set: function(e)
					{
						this._setLabel(e)
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype._setLabel = function(e)
				{
					this._label !== e && (this._label = e, this._onDidChange.fire(
					{
						label: e
					}))
				}, Object.defineProperty(e.prototype, "tooltip",
				{
					get: function()
					{
						return this._tooltip
					},
					set: function(e)
					{
						this._setTooltip(e)
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype._setTooltip = function(e)
				{
					this._tooltip !== e && (this._tooltip = e, this._onDidChange.fire(
					{
						tooltip: e
					}))
				}, Object.defineProperty(e.prototype, "class",
				{
					get: function()
					{
						return this._cssClass
					},
					set: function(e)
					{
						this._setClass(e)
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype._setClass = function(e)
				{
					this._cssClass !== e && (this._cssClass = e, this._onDidChange.fire(
					{
						class: e
					}))
				}, Object.defineProperty(e.prototype, "enabled",
				{
					get: function()
					{
						return this._enabled
					},
					set: function(e)
					{
						this._setEnabled(e)
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype._setEnabled = function(e)
				{
					this._enabled !== e && (this._enabled = e, this._onDidChange.fire(
					{
						enabled: e
					}))
				}, Object.defineProperty(e.prototype, "checked",
				{
					get: function()
					{
						return this._checked
					},
					set: function(e)
					{
						this._setChecked(e)
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "radio",
				{
					get: function()
					{
						return this._radio
					},
					set: function(e)
					{
						this._setRadio(e)
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype._setChecked = function(e)
				{
					this._checked !== e && (this._checked = e, this._onDidChange.fire(
					{
						checked: e
					}))
				}, e.prototype._setRadio = function(e)
				{
					this._radio !== e && (this._radio = e, this._onDidChange.fire(
					{
						radio: e
					}))
				}, Object.defineProperty(e.prototype, "order",
				{
					get: function()
					{
						return this._order
					},
					set: function(e)
					{
						this._order = e
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.run = function(e)
				{
					return void 0 !== this._actionCallback ? this._actionCallback(e) : r.TPromise.as(!0)
				}, e
			}();
			t.Action = u;
			var c = function(e)
			{
				function t()
				{
					return null !== e && e.apply(this, arguments) || this
				}
				return n(t, e), t.prototype.run = function(e, t)
				{
					var n = this;
					return e.enabled ? (this.emit(o.EventType.BEFORE_RUN,
					{
						action: e
					}), r.TPromise.as(e.run(t)).then(function(t)
					{
						n.emit(o.EventType.RUN,
						{
							action: e,
							result: t
						})
					}, function(t)
					{
						n.emit(o.EventType.RUN,
						{
							action: e,
							error: t
						})
					})) : r.TPromise.as(null)
				}, t
			}(i.EventEmitter);
			t.ActionRunner = c
		}), define(e[24], t([1, 0, 7, 11, 2, 76, 12, 4]), function(e, t, r, i, o, s, a, u)
		{
			"use strict";

			function c(e)
			{
				return e && "function" == typeof e.then
			}

			function l(e)
			{
				return c(e) ? e : o.TPromise.as(e)
			}

			function f(e)
			{
				var t = new s.CancellationTokenSource;
				return new o.TPromise(function(n, r, i)
				{
					var s = e(t.token);
					s instanceof o.TPromise ? s.then(n, r, i) : c(s) ? s.then(n, r) : n(s)
				}, function()
				{
					t.cancel()
				})
			}

			function p(e, t, n)
			{
				var i = e.onCancellationRequested(function()
				{
					return t.cancel()
				});
				return n && (t = t.then(void 0, function(e)
				{
					if (!r.isPromiseCanceledError(e)) return o.TPromise.wrapError(e)
				})), h(t, function()
				{
					return i.dispose()
				})
			}

			function h(e, t)
			{
				return new o.TPromise(function(n, i, o)
				{
					e.done(function(e)
					{
						try
						{
							t(e)
						}
						catch (e)
						{
							r.onUnexpectedError(e)
						}
						n(e)
					}, function(e)
					{
						try
						{
							t(e)
						}
						catch (e)
						{
							r.onUnexpectedError(e)
						}
						i(e)
					}, function(e)
					{
						o(e)
					})
				}, function()
				{
					e.cancel()
				})
			}

			function d(e)
			{
				function t()
				{
					return e.length ? e.pop()() : null
				}

				function n(e)
				{
					void 0 !== e && null !== e && r.push(e);
					var i = t();
					return i ? i.then(n) : o.TPromise.as(r)
				}
				var r = [];
				return e = e.reverse(), o.TPromise.as(null).then(n)
			}

			function m(e, t)
			{
				void 0 === t && (t = function(e)
				{
					return !!e
				}), e = e.reverse().slice();
				var n = function()
				{
					if (0 === e.length) return o.TPromise.as(null);
					var r = e.pop(),
						i = r();
					return i.then(function(e)
					{
						return t(e) ? o.TPromise.as(e) : n()
					})
				};
				return n()
			}

			function v(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				return new o.Promise(function(n, r)
				{
					return e.apply(void 0, t.concat([function(e, t)
					{
						return e ? r(e) : n(t)
					}]))
				})
			}

			function g(e, t)
			{
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				return new o.Promise(function(r, i)
				{
					return t.call.apply(t, [e].concat(n, [function(e, t)
					{
						return e ? i(e) : r(t)
					}]))
				})
			}
			t.toThenable = l, t.asWinJsPromise = f, t.wireCancellationToken = p;
			var y = function()
			{
				function e()
				{
					this.activePromise = null, this.queuedPromise = null, this.queuedPromiseFactory = null
				}
				return e.prototype.queue = function(e)
				{
					var t = this;
					if (this.activePromise)
					{
						if (this.queuedPromiseFactory = e, !this.queuedPromise)
						{
							var n = function()
							{
								t.queuedPromise = null;
								var e = t.queue(t.queuedPromiseFactory);
								return t.queuedPromiseFactory = null, e
							};
							this.queuedPromise = new o.Promise(function(e, r, i)
							{
								t.activePromise.then(n, n, i).done(e)
							}, function()
							{
								t.activePromise.cancel()
							})
						}
						return new o.Promise(function(e, n, r)
						{
							t.queuedPromise.then(e, n, r)
						}, function() {})
					}
					return this.activePromise = e(), new o.Promise(function(e, n, r)
					{
						t.activePromise.done(function(n)
						{
							t.activePromise = null, e(n)
						}, function(e)
						{
							t.activePromise = null, n(e)
						}, r)
					}, function()
					{
						t.activePromise.cancel()
					})
				}, e
			}();
			t.Throttler = y;
			var b = function()
			{
				function e()
				{
					this.current = o.TPromise.as(null)
				}
				return e.prototype.queue = function(e)
				{
					return this.current = this.current.then(function()
					{
						return e()
					})
				}, e
			}();
			t.SimpleThrottler = b;
			var _ = function()
			{
				function e(e)
				{
					this.defaultDelay = e, this.timeout = null, this.completionPromise = null, this.onSuccess = null, this.task = null
				}
				return e.prototype.trigger = function(e, t)
				{
					var n = this;
					return void 0 === t && (t = this.defaultDelay), this.task = e, this.cancelTimeout(), this.completionPromise || (this.completionPromise = new o.Promise(function(e)
					{
						n.onSuccess = e
					}, function() {}).then(function()
					{
						n.completionPromise = null, n.onSuccess = null;
						var e = n.task;
						return n.task = null, e()
					})), this.timeout = setTimeout(function()
					{
						n.timeout = null, n.onSuccess(null)
					}, t), this.completionPromise
				}, e.prototype.isTriggered = function()
				{
					return null !== this.timeout
				}, e.prototype.cancel = function()
				{
					this.cancelTimeout(), this.completionPromise && (this.completionPromise.cancel(), this.completionPromise = null)
				}, e.prototype.cancelTimeout = function()
				{
					null !== this.timeout && (clearTimeout(this.timeout), this.timeout = null)
				}, e
			}();
			t.Delayer = _;
			var E = function(e)
			{
				function t(t)
				{
					var n = e.call(this, t) || this;
					return n.throttler = new y, n
				}
				return n(t, e), t.prototype.trigger = function(t, n)
				{
					var r = this;
					return e.prototype.trigger.call(this, function()
					{
						return r.throttler.queue(t)
					}, n)
				}, t
			}(_);
			t.ThrottledDelayer = E;
			var w = function(e)
			{
				function t(t, n)
				{
					void 0 === n && (n = 0);
					var r = e.call(this, t) || this;
					return r.minimumPeriod = n, r.periodThrottler = new y, r
				}
				return n(t, e), t.prototype.trigger = function(t, n)
				{
					var r = this;
					return e.prototype.trigger.call(this, function()
					{
						return r.periodThrottler.queue(function()
						{
							return o.Promise.join([o.TPromise.timeout(r.minimumPeriod), t()]).then(function(e)
							{
								return e[1]
							})
						})
					}, n)
				}, t
			}(E);
			t.PeriodThrottledDelayer = w;
			var C = function()
			{
				function e()
				{
					var e = this;
					this._value = new o.TPromise(function(t, n)
					{
						e._completeCallback = t, e._errorCallback = n
					})
				}
				return Object.defineProperty(e.prototype, "value",
				{
					get: function()
					{
						return this._value
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.complete = function(e)
				{
					this._completeCallback(e)
				}, e.prototype.error = function(e)
				{
					this._errorCallback(e)
				}, e
			}();
			t.PromiseSource = C;
			var S = function(e)
			{
				function t(t)
				{
					var n, i, o, s = this;
					return s = e.call(this, function(e, t, r)
					{
						n = e, i = t, o = r
					}, function()
					{
						i(r.canceled())
					}) || this, t.then(n, i, o), s
				}
				return n(t, e), t
			}(o.TPromise);
			t.ShallowCancelThenPromise = S, t.always = h, t.sequence = d, t.first = m;
			var x = function()
			{
				function e(e)
				{
					this.maxDegreeOfParalellism = e, this.outstandingPromises = [], this.runningPromises = 0, this._onFinished = new u.Emitter
				}
				return Object.defineProperty(e.prototype, "onFinished",
				{
					get: function()
					{
						return this._onFinished.event
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.queue = function(e)
				{
					var t = this;
					return new o.TPromise(function(n, r, i)
					{
						t.outstandingPromises.push(
						{
							factory: e,
							c: n,
							e: r,
							p: i
						}), t.consume()
					})
				}, e.prototype.consume = function()
				{
					for (var e = this; this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism;)
					{
						var t = this.outstandingPromises.shift();
						this.runningPromises++;
						var n = t.factory();
						n.done(t.c, t.e, t.p), n.done(function()
						{
							return e.consumed()
						}, function()
						{
							return e.consumed()
						})
					}
				}, e.prototype.consumed = function()
				{
					this.runningPromises--, this.outstandingPromises.length > 0 ? this.consume() : this._onFinished.fire()
				}, e.prototype.dispose = function()
				{
					this._onFinished.dispose()
				}, e
			}();
			t.Limiter = x;
			var P = function(e)
			{
				function t()
				{
					return e.call(this, 1) || this
				}
				return n(t, e), t
			}(x);
			t.Queue = P;
			var O = function(e)
			{
				function t()
				{
					var t = e.call(this) || this;
					return t._token = -1, t
				}
				return n(t, e), t.prototype.dispose = function()
				{
					this.cancel(), e.prototype.dispose.call(this)
				}, t.prototype.cancel = function()
				{
					this._token !== -1 && (i.clearTimeout(this._token), this._token = -1)
				}, t.prototype.cancelAndSet = function(e, t)
				{
					var n = this;
					this.cancel(), this._token = i.setTimeout(function()
					{
						n._token = -1, e()
					}, t)
				}, t.prototype.setIfNotSet = function(e, t)
				{
					var n = this;
					this._token === -1 && (this._token = i.setTimeout(function()
					{
						n._token = -1, e()
					}, t))
				}, t
			}(a.Disposable);
			t.TimeoutTimer = O;
			var k = function(e)
			{
				function t()
				{
					var t = e.call(this) || this;
					return t._token = -1, t
				}
				return n(t, e), t.prototype.dispose = function()
				{
					this.cancel(), e.prototype.dispose.call(this)
				}, t.prototype.cancel = function()
				{
					this._token !== -1 && (i.clearInterval(this._token), this._token = -1)
				}, t.prototype.cancelAndSet = function(e, t)
				{
					this.cancel(), this._token = i.setInterval(function()
					{
						e()
					}, t)
				}, t
			}(a.Disposable);
			t.IntervalTimer = k;
			var I = function()
			{
				function e(e, t)
				{
					this.timeoutToken = -1, this.runner = e, this.timeout = t, this.timeoutHandler = this.onTimeout.bind(this)
				}
				return e.prototype.dispose = function()
				{
					this.cancel(), this.runner = null
				}, e.prototype.cancel = function()
				{
					this.isScheduled() && (i.clearTimeout(this.timeoutToken), this.timeoutToken = -1)
				}, e.prototype.setRunner = function(e)
				{
					this.runner = e
				}, e.prototype.schedule = function(e)
				{
					void 0 === e && (e = this.timeout), this.cancel(), this.timeoutToken = i.setTimeout(this.timeoutHandler, e)
				}, e.prototype.isScheduled = function()
				{
					return this.timeoutToken !== -1
				}, e.prototype.onTimeout = function()
				{
					this.timeoutToken = -1, this.runner && this.runner()
				}, e
			}();
			t.RunOnceScheduler = I, t.nfcall = v, t.ninvoke = g
		}), define(e[71], t([1, 0, 4]), function(e, t, n)
		{
			"use strict";

			function r(e, t, r)
			{
				void 0 === r && (r = function(e)
				{
					return e
				});
				var i = function()
					{
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						return a.fire(r.apply(void 0, e))
					},
					o = function()
					{
						return e.on(t, i)
					},
					s = function()
					{
						return e.removeListener(t, i)
					},
					a = new n.Emitter(
					{
						onFirstListenerAdd: o,
						onLastListenerRemove: s
					});
				return a.event
			}
			t.fromEventEmitter = r
		}), define(e[72], t([1, 0, 113]), function(e, t, n)
		{
			"use strict";

			function r(e, t, n)
			{
				var r = new Array(e.length),
					i = new Array(e.length),
					o = !1,
					s = 0;
				return 0 === e.length ? n(null, []) : void e.forEach(function(a, u)
				{
					t(a, function(t, a)
					{
						if (t ? (o = !0, r[u] = null, i[u] = t) : (r[u] = a, i[u] = null), ++s === e.length) return n(o ? i : null, r)
					})
				})
			}

			function i(e, t, r)
			{
				if (n.ok(e, "Missing first parameter"), n.ok("function" == typeof t, "Second parameter must be a function that is called for each element"), n.ok("function" == typeof r, "Third parameter must be a function that is called on error and success"), "function" == typeof e) try
				{
					e(function(e, n)
					{
						e ? r(e, null) : i(n, t, r)
					})
				}
				catch (e)
				{
					r(e, null)
				}
				else
				{
					var o = [],
						s = function(n)
						{
							if (n < e.length) try
							{
								t(e[n], function(e, t)
								{
									e !== !0 && e !== !1 || (t = e, e = null), e ? r(e, null) : (t && o.push(t), process.nextTick(function()
									{
										s(n + 1)
									}))
								}, n, e.length)
							}
							catch (e)
							{
								r(e, null)
							}
							else r(null, o)
						};
					s(0)
				}
			}

			function o(e)
			{
				n.ok(e.length > 1, "Need at least one error handler and one function to process sequence"), e.forEach(function(e)
				{
					n.ok("function" == typeof e)
				});
				var t = e.splice(0, 1)[0],
					r = null;
				i(e, function(e, t)
				{
					var n = function(e, n)
					{
						e !== !0 && e !== !1 || (n = e, e = null), e ? t(e, null) : (r = n, t(null, null))
					};
					try
					{
						e.call(n, r)
					}
					catch (e)
					{
						t(e, null)
					}
				}, function(e, n)
				{
					e && t(e)
				})
			}

			function s(e)
			{
				o(Array.isArray(e) ? e : Array.prototype.slice.call(arguments))
			}
			t.parallel = r, t.loop = i, t.sequence = s
		}), define(e[74], t([1, 0, 28, 14, 11, 72, 19, 10]), function(e, t, n, r, i, o, s, a)
		{
			"use strict";

			function u(e)
			{
				return i.isMacintosh ? s.readdirSync(e).map(function(e)
				{
					return r.normalizeNFC(e)
				}) : s.readdirSync(e)
			}

			function c(e, t)
			{
				return i.isMacintosh ? s.readdir(e, function(e, n)
				{
					return e ? t(e, null) : t(null, n.map(function(e)
					{
						return r.normalizeNFC(e)
					}))
				}) : s.readdir(e, t)
			}

			function l(e, t, n)
			{
				s.exists(e, function(r)
				{
					return r ? f(e, function(t, r)
					{
						return t ? n(t) : r ? void n(null) : n(new Error('"' + e + '" is not a directory.'))
					}) : void l(a.dirname(e), t, function(r)
					{
						return r ? void n(r) : void(t ? s.mkdir(e, t, function(r)
						{
							return r ? n(r) : void s.chmod(e, t, n)
						}) : s.mkdir(e, null, n))
					})
				})
			}

			function f(e, t)
			{
				s.stat(e, function(e, n)
				{
					return e ? t(e) : void t(null, n.isDirectory())
				})
			}

			function p(e, t, n, r)
			{
				r || (r = Object.create(null)), s.stat(e, function(i, o)
				{
					return i ? n(i) : o.isDirectory() ? r[e] ? n(null) : (r[e] = !0, void l(t, 511 & o.mode, function(i)
					{
						c(e, function(i, o)
						{
							b(o, function(n, i)
							{
								p(a.join(e, n), a.join(t, n), i, r)
							}, n)
						})
					})) : h(e, t, 511 & o.mode, n)
				})
			}

			function h(e, t, n, r)
			{
				var i = !1,
					o = s.createReadStream(e),
					a = s.createWriteStream(t,
					{
						mode: n
					}),
					u = function(e)
					{
						i || (i = !0, r(e))
					};
				o.on("error", u), a.on("error", u), o.on("end", function()
				{
					a.end(function()
					{
						i || (i = !0, s.chmod(t, n, r))
					})
				}), o.pipe(a,
				{
					end: !1
				})
			}

			function d(e, t, i, o)
			{
				s.exists(e, function(u)
				{
					return u ? void s.stat(e, function(u, c)
					{
						if (u || !c) return i(u);
						if ("." === e[e.length - 1] || r.endsWith(e, "./") || r.endsWith(e, ".\\")) return m(e, i);
						var l = a.join(t, n.generateUuid());
						s.rename(e, l, function(t)
						{
							return t ? m(e, i) : (i(null), void m(l, function(e)
							{
								e && console.error(e), o && o(e)
							}))
						})
					}) : i(null)
				})
			}

			function m(e, t)
			{
				return "\\" === e || "/" === e ? t(new Error("Will not delete root!")) : void s.exists(e, function(n)
				{
					n ? s.lstat(e, function(n, r)
					{
						if (n || !r) t(n);
						else if (!r.isDirectory() || r.isSymbolicLink())
						{
							var i = r.mode;
							128 & i ? s.unlink(e, t) : s.chmod(e, 128 | i, function(n)
							{
								n ? t(n) : s.unlink(e, t)
							})
						}
						else c(e, function(n, r)
						{
							if (n || !r) t(n);
							else if (0 === r.length) s.rmdir(e, t);
							else
							{
								var i = null,
									o = r.length;
								r.forEach(function(n)
								{
									m(a.join(e, n), function(n)
									{
										o--, n && (i = i || n), 0 === o && (i ? t(i) : s.rmdir(e, t))
									})
								})
							}
						})
					}) : t(null)
				})
			}

			function v(e)
			{
				try
				{
					var t = s.lstatSync(e);
					t.isDirectory() && !t.isSymbolicLink() ? (u(e).forEach(function(t)
					{
						return v(a.join(e, t))
					}), s.rmdirSync(e)) : s.unlinkSync(e)
				}
				catch (e)
				{
					if ("ENOENT" === e.code) return;
					throw e
				}
			}

			function g(e, t, n)
			{
				function i(e)
				{
					return e ? n(e) : void s.stat(t, function(e, r)
					{
						return e ? n(e) : r.isDirectory() ? n(null) : void s.open(t, "a", null, function(e, t)
						{
							return e ? n(e) : void s.futimes(t, r.atime, new Date, function(e)
							{
								return e ? n(e) : void s.close(t, n)
							})
						})
					})
				}
				return e === t ? n(null) : void s.rename(e, t, function(o)
				{
					return o ? o && e.toLowerCase() !== t.toLowerCase() && "EXDEV" === o.code || r.endsWith(e, ".") ? p(e, t, function(t)
					{
						return t ? n(t) : void m(e, i)
					}) : n(o) : i(null)
				})
			}

			function y(e, t, n, r)
			{
				return _ ? (n ? "string" == typeof n && (n = {
					encoding: n,
					mode: 438,
					flag: "w"
				}) : n = {
					encoding: "utf8",
					mode: 438,
					flag: "w"
				}, void s.open(e, n.flag, n.mode, function(e, i)
				{
					return e ? r(e) : void s.writeFile(i, t, n.encoding, function(e)
					{
						return e ? s.close(i, function()
						{
							return r(e)
						}) : void s.fdatasync(i, function(e)
						{
							return e && (console.warn("[node.js fs] fdatasync is now disabled for this session because it failed: ", e), _ = !1), s.close(i, function(e)
							{
								return r(e)
							})
						})
					})
				})) : s.writeFile(e, t, n, r)
			}
			var b = o.loop;
			t.readdirSync = u, t.readdir = c, t.mkdirp = l, t.copy = p, t.del = d, t.delSync = v, t.mv = g;
			var _ = !0;
			t.writeFileAndFlush = y
		}), define(e[80], t([1, 0, 109, 36, 2, 7, 28, 18, 26]), function(e, t, n, r, i, o, s, a, u)
		{
			"use strict";

			function c()
			{
				return f.value
			}

			function l()
			{
				return new i.TPromise(function(e)
				{
					try
					{
						n.getMac(function(t, n)
						{
							e(t ? s.generateUuid() : r.createHash("sha256").update(n, "utf8").digest("hex"))
						})
					}
					catch (t)
					{
						o.onUnexpectedError(t), e(s.generateUuid())
					}
				})
			}
			t.virtualMachineHint = new(function()
			{
				function e()
				{}
				return e.prototype._isVirtualMachineMacAdress = function(e)
				{
					return this._virtualMachineOUIs || (this._virtualMachineOUIs = new u.TrieMap(function(e)
					{
						return e.split(/[-:]/)
					}), this._virtualMachineOUIs.insert("00-50-56", !0), this._virtualMachineOUIs.insert("00-0C-29", !0), this._virtualMachineOUIs.insert("00-05-69", !0), this._virtualMachineOUIs.insert("00-03-FF", !0), this._virtualMachineOUIs.insert("00-1C-42", !0)), this._virtualMachineOUIs.findSubstr(e)
				}, e.prototype.value = function()
				{
					if (void 0 === this._value)
					{
						var e = 0,
							t = 0,
							n = a.networkInterfaces();
						for (var r in n)
							if (Object.prototype.hasOwnProperty.call(n, r))
								for (var i = 0, o = n[r]; i < o.length; i++)
								{
									var s = o[i],
										u = s.mac,
										c = s.internal;
									c || (t += 1, this._isVirtualMachineMacAdress(u.toUpperCase()) && (e += 1))
								}
							this._value = t > 0 ? e / t : 0
					}
					return this._value
				}, e
			}());
			var f = new(function()
			{
				function e()
				{}
				return Object.defineProperty(e.prototype, "value",
				{
					get: function()
					{
						return void 0 === this._value && this._initValue(), this._value
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype._initValue = function()
				{
					this._value = null;
					var e = a.networkInterfaces();
					for (var t in e)
						for (var n = 0, i = e[t]; n < i.length; n++)
						{
							var o = i[n];
							if (!o.internal) return void(this._value = r.createHash("sha256").update(o.mac, "utf8").digest("hex"))
						}
					this._value = "missing-" + s.generateUuid()
				}, e
			}());
			t._futureMachineIdExperiment = c, t.getMachineId = l
		}), define(e[87], t([1, 0, 17]), function(e, t, n)
		{
			"use strict";
			var r = n.default.parse(e.toUrl("paths")).fsPath,
				i = e.__$__nodeRequire(r);
			t.getAppDataPath = i.getAppDataPath, t.getDefaultUserDataPath = i.getDefaultUserDataPath
		}), define(e[34], t([1, 0, 2, 74, 15, 10, 24, 19, 18, 11, 4]), function(e, t, n, r, i, o, s, a, u, c, l)
		{
			"use strict";

			function f(e)
			{
				return s.nfcall(r.readdir, e)
			}

			function p(e)
			{
				return new n.Promise(function(t)
				{
					return a.exists(e, t)
				})
			}

			function h(e, t)
			{
				return s.nfcall(a.chmod, e, t)
			}

			function d(e, t)
			{
				var r = function()
				{
					return s.nfcall(a.mkdir, e, t).then(null, function(t)
					{
						return "EEXIST" === t.code ? s.nfcall(a.stat, e).then(function(t)
						{
							return t.isDirectory ? null : n.Promise.wrapError(new Error("'" + e + "' exists and is not a directory."))
						}) : n.TPromise.wrapError(t)
					})
				};
				return e === o.dirname(e) ? n.TPromise.as(!0) : r().then(null, function(i)
				{
					return "ENOENT" === i.code ? d(o.dirname(e), t).then(r) : n.TPromise.wrapError(i)
				})
			}

			function m(e)
			{
				return y(e).then(function(t)
				{
					return t.isDirectory() && !t.isSymbolicLink() ? f(e).then(function(t)
					{
						return n.TPromise.join(t.map(function(t)
						{
							return m(o.join(e, t))
						}))
					}).then(function()
					{
						return _(e)
					}) : E(e)
				}, function(e)
				{
					if ("ENOENT" !== e.code) return n.TPromise.wrapError(e)
				})
			}

			function v(e)
			{
				return s.nfcall(a.realpath, e, null)
			}

			function g(e)
			{
				return s.nfcall(a.stat, e)
			}

			function y(e)
			{
				return s.nfcall(a.lstat, e)
			}

			function b(e, t)
			{
				return s.nfcall(a.rename, e, t)
			}

			function _(e)
			{
				return s.nfcall(a.rmdir, e)
			}

			function E(e)
			{
				return s.nfcall(a.unlink, e)
			}

			function w(e, t, n)
			{
				return s.nfcall(a.symlink, e, t, n)
			}

			function C(e)
			{
				return s.nfcall(a.readlink, e)
			}

			function S(e)
			{
				var t = Date.now() / 1e3;
				return s.nfcall(a.utimes, e, t, t)
			}

			function x(e, t)
			{
				return s.nfcall(a.readFile, e, t)
			}

			function P(e, t, n)
			{
				void 0 === n && (n = "utf8");
				var i = O(e);
				return k(i).queue(function()
				{
					return s.nfcall(r.writeFileAndFlush, e, t, n)
				})
			}

			function O(e)
			{
				var t = e;
				return (c.isWindows || c.isMacintosh) && (t = t.toLowerCase()), t
			}

			function k(e)
			{
				var t = j[e];
				if (!t)
				{
					t = new s.Queue, j[e] = t;
					var n = l.once(t.onFinished);
					n(function()
					{
						delete j[e], t.dispose()
					})
				}
				return t
			}

			function I(e)
			{
				return f(e).then(function(t)
				{
					return n.TPromise.join(t.map(function(t)
					{
						return T(i.join(e, t))
					})).then(function(e)
					{
						return t.filter(function(t, n)
						{
							return e[n]
						})
					})
				})
			}

			function T(e)
			{
				return g(e).then(function(e)
				{
					return e.isDirectory()
				}, function()
				{
					return !1
				})
			}

			function D(e)
			{
				return g(e).then(function(e)
				{
					return e.isFile()
				}, function()
				{
					return !1
				})
			}

			function A(e, t)
			{
				return void 0 === t && (t = L), s.nfcall(r.del, e, t)
			}
			t.readdir = f, t.exists = p, t.chmod = h, t.mkdirp = d, t.rimraf = m, t.realpath = v, t.stat = g, t.lstat = y, t.rename = b, t.rmdir = _, t.unlink = E, t.symlink = w, t.readlink = C, t.touch = S, t.readFile = x;
			var j = Object.create(null);
			t.writeFile = P, t.readDirsInDir = I, t.dirExists = T, t.fileExists = D;
			var L = u.tmpdir();
			t.del = A
		}), define(e[92], t([1, 0, 93, 6, 108, 106]), function(e, t, n, r, i, o)
		{
			"use strict";

			function s(e)
			{
				return "http:" === e.protocol ? process.env.HTTP_PROXY || process.env.http_proxy || null : "https:" === e.protocol ? process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null : null
			}

			function a(e, t)
			{
				void 0 === t && (t = {});
				var a = n.parse(e),
					u = t.proxyUrl || s(a);
				if (!u) return null;
				var c = n.parse(u);
				if (!/^https?:$/.test(c.protocol)) return null;
				var l = {
					host: c.hostname,
					port: Number(c.port),
					auth: c.auth,
					rejectUnauthorized: !r.isBoolean(t.strictSSL) || t.strictSSL
				};
				return "http:" === a.protocol ? new i(l) : new o(l)
			}
			t.getProxyAgent = a
		}), define(e[25], t([1, 0, 2, 12, 4]), function(e, t, n, r, i)
		{
			"use strict";

			function o(e)
			{
				return e >= l.ResponseInitialize
			}

			function s(e)
			{
				var t = function(t, n)
				{
					return e.then(function(e)
					{
						return e.call(t, n)
					})
				};
				return {
					call: t
				}
			}

			function a(e)
			{
				var t = !1,
					r = function(r, i)
					{
						return t ? e.call(r, i) : n.TPromise.timeout(0).then(function()
						{
							return t = !0
						}).then(function()
						{
							return e.call(r, i)
						})
					};
				return {
					call: r
				}
			}

			function u(e, t)
			{
				void 0 === t && (t = function(e)
				{
					return e
				});
				var r;
				return new n.Promise(function(n, i, o)
				{
					return r = e(function(e)
					{
						return o(t(e))
					})
				}, function()
				{
					return r.dispose()
				})
			}

			function c(e, t, n, r)
			{
				void 0 === n && (n = null), void 0 === r && (r = function(e)
				{
					return e
				});
				var o, s = new i.Emitter(
				{
					onFirstListenerAdd: function()
					{
						o = e.call(t, n).then(null, function(e)
						{
							return null
						}, function(e)
						{
							return s.fire(r(e))
						})
					},
					onLastListenerRemove: function()
					{
						o.cancel(), o = null
					}
				});
				return s.event
			}
			var l;
			! function(e)
			{
				e[e.RequestCommon = 0] = "RequestCommon", e[e.RequestCancel = 1] = "RequestCancel", e[e.ResponseInitialize = 2] = "ResponseInitialize", e[e.ResponseSuccess = 3] = "ResponseSuccess", e[e.ResponseProgress = 4] = "ResponseProgress", e[e.ResponseError = 5] = "ResponseError", e[e.ResponseErrorObj = 6] = "ResponseErrorObj"
			}(l || (l = {}));
			var f;
			! function(e)
			{
				e[e.Uninitialized = 0] = "Uninitialized", e[e.Idle = 1] = "Idle"
			}(f || (f = {}));
			var p = function()
			{
				function e(e)
				{
					var t = this;
					this.protocol = e, this.channels = Object.create(null), this.activeRequests = Object.create(null), this.protocolListener = this.protocol.onMessage(function(e)
					{
						return t.onMessage(e)
					}), this.protocol.send(
					{
						type: l.ResponseInitialize
					})
				}
				return e.prototype.registerChannel = function(e, t)
				{
					this.channels[e] = t
				}, e.prototype.onMessage = function(e)
				{
					switch (e.type)
					{
						case l.RequestCommon:
							this.onCommonRequest(e);
							break;
						case l.RequestCancel:
							this.onCancelRequest(e)
					}
				}, e.prototype.onCommonRequest = function(e)
				{
					var t, i = this,
						o = this.channels[e.channelName];
					try
					{
						t = o.call(e.name, e.arg)
					}
					catch (e)
					{
						t = n.Promise.wrapError(e)
					}
					var s = e.id,
						a = t.then(function(t)
						{
							i.protocol.send(
							{
								id: s,
								data: t,
								type: l.ResponseSuccess
							}), delete i.activeRequests[e.id]
						}, function(t)
						{
							t instanceof Error ? i.protocol.send(
							{
								id: s,
								data:
								{
									message: t.message,
									name: t.name,
									stack: t.stack ? t.stack.split("\n") : void 0
								},
								type: l.ResponseError
							}) : i.protocol.send(
							{
								id: s,
								data: t,
								type: l.ResponseErrorObj
							}), delete i.activeRequests[e.id]
						}, function(e)
						{
							i.protocol.send(
							{
								id: s,
								data: e,
								type: l.ResponseProgress
							})
						});
					this.activeRequests[e.id] = r.toDisposable(function()
					{
						return a.cancel()
					})
				}, e.prototype.onCancelRequest = function(e)
				{
					var t = this.activeRequests[e.id];
					t && (t.dispose(), delete this.activeRequests[e.id])
				}, e.prototype.dispose = function()
				{
					var e = this;
					this.protocolListener.dispose(), this.protocolListener = null, Object.keys(this.activeRequests).forEach(function(t)
					{
						e.activeRequests[t].dispose()
					}), this.activeRequests = null
				}, e
			}();
			t.ChannelServer = p;
			var h = function()
			{
				function e(e)
				{
					var t = this;
					this.protocol = e, this.state = f.Uninitialized, this.activeRequests = [], this.bufferedRequests = [], this.handlers = Object.create(null), this.lastRequestId = 0, this.protocolListener = this.protocol.onMessage(function(e)
					{
						return t.onMessage(e)
					})
				}
				return e.prototype.getChannel = function(e)
				{
					var t = this,
						n = function(n, r)
						{
							return t.request(e, n, r)
						};
					return {
						call: n
					}
				}, e.prototype.request = function(e, t, n)
				{
					var r = this,
						i = {
							raw:
							{
								id: this.lastRequestId++,
								type: l.RequestCommon,
								channelName: e,
								name: t,
								arg: n
							}
						},
						o = this.state === f.Uninitialized ? this.bufferRequest(i) : this.doRequest(i);
					return this.activeRequests.push(o), o.then(null, function(e)
					{
						return null
					}).done(function()
					{
						return r.activeRequests = r.activeRequests.filter(function(e)
						{
							return e !== o
						})
					}), o
				}, e.prototype.doRequest = function(e)
				{
					var t = this,
						r = e.raw.id;
					return new n.Promise(function(n, i, o)
					{
						t.handlers[r] = function(e)
						{
							switch (e.type)
							{
								case l.ResponseSuccess:
									delete t.handlers[r], n(e.data);
									break;
								case l.ResponseError:
									delete t.handlers[r];
									var s = new Error(e.data.message);
									s.stack = e.data.stack, s.name = e.data.name, i(s);
									break;
								case l.ResponseErrorObj:
									delete t.handlers[r], i(e.data);
									break;
								case l.ResponseProgress:
									o(e.data)
							}
						}, t.send(e.raw)
					}, function()
					{
						return t.send(
						{
							id: r,
							type: l.RequestCancel
						})
					})
				}, e.prototype.bufferRequest = function(e)
				{
					var t = this,
						r = null;
					return new n.Promise(function(n, i, o)
					{
						t.bufferedRequests.push(e), e.flush = function()
						{
							e.flush = null, r = t.doRequest(e).then(n, i, o)
						}
					}, function()
					{
						if (e.flush = null, t.state !== f.Uninitialized) return void(r && (r.cancel(), r = null));
						var n = t.bufferedRequests.indexOf(e);
						n !== -1 && t.bufferedRequests.splice(n, 1)
					})
				}, e.prototype.onMessage = function(e)
				{
					if (o(e.type))
					{
						if (this.state === f.Uninitialized && e.type === l.ResponseInitialize) return this.state = f.Idle, this.bufferedRequests.forEach(function(e)
						{
							return e.flush && e.flush()
						}), void(this.bufferedRequests = null);
						var t = this.handlers[e.id];
						t && t(e)
					}
				}, e.prototype.send = function(e)
				{
					try
					{
						this.protocol.send(e)
					}
					catch (e)
					{}
				}, e.prototype.dispose = function()
				{
					this.protocolListener.dispose(), this.protocolListener = null, this.activeRequests.forEach(function(e)
					{
						return e.cancel()
					}), this.activeRequests = []
				}, e
			}();
			t.ChannelClient = h;
			var d = function()
			{
				function e(e)
				{
					var t = this;
					this.channels = Object.create(null), this.channelClients = Object.create(null), this.onClientAdded = new i.Emitter, e(function(e)
					{
						var n = e.protocol,
							r = e.onDidClientDisconnect,
							o = i.once(n.onMessage);
						o(function(e)
						{
							var i = new p(n),
								o = new h(n);
							Object.keys(t.channels).forEach(function(e)
							{
								return i.registerChannel(e, t.channels[e])
							}), t.channelClients[e] = o, t.onClientAdded.fire(e), r(function()
							{
								i.dispose(), o.dispose(), delete t.channelClients[e]
							})
						})
					})
				}
				return e.prototype.getChannel = function(e, t)
				{
					var r = this,
						i = function(i, o)
						{
							var s = t.route(i, o);
							return s ? r.getClient(s).then(function(t)
							{
								return t.getChannel(e).call(i, o)
							}) : n.TPromise.wrapError("Client id should be provided")
						};
					return {
						call: i
					}
				}, e.prototype.registerChannel = function(e, t)
				{
					this.channels[e] = t
				}, e.prototype.getClient = function(e)
				{
					var t = this,
						r = this.channelClients[e];
					return r ? n.TPromise.as(r) : new n.TPromise(function(n)
					{
						var r = i.once(i.filterEvent(t.onClientAdded.event, function(t)
						{
							return t === e
						}));
						r(function()
						{
							return n(t.channelClients[e])
						})
					})
				}, e.prototype.dispose = function()
				{
					this.channels = null, this.channelClients = null, this.onClientAdded.dispose()
				}, e
			}();
			t.IPCServer = d;
			var m = function()
			{
				function e(e, t)
				{
					e.send(t), this.channelClient = new h(e), this.channelServer = new p(e)
				}
				return e.prototype.getChannel = function(e)
				{
					return this.channelClient.getChannel(e)
				}, e.prototype.registerChannel = function(e, t)
				{
					this.channelServer.registerChannel(e, t)
				}, e.prototype.dispose = function()
				{
					this.channelClient.dispose(), this.channelClient = null, this.channelServer.dispose(), this.channelServer = null
				}, e
			}();
			t.IPCClient = m, t.getDelayedChannel = s, t.getNextTickChannel = a, t.eventToCall = u, t.eventFromCall = c
		}), define(e[102], t([1, 0, 110, 2, 4, 71, 25, 10, 18, 36]), function(e, t, r, i, o, s, a, u, c, l)
		{
			"use strict";

			function f()
			{
				var e = l.randomBytes(21).toString("hex");
				return "win32" === process.platform ? "\\\\.\\pipe\\vscode-" + e + "-sock" : u.join(c.tmpdir(), "vscode-" + e + ".sock")
			}

			function p(e)
			{
				return new i.TPromise(function(t, n)
				{
					var i = r.createServer();
					i.on("error", n), i.listen(e, function()
					{
						i.removeListener("error", n), t(new m(i))
					})
				})
			}

			function h(e, t)
			{
				return new i.TPromise(function(n, i)
				{
					var o = r.createConnection(e, function()
					{
						o.removeListener("error", i), n(new v(o, t))
					});
					o.once("error", i)
				})
			}
			t.generateRandomPipeName = f;
			var d = function()
			{
				function e(t)
				{
					var n = this;
					this._socket = t, this._onMessage = new o.Emitter, this.onMessage = this._onMessage.event, this._writeBuffer = new(function()
					{
						function e()
						{
							this._data = [], this._totalLength = 0
						}
						return e.prototype.add = function(e, t)
						{
							var n = 0 === this._totalLength;
							return this._data.push(e, t), this._totalLength += e.length + t.length, n
						}, e.prototype.take = function()
						{
							var e = Buffer.concat(this._data, this._totalLength);
							return this._data.length = 0, this._totalLength = 0, e
						}, e
					}());
					var r = [],
						i = 0,
						s = {
							readHead: !0,
							bodyIsJson: !1,
							bodyLen: -1
						};
					t.on("data", function(t)
					{
						for (r.push(t), i += t.length; i > 0;)
						{
							if (s.readHead)
							{
								if (!(i >= e._headerLen)) break;
								var o = Buffer.concat(r);
								s.bodyIsJson = 1 === o.readInt8(0), s.bodyLen = o.readInt32BE(1), s.readHead = !1;
								var a = o.slice(e._headerLen);
								i = a.length, r = [a]
							}
							if (!s.readHead)
							{
								if (!(i >= s.bodyLen)) break;
								var o = Buffer.concat(r),
									u = o.toString("utf8", 0, s.bodyLen);
								s.bodyIsJson && (u = JSON.parse(u)), n._onMessage.fire(u);
								var a = o.slice(s.bodyLen);
								i = a.length, r = [a], s.bodyIsJson = !1, s.bodyLen = -1, s.readHead = !0
							}
						}
					})
				}
				return e.prototype.send = function(t)
				{
					var n = Buffer.alloc(e._headerLen);
					"string" != typeof t && (t = JSON.stringify(t), n.writeInt8(1, 0));
					var r = Buffer.from(t);
					n.writeInt32BE(r.length, 1), this._writeSoon(n, r)
				}, e.prototype._writeSoon = function(e, t)
				{
					var n = this;
					this._writeBuffer.add(e, t) && setImmediate(function()
					{
						n._socket.destroyed || n._socket.write(n._writeBuffer.take())
					})
				}, e
			}();
			d._headerLen = 17, t.Protocol = d;
			var m = function(e)
			{
				function t(n)
				{
					var r = e.call(this, t.toClientConnectionEvent(n)) || this;
					return r.server = n, r
				}
				return n(t, e), t.toClientConnectionEvent = function(e)
				{
					var t = s.fromEventEmitter(e, "connection");
					return o.mapEvent(t, function(e)
					{
						return {
							protocol: new d(e),
							onDidClientDisconnect: o.once(s.fromEventEmitter(e, "close"))
						}
					})
				}, t.prototype.dispose = function()
				{
					e.prototype.dispose.call(this), this.server.close(), this.server = null
				}, t
			}(a.IPCServer);
			t.Server = m;
			var v = function(e)
			{
				function t(t, n)
				{
					var r = e.call(this, new d(t), n) || this;
					return r.socket = t, r._onClose = new o.Emitter, t.once("close", function()
					{
						return r._onClose.fire()
					}), r
				}
				return n(t, e), Object.defineProperty(t.prototype, "onClose",
				{
					get: function()
					{
						return this._onClose.event
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.dispose = function()
				{
					e.prototype.dispose.call(this), this.socket.end(), this.socket = null
				}, t
			}(a.IPCClient);
			t.Client = v, t.serve = p, t.connect = h
		}), define(e[49], t([8, 9]), function(e, t)
		{
			return e.create("vs/base/common/json", t)
		}), define(e[33], t([1, 0, 49]), function(e, t, n)
		{
			"use strict";

			function r(e, t)
			{
				function n(t, n)
				{
					for (var r = 0, i = 0; r < t || !n;)
					{
						var o = e.charCodeAt(p);
						if (o >= 48 && o <= 57) i = 16 * i + o - 48;
						else if (o >= 65 && o <= 70) i = 16 * i + o - 65 + 10;
						else
						{
							if (!(o >= 97 && o <= 102)) break;
							i = 16 * i + o - 97 + 10
						}
						p++, r++
					}
					return r < t && (i = -1), i
				}

				function r(e)
				{
					p = e, d = "", m = 0, y = g.Unknown, b = v.None
				}

				function a()
				{
					var t = p;
					if (48 === e.charCodeAt(p)) p++;
					else
						for (p++; p < e.length && s(e.charCodeAt(p));) p++;
					if (p < e.length && 46 === e.charCodeAt(p))
					{
						if (p++, !(p < e.length && s(e.charCodeAt(p)))) return b = v.UnexpectedEndOfNumber, e.substring(t, p);
						for (p++; p < e.length && s(e.charCodeAt(p));) p++
					}
					var n = p;
					if (p < e.length && (69 === e.charCodeAt(p) || 101 === e.charCodeAt(p)))
						if (p++, (p < e.length && 43 === e.charCodeAt(p) || 45 === e.charCodeAt(p)) && p++, p < e.length && s(e.charCodeAt(p)))
						{
							for (p++; p < e.length && s(e.charCodeAt(p));) p++;
							n = p
						}
						else b = v.UnexpectedEndOfNumber;
					return e.substring(t, n)
				}

				function u()
				{
					for (var t = "", r = p;;)
					{
						if (p >= h)
						{
							t += e.substring(r, p), b = v.UnexpectedEndOfString;
							break
						}
						var i = e.charCodeAt(p);
						if (34 === i)
						{
							t += e.substring(r, p), p++;
							break
						}
						if (92 !== i)
						{
							if (o(i))
							{
								t += e.substring(r, p), b = v.UnexpectedEndOfString;
								break
							}
							p++
						}
						else
						{
							if (t += e.substring(r, p), p++, p >= h)
							{
								b = v.UnexpectedEndOfString;
								break
							}
							switch (i = e.charCodeAt(p++))
							{
								case 34:
									t += '"';
									break;
								case 92:
									t += "\\";
									break;
								case 47:
									t += "/";
									break;
								case 98:
									t += "\b";
									break;
								case 102:
									t += "\f";
									break;
								case 110:
									t += "\n";
									break;
								case 114:
									t += "\r";
									break;
								case 116:
									t += "\t";
									break;
								case 117:
									var s = n(4, !0);
									s >= 0 ? t += String.fromCharCode(s) : b = v.InvalidUnicode;
									break;
								default:
									b = v.InvalidEscapeCharacter
							}
							r = p
						}
					}
					return t
				}

				function c()
				{
					if (d = "", b = v.None, m = p, p >= h) return m = h, y = g.EOF;
					var t = e.charCodeAt(p);
					if (i(t))
					{
						do p++, d += String.fromCharCode(t), t = e.charCodeAt(p); while (i(t));
						return y = g.Trivia
					}
					if (o(t)) return p++, d += String.fromCharCode(t), 13 === t && 10 === e.charCodeAt(p) && (p++, d += "\n"), y = g.LineBreakTrivia;
					switch (t)
					{
						case 123:
							return p++, y = g.OpenBraceToken;
						case 125:
							return p++, y = g.CloseBraceToken;
						case 91:
							return p++, y = g.OpenBracketToken;
						case 93:
							return p++, y = g.CloseBracketToken;
						case 58:
							return p++, y = g.ColonToken;
						case 44:
							return p++, y = g.CommaToken;
						case 34:
							return p++, d = u(), y = g.StringLiteral;
						case 47:
							var n = p - 1;
							if (47 === e.charCodeAt(p + 1))
							{
								for (p += 2; p < h && !o(e.charCodeAt(p));) p++;
								return d = e.substring(n, p), y = g.LineCommentTrivia
							}
							if (42 === e.charCodeAt(p + 1))
							{
								p += 2;
								for (var r = h - 1, c = !1; p < r;)
								{
									var f = e.charCodeAt(p);
									if (42 === f && 47 === e.charCodeAt(p + 1))
									{
										p += 2, c = !0;
										break
									}
									p++
								}
								return c || (p++, b = v.UnexpectedEndOfComment), d = e.substring(n, p), y = g.BlockCommentTrivia
							}
							return d += String.fromCharCode(t), p++, y = g.Unknown;
						case 45:
							if (d += String.fromCharCode(t), p++, p === h || !s(e.charCodeAt(p))) return y = g.Unknown;
						case 48:
						case 49:
						case 50:
						case 51:
						case 52:
						case 53:
						case 54:
						case 55:
						case 56:
						case 57:
							return d += a(), y = g.NumericLiteral;
						default:
							for (; p < h && l(t);) p++, t = e.charCodeAt(p);
							if (m !== p)
							{
								switch (d = e.substring(m, p))
								{
									case "true":
										return y = g.TrueKeyword;
									case "false":
										return y = g.FalseKeyword;
									case "null":
										return y = g.NullKeyword
								}
								return y = g.Unknown
							}
							return d += String.fromCharCode(t), p++, y = g.Unknown
					}
				}

				function l(e)
				{
					if (i(e) || o(e)) return !1;
					switch (e)
					{
						case 125:
						case 93:
						case 123:
						case 91:
						case 34:
						case 58:
						case 44:
							return !1
					}
					return !0
				}

				function f()
				{
					var e;
					do e = c(); while (e >= g.LineCommentTrivia && e <= g.Trivia);
					return e
				}
				void 0 === t && (t = !1);
				var p = 0,
					h = e.length,
					d = "",
					m = 0,
					y = g.Unknown,
					b = v.None;
				return {
					setPosition: r,
					getPosition: function()
					{
						return p
					},
					scan: t ? f : c,
					getToken: function()
					{
						return y
					},
					getTokenValue: function()
					{
						return d
					},
					getTokenOffset: function()
					{
						return m
					},
					getTokenLength: function()
					{
						return p - m
					},
					getTokenError: function()
					{
						return b
					}
				}
			}

			function i(e)
			{
				return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || 5760 === e || e >= 8192 && e <= 8203 || 8239 === e || 8287 === e || 12288 === e || 65279 === e
			}

			function o(e)
			{
				return 10 === e || 13 === e || 8232 === e || 8233 === e
			}

			function s(e)
			{
				return e >= 48 && e <= 57
			}

			function a(e, t)
			{
				var n, i, o = r(e),
					s = [],
					a = 0;
				do switch (i = o.getPosition(), n = o.scan())
				{
					case g.LineCommentTrivia:
					case g.BlockCommentTrivia:
					case g.EOF:
						a !== i && s.push(e.substring(a, i)), void 0 !== t && s.push(o.getTokenValue().replace(/[^\r\n]/g, t)), a = o.getPosition()
				}
				while (n !== g.EOF);
				return s.join("")
			}

			function u(e)
			{
				switch (e)
				{
					case b.InvalidSymbol:
						return n.localize(0, null);
					case b.InvalidNumberFormat:
						return n.localize(1, null);
					case b.PropertyNameExpected:
						return n.localize(2, null);
					case b.ValueExpected:
						return n.localize(3, null);
					case b.ColonExpected:
						return n.localize(4, null);
					case b.CommaExpected:
						return n.localize(5, null);
					case b.CloseBraceExpected:
						return n.localize(6, null);
					case b.CloseBracketExpected:
						return n.localize(7, null);
					case b.EndOfFileExpected:
						return n.localize(8, null);
					default:
						return ""
				}
			}

			function c(e)
			{
				switch (typeof e)
				{
					case "boolean":
						return "boolean";
					case "number":
						return "number";
					case "string":
						return "string";
					default:
						return "null"
				}
			}

			function l(e, t)
			{
				function n(e, t, n, r)
				{
					s.value = e, s.offset = t, s.length = n, s.type = r, s.columnOffset = void 0, o = s
				}
				var r = [],
					i = new Object,
					o = void 0,
					s = {
						value: void 0,
						offset: void 0,
						length: void 0,
						type: void 0
					},
					a = !1;
				try
				{
					m(e,
					{
						onObjectBegin: function(e, n)
						{
							if (t <= e) throw i;
							o = void 0, a = t > e, r.push("")
						},
						onObjectProperty: function(e, o, s)
						{
							if (t < o) throw i;
							if (n(e, o, s, "property"), r[r.length - 1] = e, t <= o + s) throw i
						},
						onObjectEnd: function(e, n)
						{
							if (t <= e) throw i;
							o = void 0, r.pop()
						},
						onArrayBegin: function(e, n)
						{
							if (t <= e) throw i;
							o = void 0, r.push(0)
						},
						onArrayEnd: function(e, n)
						{
							if (t <= e) throw i;
							o = void 0, r.pop()
						},
						onLiteralValue: function(e, r, o)
						{
							if (t < r) throw i;
							if (n(e, r, o, c(e)), t <= r + o) throw i
						},
						onSeparator: function(e, n, s)
						{
							if (t <= n) throw i;
							if (":" === e && "property" === o.type) o.columnOffset = n, a = !1, o = void 0;
							else if ("," === e)
							{
								var u = r[r.length - 1];
								"number" == typeof u ? r[r.length - 1] = u + 1 : (a = !0, r[r.length - 1] = ""), o = void 0
							}
						}
					})
				}
				catch (e)
				{
					if (e !== i) throw e
				}
				return "" === r[r.length - 1] && r.pop(),
				{
					path: r,
					previousNode: o,
					isAtPropertyKey: a,
					matches: function(e)
					{
						for (var t = 0, n = 0; t < e.length && n < r.length; n++)
							if (e[t] === r[n] || "*" === e[t]) t++;
							else if ("**" !== e[t]) return !1;
						return t === e.length
					}
				}
			}

			function f(e, t, n)
			{
				function r(e)
				{
					Array.isArray(o) ? o.push(e) : i && (o[i] = e)
				}
				void 0 === t && (t = []);
				var i = null,
					o = [],
					s = [],
					a = {
						onObjectBegin: function()
						{
							var e = {};
							r(e), s.push(o), o = e, i = null
						},
						onObjectProperty: function(e)
						{
							i = e
						},
						onObjectEnd: function()
						{
							o = s.pop()
						},
						onArrayBegin: function()
						{
							var e = [];
							r(e), s.push(o), o = e, i = null
						},
						onArrayEnd: function()
						{
							o = s.pop()
						},
						onLiteralValue: r,
						onError: function(e)
						{
							t.push(
							{
								error: e
							})
						}
					};
				return m(e, a, n), o[0]
			}

			function p(e, t, n)
			{
				function r(e)
				{
					"property" === o.type && (o.length = e - o.offset, o = o.parent)
				}

				function i(e)
				{
					return o.children.push(e), e
				}
				void 0 === t && (t = []);
				var o = {
						type: "array",
						offset: -1,
						length: -1,
						children: []
					},
					s = {
						onObjectBegin: function(e)
						{
							o = i(
							{
								type: "object",
								offset: e,
								length: -1,
								parent: o,
								children: []
							})
						},
						onObjectProperty: function(e, t, n)
						{
							o = i(
							{
								type: "property",
								offset: t,
								length: -1,
								parent: o,
								children: []
							}), o.children.push(
							{
								type: "string",
								value: e,
								offset: t,
								length: n,
								parent: o
							})
						},
						onObjectEnd: function(e, t)
						{
							o.length = e + t - o.offset, o = o.parent, r(e + t)
						},
						onArrayBegin: function(e, t)
						{
							o = i(
							{
								type: "array",
								offset: e,
								length: -1,
								parent: o,
								children: []
							})
						},
						onArrayEnd: function(e, t)
						{
							o.length = e + t - o.offset, o = o.parent, r(e + t)
						},
						onLiteralValue: function(e, t, n)
						{
							i(
							{
								type: c(e),
								offset: t,
								length: n,
								parent: o,
								value: e
							}), r(t + n)
						},
						onSeparator: function(e, t, n)
						{
							"property" === o.type && (":" === e ? o.columnOffset = t : "," === e && r(t))
						},
						onError: function(e)
						{
							t.push(
							{
								error: e
							})
						}
					};
				m(e, s, n);
				var a = o.children[0];
				return a && delete a.parent, a
			}

			function h(e, t)
			{
				if (e)
				{
					for (var n = e, r = 0, i = t; r < i.length; r++)
					{
						var o = i[r];
						if ("string" == typeof o)
						{
							if ("object" !== n.type) return;
							for (var s = !1, a = 0, u = n.children; a < u.length; a++)
							{
								var c = u[a];
								if (c.children[0].value === o)
								{
									n = c.children[1], s = !0;
									break
								}
							}
							if (!s) return
						}
						else
						{
							var l = o;
							if ("array" !== n.type || l < 0 || l >= n.children.length) return;
							n = n.children[l]
						}
					}
					return n
				}
			}

			function d(e)
			{
				if ("array" === e.type) return e.children.map(d);
				if ("object" === e.type)
				{
					for (var t = {}, n = 0, r = e.children; n < r.length; n++)
					{
						var i = r[n];
						t[i.children[0].value] = d(i.children[1])
					}
					return t
				}
				return e.value
			}

			function m(e, t, n)
			{
				function i(e)
				{
					return e ? function()
					{
						return e(d.getTokenOffset(), d.getTokenLength())
					} : function()
					{
						return !0
					}
				}

				function o(e)
				{
					return e ? function(t)
					{
						return e(t, d.getTokenOffset(), d.getTokenLength())
					} : function()
					{
						return !0
					}
				}

				function s()
				{
					for (;;)
					{
						var e = d.scan();
						switch (e)
						{
							case g.LineCommentTrivia:
							case g.BlockCommentTrivia:
								x && a(b.InvalidSymbol);
								break;
							case g.Unknown:
								a(b.InvalidSymbol);
								break;
							case g.Trivia:
							case g.LineBreakTrivia:
								break;
							default:
								return e
						}
					}
				}

				function a(e, t, n)
				{
					if (void 0 === t && (t = []), void 0 === n && (n = []), S(e), t.length + n.length > 0)
						for (var r = d.getToken(); r !== g.EOF;)
						{
							if (t.indexOf(r) !== -1)
							{
								s();
								break
							}
							if (n.indexOf(r) !== -1) break;
							r = s()
						}
				}

				function u(e)
				{
					var t = d.getTokenValue();
					return e ? w(t) : v(t), s(), !0
				}

				function c()
				{
					switch (d.getToken())
					{
						case g.NumericLiteral:
							var e = 0;
							try
							{
								e = JSON.parse(d.getTokenValue()), "number" != typeof e && (a(b.InvalidNumberFormat), e = 0)
							}
							catch (e)
							{
								a(b.InvalidNumberFormat)
							}
							w(e);
							break;
						case g.NullKeyword:
							w(null);
							break;
						case g.TrueKeyword:
							w(!0);
							break;
						case g.FalseKeyword:
							w(!1);
							break;
						default:
							return !1
					}
					return s(), !0
				}

				function l()
				{
					return d.getToken() !== g.StringLiteral ? (a(b.PropertyNameExpected, [], [g.CloseBraceToken, g.CommaToken]), !1) : (u(!1), d.getToken() === g.ColonToken ? (C(":"), s(), h() || a(b.ValueExpected, [], [g.CloseBraceToken, g.CommaToken])) : a(b.ColonExpected, [], [g.CloseBraceToken, g.CommaToken]), !0)
				}

				function f()
				{
					m(), s();
					for (var e = !1; d.getToken() !== g.CloseBraceToken && d.getToken() !== g.EOF;) d.getToken() === g.CommaToken ? (e || a(b.ValueExpected, [], []), C(","), s()) : e && a(b.CommaExpected, [], []), l() || a(b.ValueExpected, [], [g.CloseBraceToken, g.CommaToken]), e = !0;
					return y(), d.getToken() !== g.CloseBraceToken ? a(b.CloseBraceExpected, [g.CloseBraceToken], []) : s(), !0
				}

				function p()
				{
					_(), s();
					for (var e = !1; d.getToken() !== g.CloseBracketToken && d.getToken() !== g.EOF;) d.getToken() === g.CommaToken ? (e || a(b.ValueExpected, [], []), C(","), s()) : e && a(b.CommaExpected, [], []), h() || a(b.ValueExpected, [], [g.CloseBracketToken, g.CommaToken]), e = !0;
					return E(), d.getToken() !== g.CloseBracketToken ? a(b.CloseBracketExpected, [g.CloseBracketToken], []) : s(), !0
				}

				function h()
				{
					switch (d.getToken())
					{
						case g.OpenBracketToken:
							return p();
						case g.OpenBraceToken:
							return f();
						case g.StringLiteral:
							return u(!0);
						default:
							return c()
					}
				}
				var d = r(e, !1),
					m = i(t.onObjectBegin),
					v = o(t.onObjectProperty),
					y = i(t.onObjectEnd),
					_ = i(t.onArrayBegin),
					E = i(t.onArrayEnd),
					w = o(t.onLiteralValue),
					C = o(t.onSeparator),
					S = o(t.onError),
					x = n && n.disallowComments;
				return s(), d.getToken() === g.EOF || (h() ? (d.getToken() !== g.EOF && a(b.EndOfFileExpected, [], []), !0) : (a(b.ValueExpected, [], []), !1))
			}
			var v;
			! function(e)
			{
				e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter"
			}(v = t.ScanError || (t.ScanError = {}));
			var g;
			! function(e)
			{
				e[e.Unknown = 0] = "Unknown", e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.EOF = 16] = "EOF"
			}(g = t.SyntaxKind || (t.SyntaxKind = {})), t.createScanner = r;
			var y;
			! function(e)
			{
				e[e.nullCharacter = 0] = "nullCharacter", e[e.maxAsciiCharacter = 127] = "maxAsciiCharacter", e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.lineSeparator = 8232] = "lineSeparator", e[e.paragraphSeparator = 8233] = "paragraphSeparator", e[e.nextLine = 133] = "nextLine", e[e.space = 32] = "space", e[e.nonBreakingSpace = 160] = "nonBreakingSpace", e[e.enQuad = 8192] = "enQuad", e[e.emQuad = 8193] = "emQuad", e[e.enSpace = 8194] = "enSpace", e[e.emSpace = 8195] = "emSpace", e[e.threePerEmSpace = 8196] = "threePerEmSpace", e[e.fourPerEmSpace = 8197] = "fourPerEmSpace", e[e.sixPerEmSpace = 8198] = "sixPerEmSpace", e[e.figureSpace = 8199] = "figureSpace", e[e.punctuationSpace = 8200] = "punctuationSpace", e[e.thinSpace = 8201] = "thinSpace", e[e.hairSpace = 8202] = "hairSpace", e[e.zeroWidthSpace = 8203] = "zeroWidthSpace", e[e.narrowNoBreakSpace = 8239] = "narrowNoBreakSpace", e[e.ideographicSpace = 12288] = "ideographicSpace", e[e.mathematicalSpace = 8287] = "mathematicalSpace", e[e.ogham = 5760] = "ogham", e[e._ = 95] = "_", e[e.$ = 36] = "$", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.ampersand = 38] = "ampersand", e[e.asterisk = 42] = "asterisk", e[e.at = 64] = "at", e[e.backslash = 92] = "backslash", e[e.bar = 124] = "bar", e[e.caret = 94] = "caret", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.closeParen = 41] = "closeParen", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.equals = 61] = "equals", e[e.exclamation = 33] = "exclamation", e[e.greaterThan = 62] = "greaterThan", e[e.lessThan = 60] = "lessThan", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.openParen = 40] = "openParen", e[e.percent = 37] = "percent", e[e.plus = 43] = "plus", e[e.question = 63] = "question", e[e.semicolon = 59] = "semicolon", e[e.singleQuote = 39] = "singleQuote", e[e.slash = 47] = "slash", e[e.tilde = 126] = "tilde", e[e.backspace = 8] = "backspace", e[e.formFeed = 12] = "formFeed", e[e.byteOrderMark = 65279] = "byteOrderMark", e[e.tab = 9] = "tab", e[e.verticalTab = 11] = "verticalTab"
			}(y || (y = {})), t.stripComments = a;
			var b;
			! function(e)
			{
				e[e.InvalidSymbol = 0] = "InvalidSymbol", e[e.InvalidNumberFormat = 1] = "InvalidNumberFormat", e[e.PropertyNameExpected = 2] = "PropertyNameExpected", e[e.ValueExpected = 3] = "ValueExpected", e[e.ColonExpected = 4] = "ColonExpected", e[e.CommaExpected = 5] = "CommaExpected", e[e.CloseBraceExpected = 6] = "CloseBraceExpected", e[e.CloseBracketExpected = 7] = "CloseBracketExpected", e[e.EndOfFileExpected = 8] = "EndOfFileExpected"
			}(b = t.ParseErrorCode || (t.ParseErrorCode = {})), t.getParseErrorMessage = u, t.getLocation = l, t.parse = f, t.parseTree = p, t.findNodeAtLocation = h, t.getNodeValue = d, t.visit = m
		}), define(e[53], t([1, 0, 19, 10, 5, 12, 4, 33]), function(e, t, n, r, i, o, s, a)
		{
			"use strict";
			var u = function()
			{
				function e(e, t)
				{
					void 0 === t && (t = {
						changeBufferDelay: 0,
						defaultConfig: Object.create(null)
					}), this._path = e, this.options = t, this.disposables = [], this._onDidUpdateConfiguration = new s.Emitter, this.disposables.push(this._onDidUpdateConfiguration), this.registerWatcher(), this.initAsync()
				}
				return Object.defineProperty(e.prototype, "path",
				{
					get: function()
					{
						return this._path
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "hasParseErrors",
				{
					get: function()
					{
						return this.parseErrors && this.parseErrors.length > 0
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "onDidUpdateConfiguration",
				{
					get: function()
					{
						return this._onDidUpdateConfiguration.event
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.initAsync = function()
				{
					var e = this;
					this.loadAsync(function(t)
					{
						e.loaded || e.updateCache(t)
					})
				}, e.prototype.updateCache = function(e)
				{
					this.cache = e, this.loaded = !0
				}, e.prototype.loadSync = function()
				{
					try
					{
						return this.parse(n.readFileSync(this._path).toString())
					}
					catch (e)
					{
						return this.options.defaultConfig
					}
				}, e.prototype.loadAsync = function(e)
				{
					var t = this;
					n.readFile(this._path, function(n, r)
					{
						return e(n ? t.options.defaultConfig : t.parse(r.toString()))
					})
				}, e.prototype.parse = function(e)
				{
					var t;
					try
					{
						this.parseErrors = [], t = this.options.parse ? this.options.parse(e, this.parseErrors) : a.parse(e, this.parseErrors)
					}
					catch (e)
					{}
					return t || this.options.defaultConfig
				}, e.prototype.registerWatcher = function()
				{
					var e = this,
						t = r.dirname(this._path);
					this.watch(t), n.lstat(this._path, function(t, r)
					{
						t || r.isDirectory() || r.isSymbolicLink() && n.readlink(e._path, function(t, n)
						{
							t || e.watch(n)
						})
					})
				}, e.prototype.watch = function(e)
				{
					var t = this;
					if (!this.disposed) try
					{
						var r = n.watch(e);
						r.on("change", function()
						{
							return t.onConfigFileChange()
						}), this.disposables.push(o.toDisposable(function()
						{
							r.removeAllListeners(), r.close()
						}))
					}
					catch (t)
					{
						n.exists(e, function(n)
						{
							n && console.warn("Failed to watch " + e + " for configuration changes (" + t.toString() + ")")
						})
					}
				}, e.prototype.onConfigFileChange = function()
				{
					var e = this;
					this.timeoutHandle && (global.clearTimeout(this.timeoutHandle), this.timeoutHandle = null), this.timeoutHandle = global.setTimeout(function()
					{
						return e.reload()
					}, this.options.changeBufferDelay)
				}, e.prototype.reload = function(e)
				{
					var t = this;
					this.loadAsync(function(n)
					{
						if (i.equals(n, t.cache) || (t.updateCache(n), t._onDidUpdateConfiguration.fire(
							{
								config: t.cache
							})), e) return e(n)
					})
				}, e.prototype.getConfig = function()
				{
					return this.ensureLoaded(), this.cache
				}, e.prototype.getValue = function(e, t)
				{
					if (this.ensureLoaded(), !e) return t;
					var n = this.cache ? this.cache[e] : void 0;
					return "undefined" != typeof n ? n : t
				}, e.prototype.ensureLoaded = function()
				{
					this.loaded || this.updateCache(this.loadSync())
				}, e.prototype.dispose = function()
				{
					this.disposed = !0, this.disposables = o.dispose(this.disposables)
				}, e
			}();
			t.ConfigWatcher = u
		}), define(e[54], t([8, 9]), function(e, t)
		{
			return e.create("vs/base/common/severity", t)
		}), define(e[39], t([1, 0, 54, 14]), function(e, t, n, r)
		{
			"use strict";
			var i;
			! function(e)
			{
				e[e.Ignore = 0] = "Ignore", e[e.Info = 1] = "Info", e[e.Warning = 2] = "Warning", e[e.Error = 3] = "Error"
			}(i || (i = {})),
			function(e)
			{
				function t(t)
				{
					return t ? r.equalsIgnoreCase(s, t) ? e.Error : r.equalsIgnoreCase(a, t) || r.equalsIgnoreCase(u, t) ? e.Warning : r.equalsIgnoreCase(c, t) ? e.Info : e.Ignore : e.Ignore
				}

				function i(e)
				{
					return l[e] || r.empty
				}

				function o(e, t)
				{
					return t - e
				}
				var s = "error",
					a = "warning",
					u = "warn",
					c = "info",
					l = Object.create(null);
				l[e.Error] = n.localize(0, null), l[e.Warning] = n.localize(1, null), l[e.Info] = n.localize(2, null), e.fromValue = t, e.toString = i, e.compare = o
			}(i || (i = {})), Object.defineProperty(t, "__esModule",
			{
				value: !0
			}), t.default = i
		}), define(e[56], t([8, 9]), function(e, t)
		{
			return e.create("vs/base/node/zip", t)
		}), define(e[57], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/configuration/common/configurationRegistry", t)
		}), define(e[89], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/extensionManagement/common/extensionManagement", t)
		}), define(e[59], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/extensionManagement/node/extensionGalleryService", t)
		}), define(e[60], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/extensionManagement/node/extensionManagementService", t)
		}), define(e[61], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/extensions/common/extensionsRegistry", t)
		}), define(e[62], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/extensions/node/extensionValidator", t)
		}), define(e[63], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/message/common/message", t)
		}), define(e[64], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/request/node/request", t)
		}), define(e[65], t([8, 9]), function(e, t)
		{
			return e.create("vs/platform/telemetry/common/telemetryService", t)
		}), define(e[66], t([1, 0, 25, 4]), function(e, t, n, r)
		{
			"use strict";
			var i = function()
			{
				function e(e)
				{
					this.service = e, this.onInstallExtension = r.buffer(e.onInstallExtension, !0), this.onDidInstallExtension = r.buffer(e.onDidInstallExtension, !0), this.onUninstallExtension = r.buffer(e.onUninstallExtension, !0), this.onDidUninstallExtension = r.buffer(e.onDidUninstallExtension, !0)
				}
				return e.prototype.call = function(e, t)
				{
					switch (e)
					{
						case "event:onInstallExtension":
							return n.eventToCall(this.onInstallExtension);
						case "event:onDidInstallExtension":
							return n.eventToCall(this.onDidInstallExtension);
						case "event:onUninstallExtension":
							return n.eventToCall(this.onUninstallExtension);
						case "event:onDidUninstallExtension":
							return n.eventToCall(this.onDidUninstallExtension);
						case "install":
							return this.service.install(t);
						case "installFromGallery":
							return this.service.installFromGallery(t[0], t[1]);
						case "uninstall":
							return this.service.uninstall(t);
						case "getInstalled":
							return this.service.getInstalled(t)
					}
				}, e
			}();
			t.ExtensionManagementChannel = i;
			var o = function()
			{
				function e(e)
				{
					this.channel = e, this._onInstallExtension = n.eventFromCall(this.channel, "event:onInstallExtension"), this._onDidInstallExtension = n.eventFromCall(this.channel, "event:onDidInstallExtension"), this._onUninstallExtension = n.eventFromCall(this.channel, "event:onUninstallExtension"), this._onDidUninstallExtension = n.eventFromCall(this.channel, "event:onDidUninstallExtension")
				}
				return Object.defineProperty(e.prototype, "onInstallExtension",
				{
					get: function()
					{
						return this._onInstallExtension
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "onDidInstallExtension",
				{
					get: function()
					{
						return this._onDidInstallExtension
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "onUninstallExtension",
				{
					get: function()
					{
						return this._onUninstallExtension
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "onDidUninstallExtension",
				{
					get: function()
					{
						return this._onDidUninstallExtension
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.install = function(e)
				{
					return this.channel.call("install", e)
				}, e.prototype.installFromGallery = function(e, t)
				{
					return void 0 === t && (t = !0), this.channel.call("installFromGallery", [e, t])
				}, e.prototype.uninstall = function(e)
				{
					return this.channel.call("uninstall", e)
				}, e.prototype.getInstalled = function(e)
				{
					return void 0 === e && (e = null), this.channel.call("getInstalled", e)
				}, e
			}();
			t.ExtensionManagementChannelClient = o
		}), define(e[67], t([1, 0, 5]), function(e, t, n)
		{
			"use strict";

			function r(e, t)
			{
				var r = function(e)
				{
					if ("string" == typeof e)
					{
						var n = i.exec(e);
						if (n) return t[n[1]] || e
					}
				};
				return n.cloneAndChange(e, r)
			}
			var i = /^%([\w\d.]+)%$/i;
			t.localizeManifest = r
		}), define(e[68], t([1, 0]), function(e, t)
		{
			"use strict";

			function n(e)
			{
				return {
					id: e.manifest.publisher + "." + e.manifest.name,
					name: e.manifest.name,
					galleryId: e.metadata ? e.metadata.id : null,
					publisherId: e.metadata ? e.metadata.publisherId : null,
					publisherName: e.manifest.publisher,
					publisherDisplayName: e.metadata ? e.metadata.publisherDisplayName : null,
					dependencies: e.manifest.extensionDependencies && e.manifest.extensionDependencies.length > 0
				}
			}

			function r(e)
			{
				return {
					id: e.publisher + "." + e.name,
					name: e.name,
					galleryId: e.id,
					publisherId: e.publisherId,
					publisherName: e.publisher,
					publisherDisplayName: e.publisherDisplayName,
					dependencies: e.properties.dependencies.length > 0
				}
			}
			t.getLocalExtensionTelemetryData = n, t.getGalleryExtensionTelemetryData = r
		}), define(e[69], t([1, 0, 62, 70, 15]), function(e, t, n, r, i)
		{
			"use strict";

			function o(e)
			{
				return e = e.trim(), "*" === e || d.test(e)
			}

			function s(e)
			{
				if (!o(e)) return null;
				if (e = e.trim(), "*" === e) return {
					hasCaret: !1,
					hasGreaterEquals: !1,
					majorBase: 0,
					majorMustEqual: !1,
					minorBase: 0,
					minorMustEqual: !1,
					patchBase: 0,
					patchMustEqual: !1,
					preRelease: null
				};
				var t = e.match(d);
				return {
					hasCaret: "^" === t[1],
					hasGreaterEquals: ">=" === t[1],
					majorBase: "x" === t[2] ? 0 : parseInt(t[2], 10),
					majorMustEqual: "x" !== t[2],
					minorBase: "x" === t[4] ? 0 : parseInt(t[4], 10),
					minorMustEqual: "x" !== t[4],
					patchBase: "x" === t[6] ? 0 : parseInt(t[6], 10),
					patchMustEqual: "x" !== t[6],
					preRelease: t[8] || null
				}
			}

			function a(e)
			{
				if (!e) return null;
				var t = e.majorBase,
					n = e.majorMustEqual,
					r = e.minorBase,
					i = e.minorMustEqual,
					o = e.patchBase,
					s = e.patchMustEqual;
				return e.hasCaret && (0 === t ? s = !1 : (i = !1, s = !1)),
				{
					majorBase: t,
					majorMustEqual: n,
					minorBase: r,
					minorMustEqual: i,
					patchBase: o,
					patchMustEqual: s,
					isMinimum: e.hasGreaterEquals
				}
			}

			function u(e, t)
			{
				var n;
				n = "string" == typeof e ? a(s(e)) : e;
				var r;
				if (r = "string" == typeof t ? a(s(t)) : t, !n || !r) return !1;
				var i = n.majorBase,
					o = n.minorBase,
					u = n.patchBase,
					c = r.majorBase,
					l = r.minorBase,
					f = r.patchBase,
					p = r.majorMustEqual,
					h = r.minorMustEqual,
					d = r.patchMustEqual;
				return r.isMinimum ? i > c || !(i < c) && (o > l || !(o < l) && u >= f) : (1 !== i || 0 !== c || p && h && d || (c = 1, l = 0, f = 0, p = !0, h = !1, d = !1), !(i < c) && (i > c ? !p : !(o < l) && (o > l ? !h : !(u < f) && (!(u > f) || !d))))
			}

			function c(e, t, n)
			{
				return !(!t.isBuiltin && "undefined" != typeof t.main) || l(e, t.engines.vscode, n)
			}

			function l(e, t, r)
			{
				void 0 === r && (r = []);
				var i = a(s(t));
				if (!i) return r.push(n.localize(0, null, t)), !1;
				if (0 === i.majorBase)
				{
					if (!i.majorMustEqual || !i.minorMustEqual) return r.push(n.localize(1, null, t)), !1
				}
				else if (!i.majorMustEqual) return r.push(n.localize(2, null, t)), !1;
				return !!u(e, i) || (r.push(n.localize(3, null, e, t)), !1)
			}

			function f(e)
			{
				if (!Array.isArray(e)) return !1;
				for (var t = 0, n = e.length; t < n; t++)
					if ("string" != typeof e[t]) return !1;
				return !0
			}

			function p(e, t, r)
			{
				if (!t) return r.push(n.localize(4, null)), !1;
				if ("string" != typeof t.publisher) return r.push(n.localize(5, null, "publisher")), !1;
				if ("string" != typeof t.name) return r.push(n.localize(6, null, "name")), !1;
				if ("string" != typeof t.version) return r.push(n.localize(7, null, "version")), !1;
				if (!t.engines) return r.push(n.localize(8, null, "engines")), !1;
				if ("string" != typeof t.engines.vscode) return r.push(n.localize(9, null, "engines.vscode")), !1;
				if ("undefined" != typeof t.extensionDependencies && !f(t.extensionDependencies)) return r.push(n.localize(10, null, "extensionDependencies")), !1;
				if ("undefined" != typeof t.activationEvents)
				{
					if (!f(t.activationEvents)) return r.push(n.localize(11, null, "activationEvents")), !1;
					if ("undefined" == typeof t.main) return r.push(n.localize(12, null, "activationEvents", "main")), !1
				}
				if ("undefined" != typeof t.main)
				{
					if ("string" != typeof t.main) return r.push(n.localize(13, null, "main")), !1;
					var o = i.normalize(i.join(e, t.main));
					if (o.indexOf(e) && r.push(n.localize(14, null, o, e)), "undefined" == typeof t.activationEvents) return r.push(n.localize(15, null, "activationEvents", "main")), !1
				}
				return !0
			}

			function h(e, t, i, o)
			{
				return !!p(t, i, o) && (r.valid(i.version) ? c(e, i, o) : (o.push(n.localize(16, null)), !1))
			}
			var d = /^(\^|>=)?((\d+)|x)\.((\d+)|x)\.((\d+)|x)(\-.*)?$/;
			t.isValidVersionStr = o, t.parseVersion = s, t.normalizeVersion = a, t.isValidVersion = u, t.isValidExtensionVersion = c, t.isVersionValid = l, t.isValidExtensionDescription = h
		}), define(e[32], t([1, 0, 7]), function(e, t, r)
		{
			"use strict";
			var i = function()
			{
				function e(e)
				{
					this._staticArguments = e
				}
				return e.prototype.appendStaticArguments = function(e)
				{
					this._staticArguments.push.apply(this._staticArguments, e)
				}, e.prototype.staticArguments = function(e)
				{
					return isNaN(e) ? this._staticArguments.slice(0) : this._staticArguments[e]
				}, e.prototype._validate = function(e)
				{
					if (!e) throw r.illegalArgument("can not be falsy")
				}, e
			}();
			t.AbstractDescriptor = i;
			var o = function(e)
			{
				function t(t)
				{
					for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
					var i = e.call(this, n) || this;
					return i._ctor = t, i
				}
				return n(t, e), Object.defineProperty(t.prototype, "ctor",
				{
					get: function()
					{
						return this._ctor
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.bind = function()
				{
					for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
					var r = [];
					return r = r.concat(this.staticArguments()), r = r.concat(e), new(t.bind.apply(t, [void 0, this._ctor].concat(r)))
				}, t
			}(i);
			t.SyncDescriptor = o, t.createSyncDescriptor = function(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				return new(o.bind.apply(o, [void 0, e].concat(t)))
			};
			var s = function(e)
			{
				function t(t, n)
				{
					for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
					var o = e.call(this, r) || this;
					if (o._moduleName = t, o._ctorName = n, "string" != typeof t) throw new Error("Invalid AsyncDescriptor arguments, expected `moduleName` to be a string!");
					return o
				}
				return n(t, e), t.create = function(e, n)
				{
					return new t(e, n)
				}, Object.defineProperty(t.prototype, "moduleName",
				{
					get: function()
					{
						return this._moduleName
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "ctorName",
				{
					get: function()
					{
						return this._ctorName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.bind = function()
				{
					for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
					var r = [];
					return r = r.concat(this.staticArguments()), r = r.concat(e), new(t.bind.apply(t, [void 0, this.moduleName, this.ctorName].concat(r)))
				}, t
			}(i);
			t.AsyncDescriptor = s
		}), define(e[3], t([1, 0]), function(e, t)
		{
			"use strict";

			function n(e, t, n, r)
			{
				t[o.DI_TARGET] === t ? t[o.DI_DEPENDENCIES].push(
				{
					id: e,
					index: n,
					optional: r
				}) : (t[o.DI_DEPENDENCIES] = [
				{
					id: e,
					index: n,
					optional: r
				}], t[o.DI_TARGET] = t)
			}

			function r(e)
			{
				if (o.serviceIds.has(e)) return o.serviceIds.get(e);
				var t = function(e, r, i)
				{
					if (3 !== arguments.length) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
					n(t, e, i, !1)
				};
				return t.toString = function()
				{
					return e
				}, o.serviceIds.set(e, t), t
			}

			function i(e)
			{
				return function(t, r, i)
				{
					if (3 !== arguments.length) throw new Error("@optional-decorator can only be used to decorate a parameter");
					n(e, t, i, !0)
				}
			}
			var o;
			! function(e)
			{
				function t(t)
				{
					return t[e.DI_DEPENDENCIES] || []
				}
				e.serviceIds = new Map, e.DI_TARGET = "$di$target", e.DI_DEPENDENCIES = "$di$dependencies", e.getServiceDependencies = t
			}(o = t._util || (t._util = {})), t.IInstantiationService = r("instantiationService"), t.createDecorator = r, t.optional = i
		}), define(e[16], t([1, 0, 3]), function(e, t, n)
		{
			"use strict";

			function r(e, t, n)
			{
				function r(e, t)
				{
					for (var n = e, r = 0; r < t.length; r++)
						if (n = n[t[r]], "undefined" == typeof n || null === n) return;
					return n
				}
				var i = t.split("."),
					o = r(e, i);
				return "undefined" == typeof o ? n : o
			}
			t.IConfigurationService = n.createDecorator("configurationService");
			var i;
			! function(e)
			{
				e[e.Default = 1] = "Default", e[e.User = 2] = "User", e[e.Workspace = 3] = "Workspace"
			}(i = t.ConfigurationSource || (t.ConfigurationSource = {})), t.getConfigurationValue = r
		}), define(e[27], t([1, 0, 3]), function(e, t, n)
		{
			"use strict";
			t.IEnvironmentService = n.createDecorator("environmentService")
		}), define(e[23], t([1, 0, 89, 3]), function(e, t, n, r)
		{
			"use strict";
			t.EXTENSION_IDENTIFIER_PATTERN = "^[a-z0-9A-Z][a-z0-9-A-Z]*\\.[a-z0-9A-Z][a-z0-9-A-Z]*$", t.EXTENSION_IDENTIFIER_REGEX = new RegExp(t.EXTENSION_IDENTIFIER_PATTERN);
			var i;
			! function(e)
			{
				e[e.System = 0] = "System", e[e.User = 1] = "User"
			}(i = t.LocalExtensionType || (t.LocalExtensionType = {})), t.IExtensionManagementService = r.createDecorator("extensionManagementService"), t.IExtensionGalleryService = r.createDecorator("extensionGalleryService");
			var o;
			! function(e)
			{
				e[e.NoneOrRelevance = 0] = "NoneOrRelevance", e[e.LastUpdatedDate = 1] = "LastUpdatedDate", e[e.Title = 2] = "Title", e[e.PublisherName = 3] = "PublisherName", e[e.InstallCount = 4] = "InstallCount", e[e.PublishedDate = 5] = "PublishedDate", e[e.AverageRating = 6] = "AverageRating"
			}(o = t.SortBy || (t.SortBy = {}));
			var s;
			! function(e)
			{
				e[e.Default = 0] = "Default", e[e.Ascending = 1] = "Ascending", e[e.Descending = 2] = "Descending"
			}(s = t.SortOrder || (t.SortOrder = {})), t.IExtensionEnablementService = r.createDecorator("extensionEnablementService"), t.IExtensionTipsService = r.createDecorator("extensionTipsService"), t.ExtensionsLabel = n.localize(0, null), t.ExtensionsChannelId = "extensions", t.PreferencesLabel = n.localize(1, null)
		}), define(e[35], t([1, 0]), function(e, t)
		{
			"use strict";
			var n = function()
			{
				function e()
				{
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					this._entries = new Map;
					for (var n = 0, r = e; n < r.length; n++)
					{
						var i = r[n],
							o = i[0],
							s = i[1];
						this.set(o, s)
					}
				}
				return e.prototype.set = function(e, t)
				{
					var n = this._entries.get(e);
					return this._entries.set(e, t), n
				}, e.prototype.forEach = function(e)
				{
					this._entries.forEach(function(t, n)
					{
						return e(n, t)
					})
				}, e.prototype.has = function(e)
				{
					return this._entries.has(e)
				}, e.prototype.get = function(e)
				{
					return this._entries.get(e)
				}, e
			}();
			t.ServiceCollection = n
		}), define(e[77], t([1, 0, 2, 7, 6, 41, 84, 32, 3, 35]), function(e, t, n, r, i, o, s, a, u, c)
		{
			"use strict";
			var l = function()
			{
				function t(e, t)
				{
					void 0 === e && (e = new c.ServiceCollection), void 0 === t && (t = !1), this._services = e, this._strict = t, this._services.set(u.IInstantiationService, this)
				}
				return t.prototype.createChild = function(e)
				{
					var n = this;
					return this._services.forEach(function(t, r)
					{
						e.has(t) || (r instanceof a.SyncDescriptor && (r = n._createAndCacheServiceInstance(t, r)), e.set(t, r))
					}), new t(e, this._strict)
				}, t.prototype.invokeFunction = function(e)
				{
					for (var t = this, n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
					var o;
					try
					{
						return o = {
							get: function(e, n)
							{
								var r = t._getOrCreateServiceInstance(e);
								if (!r && n !== u.optional) throw new Error("[invokeFunction] unkown service '" + e + "'");
								return r
							}
						}, e.apply(void 0, [o].concat(n))
					}
					finally
					{
						o.get = function()
						{
							throw r.illegalState("service accessor is only valid during the invocation of its target method")
						}
					}
				}, t.prototype.createInstance = function(e)
				{
					for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
					return e instanceof a.AsyncDescriptor ? this._createInstanceAsync(e, t) : e instanceof a.SyncDescriptor ? this._createInstance(e, t) : this._createInstance(new a.SyncDescriptor(e), t)
				}, t.prototype._createInstanceAsync = function(t, i)
				{
					var o, s = this;
					return new n.TPromise(function(n, u, c)
					{
						e([t.moduleName], function(e)
						{
							if (o && u(o), !e) return u(r.illegalArgument("module not found: " + t.moduleName));
							var c;
							if (c = t.ctorName ? e[t.ctorName] : e, "function" != typeof c) return u(r.illegalArgument("not a function: " + t.ctorName || t.moduleName));
							try
							{
								i.unshift.apply(i, t.staticArguments()), n(s._createInstance(new a.SyncDescriptor(c), i))
							}
							catch (e)
							{
								return u(e)
							}
						}, u)
					}, function()
					{
						o = r.canceled()
					})
				}, t.prototype._createInstance = function(e, t)
				{
					for (var n = e.staticArguments().concat(t), r = u._util.getServiceDependencies(e.ctor).sort(function(e, t)
						{
							return e.index - t.index
						}), o = [], s = 0, a = r; s < a.length; s++)
					{
						var c = a[s],
							l = this._getOrCreateServiceInstance(c.id);
						if (!l && this._strict && !c.optional) throw new Error("[createInstance] " + e.ctor.name + " depends on UNKNOWN service " + c.id + ".");
						o.push(l)
					}
					var f = r.length > 0 ? r[0].index : n.length;
					if (n.length !== f)
					{
						console.warn("[createInstance] First service dependency of " + e.ctor.name + " at position " + (f + 1) + " conflicts with " + n.length + " static arguments");
						var p = f - n.length;
						n = p > 0 ? n.concat(new Array(p)) : n.slice(0, f)
					}
					var h = [e.ctor];
					h.push.apply(h, n), h.push.apply(h, o);
					var d = i.create.apply(null, h);
					return e._validate(d), d
				}, t.prototype._getOrCreateServiceInstance = function(e)
				{
					var t = this._services.get(e);
					return t instanceof a.SyncDescriptor ? this._createAndCacheServiceInstance(e, t) : t
				}, t.prototype._createAndCacheServiceInstance = function(e, t)
				{
					function n()
					{
						var e = new Error("[createInstance] cyclic dependency between services");
						throw e.message = r.toString(), e
					}
					o.ok(this._services.get(e) instanceof a.SyncDescriptor);
					for (var r = new s.Graph(function(e)
						{
							return e.id.toString()
						}), i = 0, c = [
						{
							id: e,
							desc: t
						}]; c.length;)
					{
						var l = c.pop();
						r.lookupOrInsertNode(l), i++ > 100 && n();
						for (var f = u._util.getServiceDependencies(l.desc.ctor), p = 0, h = f; p < h.length; p++)
						{
							var d = h[p],
								m = this._services.get(d.id);
							if (m || console.warn("[createInstance] " + e + " depends on " + d.id + " which is NOT registered."), m instanceof a.SyncDescriptor)
							{
								var v = {
									id: d.id,
									desc: m
								};
								r.insertEdge(l, v), c.push(v)
							}
						}
					}
					for (;;)
					{
						var g = r.roots();
						if (0 === g.length)
						{
							0 !== r.length && n();
							break
						}
						for (var y = 0, b = g; y < b.length; y++)
						{
							var _ = b[y],
								E = this._createInstance(_.data.desc, []);
							this._services.set(_.data.id, E), r.removeNode(_.data)
						}
					}
					return this._services.get(e)
				}, t
			}();
			t.InstantiationService = l
		}), define(e[78], t([1, 0, 3]), function(e, t, n)
		{
			"use strict";
			var r;
			! function(e)
			{
				e[e.Default = 1] = "Default", e[e.User = 2] = "User"
			}(r = t.KeybindingSource || (t.KeybindingSource = {})), t.IKeybindingService = n.createDecorator("keybindingService")
		}), define(e[79], t([1, 0, 3]), function(e, t, n)
		{
			"use strict";
			t.ILifecycleService = n.createDecorator("lifecycleService");
			var r;
			! function(e)
			{
				e[e.CLOSE = 0] = "CLOSE", e[e.QUIT = 1] = "QUIT", e[e.RELOAD = 2] = "RELOAD", e[e.LOAD = 3] = "LOAD"
			}(r = t.ShutdownReason || (t.ShutdownReason = {})), t.NullLifecycleService = {
				_serviceBrand: null,
				willShutdown: !1,
				onWillShutdown: function()
				{
					return {
						dispose: function() {}
					}
				},
				onShutdown: function(e)
				{
					return {
						dispose: function() {}
					}
				}
			}
		}), define(e[29], t([1, 0, 63, 2, 39, 3, 55]), function(e, t, n, r, i, o, s)
		{
			"use strict";
			t.CloseAction = new s.Action("close.message", n.localize(0, null), null, !0, function()
			{
				return r.TPromise.as(!0)
			}), t.LaterAction = new s.Action("later.message", n.localize(1, null), null, !0, function()
			{
				return r.TPromise.as(!0)
			}), t.CancelAction = new s.Action("cancel.message", n.localize(2, null), null, !0, function()
			{
				return r.TPromise.as(!0)
			}), t.IMessageService = o.createDecorator("messageService"), t.IChoiceService = o.createDecorator("choiceService"), t.Severity = i.default
		});
	var r = this && this.__decorate || function(e, t, n, r)
		{
			var i, o = arguments.length,
				s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
			else
				for (var a = e.length - 1; a >= 0; a--)(i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
			return o > 3 && s && Object.defineProperty(t, n, s), s
		},
		i = this && this.__param || function(e, t)
		{
			return function(n, r)
			{
				t(n, r, e)
			}
		};
	define(e[81], t([1, 0, 2, 29]), function(e, t, n, o)
	{
		"use strict";
		var s = function()
		{
			function e(e)
			{
				this.choiceService = e
			}
			return e.prototype.call = function(e, t)
			{
				switch (e)
				{
					case "choose":
						return this.choiceService.choose(t[0], t[1], t[2], t[3])
				}
				return n.TPromise.wrapError("invalid command")
			}, e
		}();
		s = r([i(0, o.IChoiceService)], s), t.ChoiceChannel = s;
		var a = function()
		{
			function e(e)
			{
				this.channel = e
			}
			return e.prototype.choose = function(e, t, n, r)
			{
				return this.channel.call("choose", [e, t, n, r])
			}, e
		}();
		t.ChoiceChannelClient = a
	}), define(e[21], t([1, 0, 10, 17]), function(e, t, n, r)
	{
		"use strict";
		var i = n.dirname(r.default.parse(e.toUrl("")).fsPath),
			o = n.join(i, "package.json");
		Object.defineProperty(t, "__esModule",
		{
			value: !0
		}), t.default = e.__$__nodeRequire(o)
	}), define(e[83], t([1, 0, 80, 21]), function(e, t, n, r)
	{
		"use strict";

		function i()
		{
			return n.getMachineId().then(function(e)
			{
				return {
					"X-Market-Client-Id": "VSCode " + r.default.version,
					"User-Agent": "VSCode " + r.default.version,
					"X-Market-User-Id": e
				}
			})
		}
		t.getCommonHTTPHeaders = i
	}), define(e[30], t([1, 0, 10, 17]), function(e, t, n, r)
	{
		"use strict";
		var i = n.dirname(r.default.parse(e.toUrl("")).fsPath),
			o = n.join(i, "product.json"),
			s = e.__$__nodeRequire(o);
		process.env.VSCODE_DEV && (s.nameShort += " Dev", s.nameLong += " Dev", s.dataFolderName += "-dev"), Object.defineProperty(t, "__esModule",
		{
			value: !0
		}), t.default = s
	}), define(e[85], t([1, 0, 36, 87, 18, 10, 17, 50, 21, 30]), function(e, t, n, i, o, s, a, u, c, l)
	{
		"use strict";

		function f()
		{
			var e;
			return e = "win32" === process.platform ? process.env.USERNAME : process.env.USER, e ? n.createHash("sha256").update(e).digest("hex").substr(0, 6) : ""
		}

		function p()
		{
			var e = c.default.name,
				t = f();
			return t && (e += "-" + t), "win32" === process.platform ? "\\\\.\\pipe\\" + e : s.join(o.tmpdir(), e)
		}

		function h()
		{
			return "win32" === process.platform ? "-sock" : ".sock"
		}

		function d(e, t)
		{
			var n = e.debugBrkPluginHost || e.debugPluginHost,
				r = Number(n) || (t ? null : 5870),
				i = !!r && Boolean(!!e.debugBrkPluginHost);
			return {
				port: r,
				break: i
			}
		}

		function m(e, t)
		{
			if (e)
			{
				var n = s.resolve(e);
				return s.normalize(e) === n ? n : s.resolve(t.env.VSCODE_CWD || t.cwd(), e)
			}
		}

		function v(e, t)
		{
			return m(e["user-data-dir"], t) || s.resolve(i.getDefaultUserDataPath(t.platform))
		}
		var g = function()
		{
			function t(e, t)
			{
				this._args = e, this._execPath = t
			}
			return Object.defineProperty(t.prototype, "args",
			{
				get: function()
				{
					return this._args
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "appRoot",
			{
				get: function()
				{
					return s.dirname(a.default.parse(e.toUrl("")).fsPath)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "execPath",
			{
				get: function()
				{
					return this._execPath
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "userHome",
			{
				get: function()
				{
					return o.homedir()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "userProductHome",
			{
				get: function()
				{
					return s.join(this.userHome, l.default.dataFolderName)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "userDataPath",
			{
				get: function()
				{
					return v(this._args, process)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "appNameLong",
			{
				get: function()
				{
					return l.default.nameLong
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "appQuality",
			{
				get: function()
				{
					return l.default.quality
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "appSettingsHome",
			{
				get: function()
				{
					return s.join(this.userDataPath, "User")
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "appSettingsPath",
			{
				get: function()
				{
					return s.join(this.appSettingsHome, "settings.json")
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "appKeybindingsPath",
			{
				get: function()
				{
					return s.join(this.appSettingsHome, "keybindings.json")
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "isExtensionDevelopment",
			{
				get: function()
				{
					return !!this._args.extensionDevelopmentPath
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "backupHome",
			{
				get: function()
				{
					return s.join(this.userDataPath, "Backups")
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "backupWorkspacesPath",
			{
				get: function()
				{
					return s.join(this.backupHome, "workspaces.json")
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "extensionsPath",
			{
				get: function()
				{
					return m(this._args["extensions-dir"], process) || s.join(this.userProductHome, "extensions")
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "extensionDevelopmentPath",
			{
				get: function()
				{
					return this._args.extensionDevelopmentPath ? s.normalize(this._args.extensionDevelopmentPath) : this._args.extensionDevelopmentPath
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "extensionTestsPath",
			{
				get: function()
				{
					return this._args.extensionTestsPath ? s.normalize(this._args.extensionTestsPath) : this._args.extensionTestsPath
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "disableExtensions",
			{
				get: function()
				{
					return this._args["disable-extensions"]
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "debugExtensionHost",
			{
				get: function()
				{
					return d(this._args, this.isBuilt)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "isBuilt",
			{
				get: function()
				{
					return !process.env.VSCODE_DEV
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "verbose",
			{
				get: function()
				{
					return this._args.verbose
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "wait",
			{
				get: function()
				{
					return this._args.wait
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "performance",
			{
				get: function()
				{
					return this._args.performance
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "logExtensionHostCommunication",
			{
				get: function()
				{
					return this._args.logExtensionHostCommunication
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "mainIPCHandle",
			{
				get: function()
				{
					return p() + "-" + c.default.version + h()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "sharedIPCHandle",
			{
				get: function()
				{
					return p() + "-" + c.default.version + "-shared" + h()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "nodeCachedDataDir",
			{
				get: function()
				{
					return s.join(this.userDataPath, "CachedData")
				},
				enumerable: !0,
				configurable: !0
			}), t
		}();
		r([u.memoize], g.prototype, "appRoot", null), r([u.memoize], g.prototype, "userHome", null), r([u.memoize], g.prototype, "userProductHome", null), r([u.memoize], g.prototype, "userDataPath", null), r([u.memoize], g.prototype, "appSettingsHome", null), r([u.memoize], g.prototype, "appSettingsPath", null), r([u.memoize], g.prototype, "appKeybindingsPath", null), r([u.memoize], g.prototype, "isExtensionDevelopment", null), r([u.memoize], g.prototype, "backupHome", null), r([u.memoize], g.prototype, "backupWorkspacesPath", null), r([u.memoize], g.prototype, "extensionsPath", null), r([u.memoize], g.prototype, "extensionDevelopmentPath", null), r([u.memoize], g.prototype, "extensionTestsPath", null), r([u.memoize], g.prototype, "debugExtensionHost", null), r([u.memoize], g.prototype, "mainIPCHandle", null), r([u.memoize], g.prototype, "sharedIPCHandle", null), r([u.memoize], g.prototype, "nodeCachedDataDir", null), t.EnvironmentService = g, t.parseExtensionHostPort = d, t.parseUserDataDir = v
	}), define(e[13], t([1, 0, 6, 41]), function(e, t, n, r)
	{
		"use strict";
		var i = function()
		{
			function e()
			{
				this.data = {}
			}
			return e.prototype.add = function(e, t)
			{
				r.ok(n.isString(e)), r.ok(n.isObject(t)), r.ok(!this.data.hasOwnProperty(e), "There is already an extension with this id"), this.data[e] = t
			}, e.prototype.knows = function(e)
			{
				return this.data.hasOwnProperty(e)
			}, e.prototype.as = function(e)
			{
				return this.data[e] || null
			}, e
		}();
		t.Registry = new i;
		var o = function()
		{
			function e()
			{
				this.toBeInstantiated = [], this.instances = []
			}
			return e.prototype.setInstantiationService = function(e)
			{
				for (this.instantiationService = e; this.toBeInstantiated.length > 0;)
				{
					var t = this.toBeInstantiated.shift();
					this.instantiate(t)
				}
			}, e.prototype.instantiate = function(e)
			{
				var t = this.instantiationService.createInstance(e);
				this.instances.push(t)
			}, e.prototype._register = function(e)
			{
				this.instantiationService ? this.instantiate(e) : this.toBeInstantiated.push(e)
			}, e.prototype._getInstances = function()
			{
				return this.instances.slice(0)
			}, e.prototype._setInstances = function(e)
			{
				this.instances = e
			}, e
		}();
		t.BaseRegistry = o
	}), define(e[40], t([1, 0, 13, 38]), function(e, t, n, r)
	{
		"use strict";

		function i(e)
		{
			return e.length > 0 && "#" === e.charAt(e.length - 1) ? e.substring(0, e.length - 1) : e
		}
		t.Extensions = {
			JSONContribution: "base.contributions.json"
		};
		var o = function()
			{
				function e()
				{
					this.schemasById = {}, this.eventEmitter = new r.EventEmitter
				}
				return e.prototype.addRegistryChangedListener = function(e)
				{
					return this.eventEmitter.addListener2("registryChanged", e)
				}, e.prototype.registerSchema = function(e, t)
				{
					this.schemasById[i(e)] = t, this.eventEmitter.emit("registryChanged",
					{})
				}, e.prototype.getSchemaContributions = function()
				{
					return {
						schemas: this.schemasById
					}
				}, e
			}(),
			s = new o;
		n.Registry.add(t.Extensions.JSONContribution, s)
	}), define(e[88], t([1, 0, 61, 7, 39, 40, 13]), function(e, t, n, r, i, o, s)
	{
		"use strict";
		var a = Object.hasOwnProperty,
			u = s.Registry.as(o.Extensions.JSONContribution),
			c = function()
			{
				function e(e, t)
				{
					this._messageHandler = e, this._source = t
				}
				return e.prototype._msg = function(e, t)
				{
					this._messageHandler(
					{
						type: e,
						message: t,
						source: this._source
					})
				}, e.prototype.error = function(e)
				{
					this._msg(i.default.Error, e)
				}, e.prototype.warn = function(e)
				{
					this._msg(i.default.Warning, e)
				}, e.prototype.info = function(e)
				{
					this._msg(i.default.Info, e)
				}, e
			}();
		t.ExtensionMessageCollector = c;
		var l = function()
		{
			function e(e)
			{
				this.name = e, this._handler = null, this._users = null, this._done = !1
			}
			return e.prototype.setHandler = function(e)
			{
				if (null !== this._handler || this._done) throw new Error("Handler already set!");
				this._handler = e, this._handle()
			}, e.prototype.acceptUsers = function(e)
			{
				if (null !== this._users || this._done) throw new Error("Users already set!");
				this._users = e, this._handle()
			}, e.prototype._handle = function()
			{
				if (null !== this._handler && null !== this._users)
				{
					this._done = !0;
					var e = this._handler;
					this._handler = null;
					var t = this._users;
					this._users = null;
					try
					{
						e(t)
					}
					catch (e)
					{
						r.onUnexpectedError(e)
					}
				}
			}, e
		}();
		t.ExtensionPoint = l;
		var f = "vscode://schemas/vscode-extensions",
			p = {
				properties:
				{
					engines:
					{
						type: "object",
						properties:
						{
							vscode:
							{
								type: "string",
								description: n.localize(0, null),
								default: "^0.10.0"
							}
						}
					},
					publisher:
					{
						description: n.localize(1, null),
						type: "string"
					},
					displayName:
					{
						description: n.localize(2, null),
						type: "string"
					},
					categories:
					{
						description: n.localize(3, null),
						type: "array",
						uniqueItems: !0,
						items:
						{
							type: "string",
							enum: ["Languages", "Snippets", "Linters", "Themes", "Debuggers", "Other", "Keymaps", "Formatters", "Extension Packs"]
						}
					},
					galleryBanner:
					{
						type: "object",
						description: n.localize(4, null),
						properties:
						{
							color:
							{
								description: n.localize(5, null),
								type: "string"
							},
							theme:
							{
								description: n.localize(6, null),
								type: "string",
								enum: ["dark", "light"]
							}
						}
					},
					contributes:
					{
						description: n.localize(7, null),
						type: "object",
						properties:
						{},
						default:
						{}
					},
					preview:
					{
						type: "boolean",
						description: n.localize(8, null)
					},
					activationEvents:
					{
						description: n.localize(9, null),
						type: "array",
						items:
						{
							type: "string",
							defaultSnippets: [
							{
								label: "onLanguage",
								body: "onLanguage:${1:languageId}"
							},
							{
								label: "onCommand",
								body: "onCommand:${2:commandId}"
							},
							{
								label: "onDebug",
								body: "onDebug:${3:type}"
							},
							{
								label: "workspaceContains",
								body: "workspaceContains:${4:fileName}"
							}]
						}
					},
					badges:
					{
						type: "array",
						description: n.localize(10, null),
						items:
						{
							type: "object",
							required: ["url", "href", "description"],
							properties:
							{
								url:
								{
									type: "string",
									description: n.localize(11, null)
								},
								href:
								{
									type: "string",
									description: n.localize(12, null)
								},
								description:
								{
									type: "string",
									description: n.localize(13, null)
								}
							}
						}
					},
					extensionDependencies:
					{
						description: n.localize(14, null),
						type: "array",
						uniqueItems: !0,
						items:
						{
							type: "string"
						}
					},
					scripts:
					{
						type: "object",
						properties:
						{
							"vscode:prepublish":
							{
								description: n.localize(15, null),
								type: "string"
							}
						}
					},
					icon:
					{
						type: "string",
						description: n.localize(16, null)
					}
				}
			},
			h = function()
			{
				function e()
				{
					this._extensionPoints = {}
				}
				return e.prototype.registerExtensionPoint = function(e, t, n)
				{
					if (a.call(this._extensionPoints, e)) throw new Error("Duplicate extension point: " + e);
					var r = new l(e);
					return this._extensionPoints[e] = r, p.properties.contributes.properties[e] = n, u.registerSchema(f, p), r
				}, e.prototype.getExtensionPoints = function()
				{
					var e = this;
					return Object.keys(this._extensionPoints).map(function(t)
					{
						return e._extensionPoints[t]
					})
				}, e
			}();
		t.ExtensionsRegistryImpl = h;
		var d = {
			ExtensionsRegistry: "ExtensionsRegistry"
		};
		s.Registry.add(d.ExtensionsRegistry, new h), t.ExtensionsRegistry = s.Registry.as(d.ExtensionsRegistry), u.registerSchema(f, p)
	}), define(e[22], t([1, 0, 57, 4, 13, 5, 6, 88, 40]), function(e, t, n, r, i, o, s, a, u)
	{
		"use strict";

		function c(e)
		{
			var t = Array.isArray(e) ? e[0] : e;
			switch (t)
			{
				case "boolean":
					return !1;
				case "integer":
				case "number":
					return 0;
				case "string":
					return "";
				case "array":
					return [];
				case "object":
					return {};
				default:
					return null
			}
		}
		t.Extensions = {
			Configuration: "base.contributions.configuration"
		};
		var l = "vscode://schemas/settings",
			f = i.Registry.as(u.Extensions.JSONContribution),
			p = function()
			{
				function e()
				{
					this.overrideIdentifiers = [], this.configurationContributors = [], this.configurationSchema = {
						properties:
						{},
						patternProperties:
						{},
						additionalProperties: !1,
						errorMessage: "Unknown configuration setting"
					}, this._onDidRegisterConfiguration = new r.Emitter, this.configurationProperties = {}, this.computeOverridePropertyPattern(), f.registerSchema(l, this.configurationSchema), this.registerOverrideSettingsConfiguration()
				}
				return Object.defineProperty(e.prototype, "onDidRegisterConfiguration",
				{
					get: function()
					{
						return this._onDidRegisterConfiguration.event
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.registerConfiguration = function(e)
				{
					this.registerConfigurations([e])
				}, e.prototype.registerConfigurations = function(e)
				{
					var t = this;
					e.forEach(function(e)
					{
						t.registerProperties(e), t.configurationContributors.push(e), t.registerJSONConfiguration(e), t.updateSchemaForOverrideSettingsConfiguration(e)
					}), this._onDidRegisterConfiguration.fire(this)
				}, e.prototype.registerOverrideIdentifiers = function(e)
				{
					(t = this.overrideIdentifiers).push.apply(t, e), this.updateOverridePropertyPatternKey();
					var t
				}, e.prototype.registerProperties = function(e, t)
				{
					void 0 === t && (t = !1), t = e.overridable || t;
					var n = e.properties;
					if (n)
						for (var r in n)
						{
							var i = n[r],
								o = i.default;
							s.isUndefined(o) && (i.default = c(i.type)), t && (i.overridable = !0), this.configurationProperties[r] = n[r]
						}
					var a = e.allOf;
					if (a)
						for (var u = 0, l = a; u < l.length; u++)
						{
							var f = l[u];
							this.registerProperties(f, t)
						}
				}, e.prototype.getConfigurations = function()
				{
					return this.configurationContributors
				}, e.prototype.getConfigurationProperties = function()
				{
					return this.configurationProperties
				}, e.prototype.registerJSONConfiguration = function(e)
				{
					function t(e)
					{
						var r = e.properties;
						if (r)
							for (var i in r) n.properties[i] = r[i];
						var o = e.allOf;
						o && o.forEach(t)
					}
					var n = this.configurationSchema;
					e.id === h ? n.patternProperties[this.overridePropertyPattern] = o.clone(e.properties["[]"]) : t(e), f.registerSchema(l, n)
				}, e.prototype.updateSchemaForOverrideSettingsConfiguration = function(e)
				{
					if (e.id !== h)
					{
						var t = this.configurationSchema.patternProperties[this.overridePropertyPattern];
						t && (t.properties || (t.properties = {}), this.update(e, t), f.registerSchema(l, this.configurationSchema))
					}
				}, e.prototype.updateOverridePropertyPatternKey = function()
				{
					var e = this.configurationSchema.patternProperties[this.overridePropertyPattern];
					e && (delete this.configurationSchema.patternProperties[this.overridePropertyPattern], this.computeOverridePropertyPattern(), this.configurationSchema.patternProperties[this.overridePropertyPattern] = e, f.registerSchema(l, this.configurationSchema))
				}, e.prototype.update = function(e, t)
				{
					var n = this,
						r = e.properties;
					if (r)
						for (var i in r) r[i].overridable && (t.properties[i] = this.getConfigurationProperties()[i]);
					var o = e.allOf;
					o && o.forEach(function(e)
					{
						return n.update(e, t)
					})
				}, e.prototype.computeOverridePropertyPattern = function()
				{
					this.overridePropertyPattern = this.overrideIdentifiers.length ? m.replace("${0}", this.overrideIdentifiers.join("|")) : d
				}, e.prototype.registerOverrideSettingsConfiguration = function()
				{
					var e = {
						"[]":
						{
							type: "object",
							description: n.localize(0, null),
							additionalProperties: !1,
							errorMessage: "Unknown Identifier. Use language identifiers"
						}
					};
					this.registerConfiguration(
					{
						id: h,
						type: "object",
						title: n.localize(1, null),
						properties: e
					})
				}, e
			}(),
			h = "override",
			d = "\\[.*\\]$",
			m = "\\[(${0})\\]$";
		t.OVERRIDE_PROPERTY_PATTERN = new RegExp(d);
		var v = new p;
		i.Registry.add(t.Extensions.Configuration, v);
		var g = a.ExtensionsRegistry.registerExtensionPoint("configuration", [],
		{
			description: n.localize(2, null),
			type: "object",
			defaultSnippets: [
			{
				body:
				{
					title: "",
					properties:
					{}
				}
			}],
			properties:
			{
				title:
				{
					description: n.localize(3, null),
					type: "string"
				},
				properties:
				{
					description: n.localize(4, null),
					type: "object",
					additionalProperties:
					{
						anyOf: [
						{
							$ref: "http://json-schema.org/draft-04/schema#"
						},
						{
							type: "object",
							properties:
							{
								isExecutable:
								{
									type: "boolean"
								}
							}
						}]
					}
				}
			}
		});
		g.setHandler(function(e)
		{
			for (var t = [], r = 0; r < e.length; r++)
			{
				var i = e[r].value,
					s = e[r].collector;
				if (i.type && "object" !== i.type ? s.warn(n.localize(5, null)) : i.type = "object", i.title && "string" != typeof i.title && s.error(n.localize(6, null)), i.properties && "object" != typeof i.properties) return void s.error(n.localize(7, null));
				var a = o.clone(i);
				a.id = e[r].description.id, t.push(a)
			}
			v.registerConfigurations(t)
		})
	}), define(e[90], t([1, 0, 13, 6, 33, 5, 20, 22]), function(e, t, r, i, o, s, a, u)
	{
		"use strict";

		function c()
		{
			var e = Object.create(null),
				t = r.Registry.as(u.Extensions.Configuration).getConfigurationProperties();
			for (var n in t)
			{
				var i = t[n].default;
				f(e, n, i, function(e)
				{
					return console.error("Conflict in default settings: " + e)
				})
			}
			return e
		}

		function l(e, t)
		{
			var n = Object.create(null);
			for (var r in e) f(n, r, e[r], t);
			return n
		}

		function f(e, t, n, r)
		{
			for (var i = t.split("."), o = i.pop(), s = e, a = 0; a < i.length; a++)
			{
				var u = i[a],
					c = s[u];
				switch (typeof c)
				{
					case "undefined":
						c = s[u] = Object.create(null);
						break;
					case "object":
						break;
					default:
						return void r("Ignoring " + t + " as " + i.slice(0, a + 1).join(".") + " is " + JSON.stringify(c))
				}
				s = c
			}
			"object" == typeof s ? s[o] = n : r("Ignoring " + t + " as " + i.join(".") + " is " + JSON.stringify(s))
		}

		function p()
		{
			var e = r.Registry.as(u.Extensions.Configuration).getConfigurationProperties();
			return Object.keys(e)
		}

		function h(e, t, n)
		{
			Object.keys(t).forEach(function(r)
			{
				r in e ? i.isObject(e[r]) && i.isObject(t[r]) ? h(e[r], t[r], n) : n && (e[r] = t[r]) : e[r] = t[r]
			})
		}

		function d(e)
		{
			return e.substring(1, e.length - 1)
		}

		function m(e)
		{
			return "[" + e + "]"
		}
		t.getDefaultValues = c, t.toValuesTree = l, t.getConfigurationKeys = p, t.merge = h;
		var v = function()
		{
			function e(e, t)
			{
				void 0 === t && (t = ""), this.name = t, this._overrides = [], this._raw = {}, this._unfilteredRaw = {}, this._parseErrors = [], e && this.update(e)
			}
			return Object.defineProperty(e.prototype, "contents",
			{
				get: function()
				{
					return this._contents ||
					{}
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "overrides",
			{
				get: function()
				{
					return this._overrides
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "keys",
			{
				get: function()
				{
					return Object.keys(this._raw)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "raw",
			{
				get: function()
				{
					return this._raw
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "unfilteredRaw",
			{
				get: function()
				{
					return this._unfilteredRaw
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "errors",
			{
				get: function()
				{
					return this._parseErrors
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.merge = function(t, n)
			{
				void 0 === n && (n = !0);
				var r = new e(null);
				return this.doMerge(r, this, n), this.doMerge(r, t, n), r
			}, e.prototype.doMerge = function(e, t, n)
			{
				void 0 === n && (n = !0), e._contents = s.clone(this.contents), h(e.contents, t.contents, n);
				for (var r = s.clone(e.overrides), i = function(e)
					{
						var t = r.filter(function(t)
						{
							return a.equals(t.identifiers, e.identifiers)
						})[0];
						t ? h(t.contents, e.contents, n) : r.push(e)
					}, o = 0, u = t.overrides; o < u.length; o++)
				{
					var c = u[o];
					i(c)
				}
				e._overrides = r
			}, e.prototype.config = function(t)
			{
				var n = new e(null);
				return n._contents = s.clone(this.contents[t]), n
			}, e.prototype.configWithOverrides = function(t)
			{
				var n = new e(null),
					r = s.clone(this.contents);
				if (this.overrides)
					for (var i = 0, o = this.overrides; i < o.length; i++)
					{
						var a = o[i];
						a.identifiers.indexOf(t) !== -1 && h(r, a.contents, !0)
					}
				return n._contents = r, n
			}, e.prototype.update = function(e)
			{
				function t(e)
				{
					Array.isArray(c) ? c.push(e) : a && (c[a] = e), u.OVERRIDE_PROPERTY_PATTERN.test(a) && n(a, e)
				}

				function n(e, t)
				{
					s.push(
					{
						identifiers: [d(e).trim()],
						raw: t,
						contents: null
					})
				}
				var i = this,
					s = [],
					a = null,
					c = [],
					f = [],
					p = [],
					h = {
						onObjectBegin: function()
						{
							var e = {};
							t(e), f.push(c), c = e, a = null
						},
						onObjectProperty: function(e)
						{
							a = e
						},
						onObjectEnd: function()
						{
							c = f.pop()
						},
						onArrayBegin: function()
						{
							var e = [];
							t(e), f.push(c), c = e, a = null
						},
						onArrayEnd: function()
						{
							c = f.pop()
						},
						onLiteralValue: t,
						onError: function(e)
						{
							p.push(
							{
								error: e
							})
						}
					};
				try
				{
					o.visit(e, h), this._raw = c[0]
				}
				catch (e)
				{
					console.error("Error while parsing settings file " + this.name + ": " + e), this._raw = {}, this._parseErrors = [e]
				}
				this._unfilteredRaw = this._raw, this._raw = this.filterRaw(this._unfilteredRaw), this._contents = l(this._raw, function(e)
				{
					return console.error("Conflict in settings file " + i.name + ": " + e)
				});
				var m = r.Registry.as(u.Extensions.Configuration).getConfigurationProperties();
				this._overrides = s.map(function(e)
				{
					var t = {};
					for (var n in e.raw) m[n] && m[n].overridable && (t[n] = e.raw[n]);
					return {
						identifiers: e.identifiers,
						contents: l(t, function(e)
						{
							return console.error("Conflict in settings file " + i.name + ": " + e)
						})
					}
				})
			}, e.prototype.filterRaw = function(e)
			{
				return e
			}, e.prototype.refilter = function()
			{
				var e = this;
				this._unfilteredRaw && (this._raw = this.filterRaw(this._unfilteredRaw), this._contents = l(this._raw, function(t)
				{
					return console.error("Conflict in settings file " + e.name + ": " + t)
				}))
			}, e
		}();
		t.ConfigModel = v;
		var g = function(e)
		{
			function t()
			{
				var t = e.call(this, null) || this;
				return t.update(), t
			}
			return n(t, e), Object.defineProperty(t.prototype, "keys",
			{
				get: function()
				{
					return this._keys
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.update = function()
			{
				this._contents = c(), this._keys = p()
			}, t
		}(v);
		t.DefaultConfigModel = g, t.overrideIdentifierFromKey = d, t.keyFromOverrideIdentifier = m
	}), define(e[91], t([1, 0, 2, 5, 53, 13, 22, 12, 16, 90, 4, 27]), function(e, t, o, s, a, u, c, l, f, p, h, d)
	{
		"use strict";
		var m = function(e)
		{
			function t(t)
			{
				var n = e.call(this) || this;
				return n._onDidUpdateConfiguration = n._register(new h.Emitter), n.onDidUpdateConfiguration = n._onDidUpdateConfiguration.event, n.userConfigModelWatcher = new a.ConfigWatcher(t.appSettingsPath,
				{
					changeBufferDelay: 300,
					defaultConfig: new p.ConfigModel(null, t.appSettingsPath),
					parse: function(e, n)
					{
						var r = new p.ConfigModel(e, t.appSettingsPath);
						return n = r.errors.slice(), r
					}
				}), n._register(l.toDisposable(function()
				{
					return n.userConfigModelWatcher.dispose()
				})), n._register(n.userConfigModelWatcher.onDidUpdateConfiguration(function()
				{
					return n.onConfigurationChange(f.ConfigurationSource.User)
				})), n._register(u.Registry.as(c.Extensions.Configuration).onDidRegisterConfiguration(function()
				{
					return n.onConfigurationChange(f.ConfigurationSource.Default)
				})), n
			}
			return n(t, e), t.prototype.onConfigurationChange = function(e)
			{
				this.cache = void 0;
				var t = this.getCache();
				this._onDidUpdateConfiguration.fire(
				{
					config: this.getConfiguration(),
					source: e,
					sourceConfig: e === f.ConfigurationSource.Default ? t.defaults.contents : t.user.contents
				})
			}, t.prototype.reloadConfiguration = function(e)
			{
				var t = this;
				return new o.TPromise(function(n)
				{
					t.userConfigModelWatcher.reload(function()
					{
						t.cache = void 0, n(t.getConfiguration(e))
					})
				})
			}, t.prototype.getConfiguration = function(e)
			{
				var t = this.toOptions(e),
					n = this.getCache(),
					r = t.overrideIdentifier ? n.consolidated.configWithOverrides(t.overrideIdentifier) : n.consolidated;
				return t.section ? r.config(t.section).contents : r.contents
			}, t.prototype.lookup = function(e, t)
			{
				var n = this.getCache();
				return {
					default: s.clone(f.getConfigurationValue(t ? n.defaults.configWithOverrides(t).contents : n.defaults.contents, e)),
					user: s.clone(f.getConfigurationValue(t ? n.user.configWithOverrides(t).contents : n.user.contents, e)),
					value: s.clone(f.getConfigurationValue(t ? n.consolidated.configWithOverrides(t).contents : n.consolidated.contents, e))
				}
			}, t.prototype.keys = function()
			{
				var e = this.getCache();
				return {
					default: e.defaults.keys,
					user: e.user.keys
				}
			}, t.prototype.getCache = function()
			{
				return this.cache || (this.cache = this.consolidateConfigurations())
			}, t.prototype.toOptions = function(e)
			{
				return "string" == typeof e ?
				{
					section: e
				} : "object" == typeof e ? e :
				{}
			}, t.prototype.consolidateConfigurations = function()
			{
				var e = new p.DefaultConfigModel,
					t = this.userConfigModelWatcher.getConfig(),
					n = e.merge(t);
				return {
					defaults: e,
					user: t,
					consolidated: n
				}
			}, t
		}(l.Disposable);
		m = r([i(0, d.IEnvironmentService)], m), t.ConfigurationService = m
	}), define(e[42], t([1, 0, 64, 3, 22, 13]), function(e, t, n, r, i, o)
	{
		"use strict";
		t.IRequestService = r.createDecorator("requestService2"), o.Registry.as(i.Extensions.Configuration).registerConfiguration(
		{
			id: "http",
			order: 15,
			title: n.localize(0, null),
			type: "object",
			properties:
			{
				"http.proxy":
				{
					type: "string",
					pattern: "^https?://([^:]*(:[^@]*)?@)?([^:]+)(:\\d+)?/?$|^$",
					description: n.localize(1, null)
				},
				"http.proxyStrictSSL":
				{
					type: "boolean",
					default: !0,
					description: n.localize(2, null)
				},
				"http.proxyAuthorization":
				{
					type: ["null", "string"],
					default: null,
					description: n.localize(3, null)
				}
			}
		})
	}), define(e[43], t([1, 0, 3]), function(e, t, n)
	{
		"use strict";
		t.ID = "storageService", t.IStorageService = n.createDecorator(t.ID);
		var r;
		! function(e)
		{
			e[e.GLOBAL = 0] = "GLOBAL", e[e.WORKSPACE = 1] = "WORKSPACE"
		}(r = t.StorageScope || (t.StorageScope = {})), t.NullStorageService = {
			_serviceBrand: void 0,
			store: function() {},
			swap: function() {},
			remove: function() {},
			get: function(e, t, n)
			{
				return n
			},
			getInteger: function(e, t, n)
			{
				return n
			},
			getBoolean: function(e, t, n)
			{
				return n
			}
		}
	}), define(e[44], t([1, 0, 3]), function(e, t, n)
	{
		"use strict";
		t.ITelemetryService = n.createDecorator("telemetryService")
	}), define(e[95], t([1, 0, 2]), function(e, t, n)
	{
		"use strict";
		var r = function()
		{
			function e(e)
			{
				this.appender = e
			}
			return e.prototype.call = function(e, t)
			{
				var r = t.eventName,
					i = t.data;
				return this.appender.log(r, i), n.TPromise.as(null)
			}, e
		}();
		t.TelemetryAppenderChannel = r;
		var i = function()
		{
			function e(e)
			{
				this.channel = e
			}
			return e.prototype.log = function(e, t)
			{
				return this.channel.call("log",
				{
					eventName: e,
					data: t
				})
			}, e.prototype.dispose = function() {}, e
		}();
		t.TelemetryAppenderClient = i
	}), define(e[96], t([1, 0, 105, 6, 5, 2]), function(e, t, n, r, i, o)
	{
		"use strict";

		function s()
		{
			u === !1 && (n.setup("2588e01f-f6c9-4cd6-a348-143741f8d702").setAutoCollectConsole(!1).setAutoCollectExceptions(!1).setAutoCollectPerformance(!1).setAutoCollectRequests(!1), u = !0)
		}

		function a(e)
		{
			s();
			var t = n.getClient(e);
			return t.channel.setOfflineMode(!0), t.context.tags[t.context.keys.deviceMachineName] = "", 0 === e.indexOf("AIF-") && (t.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1"), t
		}
		var u = !1,
			c = function()
			{
				function e(e, t, n)
				{
					this._eventPrefix = e, this._defaultData = t, this._defaultData || (this._defaultData = Object.create(null)), "string" == typeof n ? this._aiClient = a(n) : "function" == typeof n && (this._aiClient = n())
				}
				return e._getData = function(t)
				{
					var n = Object.create(null),
						r = Object.create(null),
						i = Object.create(null);
					e._flaten(t, i);
					for (var o in i)
					{
						o = o.length > 150 ? o.substr(o.length - 149) : o;
						var s = i[o];
						"number" == typeof s ? r[o] = s : "boolean" == typeof s ? r[o] = s ? 1 : 0 : "string" == typeof s ? n[o] = s.substring(0, 1023) : "undefined" != typeof s && null !== s && (n[o] = s)
					}
					return {
						properties: n,
						measurements: r
					}
				}, e._flaten = function(t, n, o, s)
				{
					if (void 0 === o && (o = 0), t)
						for (var a = 0, u = Object.getOwnPropertyNames(t); a < u.length; a++)
						{
							var c = u[a],
								l = t[c],
								f = s ? s + c : c;
							Array.isArray(l) ? n[f] = i.safeStringify(l) : l instanceof Date ? n[f] = l.toISOString() : r.isObject(l) ? o < 2 ? e._flaten(l, n, o + 1, f + ".") : n[f] = i.safeStringify(l) : n[f] = l
						}
				}, e.prototype.log = function(t, n)
				{
					if (this._aiClient)
					{
						n = i.mixin(n, this._defaultData);
						var r = e._getData(n),
							o = r.properties,
							s = r.measurements;
						this._aiClient.trackEvent(this._eventPrefix + "/" + t, o, s)
					}
				}, e.prototype.dispose = function()
				{
					var e = this;
					if (this._aiClient) return new o.TPromise(function(t)
					{
						e._aiClient.sendPendingData(function()
						{
							e._aiClient = void 0, t(void 0)
						})
					})
				}, e
			}();
		t.AppInsightsAppender = c
	}), define(e[98], t([1, 0, 11, 18, 2, 28]), function(e, t, n, r, i, o)
	{
		"use strict";

		function s(e, t)
		{
			var s = Object.create(null);
			s.sessionID = o.generateUuid() + Date.now(), s.commitHash = e, s.version = t, s["common.osVersion"] = r.release(), s["common.platform"] = n.Platform[n.platform];
			var a = 0,
				u = Date.now();
			return Object.defineProperties(s,
			{
				timestamp:
				{
					get: function()
					{
						return new Date
					},
					enumerable: !0
				},
				"common.timesincesessionstart":
				{
					get: function()
					{
						return Date.now() - u
					},
					enumerable: !0
				},
				"common.sequence":
				{
					get: function()
					{
						return a++
					},
					enumerable: !0
				}
			}), i.TPromise.as(s)
		}
		t.resolveCommonProperties = s
	}), define(e[46], t([1, 0, 3]), function(e, t, n)
	{
		"use strict";
		t.IWindowsService = n.createDecorator("windowsService"), t.IWindowService = n.createDecorator("windowService")
	}), define(e[100], t([1, 0, 12, 46]), function(e, t, n, o)
	{
		"use strict";
		var s = function()
		{
			function e(e)
			{
				this.disposables = [], e.onWindowOpen(this.setActiveWindow, this, this.disposables), e.onWindowFocus(this.setActiveWindow, this, this.disposables)
			}
			return e.prototype.setActiveWindow = function(e)
			{
				this._activeWindowId = e
			}, Object.defineProperty(e.prototype, "activeClientId",
			{
				get: function()
				{
					return "window:" + this._activeWindowId
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.dispose = function()
			{
				this.disposables = n.dispose(this.disposables)
			}, e
		}();
		s = r([i(0, o.IWindowsService)], s), t.ActiveWindowManager = s
	}), define(e[101], t([1, 0, 4, 25]), function(e, t, n, r)
	{
		"use strict";
		var i = function()
		{
			function e(e)
			{
				this.service = e, this.onWindowOpen = n.buffer(e.onWindowOpen, !0), this.onWindowFocus = n.buffer(e.onWindowFocus, !0)
			}
			return e.prototype.call = function(e, t)
			{
				switch (e)
				{
					case "event:onWindowOpen":
						return r.eventToCall(this.onWindowOpen);
					case "event:onWindowFocus":
						return r.eventToCall(this.onWindowFocus);
					case "openFileFolderPicker":
						return this.service.openFileFolderPicker(t[0], t[1]);
					case "openFilePicker":
						return this.service.openFilePicker(t[0], t[1], t[2]);
					case "openFolderPicker":
						return this.service.openFolderPicker(t[0], t[1]);
					case "reloadWindow":
						return this.service.reloadWindow(t);
					case "openDevTools":
						return this.service.openDevTools(t);
					case "toggleDevTools":
						return this.service.toggleDevTools(t);
					case "closeFolder":
						return this.service.closeFolder(t);
					case "toggleFullScreen":
						return this.service.toggleFullScreen(t);
					case "setRepresentedFilename":
						return this.service.setRepresentedFilename(t[0], t[1]);
					case "addToRecentlyOpen":
						return this.service.addToRecentlyOpen(t);
					case "removeFromRecentlyOpen":
						return this.service.removeFromRecentlyOpen(t);
					case "getRecentlyOpen":
						return this.service.getRecentlyOpen(t);
					case "focusWindow":
						return this.service.focusWindow(t);
					case "isMaximized":
						return this.service.isMaximized(t);
					case "maximizeWindow":
						return this.service.maximizeWindow(t);
					case "unmaximizeWindow":
						return this.service.unmaximizeWindow(t);
					case "setDocumentEdited":
						return this.service.setDocumentEdited(t[0], t[1]);
					case "openWindow":
						return this.service.openWindow(t[0], t[1]);
					case "openNewWindow":
						return this.service.openNewWindow();
					case "showWindow":
						return this.service.showWindow(t);
					case "getWindows":
						return this.service.getWindows();
					case "getWindowCount":
						return this.service.getWindowCount();
					case "quit":
						return this.service.quit();
					case "log":
						return this.service.log(t[0], t[1]);
					case "closeExtensionHostWindow":
						return this.service.closeExtensionHostWindow(t);
					case "showItemInFolder":
						return this.service.showItemInFolder(t);
					case "openExternal":
						return this.service.openExternal(t);
					case "startCrashReporter":
						return this.service.startCrashReporter(t)
				}
			}, e
		}();
		t.WindowsChannel = i;
		var o = function()
		{
			function e(e)
			{
				this.channel = e, this._onWindowOpen = r.eventFromCall(this.channel, "event:onWindowOpen"), this._onWindowFocus = r.eventFromCall(this.channel, "event:onWindowFocus")
			}
			return Object.defineProperty(e.prototype, "onWindowOpen",
			{
				get: function()
				{
					return this._onWindowOpen
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "onWindowFocus",
			{
				get: function()
				{
					return this._onWindowFocus
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.openFileFolderPicker = function(e, t)
			{
				return this.channel.call("openFileFolderPicker", [e, t])
			}, e.prototype.openFilePicker = function(e, t, n)
			{
				return this.channel.call("openFilePicker", [e, t, n])
			}, e.prototype.openFolderPicker = function(e, t)
			{
				return this.channel.call("openFolderPicker", [e, t])
			}, e.prototype.reloadWindow = function(e)
			{
				return this.channel.call("reloadWindow", e)
			}, e.prototype.openDevTools = function(e)
			{
				return this.channel.call("openDevTools", e)
			}, e.prototype.toggleDevTools = function(e)
			{
				return this.channel.call("toggleDevTools", e)
			}, e.prototype.closeFolder = function(e)
			{
				return this.channel.call("closeFolder", e)
			}, e.prototype.toggleFullScreen = function(e)
			{
				return this.channel.call("toggleFullScreen", e)
			}, e.prototype.setRepresentedFilename = function(e, t)
			{
				return this.channel.call("setRepresentedFilename", [e, t])
			}, e.prototype.addToRecentlyOpen = function(e)
			{
				return this.channel.call("addToRecentlyOpen", e)
			}, e.prototype.removeFromRecentlyOpen = function(e)
			{
				return this.channel.call("removeFromRecentlyOpen", e)
			}, e.prototype.getRecentlyOpen = function(e)
			{
				return this.channel.call("getRecentlyOpen", e)
			}, e.prototype.focusWindow = function(e)
			{
				return this.channel.call("focusWindow", e)
			}, e.prototype.isMaximized = function(e)
			{
				return this.channel.call("isMaximized", e)
			}, e.prototype.maximizeWindow = function(e)
			{
				return this.channel.call("maximizeWindow", e)
			}, e.prototype.unmaximizeWindow = function(e)
			{
				return this.channel.call("unmaximizeWindow", e)
			}, e.prototype.setDocumentEdited = function(e, t)
			{
				return this.channel.call("setDocumentEdited", [e, t])
			}, e.prototype.quit = function()
			{
				return this.channel.call("quit")
			}, e.prototype.openWindow = function(e, t)
			{
				return this.channel.call("openWindow", [e, t])
			}, e.prototype.openNewWindow = function()
			{
				return this.channel.call("openNewWindow")
			}, e.prototype.showWindow = function(e)
			{
				return this.channel.call("showWindow", e)
			}, e.prototype.getWindows = function()
			{
				return this.channel.call("getWindows")
			}, e.prototype.getWindowCount = function()
			{
				return this.channel.call("getWindowCount")
			}, e.prototype.log = function(e)
			{
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				return this.channel.call("log", [e, t])
			}, e.prototype.closeExtensionHostWindow = function(e)
			{
				return this.channel.call("closeExtensionHostWindow", e)
			}, e.prototype.showItemInFolder = function(e)
			{
				return this.channel.call("showItemInFolder", e)
			}, e.prototype.openExternal = function(e)
			{
				return this.channel.call("openExternal", e)
			}, e.prototype.startCrashReporter = function(e)
			{
				return this.channel.call("startCrashReporter", e)
			}, e
		}();
		t.WindowsChannelClient = o
	}), define(e[47], t([1, 0, 17, 3, 15]), function(e, t, n, r, i)
	{
		"use strict";
		t.IWorkspaceContextService = r.createDecorator("contextService");
		var o = function()
		{
			function e(e)
			{
				this.workspace = e
			}
			return e.prototype.getWorkspace = function()
			{
				return this.workspace
			}, e.prototype.hasWorkspace = function()
			{
				return !!this.workspace
			}, e.prototype.isInsideWorkspace = function(e)
			{
				return !(!e || !this.workspace) && i.isEqualOrParent(e.fsPath, this.workspace.resource.fsPath)
			}, e.prototype.toWorkspaceRelativePath = function(e)
			{
				return this.isInsideWorkspace(e) ? i.normalize(i.relative(this.workspace.resource.fsPath, e.fsPath)) : null
			}, e.prototype.toResource = function(e)
			{
				return "string" == typeof e && this.workspace ? n.default.file(i.join(this.workspace.resource.fsPath, e)) : null
			}, e
		}();
		t.WorkspaceContextService = o
	}), define(e[103], t([1, 0, 6, 7, 14, 43, 47]), function(e, t, n, o, s, a, u)
	{
		"use strict";
		var c = function()
		{
			function e(e, t, r)
			{
				var i = r.getWorkspace();
				this.globalStorage = e, this.workspaceStorage = t || e, this.workspaceKey = this.getWorkspaceKey(i);
				var o = i ? i.uid : void 0;
				n.isNumber(o) && this.cleanupWorkspaceScope(o, i.name)
			}
			return e.prototype.getWorkspaceKey = function(t)
			{
				var n = null;
				return t && t.resource && (n = t.resource.toString()), n ? this.calculateWorkspaceKey(n) : e.NO_WORKSPACE_IDENTIFIER
			}, e.prototype.calculateWorkspaceKey = function(e)
			{
				var t = "file:///",
					n = e.indexOf(t);
				return 0 === n ? s.rtrim(e.substr(t.length), "/") + "/" : e
			}, e.prototype.cleanupWorkspaceScope = function(t, r)
			{
				var i = this,
					o = this.getInteger(e.WORKSPACE_IDENTIFIER, a.StorageScope.WORKSPACE);
				if (n.isNumber(o) && t !== o)
				{
					for (var s = this.toStorageKey("", a.StorageScope.WORKSPACE), u = [], c = this.workspaceStorage.length, l = 0; l < c; l++)
					{
						var f = this.workspaceStorage.key(l);
						f.indexOf(e.WORKSPACE_PREFIX) < 0 || 0 === f.indexOf(s) && u.push(f)
					}
					u.length > 0 && console.warn("Clearing previous version of local storage for workspace ", r), u.forEach(function(e)
					{
						i.workspaceStorage.removeItem(e)
					})
				}
				t !== o && this.store(e.WORKSPACE_IDENTIFIER, t, a.StorageScope.WORKSPACE)
			}, e.prototype.clear = function()
			{
				this.globalStorage.clear(), this.workspaceStorage.clear()
			}, e.prototype.store = function(e, t, r)
			{
				void 0 === r && (r = a.StorageScope.GLOBAL);
				var i = r === a.StorageScope.GLOBAL ? this.globalStorage : this.workspaceStorage;
				if (n.isUndefinedOrNull(t)) return void this.remove(e, r);
				var s = this.toStorageKey(e, r);
				try
				{
					i.setItem(s, t)
				}
				catch (e)
				{
					o.onUnexpectedError(e)
				}
			}, e.prototype.get = function(e, t, r)
			{
				void 0 === t && (t = a.StorageScope.GLOBAL);
				var i = t === a.StorageScope.GLOBAL ? this.globalStorage : this.workspaceStorage,
					o = i.getItem(this.toStorageKey(e, t));
				return n.isUndefinedOrNull(o) ? r : o
			}, e.prototype.remove = function(e, t)
			{
				void 0 === t && (t = a.StorageScope.GLOBAL);
				var n = t === a.StorageScope.GLOBAL ? this.globalStorage : this.workspaceStorage,
					r = this.toStorageKey(e, t);
				n.removeItem(r)
			}, e.prototype.swap = function(e, t, r, i, o)
			{
				void 0 === i && (i = a.StorageScope.GLOBAL);
				var s = this.get(e, i);
				n.isUndefinedOrNull(s) && o ? this.store(e, o, i) : s === t.toString() ? this.store(e, r, i) : this.store(e, t, i)
			}, e.prototype.getInteger = function(e, t, r)
			{
				void 0 === t && (t = a.StorageScope.GLOBAL);
				var i = this.get(e, t, r);
				return n.isUndefinedOrNull(i) ? r : parseInt(i, 10)
			}, e.prototype.getBoolean = function(e, t, r)
			{
				void 0 === t && (t = a.StorageScope.GLOBAL);
				var i = this.get(e, t, r);
				return n.isUndefinedOrNull(i) ? r : n.isString(i) ? "true" === i.toLowerCase() : !!i
			}, e.prototype.toStorageKey = function(t, n)
			{
				return n === a.StorageScope.GLOBAL ? e.GLOBAL_PREFIX + t.toLowerCase() : e.WORKSPACE_PREFIX + this.workspaceKey + t.toLowerCase()
			}, e
		}();
		c.COMMON_PREFIX = "storage://", c.GLOBAL_PREFIX = c.COMMON_PREFIX + "global/", c.WORKSPACE_PREFIX = c.COMMON_PREFIX + "workspace/", c.WORKSPACE_IDENTIFIER = "workspaceIdentifier", c.NO_WORKSPACE_IDENTIFIER = "__$noWorkspace__", c = r([i(2, u.IWorkspaceContextService)], c), t.StorageService = c;
		var l = function()
		{
			function e()
			{
				this.store = {}
			}
			return Object.defineProperty(e.prototype, "length",
			{
				get: function()
				{
					return Object.keys(this.store).length
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.key = function(e)
			{
				var t = Object.keys(this.store);
				return t.length > e ? t[e] : null
			}, e.prototype.clear = function()
			{
				this.store = {}
			}, e.prototype.setItem = function(e, t)
			{
				this.store[e] = t.toString()
			}, e.prototype.getItem = function(e)
			{
				var t = this.store[e];
				return n.isUndefinedOrNull(t) ? null : t
			}, e.prototype.removeItem = function(e)
			{
				delete this.store[e]
			}, e
		}();
		t.InMemoryLocalStorage = l, t.inMemoryLocalStorageInstance = new l
	}), define(e[45], t([1, 0, 2, 86, 15, 16, 78, 79, 43, 47, 103, 5]), function(e, t, n, r, i, o, s, a, u, c, l, f)
	{
		"use strict";

		function p(e)
		{
			var n = e.get(c.IWorkspaceContextService),
				r = e.get(u.IStorageService),
				i = e.get(o.IConfigurationService);
			b(i), i.onDidUpdateConfiguration(function(e)
			{
				return b(i)
			});
			var s = m(),
				a = s.showNewUserWatermark,
				l = s.openUntitledFile,
				f = s.openGettingStarted,
				p = s.enableWelcomePage,
				h = 864e5,
				v = r.get("telemetry.firstSessionDate"),
				g = !v || Date.now() - Date.parse(v) < h;
			g && !n.hasWorkspace() || (a = t.defaultExperiments.showNewUserWatermark, l = t.defaultExperiments.openUntitledFile);
			var y = !r.get("telemetry.lastSessionDate"),
				_ = Date.now();
			return y && _ >= I && _ < T || (f = void 0), d(
			{
				showNewUserWatermark: a,
				openUntitledFile: l,
				openGettingStarted: f,
				enableWelcomePage: p
			})
		}

		function h()
		{
			var e = y();
			return "enableWelcomePage" in e ? e.enableWelcomePage : m().enableWelcomePage
		}

		function d(e)
		{
			var t = y();
			return Object.keys(e).forEach(function(n)
			{
				n in t && (e[n] = t[n])
			}), e
		}

		function m()
		{
			var e = v(),
				t = g(e),
				n = t[0],
				r = t[1],
				i = g(n),
				o = i[0],
				s = i[1],
				a = g(o),
				u = a[0],
				c = a[1],
				l = g(u),
				f = l[1];
			return {
				showNewUserWatermark: r,
				openUntitledFile: s,
				openGettingStarted: c,
				enableWelcomePage: f
			}
		}

		function v()
		{
			var e = l.StorageService.GLOBAL_PREFIX + "experiments.randomness",
				t = window.localStorage.getItem(e);
			return t || (t = Math.random().toString(), window.localStorage.setItem(e, t)), parseFloat(t)
		}

		function g(e)
		{
			var t = 2 * e,
				n = Math.floor(t);
			return [t - n, 1 === n]
		}

		function y()
		{
			var e = window.localStorage.getItem(D);
			return e ? JSON.parse(e) :
			{}
		}

		function b(e)
		{
			var t = y(),
				n = e.getConfiguration("telemetry"),
				r = n && n.experiments ||
				{};
			f.equals(t, r) || window.localStorage.setItem(D, JSON.stringify(r))
		}

		function _()
		{
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return {
				log: function(t, n)
				{
					return e.forEach(function(e)
					{
						return e.log(t, n)
					})
				}
			}
		}

		function E(e)
		{
			if (!e) return e;
			for (var t = "", n = 0; n < e.length; n++)
			{
				var r = e[n];
				t += r >= "0" && r <= "9" ? "0" : r >= "a" && r <= "z" ? "a" : r >= "A" && r <= "Z" ? "A" : r
			}
			return t
		}

		function w(e)
		{
			var t = e && e.fsPath;
			return t ?
			{
				mimeType: r.guessMimeTypes(t).join(", "),
				ext: i.extname(t),
				path: E(t)
			} :
			{}
		}

		function C(e, t)
		{
			return t.onDidUpdateConfiguration(function(t)
			{
				t.source !== o.ConfigurationSource.Default && (e.publicLog("updateConfiguration",
				{
					configurationSource: o.ConfigurationSource[t.source],
					configurationKeys: P(t.sourceConfig)
				}), e.publicLog("updateConfigurationValues",
				{
					configurationSource: o.ConfigurationSource[t.source],
					configurationValues: k(t.sourceConfig, A)
				}))
			})
		}

		function S(e, t)
		{
			return t.onShutdown(function(t)
			{
				e.publicLog("shutdown",
				{
					reason: a.ShutdownReason[t]
				})
			})
		}

		function x(e, t)
		{
			return t.onDidUpdateKeybindings(function(t)
			{
				t.source === s.KeybindingSource.User && t.keybindings && e.publicLog("updateKeybindings",
				{
					bindings: t.keybindings.map(function(e)
					{
						return {
							key: e.key,
							command: e.command,
							when: e.when,
							args: !!e.args || void 0
						}
					})
				})
			})
		}

		function P(e)
		{
			if (!e) return [];
			var t = [];
			return O(t, "", e), t
		}

		function O(e, t, n)
		{
			n && "object" == typeof n && !Array.isArray(n) ? Object.keys(n).forEach(function(r)
			{
				return O(e, t ? t + "." + r : r, n[r])
			}) : e.push(t)
		}

		function k(e, t)
		{
			return e ? t.reduce(function(t, n)
			{
				var r = n.split(".").reduce(function(e, t)
				{
					return e && "object" == typeof e ? e[t] : void 0
				}, e);
				return "undefined" != typeof r && t.push((i = {}, i[n] = r, i)), t;
				var i
			}, []) : []
		}
		t.defaultExperiments = {
			showNewUserWatermark: !1,
			openUntitledFile: !0,
			enableWelcomePage: !0
		}, t.NullTelemetryService = {
			_serviceBrand: void 0,
			_experiments: t.defaultExperiments,
			publicLog: function(e, t)
			{
				return n.TPromise.as(null)
			},
			isOptedIn: !0,
			getTelemetryInfo: function()
			{
				return n.TPromise.as(
				{
					instanceId: "someValue.instanceId",
					sessionId: "someValue.sessionId",
					machineId: "someValue.machineId"
				})
			},
			getExperiments: function()
			{
				return this._experiments
			}
		};
		var I = Date.UTC(2017, 0, 9),
			T = Date.UTC(2017, 0, 16);
		t.loadExperiments = p, t.isWelcomePageEnabled = h;
		var D = l.StorageService.GLOBAL_PREFIX + "experiments.overrides";
		t.combinedAppender = _, t.NullAppender = {
			log: function()
			{
				return null
			}
		}, t.anonymize = E, t.telemetryURIDescriptor = w;
		var A = ["window.zoomLevel", "editor.fontSize", "editor.fontFamily", "editor.tabSize", "files.autoSave", "files.hotExit", "typescript.check.tscVersion", "editor.renderWhitespace", "editor.cursorBlinking", "editor.cursorStyle", "files.associations", "workbench.statusBar.visible", "editor.wrappingColumn", "editor.insertSpaces", "editor.renderIndentGuides", "files.trimTrailingWhitespace", "git.confirmSync", "editor.rulers", "workbench.sideBar.location", "editor.fontLigatures", "editor.wordWrap", "editor.lineHeight", "editor.detectIndentation", "editor.formatOnType", "editor.formatOnSave", "editor.formatOnPaste", "window.openFilesInNewWindow", "javascript.validate.enable", "editor.mouseWheelZoom", "editor.fontWeight", "editor.scrollBeyondLastLine", "editor.lineNumbers", "editor.wrappingIndent", "editor.renderControlCharacters", "editor.autoClosingBrackets", "window.reopenFolders", "extensions.autoUpdate", "editor.tabCompletion", "files.eol", "explorer.openEditors.visible", "workbench.editor.enablePreview", "files.autoSaveDelay", "editor.roundedSelection", "editor.quickSuggestions", "editor.acceptSuggestionOnEnter", "editor.acceptSuggestionOnCommitCharacter", "workbench.editor.showTabs", "files.encoding", "editor.quickSuggestionsDelay", "editor.snippetSuggestions", "editor.selectionHighlight", "editor.glyphMargin", "editor.wordSeparators", "editor.mouseWheelScrollSensitivity", "editor.suggestOnTriggerCharacters", "git.enabled", "http.proxyStrictSSL", "terminal.integrated.fontFamily", "editor.overviewRulerLanes", "editor.wordBasedSuggestions", "editor.hideCursorInOverviewRuler", "editor.trimAutoWhitespace", "editor.folding", "workbench.editor.enablePreviewFromQuickOpen", "php.builtInCompletions.enable", "php.validate.enable", "php.validate.run", "editor.parameterHints", "workbench.welcome.enabled"];
		t.configurationTelemetry = C, t.lifecycleTelemetry = S, t.keybindingsTelemetry = x
	}), define(e[48], t([1, 0, 65, 14, 45, 3, 16, 22, 2, 12, 5, 13]), function(e, t, n, o, s, a, u, c, l, f, p, h)
	{
		"use strict";
		var d = function()
		{
			function e(e, t)
			{
				this._configurationService = t, this._disposables = [], this._cleanupPatterns = [], this._appender = e.appender, this._commonProperties = e.commonProperties || l.TPromise.as(
				{}), this._piiPaths = e.piiPaths || [], this._userOptIn = "undefined" == typeof e.userOptIn || e.userOptIn, this._experiments = e.experiments || s.defaultExperiments, this._cleanupPatterns.push([/file:\/\/\/.*?\/resources\/app\//gi, ""], [/file:\/\/\/.*/gi, ""], [/ENOENT: no such file or directory.*?\'([^\']+)\'/gi, "ENOENT: no such file or directory"]);
				for (var n = 0, r = this._piiPaths; n < r.length; n++)
				{
					var i = r[n];
					this._cleanupPatterns.push([new RegExp(o.escapeRegExpCharacters(i), "gi"), ""])
				}
				this._configurationService && (this._updateUserOptIn(), this._configurationService.onDidUpdateConfiguration(this._updateUserOptIn, this, this._disposables), this.publicLog("optInStatus",
				{
					optIn: this._userOptIn
				}))
			}
			return e.prototype._updateUserOptIn = function()
			{
				var e = this._configurationService.getConfiguration(m);
				this._userOptIn = e ? e.enableTelemetry : this._userOptIn
			}, Object.defineProperty(e.prototype, "isOptedIn",
			{
				get: function()
				{
					return this._userOptIn
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getExperiments = function()
			{
				return this._experiments
			}, e.prototype.getTelemetryInfo = function()
			{
				return this._commonProperties.then(function(e)
				{
					var t = e.sessionID,
						n = e["common.instanceId"],
						r = e["common.machineId"];
					return {
						sessionId: t,
						instanceId: n,
						machineId: r
					}
				})
			}, e.prototype.dispose = function()
			{
				this._disposables = f.dispose(this._disposables)
			}, e.prototype.publicLog = function(e, t)
			{
				var n = this;
				return this._userOptIn ? this._commonProperties.then(function(r)
				{
					t = p.mixin(t, r), t = p.cloneAndChange(t, function(e)
					{
						if ("string" == typeof e) return n._cleanupInfo(e)
					}), n._appender.log(e, t)
				}, function(e)
				{
					console.error(e)
				}) : l.TPromise.as(void 0)
			}, e.prototype._cleanupInfo = function(e)
			{
				for (var t = 0, n = this._cleanupPatterns; t < n.length; t++)
				{
					var r = n[t],
						i = r[0],
						o = r[1];
					e = e.replace(i, o)
				}
				return e
			}, e
		}();
		d.IDLE_START_EVENT_NAME = "UserIdleStart", d.IDLE_STOP_EVENT_NAME = "UserIdleStop", d = r([i(1, a.optional(u.IConfigurationService))], d), t.TelemetryService = d;
		var m = "telemetry";
		h.Registry.as(c.Extensions.Configuration).registerConfiguration(
		{
			id: m,
			order: 110,
			type: "object",
			title: n.localize(0, null),
			properties:
			{
				"telemetry.enableTelemetry":
				{
					type: "boolean",
					description: n.localize(1, null),
					default: !0
				}
			}
		})
	}), define(e[97], t([1, 0, 56, 10, 19, 24, 34, 2, 107]), function(e, t, n, r, i, o, s, a, u)
	{
		"use strict";

		function c(e)
		{
			var t = e.externalFileAttributes >> 16 || 33188;
			return [448, 56, 7].map(function(e)
			{
				return t & e
			}).reduce(function(e, t)
			{
				return e + t
			}, 61440 & t)
		}

		function l(e, t, n, o, u)
		{
			var c = r.dirname(t),
				l = r.join(o, c),
				f = r.join(o, t);
			return s.mkdirp(l).then(function()
			{
				return new a.Promise(function(t, r)
				{
					var o = i.createWriteStream(f,
					{
						mode: n
					});
					o.once("finish", function()
					{
						return t(null)
					}), o.once("error", r), e.once("error", r), e.pipe(o)
				})
			})
		}

		function f(e, t, n)
		{
			return new a.Promise(function(i, u)
			{
				var f = new o.SimpleThrottler,
					p = a.TPromise.as(null);
				e.once("error", u), e.once("close", function()
				{
					return p.then(i, u)
				}), e.on("entry", function(i)
				{
					if (n.sourcePathRegex.test(i.fileName))
					{
						var a = i.fileName.replace(n.sourcePathRegex, "");
						if (/\/$/.test(a))
						{
							var u = r.join(t, a);
							return void(p = s.mkdirp(u))
						}
						var h = o.ninvoke(e, e.openReadStream, i),
							d = c(i);
						p = f.queue(function()
						{
							return h.then(function(e)
							{
								return l(e, a, d, t, n)
							})
						})
					}
				})
			})
		}

		function p(e, t, n)
		{
			void 0 === n && (n = {});
			var r = new RegExp(n.sourcePath ? "^" + n.sourcePath : ""),
				i = o.nfcall(u.open, e);
			return n.overwrite && (i = i.then(function(e)
			{
				return s.rimraf(t), e
			})), i.then(function(e)
			{
				return f(e, t,
				{
					sourcePathRegex: r
				})
			})
		}

		function h(e, t)
		{
			return o.nfcall(u.open, e).then(function(e)
			{
				return new a.TPromise(function(r, i)
				{
					e.on("entry", function(n)
					{
						n.fileName === t && o.ninvoke(e, e.openReadStream, n).done(function(e)
						{
							return r(e)
						}, function(e)
						{
							return i(e)
						})
					}), e.once("close", function()
					{
						return i(new Error(n.localize(0, null, t)))
					})
				})
			})
		}

		function d(e, t)
		{
			return h(e, t).then(function(e)
			{
				return new a.TPromise(function(t, n)
				{
					var r = [];
					e.once("error", n), e.on("data", function(e)
					{
						return r.push(e)
					}), e.on("end", function()
					{
						return t(Buffer.concat(r))
					})
				})
			})
		}
		t.extract = p, t.buffer = d
	}), define(e[94], t([1, 0, 60, 10, 34, 7, 5, 12, 20, 97, 2, 23, 67, 27, 24, 4, 70, 31, 17, 29]), function(e, t, n, o, s, a, u, c, l, f, p, h, d, m, v, g, y, b, _, E)
	{
		"use strict";

		function w(e)
		{
			return new p.Promise(function(t, r)
			{
				try
				{
					var i = JSON.parse(e),
						o = i.__metadata || null;
					delete i.__metadata, t(
					{
						manifest: i,
						metadata: o
					})
				}
				catch (e)
				{
					r(new Error(n.localize(0, null)))
				}
			})
		}

		function C(e, t, r)
		{
			return f.buffer(e, "extension/package.json").then(function(e)
			{
				return w(e.toString("utf8"))
			}).then(function(e)
			{
				var i = e.manifest;
				if (t)
				{
					if (t.name !== i.name) return p.Promise.wrapError(Error(n.localize(1, null)));
					if (t.publisher !== i.publisher) return p.Promise.wrapError(Error(n.localize(2, null)));
					if (r !== i.version) return p.Promise.wrapError(Error(n.localize(3, null)))
				}
				return p.TPromise.as(i)
			})
		}

		function S(e)
		{
			var t = [s.readFile(o.join(e, "package.json"), "utf8").then(function(e)
			{
				return w(e)
			}), s.readFile(o.join(e, "package.nls.json"), "utf8").then(null, function(e)
			{
				return "ENOENT" !== e.code ? p.TPromise.wrapError(e) : "{}"
			}).then(function(e)
			{
				return JSON.parse(e)
			})];
			return p.TPromise.join(t).then(function(e)
			{
				var t = e[0],
					n = t.manifest,
					r = t.metadata,
					i = e[1];
				return {
					manifest: d.localizeManifest(n, i),
					metadata: r
				}
			})
		}

		function x(e, t)
		{
			return e.publisher + "." + e.name + "-" + t
		}
		var P = o.normalize(o.join(_.default.parse(e.toUrl("")).fsPath, "..", "extensions")),
			O = function()
			{
				function e(e, t, n)
				{
					this.environmentService = e, this.choiceService = t, this.galleryService = n, this.disposables = [], this._onInstallExtension = new g.Emitter, this.onInstallExtension = this._onInstallExtension.event, this._onDidInstallExtension = new g.Emitter, this.onDidInstallExtension = this._onDidInstallExtension.event, this._onUninstallExtension = new g.Emitter, this.onUninstallExtension = this._onUninstallExtension.event, this._onDidUninstallExtension = new g.Emitter, this.onDidUninstallExtension = this._onDidUninstallExtension.event, this.extensionsPath = e.extensionsPath, this.obsoletePath = o.join(this.extensionsPath, ".obsolete"), this.obsoleteFileLimiter = new v.Limiter(1)
				}
				return e.prototype.install = function(e)
				{
					var t = this;
					return e = o.resolve(e), C(e).then(function(r)
					{
						var i = x(r, r.version);
						return t.isObsolete(i).then(function(o)
						{
							return o ? p.TPromise.wrapError(new Error(n.localize(4, null, r.displayName || r.name))) : (t._onInstallExtension.fire(
							{
								id: i,
								zipPath: e
							}), t.installExtension(e, i).then(function(n)
							{
								return t._onDidInstallExtension.fire(
								{
									id: i,
									zipPath: e,
									local: n
								})
							}, function(n)
							{
								return t._onDidInstallExtension.fire(
								{
									id: i,
									zipPath: e,
									error: n
								}), p.TPromise.wrapError(n)
							}))
						})
					})
				}, e.prototype.installFromGallery = function(e, t)
				{
					var r = this;
					void 0 === t && (t = !0);
					var i = x(e, e.version);
					return this.isObsolete(i).then(function(o)
					{
						return o ? p.TPromise.wrapError(new Error(n.localize(5, null, e.displayName || e.name))) : (r._onInstallExtension.fire(
						{
							id: i,
							gallery: e
						}), r.installCompatibleVersion(e, !0, t).then(function(t)
						{
							return r._onDidInstallExtension.fire(
							{
								id: i,
								local: t,
								gallery: e
							})
						}, function(t)
						{
							return r._onDidInstallExtension.fire(
							{
								id: i,
								gallery: e,
								error: t
							}), p.TPromise.wrapError(t)
						}))
					})
				}, e.prototype.installCompatibleVersion = function(e, t, r)
				{
					var i = this;
					return this.galleryService.loadCompatibleVersion(e).then(function(o)
					{
						return i.getDependenciesToInstall(e, t).then(function(t)
						{
							if (!t.length) return i.downloadAndInstall(o);
							if (r)
							{
								var s = n.localize(6, null, e.displayName),
									u = [n.localize(7, null), n.localize(8, null)];
								return i.choiceService.choose(E.Severity.Info, s, u, !0).then(function(e)
								{
									return 0 === e ? i.installWithDependencies(o) : p.TPromise.wrapError(a.canceled())
								}, function(e)
								{
									return p.TPromise.wrapError(a.canceled())
								})
							}
							return i.installWithDependencies(o)
						})
					})
				}, e.prototype.getDependenciesToInstall = function(e, t)
				{
					if (!t) return p.TPromise.wrap([]);
					var n = e.publisher + "." + e.name,
						r = e.properties.dependencies ? e.properties.dependencies.filter(function(e)
						{
							return e !== n
						}) : [];
					return r.length ? this.getInstalled().then(function(e)
					{
						return r.filter(function(t)
						{
							return e.every(function(e)
							{
								return e.manifest.publisher + "." + e.manifest.name !== t
							})
						})
					}) : p.TPromise.wrap([])
				}, e.prototype.installWithDependencies = function(e)
				{
					var t = this;
					return this.galleryService.getAllDependencies(e).then(function(n)
					{
						return t.filterDependenciesToInstall(e, n)
					}).then(function(r)
					{
						return t.filterObsolete.apply(t, r.map(function(e)
						{
							return x(e, e.version)
						})).then(function(i)
						{
							return i.length ? p.TPromise.wrapError(new Error(n.localize(9, null, e.displayName || e.name))) : t.bulkInstallWithDependencies(e, r)
						})
					})
				}, e.prototype.bulkInstallWithDependencies = function(e, t)
				{
					for (var n = this, r = 0, i = t; r < i.length; r++)
					{
						var o = i[r],
							s = x(o, o.version);
						this._onInstallExtension.fire(
						{
							id: s,
							gallery: o
						})
					}
					return this.downloadAndInstall(e).then(function(e)
					{
						return p.TPromise.join(t.map(function(e)
						{
							return n.installCompatibleVersion(e, !1, !1)
						})).then(function(r)
						{
							for (var i = 0, o = r; i < o.length; i++)
							{
								var s = o[i],
									a = n.getGalleryExtensionForLocalExtension(t, s);
								n._onDidInstallExtension.fire(
								{
									id: s.id,
									local: s,
									gallery: a
								})
							}
							return e
						}, function(r)
						{
							return n.rollback(e, t).then(function()
							{
								return p.TPromise.wrapError(Array.isArray(r) ? r[r.length - 1] : r)
							})
						})
					}).then(function(e)
					{
						return e
					}, function(e)
					{
						for (var r = 0, i = t; r < i.length; r++)
						{
							var o = i[r];
							n._onDidInstallExtension.fire(
							{
								id: x(o, o.version),
								gallery: o,
								error: e
							})
						}
						return p.TPromise.wrapError(e)
					})
				}, e.prototype.rollback = function(e, t)
				{
					var n = this;
					return this.doUninstall(e.id).then(function()
					{
						return n.filterOutUninstalled(t)
					}).then(function(e)
					{
						return p.TPromise.join(e.map(function(e)
						{
							return n.doUninstall(e.id)
						}))
					}).then(function()
					{
						return null
					})
				}, e.prototype.filterDependenciesToInstall = function(e, t)
				{
					return this.getInstalled().then(function(n)
					{
						return t.filter(function(t)
						{
							if (e.id === t.id) return !1;
							var r = x(t, t.version);
							return n.every(function(e)
							{
								return e.id !== r
							})
						})
					})
				}, e.prototype.filterOutUninstalled = function(e)
				{
					var t = this;
					return this.getInstalled().then(function(n)
					{
						return n.filter(function(n)
						{
							return !!t.getGalleryExtensionForLocalExtension(e, n)
						})
					})
				}, e.prototype.getGalleryExtensionForLocalExtension = function(e, t)
				{
					var n = e.filter(function(e)
					{
						return x(e, e.version) === t.id
					});
					return n.length ? n[0] : null
				}, e.prototype.downloadAndInstall = function(e)
				{
					var t = this,
						n = x(e, e.version),
						r = {
							id: e.id,
							publisherId: e.publisherId,
							publisherDisplayName: e.publisherDisplayName
						};
					return this.galleryService.download(e).then(function(e)
					{
						return C(e).then(function()
						{
							return e
						})
					}).then(function(e)
					{
						return t.installExtension(e, n, r)
					})
				}, e.prototype.installExtension = function(e, t, n)
				{
					void 0 === n && (n = null);
					var r = o.join(this.extensionsPath, t);
					return f.extract(e, r,
					{
						sourcePath: "extension",
						overwrite: !0
					}).then(function()
					{
						return S(r)
					}).then(function(e)
					{
						var i = e.manifest;
						return s.readdir(r).then(function(e)
						{
							var a = e.filter(function(e)
								{
									return /^readme(\.txt|\.md|)$/i.test(e)
								})[0],
								c = a ? _.default.file(o.join(r, a)).toString() : null,
								l = e.filter(function(e)
								{
									return /^changelog(\.txt|\.md|)$/i.test(e)
								})[0],
								f = l ? _.default.file(o.join(r, l)).toString() : null,
								p = h.LocalExtensionType.User,
								d = {
									type: p,
									id: t,
									manifest: i,
									metadata: n,
									path: r,
									readmeUrl: c,
									changelogUrl: f
								},
								m = o.join(r, "package.json");
							return s.readFile(m, "utf8").then(function(e)
							{
								return w(e)
							}).then(function(e)
							{
								var t = e.manifest;
								return u.assign(t,
								{
									__metadata: n
								})
							}).then(function(e)
							{
								return s.writeFile(m, JSON.stringify(e, null, "\t"))
							}).then(function()
							{
								return d
							})
						})
					})
				}, e.prototype.uninstall = function(e)
				{
					var t = this;
					return this.removeOutdatedExtensions().then(function()
					{
						return t.scanUserExtensions().then(function(n)
						{
							var r = n.filter(function(t)
							{
								return t.manifest.publisher === e.manifest.publisher && t.manifest.name === e.manifest.name
							}).map(function(e)
							{
								return t.checkForDependenciesAndUninstall(e, n)
							});
							return p.TPromise.join(r)
						})
					})
				}, e.prototype.checkForDependenciesAndUninstall = function(e, t)
				{
					var n = this;
					return this.preUninstallExtension(e.id).then(function()
					{
						return n.hasDependencies(e, t) ? n.promptForDependenciesAndUninstall(e, t) : n.promptAndUninstall(e, t)
					}).then(function()
					{
						return n.postUninstallExtension(e.id)
					}, function(t)
					{
						return n.postUninstallExtension(e.id, t), p.TPromise.wrapError(t)
					})
				}, e.prototype.hasDependencies = function(e, t)
				{
					return !(!e.manifest.extensionDependencies || !e.manifest.extensionDependencies.length) && t.some(function(t)
					{
						return e.manifest.extensionDependencies.indexOf(t.manifest.publisher + "." + t.manifest.name) !== -1
					})
				}, e.prototype.promptForDependenciesAndUninstall = function(e, t)
				{
					var r = this,
						i = n.localize(10, null, e.manifest.displayName || e.manifest.name),
						o = [n.localize(11, null), n.localize(12, null), n.localize(13, null)];
					return this.choiceService.choose(E.Severity.Info, i, o, !0).then(function(n)
					{
						if (0 === n) return r.uninstallWithDependencies(e, [], t);
						if (1 === n)
						{
							var i = l.distinct(r.getDependenciesToUninstallRecursively(e, t, [])).filter(function(t)
							{
								return t !== e
							});
							return r.uninstallWithDependencies(e, i, t)
						}
						return p.TPromise.wrapError(a.canceled())
					}, function(e)
					{
						return p.TPromise.wrapError(a.canceled())
					})
				}, e.prototype.promptAndUninstall = function(e, t)
				{
					var r = this,
						i = n.localize(14, null, e.manifest.displayName || e.manifest.name),
						o = [n.localize(15, null), n.localize(16, null)];
					return this.choiceService.choose(E.Severity.Info, i, o, !0).then(function(n)
					{
						return 0 === n ? r.uninstallWithDependencies(e, [], t) : p.TPromise.wrapError(a.canceled())
					}, function(e)
					{
						return p.TPromise.wrapError(a.canceled())
					})
				}, e.prototype.uninstallWithDependencies = function(e, t, n)
				{
					var r = this,
						i = this.filterDependents(e, t, n),
						o = this.getDependents(e, n).filter(function(t)
						{
							return e !== t && i.indexOf(t) === -1
						});
					return o.length ? p.TPromise.wrapError(this.getDependentsErrorMessage(e, o)) : p.TPromise.join([this.uninstallExtension(e.id)].concat(i.map(function(e)
					{
						return r.doUninstall(e.id)
					}))).then(function()
					{
						return null
					})
				}, e.prototype.getDependentsErrorMessage = function(e, t)
				{
					return 1 === t.length ? n.localize(17, null, e.manifest.displayName || e.manifest.name, t[0].manifest.displayName || t[0].manifest.name) : 2 === t.length ? n.localize(18, null, e.manifest.displayName || e.manifest.name, t[0].manifest.displayName || t[0].manifest.name, t[1].manifest.displayName || t[1].manifest.name) : n.localize(19, null, e.manifest.displayName || e.manifest.name, t[0].manifest.displayName || t[0].manifest.name, t[1].manifest.displayName || t[1].manifest.name)
				}, e.prototype.getDependenciesToUninstallRecursively = function(e, t, n)
				{
					if (n.indexOf(e) !== -1) return [];
					if (n.push(e), !e.manifest.extensionDependencies || 0 === e.manifest.extensionDependencies.length) return [];
					for (var r = t.filter(function(t)
						{
							return e.manifest.extensionDependencies.indexOf(t.manifest.publisher + "." + t.manifest.name) !== -1
						}), i = [], o = 0, s = r; o < s.length; o++)
					{
						var a = s[o];
						i.push.apply(i, this.getDependenciesToUninstallRecursively(a, t, n))
					}
					return r.concat(i)
				}, e.prototype.filterDependents = function(e, t, n)
				{
					n = n.filter(function(t)
					{
						return t !== e && t.manifest.extensionDependencies && t.manifest.extensionDependencies.length > 0
					});
					for (var r = t.slice(0), i = 0; i < t.length; i++)
					{
						var o = t[i],
							s = this.getDependents(o, n).filter(function(e)
							{
								return t.indexOf(e) === -1
							});
						s.length && r.splice(i - (t.length - r.length), 1)
					}
					return r
				}, e.prototype.getDependents = function(e, t)
				{
					return t.filter(function(t)
					{
						return t.manifest.extensionDependencies && t.manifest.extensionDependencies.indexOf(e.manifest.publisher + "." + e.manifest.name) !== -1
					})
				}, e.prototype.doUninstall = function(e)
				{
					var t = this;
					return this.preUninstallExtension(e).then(function()
					{
						return t.uninstallExtension(e)
					}).then(function()
					{
						return t.postUninstallExtension(e)
					}, function(n)
					{
						return t.postUninstallExtension(e, n), p.TPromise.wrapError(n)
					})
				}, e.prototype.preUninstallExtension = function(e)
				{
					var t = this,
						r = o.join(this.extensionsPath, e);
					return s.exists(r).then(function(e)
					{
						return e ? null : p.Promise.wrapError(new Error(n.localize(20, null)))
					}).then(function()
					{
						return t._onUninstallExtension.fire(e)
					})
				}, e.prototype.uninstallExtension = function(e)
				{
					var t = this,
						n = o.join(this.extensionsPath, e);
					return this.setObsolete(e).then(function()
					{
						return s.rimraf(n)
					}).then(function()
					{
						return t.unsetObsolete(e)
					})
				}, e.prototype.postUninstallExtension = function(e, t)
				{
					return this._onDidUninstallExtension.fire(
					{
						id: e,
						error: t
					})
				}, e.prototype.getInstalled = function(e)
				{
					void 0 === e && (e = null);
					var t = [];
					return null !== e && e !== h.LocalExtensionType.System || t.push(this.scanSystemExtensions()), null !== e && e !== h.LocalExtensionType.User || t.push(this.scanUserExtensions()), p.TPromise.join(t).then(l.flatten)
				}, e.prototype.scanSystemExtensions = function()
				{
					return this.scanExtensions(P, h.LocalExtensionType.System)
				}, e.prototype.scanUserExtensions = function()
				{
					return this.scanExtensions(this.extensionsPath, h.LocalExtensionType.User).then(function(e)
					{
						var t = b.values(b.groupBy(e, function(e)
						{
							return e.manifest.publisher + "." + e.manifest.name
						}));
						return t.map(function(e)
						{
							return e.sort(function(e, t)
							{
								return y.rcompare(e.manifest.version, t.manifest.version)
							})[0]
						})
					})
				}, e.prototype.scanExtensions = function(e, t)
				{
					var n = new v.Limiter(10);
					return this.scanExtensionFolders(e).then(function(r)
					{
						return p.Promise.join(r.map(function(r)
						{
							var i = o.join(e, r),
								a = function()
								{
									return s.readdir(i).then(function(e)
									{
										var n = e.filter(function(e)
											{
												return /^readme(\.txt|\.md|)$/i.test(e)
											})[0],
											s = n ? _.default.file(o.join(i, n)).toString() : null,
											a = e.filter(function(e)
											{
												return /^changelog(\.txt|\.md|)$/i.test(e)
											})[0],
											u = a ? _.default.file(o.join(i, a)).toString() : null;
										return S(i).then(function(e)
										{
											var n = e.manifest,
												o = e.metadata;
											return {
												type: t,
												id: r,
												manifest: n,
												metadata: o,
												path: i,
												readmeUrl: s,
												changelogUrl: u
											}
										})
									}).then(null, function()
									{
										return null
									})
								};
							return n.queue(a)
						}))
					}).then(function(e)
					{
						return e.filter(function(e)
						{
							return !!e
						})
					})
				}, e.prototype.scanExtensionFolders = function(e)
				{
					return this.getObsoleteExtensions().then(function(t)
					{
						return s.readdir(e).then(function(e)
						{
							return e.filter(function(e)
							{
								return !t[e]
							})
						})
					})
				}, e.prototype.removeDeprecatedExtensions = function()
				{
					return p.TPromise.join([this.removeOutdatedExtensions(), this.removeObsoleteExtensions()])
				}, e.prototype.removeOutdatedExtensions = function()
				{
					var e = this;
					return this.getOutdatedExtensionIds().then(function(t)
					{
						return e.removeExtensions(t)
					})
				}, e.prototype.removeObsoleteExtensions = function()
				{
					var e = this;
					return this.getObsoleteExtensions().then(function(e)
					{
						return Object.keys(e)
					}).then(function(t)
					{
						return e.removeExtensions(t)
					})
				}, e.prototype.removeExtensions = function(e)
				{
					var t = this;
					return p.TPromise.join(e.map(function(e)
					{
						return s.rimraf(o.join(t.extensionsPath, e)).then(function()
						{
							return t.withObsoleteExtensions(function(t)
							{
								return delete t[e]
							})
						})
					}))
				}, e.prototype.getOutdatedExtensionIds = function()
				{
					return this.scanExtensionFolders(this.extensionsPath).then(function(e)
					{
						var t = e.map(function(e)
							{
								return {
									folder: e,
									match: /^([^.]+\..+)-(\d+\.\d+\.\d+)$/.exec(e)
								}
							}).filter(function(e)
							{
								var t = e.match;
								return !!t
							}).map(function(e)
							{
								var t = e.folder,
									n = e.match;
								return {
									folder: t,
									id: n[1],
									version: n[2]
								}
							}),
							n = b.values(b.groupBy(t, function(e)
							{
								return e.id
							}));
						return l.flatten(n.map(function(e)
						{
							return e.sort(function(e, t)
							{
								return y.rcompare(e.version, t.version)
							}).slice(1)
						})).map(function(e)
						{
							return e.folder
						})
					})
				}, e.prototype.isObsolete = function(e)
				{
					return this.filterObsolete(e).then(function(e)
					{
						return 1 === e.length
					})
				}, e.prototype.filterObsolete = function()
				{
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					return this.withObsoleteExtensions(function(t)
					{
						for (var n = [], r = 0, i = e; r < i.length; r++)
						{
							var o = i[r];
							t[o] && n.push(o)
						}
						return n
					})
				}, e.prototype.setObsolete = function(e)
				{
					return this.withObsoleteExtensions(function(t)
					{
						return u.assign(t, (n = {}, n[e] = !0, n));
						var n
					})
				}, e.prototype.unsetObsolete = function(e)
				{
					return this.withObsoleteExtensions(function(t)
					{
						return delete t[e]
					})
				}, e.prototype.getObsoleteExtensions = function()
				{
					return this.withObsoleteExtensions(function(e)
					{
						return e
					})
				}, e.prototype.withObsoleteExtensions = function(e)
				{
					var t = this;
					return this.obsoleteFileLimiter.queue(function()
					{
						var n = null;
						return s.readFile(t.obsoletePath, "utf8").then(null, function(e)
						{
							return "ENOENT" === e.code ? p.TPromise.as("{}") : p.TPromise.wrapError(e)
						}).then(function(e)
						{
							try
							{
								return JSON.parse(e)
							}
							catch (e)
							{
								return {}
							}
						}).then(function(t)
						{
							return n = e(t), t
						}).then(function(e)
						{
							if (0 === Object.keys(e).length) return s.rimraf(t.obsoletePath);
							var n = JSON.stringify(e);
							return s.writeFile(t.obsoletePath, n)
						}).then(function()
						{
							return n
						})
					})
				}, e.prototype.dispose = function()
				{
					this.disposables = c.dispose(this.disposables)
				}, e
			}();
		O = r([i(0, m.IEnvironmentService), i(1, E.IChoiceService), i(2, h.IExtensionGalleryService)], O), t.ExtensionManagementService = O
	}), define(e[37], t([1, 0, 2, 6, 104, 111, 93, 19, 5, 112]), function(e, t, n, r, i, o, s, a, u, c)
	{
		"use strict";

		function l(e)
		{
			var t;
			return new n.TPromise(function(n, a)
			{
				var f = s.parse(e.url),
					p = "https:" === f.protocol ? i.request : o.request,
					h = {
						hostname: f.hostname,
						port: f.port ? parseInt(f.port) : "https:" === f.protocol ? 443 : 80,
						path: f.path,
						method: e.type || "GET",
						headers: e.headers,
						agent: e.agent,
						rejectUnauthorized: !r.isBoolean(e.strictSSL) || e.strictSSL
					};
				e.user && e.password && (h.auth = e.user + ":" + e.password), t = p(h, function(t)
				{
					var i = r.isNumber(e.followRedirects) ? e.followRedirects : 3;
					if (t.statusCode >= 300 && t.statusCode < 400 && i > 0 && t.headers.location) l(u.assign(
					{}, e,
					{
						url: t.headers.location,
						followRedirects: i - 1
					})).done(n, a);
					else
					{
						var o = t;
						"gzip" === t.headers["content-encoding"] && (o = o.pipe(c.createGunzip())), n(
						{
							res: t,
							stream: o
						})
					}
				}), t.on("error", a), e.timeout && t.setTimeout(e.timeout), e.data && t.write(e.data), t.end()
			}, function()
			{
				return t && t.abort()
			})
		}

		function f(e)
		{
			return e.res.statusCode >= 200 && e.res.statusCode < 300 || 1223 === e.res.statusCode
		}

		function p(e)
		{
			return 204 === e.res.statusCode
		}

		function h(e, t)
		{
			return new n.TPromise(function(n, r)
			{
				var i = a.createWriteStream(e);
				i.once("finish", function()
				{
					return n(null)
				}), t.stream.once("error", r), t.stream.pipe(i)
			})
		}

		function d(e)
		{
			return new n.Promise(function(t, n)
			{
				if (!f(e)) return n("Server returned " + e.res.statusCode);
				if (p(e)) return t(null);
				var r = [];
				e.stream.on("data", function(e)
				{
					return r.push(e)
				}), e.stream.on("end", function()
				{
					return t(r.join(""))
				}), e.stream.on("error", n)
			})
		}

		function m(e)
		{
			return new n.Promise(function(t, n)
			{
				if (!f(e)) return n("Server returned " + e.res.statusCode);
				if (p(e)) return t(null);
				if (!/application\/json/.test(e.res.headers["content-type"])) return n("Response doesn't appear to be JSON");
				var r = [];
				e.stream.on("data", function(e)
				{
					return r.push(e)
				}), e.stream.on("end", function()
				{
					return t(JSON.parse(r.join("")))
				}), e.stream.on("error", n)
			})
		}
		t.request = l, t.download = h, t.asText = d, t.asJson = m
	}), define(e[73], t([1, 0, 59, 18, 10, 2, 20, 7, 75, 23, 68, 5, 42, 44, 37, 16, 21, 30, 69, 83]), function(e, t, n, o, s, a, u, c, l, f, p, h, d, m, v, g, y, b, _, E)
	{
		"use strict";

		function w()
		{
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return String(e.reduce(function(e, t)
			{
				return e | t
			}, 0))
		}

		function C(e, t)
		{
			var n = (e || []).filter(function(e)
			{
				return e.statisticName === t
			})[0];
			return n ? n.value : 0
		}

		function S(t, n)
		{
			var r = t.files.filter(function(e)
			{
				return e.assetType === n
			})[0];
			if (!r)
			{
				if (n === T.Icon)
				{
					var i = e.toUrl("./media/defaultIcon.png");
					return {
						uri: i,
						fallbackUri: i
					}
				}
				return null
			}
			return n === T.VSIX ?
			{
				uri: t.fallbackAssetUri + "/" + n + "?redirect=true&install=true",
				fallbackUri: t.fallbackAssetUri + "/" + n + "?install=true"
			} :
			{
				uri: t.assetUri + "/" + n,
				fallbackUri: t.fallbackAssetUri + "/" + n
			}
		}

		function x(e)
		{
			var t = e.properties ? e.properties.filter(function(e)
				{
					return e.key === D.Dependency
				}) : [],
				n = t.length > 0 && t[0].value;
			return n ? n.split(",") : []
		}

		function P(e)
		{
			var t = e.properties ? e.properties.filter(function(e)
			{
				return e.key === D.Engine
			}) : [];
			return t.length > 0 && t[0].value || ""
		}

		function O(e, t)
		{
			var n = e.versions[0],
				r = {
					manifest: S(n, T.Manifest),
					readme: S(n, T.Details),
					changelog: S(n, T.Changelog),
					download: S(n, T.VSIX),
					icon: S(n, T.Icon),
					license: S(n, T.License)
				};
			return {
				id: e.extensionId,
				name: e.extensionName,
				version: n.version,
				date: n.lastUpdated,
				displayName: e.displayName,
				publisherId: e.publisher.publisherId,
				publisher: e.publisher.publisherName,
				publisherDisplayName: e.publisher.displayName,
				description: e.shortDescription || "",
				installCount: C(e.statistics, "install"),
				rating: C(e.statistics, "averagerating"),
				ratingCount: C(e.statistics, "ratingcount"),
				assets: r,
				properties:
				{
					dependencies: x(n),
					engine: P(n)
				}
			}
		}
		var k;
		! function(e)
		{
			e[e.None = 0] = "None", e[e.IncludeVersions = 1] = "IncludeVersions", e[e.IncludeFiles = 2] = "IncludeFiles", e[e.IncludeCategoryAndTags = 4] = "IncludeCategoryAndTags", e[e.IncludeSharedAccounts = 8] = "IncludeSharedAccounts", e[e.IncludeVersionProperties = 16] = "IncludeVersionProperties", e[e.ExcludeNonValidated = 32] = "ExcludeNonValidated", e[e.IncludeInstallationTargets = 64] = "IncludeInstallationTargets", e[e.IncludeAssetUri = 128] = "IncludeAssetUri", e[e.IncludeStatistics = 256] = "IncludeStatistics", e[e.IncludeLatestVersionOnly = 512] = "IncludeLatestVersionOnly", e[e.Unpublished = 4096] = "Unpublished"
		}(k || (k = {}));
		var I;
		! function(e)
		{
			e[e.Tag = 1] = "Tag", e[e.ExtensionId = 4] = "ExtensionId", e[e.Category = 5] = "Category", e[e.ExtensionName = 7] = "ExtensionName", e[e.Target = 8] = "Target", e[e.Featured = 9] = "Featured", e[e.SearchText = 10] = "SearchText", e[e.ExcludeWithFlags = 12] = "ExcludeWithFlags"
		}(I || (I = {}));
		var T = {
				Icon: "Microsoft.VisualStudio.Services.Icons.Default",
				Details: "Microsoft.VisualStudio.Services.Content.Details",
				Changelog: "Microsoft.VisualStudio.Services.Content.Changelog",
				Manifest: "Microsoft.VisualStudio.Code.Manifest",
				VSIX: "Microsoft.VisualStudio.Services.VSIXPackage",
				License: "Microsoft.VisualStudio.Services.Content.License"
			},
			D = {
				Dependency: "Microsoft.VisualStudio.Code.ExtensionDependencies",
				Engine: "Microsoft.VisualStudio.Code.Engine"
			},
			A = 10,
			j = {
				pageNumber: 1,
				pageSize: A,
				sortBy: f.SortBy.NoneOrRelevance,
				sortOrder: f.SortOrder.Default,
				flags: k.None,
				criteria: [],
				assetTypes: []
			},
			L = function()
			{
				function e(e)
				{
					void 0 === e && (e = j), this.state = e
				}
				return Object.defineProperty(e.prototype, "pageNumber",
				{
					get: function()
					{
						return this.state.pageNumber
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "pageSize",
				{
					get: function()
					{
						return this.state.pageSize
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "sortBy",
				{
					get: function()
					{
						return this.state.sortBy
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "sortOrder",
				{
					get: function()
					{
						return this.state.sortOrder
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(e.prototype, "flags",
				{
					get: function()
					{
						return this.state.flags
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.withPage = function(t, n)
				{
					return void 0 === n && (n = this.state.pageSize), new e(h.assign(
					{}, this.state,
					{
						pageNumber: t,
						pageSize: n
					}))
				}, e.prototype.withFilter = function(t)
				{
					for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
					var i = this.state.criteria.concat(n.map(function(e)
					{
						return {
							filterType: t,
							value: e
						}
					}));
					return new e(h.assign(
					{}, this.state,
					{
						criteria: i
					}))
				}, e.prototype.withSortBy = function(t)
				{
					return new e(h.assign(
					{}, this.state,
					{
						sortBy: t
					}))
				}, e.prototype.withSortOrder = function(t)
				{
					return new e(h.assign(
					{}, this.state,
					{
						sortOrder: t
					}))
				}, e.prototype.withFlags = function()
				{
					for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
					return new e(h.assign(
					{}, this.state,
					{
						flags: t.reduce(function(e, t)
						{
							return e | t
						}, 0)
					}))
				}, e.prototype.withAssetTypes = function()
				{
					for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
					return new e(h.assign(
					{}, this.state,
					{
						assetTypes: t
					}))
				}, Object.defineProperty(e.prototype, "raw",
				{
					get: function()
					{
						var e = this.state,
							t = e.criteria,
							n = e.pageNumber,
							r = e.pageSize,
							i = e.sortBy,
							o = e.sortOrder,
							s = e.flags,
							a = e.assetTypes,
							u = [
							{
								criteria: t,
								pageNumber: n,
								pageSize: r,
								sortBy: i,
								sortOrder: o
							}];
						return {
							filters: u,
							assetTypes: a,
							flags: s
						}
					},
					enumerable: !0,
					configurable: !0
				}), e
			}(),
			N = function()
			{
				function e(e, t, n)
				{
					this.requestService = e, this.telemetryService = t, this.configurationService = n;
					var r = b.default.extensionsGallery;
					this.extensionsGalleryUrl = r && r.serviceUrl, this.commonHTTPHeaders = E.getCommonHTTPHeaders()
				}
				return e.prototype.api = function(e)
				{
					return void 0 === e && (e = ""), "" + this.extensionsGalleryUrl + e
				}, e.prototype.isEnabled = function()
				{
					return !!this.extensionsGalleryUrl
				}, e.prototype.getRequestHeaders = function()
				{
					return this.commonHTTPHeaders
				}, e.prototype.query = function(e)
				{
					var t = this;
					if (void 0 === e && (e = {}), !this.isEnabled()) return a.TPromise.wrapError(new Error("No extension gallery service configured."));
					var n = e.names ? "ids" : e.text ? "text" : "all",
						r = e.text || "",
						i = h.getOrDefault(e, function(e)
						{
							return e.pageSize
						}, 50);
					this.telemetryService.publicLog("galleryService:query",
					{
						type: n,
						text: r
					});
					var o = (new L).withFlags(k.IncludeLatestVersionOnly, k.IncludeAssetUri, k.IncludeStatistics, k.IncludeFiles, k.IncludeVersionProperties).withPage(1, i).withFilter(I.Target, "Microsoft.VisualStudio.Code").withFilter(I.ExcludeWithFlags, w(k.Unpublished)).withAssetTypes(T.Icon, T.License, T.Details, T.Manifest, T.VSIX, T.Changelog);
					return o = r ? o.withFilter(I.SearchText, r).withSortBy(f.SortBy.NoneOrRelevance) : e.ids ? o.withFilter.apply(o, [I.ExtensionId].concat(e.ids)) : e.names ? o.withFilter.apply(o, [I.ExtensionName].concat(e.names)) : o.withSortBy(f.SortBy.InstallCount), "number" == typeof e.sortBy && (o = o.withSortBy(e.sortBy)), "number" == typeof e.sortOrder && (o = o.withSortOrder(e.sortOrder)), this.queryGallery(o).then(function(e)
					{
						var n = e.galleryExtensions,
							r = e.total,
							i = n.map(function(e)
							{
								return O(e, t.extensionsGalleryUrl)
							}),
							s = o.pageSize,
							a = function(e)
							{
								return t.queryGallery(o.withPage(e + 1)).then(function(e)
								{
									var n = e.galleryExtensions;
									return n.map(function(e)
									{
										return O(e, t.extensionsGalleryUrl)
									})
								})
							};
						return {
							firstPage: i,
							total: r,
							pageSize: s,
							getPage: a
						}
					})
				}, e.prototype.queryGallery = function(e)
				{
					var t = this;
					return this.commonHTTPHeaders.then(function(n)
					{
						var r = JSON.stringify(e.raw);
						return n = h.assign(
						{}, n,
						{
							"Content-Type": "application/json",
							Accept: "application/json;api-version=3.0-preview.1",
							"Accept-Encoding": "gzip",
							"Content-Length": r.length
						}), t.requestService.request(
						{
							type: "POST",
							url: t.api("/extensionquery"),
							data: r,
							headers: n
						})
					}).then(function(e)
					{
						return v.asJson(e)
					}).then(function(e)
					{
						var t = e.results[0],
							n = t.extensions,
							r = t.resultMetadata && t.resultMetadata.filter(function(e)
							{
								return "ResultCount" === e.metadataType
							})[0],
							i = r && r.metadataItems.filter(function(e)
							{
								return "TotalCount" === e.name
							})[0].count || 0;
						return {
							galleryExtensions: n,
							total: i
						}
					})
				}, e.prototype.download = function(e)
				{
					var t = this;
					return this.loadCompatibleVersion(e).then(function(e)
					{
						var n = s.join(o.tmpdir(), e.id),
							r = p.getGalleryExtensionTelemetryData(e),
							i = (new Date).getTime(),
							a = function(e)
							{
								return t.telemetryService.publicLog("galleryService:downloadVSIX", h.assign(r,
								{
									duration: e
								}))
							};
						return t.getAsset(e.assets.download).then(function(e)
						{
							return v.download(n, e)
						}).then(function()
						{
							return a((new Date).getTime() - i)
						}).then(function()
						{
							return n
						})
					})
				}, e.prototype.getReadme = function(e)
				{
					return this.getAsset(e.assets.readme).then(v.asText)
				}, e.prototype.getManifest = function(e)
				{
					return this.getAsset(e.assets.manifest).then(v.asText).then(JSON.parse)
				}, e.prototype.getChangelog = function(e)
				{
					return this.getAsset(e.assets.changelog).then(v.asText)
				}, e.prototype.getAllDependencies = function(e)
				{
					var t = this;
					return this.loadCompatibleVersion(e).then(function(n)
					{
						return t.getDependenciesReccursively(n.properties.dependencies, [], e)
					})
				}, e.prototype.loadCompatibleVersion = function(e)
				{
					var t = this;
					if (e.properties.engine && this.isEngineValid(e.properties.engine)) return a.TPromise.wrap(e);
					var r = (new L).withFlags(k.IncludeVersions, k.IncludeFiles, k.IncludeVersionProperties).withPage(1, 1).withFilter(I.Target, "Microsoft.VisualStudio.Code").withFilter(I.ExcludeWithFlags, w(k.Unpublished)).withAssetTypes(T.Manifest, T.VSIX).withFilter(I.ExtensionId, e.id);
					return this.queryGallery(r).then(function(r)
					{
						var i = r.galleryExtensions,
							o = i[0];
						return o ? t.getLastValidExtensionVersion(o, o.versions).then(function(t)
						{
							return e.properties.dependencies = x(t), e.properties.engine = P(t), e.assets.download = S(t, T.VSIX), e.version = t.version, e
						}) : a.TPromise.wrapError(new Error(n.localize(0, null)))
					})
				}, e.prototype.loadDependencies = function(e)
				{
					var t = this;
					if (!e || 0 === e.length) return a.TPromise.as([]);
					var n = (r = (new L).withFlags(k.IncludeLatestVersionOnly, k.IncludeAssetUri, k.IncludeStatistics, k.IncludeFiles, k.IncludeVersionProperties).withPage(1, e.length).withFilter(I.Target, "Microsoft.VisualStudio.Code").withFilter(I.ExcludeWithFlags, w(k.Unpublished)).withAssetTypes(T.Icon, T.License, T.Details, T.Manifest, T.VSIX)).withFilter.apply(r, [I.ExtensionName].concat(e));
					return this.queryGallery(n).then(function(e)
					{
						for (var n = [], r = [], i = 0, o = e.galleryExtensions; i < o.length; i++)
						{
							var s = o[i];
							r.indexOf(s.extensionId) === -1 && (n.push(O(s, t.extensionsGalleryUrl)), r.push(s.extensionId))
						}
						return n
					});
					var r
				}, e.prototype.getDependenciesReccursively = function(t, n, r)
				{
					var i = this;
					return t && t.length ? (t.indexOf(r.publisher + "." + r.name) !== -1 && n.indexOf(r) === -1 && n.push(r), t = n.length ? t.filter(function(t)
					{
						return !e.hasExtensionByName(n, t)
					}) : t, t.length ? this.loadDependencies(t).then(function(t)
					{
						for (var o = new l.ArraySet, s = 0, a = t; s < a.length; s++)
						{
							var c = a[s];
							c.properties.dependencies && c.properties.dependencies.forEach(function(e)
							{
								return o.set(e)
							})
						}
						n = u.distinct(n.concat(t), function(e)
						{
							return e.id
						});
						var f = o.elements.filter(function(t)
						{
							return !e.hasExtensionByName(n, t)
						});
						return i.getDependenciesReccursively(f, n, r)
					}) : a.TPromise.wrap(n)) : a.TPromise.wrap(n)
				}, e.prototype.getAsset = function(e, t)
				{
					var n = this;
					void 0 === t && (t = {});
					var r = {
						type: "GET"
					};
					return this.commonHTTPHeaders.then(function(i)
					{
						i = h.assign(
						{}, i, t.headers ||
						{}), t = h.assign(
						{}, t, r,
						{
							headers: i
						});
						var o = h.assign(
						{}, t,
						{
							url: e.uri
						});
						return n.requestService.request(o).then(function(e)
						{
							return 200 === e.res.statusCode ? e : a.TPromise.wrapError("expected 200")
						}).then(null, function(r)
						{
							n.telemetryService.publicLog("galleryService:requestError",
							{
								cdn: !0,
								message: c.getErrorMessage(r)
							}), n.telemetryService.publicLog("galleryService:cdnFallback",
							{
								url: e.uri
							});
							var i = h.assign(
							{}, t,
							{
								url: e.fallbackUri
							});
							return n.requestService.request(i).then(null, function(e)
							{
								return n.telemetryService.publicLog("galleryService:requestError",
								{
									cdn: !1,
									message: c.getErrorMessage(e)
								}), a.TPromise.wrapError(e)
							})
						})
					})
				}, e.prototype.getLastValidExtensionVersion = function(e, t)
				{
					var n = this.getLastValidExtensionVersionFromProperties(e, t);
					return n ? n : this.getLastValidExtensionVersionReccursively(e, t)
				}, e.prototype.getLastValidExtensionVersionFromProperties = function(e, t)
				{
					for (var n = 0, r = t; n < r.length; n++)
					{
						var i = r[n],
							o = P(i);
						if (!o) return null;
						if (this.isEngineValid(o)) return a.TPromise.wrap(i)
					}
					return null
				}, e.prototype.getLastValidExtensionVersionReccursively = function(e, t)
				{
					var r = this;
					if (!t.length) return a.TPromise.wrapError(new Error(n.localize(1, null, e.displayName || e.extensionName)));
					var i = t[0],
						o = S(i, T.Manifest),
						s = {
							"Accept-Encoding": "gzip"
						};
					return this.getAsset(o,
					{
						headers: s
					}).then(function(e)
					{
						return v.asJson(e)
					}).then(function(n)
					{
						var o = n.engines.vscode;
						return r.isEngineValid(o) ? (i.properties = i.properties || [], i.properties.push(
						{
							key: D.Engine,
							value: n.engines.vscode
						}), i) : r.getLastValidExtensionVersionReccursively(e, t.slice(1))
					})
				}, e.prototype.isEngineValid = function(e)
				{
					return "*" === e || _.isVersionValid(y.default.version, e)
				}, e.hasExtensionByName = function(e, t)
				{
					for (var n = 0, r = e; n < r.length; n++)
					{
						var i = r[n];
						if (i.publisher + "." + i.name === t) return !0
					}
					return !1
				}, e
			}();
		N = r([i(0, d.IRequestService), i(1, m.ITelemetryService), i(2, g.IConfigurationService)], N), t.ExtensionGalleryService = N
	}), define(e[52], t([1, 0, 5, 37, 92, 16]), function(e, t, n, o, s, a)
	{
		"use strict";
		var u = function()
		{
			function e(e)
			{
				this.disposables = [], this.configure(e.getConfiguration()), e.onDidUpdateConfiguration(this.onDidUpdateConfiguration, this, this.disposables)
			}
			return e.prototype.onDidUpdateConfiguration = function(e)
			{
				this.configure(e.config)
			}, e.prototype.configure = function(e)
			{
				this.proxyUrl = e.http && e.http.proxy, this.strictSSL = e.http && e.http.proxyStrictSSL, this.authorization = e.http && e.http.proxyAuthorization
			}, e.prototype.request = function(e, t)
			{
				void 0 === t && (t = o.request);
				var r = this,
					i = r.proxyUrl,
					a = r.strictSSL;
				return e.agent = e.agent || s.getProxyAgent(e.url,
				{
					proxyUrl: i,
					strictSSL: a
				}), e.strictSSL = a, this.authorization && (e.headers = n.assign(e.headers ||
				{},
				{
					"Proxy-Authorization": this.authorization
				})), t(e)
			}, e
		}();
		u = r([i(0, a.IConfigurationService)], u), t.RequestService = u
	}), define(e[115], t([1, 0, 19, 11, 30, 21, 102, 2, 35, 32, 77, 27, 85, 66, 23, 94, 73, 16, 91, 42, 52, 44, 45, 98, 95, 48, 96, 29, 81, 46, 101, 100]), function(e, t, n, r, i, o, s, a, u, c, l, f, p, h, d, m, v, g, y, b, _, E, w, C, S, x, P, O, k, I, T, D)
	{
		"use strict";

		function A(e)
		{
			e && console.error(e.stack || e), process.exit(e ? 1 : 0)
		}

		function j(e)
		{
			setInterval(function()
			{
				try
				{
					process.kill(e, 0)
				}
				catch (e)
				{
					process.exit()
				}
			}, 5e3)
		}

		function L(e, t)
		{
			var n = new u.ServiceCollection;
			n.set(f.IEnvironmentService, new c.SyncDescriptor(p.EnvironmentService, t.args, process.execPath)), n.set(g.IConfigurationService, new c.SyncDescriptor(y.ConfigurationService)), n.set(b.IRequestService, new c.SyncDescriptor(_.RequestService));
			var r = e.getChannel("windows",
				{
					route: function()
					{
						return "main"
					}
				}),
				s = new T.WindowsChannelClient(r);
			n.set(I.IWindowsService, s);
			var a = new D.ActiveWindowManager(s),
				A = e.getChannel("choice",
				{
					route: function()
					{
						return a.activeClientId
					}
				});
			n.set(O.IChoiceService, new k.ChoiceChannelClient(A));
			var j = new l.InstantiationService(n);
			j.invokeFunction(function(t)
			{
				var n = [];
				i.default.aiConfig && i.default.aiConfig.key && n.push(new P.AppInsightsAppender(F, null, i.default.aiConfig.key)), i.default.aiConfig && i.default.aiConfig.asimovKey && n.push(new P.AppInsightsAppender(F, null, i.default.aiConfig.asimovKey)),
					process.once("exit", function()
					{
						return n.forEach(function(e)
						{
							return e.dispose()
						})
					});
				var r = w.combinedAppender.apply(void 0, n);
				e.registerChannel("telemetryAppender", new S.TelemetryAppenderChannel(r));
				var s = new u.ServiceCollection,
					a = t.get(f.IEnvironmentService),
					l = a.appRoot,
					p = a.extensionsPath,
					g = a.extensionDevelopmentPath,
					y = a.isBuilt;
				if (y && !g && i.default.enableTelemetry)
				{
					var b = {
						appender: r,
						commonProperties: C.resolveCommonProperties(i.default.commit, o.default.version),
						piiPaths: [l, p]
					};
					s.set(E.ITelemetryService, new c.SyncDescriptor(x.TelemetryService, b))
				}
				else s.set(E.ITelemetryService, w.NullTelemetryService);
				s.set(d.IExtensionManagementService, new c.SyncDescriptor(m.ExtensionManagementService)), s.set(d.IExtensionGalleryService, new c.SyncDescriptor(v.ExtensionGalleryService));
				var _ = j.createChild(s);
				_.invokeFunction(function(t)
				{
					var n = t.get(d.IExtensionManagementService),
						r = new h.ExtensionManagementChannel(n);
					e.registerChannel("extensions", r), n.removeDeprecatedExtensions()
				})
			})
		}

		function N(e)
		{
			function t(i)
			{
				return s.serve(e).then(null, function(o)
				{
					return !i || r.isWindows || "EADDRINUSE" !== o.code ? a.TPromise.wrapError(o) : s.connect(e, "").then(function(e)
					{
						return e.dispose(), a.TPromise.wrapError(new Error("There is an instance already running."))
					}, function(r)
					{
						try
						{
							n.unlinkSync(e)
						}
						catch (e)
						{
							return a.TPromise.wrapError(new Error("Error deleting the shared ipc hook."))
						}
						return t(!1)
					})
				})
			}
			return t(!0)
		}

		function R()
		{
			return new a.TPromise(function(e, t)
			{
				process.once("message", e), process.once("error", t), process.send("hello")
			})
		}
		var F = "monacoworkbench";
		N(process.env.VSCODE_SHARED_IPC_HOOK).then(function(e)
		{
			return R().then(function(t)
			{
				return L(e, t)
			}).then(function()
			{
				return j(process.env.VSCODE_PID)
			}).done(null, A)
		})
	})
}).call(this);
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/27240e71ef390bf2d66307e677c2a333cebf75af/core/vs\code\node\sharedProcessMain.js.map
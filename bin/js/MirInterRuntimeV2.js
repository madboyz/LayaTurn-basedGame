"use strict";
var MirInterRuntime = (function(){
	var MirInterRuntime = {};

	MirInterRuntime.utils = ({
		getUrlParam:function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
		},
		lazyLoad:(function(){
		  // -- Private Variables ------------------------------------------------------

		  // User agent and feature test information.
		  var env,

		  // Reference to the <head> element (populated lazily).
		  head,

		  // Requests currently in progress, if any.
		  pending = {},

		  // Number of times we've polled to check whether a pending stylesheet has
		  // finished loading in WebKit. If this gets too high, we're probably stalled.
		  pollCount = 0,

		  // Queued requests.
		  queue = {css: [], js: []},

		  //image列表
		  _list = {},

		  // Reference to the browser's list of stylesheets.
		  styleSheets = document.styleSheets;



		  // -- Private Methods --------------------------------------------------------

		  /**
		  Creates and returns an HTML element with the specified name and attributes.

		  @method createNode
		  @param {String} name element name
		  @param {Object} attrs name/value mapping of element attributes
		  @return {HTMLElement}
		  @private
		  */
		  function createNode(name, attrs) {
		    var node = document.createElement(name), attr;

		    for (attr in attrs) {
		      if (attrs.hasOwnProperty(attr)) {
		        node.setAttribute(attr, attrs[attr]);
		      }
		    }

		    return node;
		  }

		  /**
		  Called when the current pending resource of the specified type has finished
		  loading. Executes the associated callback (if any) and loads the next
		  resource in the queue.

		  @method finish
		  @param {String} type resource type ('css' or 'js')
		  @private
		  */
		  function finish(type, isError) {
		    var p = pending[type],
		        callback, onError,
		        urls;

		    if (p) {
		        callback = p.callback;
		        onError = p.onError;
		      urls     = p.urls;

		      if(type != 'css'){
		    	  urls.shift();
		      }
		      pollCount = 0;

		      // If this is the last of the pending URLs, execute the callback and
		      // start the next request in the queue (if any).
		      if (!urls.length) {
		        if (callback) {
		          callback.call(p.context, p.obj);
		        }
		        if (isError && onError) {
		        	onError.call(p.context, p.obj);
		          }

		        pending[type] = null;

		        if (queue[type].length) {
		          load(type);
		        }
		      }
		    }
		  }

		  /**
		  Populates the <code>env</code> variable with user agent and feature test
		  information.

		  @method getEnv
		  @private
		  */
		  function getEnv() {
		    // No need to run again if already populated.
		    if (env) { return; }

		    var ua = navigator.userAgent;

		    env = {
		      // True if this browser supports disabling async mode on dynamically
		      // created script nodes. See
		      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
		      async: document.createElement('script').async === true
		    };

		    (env.webkit = /AppleWebKit\//.test(ua))
		      || (env.ie = /MSIE/.test(ua))
		      || (env.opera = /Opera/.test(ua))
		      || (env.gecko = /Gecko\//.test(ua))
		      || (env.unknown = true);
		  }

		  /**
		  Loads the specified resources, or the next resource of the specified type
		  in the queue if no resources are specified. If a resource of the specified
		  type is already being loaded, the new request will be queued until the
		  first request has been finished.

		  When an array of resource URLs is specified, those URLs will be loaded in
		  parallel if it is possible to do so while preserving execution order. All
		  browsers support parallel loading of CSS, but only Firefox and Opera
		  support parallel loading of scripts. In other browsers, scripts will be
		  queued and loaded one at a time to ensure correct execution order.

		  @method load
		  @param {String} type resource type ('css' or 'js')
		  @param {String|Array} urls (optional) URL or array of URLs to load
		  @param {Function} callback (optional) callback function to execute when the
		    resource is loaded
		  @param {Object} obj (optional) object to pass to the callback function
		  @param {Object} context (optional) if provided, the callback function will
		    be executed in this object's context
		  @private
		  */
		  function load(type, urls, callback, obj, context, onError) {
		    var _finish = function () { finish(type, false); },
		    	_finishAndError = function () { finish(type, true); },
		        isCSS   = type === 'css',
		        i, len, node, p, pendingUrls, url;

		    getEnv();

		    if (urls) {
		      // If urls is a string, wrap it in an array. Otherwise assume it's an
		      // array and create a copy of it so modifications won't be made to the
		      // original.
		      urls = typeof urls === 'string' ? [urls] : urls.concat();

		      // Create a request object for each URL. If multiple URLs are specified,
		      // the callback will only be executed after all URLs have been loaded.
		      //
		      // Sadly, Firefox and Opera are the only browsers capable of loading
		      // scripts in parallel while preserving execution order. In all other
		      // browsers, scripts must be loaded sequentially.
		      //
		      // All browsers respect CSS specificity based on the order of the link
		      // elements in the DOM, regardless of the order in which the stylesheets
		      // are actually downloaded.
		      if (isCSS || env.async || env.gecko || env.opera) {
		        // Load in parallel.
		        queue[type].push({
		          urls    : urls,
		          callback: callback,
		          onError: onError,
		          obj     : obj,
		          context : context
		        });
		      } else {
		        // Load sequentially.
		        for (i = 0, len = urls.length; i < len; ++i) {
		          queue[type].push({
		            urls    : [urls[i]],
		            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
		            onError	: i === len - 1 ? onError : null, // onError is only added to the last URL
		            obj     : obj,
		            context : context
		          });
		        }
		      }
		    }

		    // If a previous load request of this type is currently in progress, we'll
		    // wait our turn. Otherwise, grab the next item in the queue.
		    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
		      return;
		    }

		    head || (head = document.head || document.getElementsByTagName('head')[0]);
		    pendingUrls = p.urls;

		    for (i = 0, len = pendingUrls.length; i < len; ++i) {
		      url = pendingUrls[i];

		      if (isCSS) {
		        node = createNode('link', {
		          charset: 'utf-8',
		          'class': 'lazyload',
		          href   : url,
		          rel    : 'stylesheet',
		          type   : 'text/css'
		        });
		      } else {
		        node = createNode('script', {
		          charset: 'utf-8',
		          'class': 'lazyload',
		          src    : url
		        });

		        node.async = false;
		      }

		      if (env.ie) {
		        node.onreadystatechange = function () {
		          var readyState = this.readyState;

		          if (readyState === 'loaded' || readyState === 'complete') {
		            this.onreadystatechange = null;
		            _finish();
		          }
		        };
		      } else if (isCSS && (env.gecko || env.webkit)) {
		        // Gecko and WebKit don't support the onload event on link nodes. In
		        // WebKit, we can poll for changes to document.styleSheets to figure out
		        // when stylesheets have loaded, but in Gecko we just have to finish
		        // after a brief delay and hope for the best.
		        if (env.webkit) {
		          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
		          poll();
		        } else {
		          setTimeout(_finish, 50 * len);
		        }
		      } else {
		    	node.onerror =  _finishAndError;
		        node.onload = _finish;
		      }

		      head.appendChild(node);
		    }
		  }

		  /**
		  Begins polling to determine when pending stylesheets have finished loading
		  in WebKit. Polling stops when all pending stylesheets have loaded.

		  @method poll
		  @private
		  */
		  function poll() {
		    var css = pending.css, i;

		    if (!css) {
		      return;
		    }

		    i = styleSheets.length;

		    // Look for a stylesheet matching the pending URL.
		    while (i && --i) {
		      if (styleSheets[i].href === css.urls[0]) {
		        finish('css');
		        break;
		      }
		    }

		    pollCount += 1;

		    if (css) {
		      if (pollCount < 200) {
		        setTimeout(poll, 50);
		      } else {
		        // We've been polling for 10 seconds and nothing's happened, which may
		        // indicate that the stylesheet has been removed from the document
		        // before it had a chance to load. Stop polling and finish the pending
		        // request to prevent blocking further requests.
		        finish('css');
		      }
		    }
		  }

		  return {

		    /**
		    Requests the specified CSS URL or URLs and executes the specified
		    callback (if any) when they have finished loading. If an array of URLs is
		    specified, the stylesheets will be loaded in parallel and the callback
		    will be executed after all stylesheets have finished loading.

		    Currently, Firefox doesn't provide any way to reliably determine when a
		    stylesheet has finished loading. In Firefox, the callback will be
		    executed after a brief delay. For information on a manual technique you
		    can use to detect when CSS has actually finished loading in Firefox, see
		    http://wonko.com/post/how-to-prevent-yui-get-race-conditions (which
		    applies to LazyLoad as well, despite being originally written in in
		    reference to the YUI Get utility).

		    @method css
		    @param {String|Array} urls CSS URL or array of CSS URLs to load
		    @param {Function} callback (optional) callback function to execute when
		      the specified stylesheets are loaded
		    @param {Object} obj (optional) object to pass to the callback function
		    @param {Object} context (optional) if provided, the callback function
		      will be executed in this object's context
		    @static
		    */
		    css: function (urls, callback, obj, context) {
		      load('css', urls, callback, obj, context);
		    },

		    /**
		    Requests the specified JavaScript URL or URLs and executes the specified
		    callback (if any) when they have finished loading. If an array of URLs is
		    specified and the browser supports it, the scripts will be loaded in
		    parallel and the callback will be executed after all scripts have
		    finished loading.

		    Currently, only Firefox and Opera support parallel loading of scripts while
		    preserving execution order. In other browsers, scripts will be
		    queued and loaded one at a time to ensure correct execution order.

		    @method js
		    @param {String|Array} urls JS URL or array of JS URLs to load
		    @param {Function} callback (optional) callback function to execute when
		      the specified scripts are loaded
		    @param {Object} obj (optional) object to pass to the callback function
		    @param {Object} context (optional) if provided, the callback function
		      will be executed in this object's context
		    @static
		    */
		    js: function (urls, callback, obj, context, onError) {
		      load('js', urls, callback, obj, context, onError);
		    },

			  image : function(urls, callback, obj, context, onError) {
				  var list = _list;
				  var o = {
					  total : urls.length,
					  loaded : 0,
					  callback : callback,
					  hasError : false
				  };
				  var uuid = new Date().getTime() + Math.floor(Math.random() * 10000);
				  list[uuid] = o;
				  for (var i = 0; i < urls.length; i++) {
					  var image = new Image();
					  image.uuid = uuid;
					  image.onload = function(e) {
						  var uuid = e.currentTarget.uuid;
						  var o = list[uuid];
						  o.loaded++;
						  if (o.loaded == o.total) {
							  delete list[uuid];
							  if (o.hasError) {
								  onError.call(context, obj);
							  } else {
								  callback.call(context, obj);
							  }
						  }
					  };
					  image.onerror = function(e) {
						  var uuid = e.currentTarget.uuid;
						  var o = list[uuid];
						  o.hasError = true;
						  image.onload(e);
					  };
					  image.src = urls[i];
				  }
			  }

		  };
		})(),
		makeUrlParams:function(params){
            if(params){
               var str = "";
                for(var i in params){
                    str = str + i + "=" + encodeURIComponent(params[i]) + "&";
                }
                str = str.substring(0,str.length-1);
                console.log(str);
                return str;
            }else{
                console.log("非法调用");
                return false;
            }
        },
		request: function(url, params, callback, method, content_type, timeout){
			if(!method){
				method = "POST";
			}

			if(!content_type){
				content_type = "application/x-www-form-urlencoded";
			}

			if(!timeout){
				timeout = 30000;//30s释放
			}

			var xhr = new XMLHttpRequest();
			xhr.timeout = timeout;
			xhr.ontimeout = function(){
				console.log('请求超时',url);
				var re = {
					ret: 0,
					msg: "失败",
					content: [],
				};
				re.msg = "请求超时";
				callback(re);
				return;
			};

			var query_params = MirInterRuntime.utils.makeUrlParams(params);

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    console.log(xhr.response);
                    if(xhr.response){
                        if(callback && (typeof(callback) === 'function')){
                        	if(typeof(xhr.response) === "string"){
                        		callback(JSON.parse(xhr.response));
                        		return;
                        	}
                        	callback(xhr.response);
                        	return;
                        }
                    }
                }
            };

            if(method === 'POST'){
            	xhr.open(method, url);
            	xhr.setRequestHeader("Content-type",content_type);
            	xhr.send(query_params);
            }else{
            	xhr.open(method, url + '?' + query_params);
            	xhr.send();
            }
		},
	});

	MirInterRuntime.config = ({
		mirror_js: "",//mir的渠道子文件文件名
		mirror_js_src: "",//mir的渠道的src路径
		mirror_version: "1.0",
		protocol:  window.location.protocol === "https:" ? "https" : "http",//协议
		domain: "static.ijunhai.com",//域名 mir.ijunhai.com 静态是资源的地址
		agent_domain: "agent.ijunhai.com",//多活节点
	});

	MirInterRuntime.getMirrorJS = (function(callback){
		var mirror_js = MirInterRuntime.utils.getUrlParam('mirror_js_name');
		if(!mirror_js){
			var u = navigator.userAgent;
    		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    		if(true === isiOS){
    			mirror_js = "h5_agent_iOS";
    		}else{
    			mirror_js = "h5_agent_android";
    		}

    		//判断是否有玩吧注入的全局变量
    		if(window.OPEN_DATA){
    			mirror_js = "hqqzone";
    		}
			// mirror_js = "h5_agent";
		}
		MirInterRuntime.config.mirror_js = mirror_js;
		MirInterRuntime.config.mirror_js_src = MirInterRuntime.config.protocol + "://"+MirInterRuntime.config.domain + "/mir/" + MirInterRuntime.config.mirror_js + ".js";

		//加载完成
		var onJsLoaded = function(){
			var return_message = {
				"ret":1,
				"msg":"MirInterRuntime 加载sdk文件成功",
				"content": {},
			}
			callback(return_message);
		};

		//加载错误
		var onJsError = function(){
			// alert(window.mirror_try_times);
			if (window.mirror_try_times && (window.mirror_try_times <= 3)){
				console.log("======>开始第",window.mirror_try_times,"次加载");
				window.mirror_try_times = window.mirror_try_times + 1;
				MirInterRuntime.utils.lazyLoad.js(MirInterRuntime.config.mirror_js_src + "?version=" + MirInterRuntime.config.mirror_version, onJsLoaded, null, null, onJsError);
				return;
			}else if(window.mirror_try_times && (window.mirror_try_times >= 4)){
				var return_message = {
					"ret":0,
					"msg":"MirInterRuntime 加载sdk文件错误",
					"content": {},
				}
				console.log("不继续加载");
				callback(return_message);//失败回调
				return;
			}
		}
		window.mirror_try_times = 1;
		//urls, callback, obj, context, onError
		MirInterRuntime.utils.lazyLoad.js(MirInterRuntime.config.mirror_js_src + "?version=" + MirInterRuntime.config.mirror_version, onJsLoaded, null, null, onJsError);
	});

	MirInterRuntime.junhai_init = (function(callback,data){
		if(MirInterRuntime.utils.getUrlParam('mirror_js_verison')){
			MirInterRuntime.config.mirror_version = MirInterRuntime.utils.getUrlParam('mirror_js_verison');
		}else{
			MirInterRuntime.config.mirror_version = Date.parse(new Date());
		}

		if(data && data.agent_domain){
			MirInterRuntime.config.agent_domain = data.agent_domain;
		}else{
			MirInterRuntime.config.agent_domain = "agent.ijunhai.com";
		}

		// if(data && data.protocol){
		// 	MirInterRuntime.config.protocol = data.protocol;
		// }else{
		// 	// MirInterRuntime.config.protocol = "http";
		// }

		//加载Mirror 渠道文件
		MirInterRuntime.getMirrorJS(function(return_message){
			console.log('开始加载渠道文件');
			if(return_message && (return_message.ret === 1)){
				//继续执行
				try {
					for(var prop in MIR){
						console.log(prop,MIR[prop]);
						MirInterRuntime[prop] = MIR[prop];
					}

					//自己初始化
					MirInterRuntime.h5_check_init(function(obj){
						//捕获
						try {
							if (MirInterRuntime.config.agent_domain === "agent.ijunhai.com") {
								//不处理
							} else {
								if (MirInterRuntime.h5_config.jh_config.domian === "https://agent.ijunhai.com" || MirInterRuntime.h5_config.jh_config.domian === "http://agent.ijunhai.com"){
									MirInterRuntime.h5_config.jh_config.domian = "https://" + MirInterRuntime.config.agent_domain;
									MIR.h5_config.jh_config.domian = "https://" + MirInterRuntime.config.agent_domain;
								}
							}
						} catch (e) {

						}
						// alert(JSON.stringify(return_message));
						callback(obj);
					}, data);

				}catch(e){
					// alert(e.message);
					console.log(e.message);
					var return_message = {
						"ret": 0,
						"msg": "遍历Mir属性出错",
						"content": {}
					}
					// alert(JSON.stringify(return_message));
					callback(return_message);
				}
			}else{
				// alert(JSON.stringify(return_message));
				callback(return_message);
				return;
			}
		});
	});

	MirInterRuntime.getAppType = (function(){
		//检测是否微端或者h5
		var mirror_js = MirInterRuntime.utils.getUrlParam('mirror_js_name');
			if(!mirror_js){
					
					//判断是否有玩吧注入的全局变量
					if(window.OPEN_DATA){
						mirror_js = "hqqzone";
						var type = 'qqzone';
						return type;
					}
					//若不是QQzone,是微端
					var type = 'micro';
					return type;
					
			}else{
					var type = 'h5';
					return type;
			}
	});

	MirInterRuntime.getDevicesSystem = (function(){
					//检测微端是否安卓还是ios
					var u = navigator.userAgent;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

					if(true === isiOS){
						var type = 'ios';
						return type;
					}else{
						var type = 'android';
						return type;
					}
	});

	return MirInterRuntime;
})();
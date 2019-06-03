let langConfig = require("./../lang/extension.js").Lang.panel;
//面板的语言包
function getPanelLang(index) {
    return langConfig[index][langIndex];
}

function lang(text) {
    var res;
    if (arguments.length < 2) {
        res = text;
    } else {
        for (var i = 0, n = arguments.length; i < n; i++) {
            text = text.replace("{" + i + "}", arguments[i + 1]);
        }
        res = text;
    }
    return res;
}



// const {spawn} = require("child_process");
const child_process = require("child_process");
const spawn = child_process.spawn;
const { remote, ipcRenderer } = require("electron");
const {shell} = require('electron');
const path = require("path");
const fs = require("fs");
const PfSelVal = ["web", "wxgame", "qqwanyiwan", "bdgame", "xmgame"]; // 将要发布到的文件夹
const DftJsonType = "json,atlas,ls,lh,lmat,lav";
const KeyStore = "pub2Obj";
// const PathPubSet = path.join(workspacePath, ".laya", "pubset.json");
const dive = require("dive");
const jQuery = require("jquery");
let _pathModule = path;

let 
	workspacePath,
	proType,
	langIndex,
	projectVersion,
	envPATH,
	mainRenderId;
let 
	PathPubSet;
new Promise((resolve, reject) => {
	let 
		initParamsStr = sessionStorage.getItem("initparams"),
		initParamsObj;
	if (initParamsStr) {
		try {
			initParamsObj = JSON.parse(initParamsStr);
			resolve(initParamsObj);
			return;
		} catch(e) {
			initParamsObj = null;
			alert("初始化信息丢失，请重新打开发布窗口!");
		}
	}
	ipcRenderer.on("codemain:init", (event, params) => {
		resolve(params);
	});
}).then((params) => {
	sessionStorage.setItem("initparams", JSON.stringify(params));
	workspacePath = params.workspacePath;
	proType = params.protype;
	langIndex = params.langindex;
	projectVersion = params.projectVersion;
	envPATH = params.envPATHStr;
	mainRenderId = params.mainRenderId;
	PathPubSet = path.join(workspacePath, ".laya", "pubset.json");
	console.log(workspacePath, proType, langIndex, projectVersion, envPATH);
	if (process.platform === 'darwin' && envPATH) {
		process.env.PATH = envPATH;
	}
	init();
});

function init() {
	initPanelLang();
	initPanel();

	let pub2Obj = getStorageItem();
	let pf = pub2Obj.pf || 0;
	selPf.selectedIndex = pf;
	setPanel(pf, pub2Obj[pf]);

	// 是否重新生成小米快游戏项目，如果该项目已经存在了，显示该项
    if (pub2Obj[4] && pub2Obj[4].xmInfo && pub2Obj[4].xmInfo.projName) {
        let xmProjName = path.join(workspacePath, "release", "xmgame", pub2Obj[4].xmInfo.projName);
        let isXMProjExists = fs.existsSync(xmProjName + "/node_modules") && fs.existsSync(xmProjName + "/sign") && fs.existsSync(xmProjName + "/src");
        if (isXMProjExists) {
            xm_useExistProj.style.display = "block";
        }
    }

	// 发布平台select
	selPf.onchange = function(e) {
		pub2Obj = getStorageItem();
		pf = selPf.selectedIndex;
		setPanel(pf, pub2Obj[pf]);
    }

	// 源根目录
    btnBrowseSrc.onmousedown = function(e) {
        remote.dialog.showOpenDialog({
			properties: ["openDirectory", 'createDirectory'],
			defaultPath: inputSrcDir.value
        }, function(p) {
            if (p) {
                inputSrcDir.value = p[0];
            }
		});
    }

	// 发布目录
    btnBrowsePub.onmousedown = function(e) {
        remote.dialog.showOpenDialog({
			properties: ["openDirectory", 'createDirectory'],
			defaultPath: inputPubDir.value
        }, function(p) {
            if (p) {
                inputPubDir.value = p[0];
            }
        });
    }

	// 排除压缩
	// 相对于源根目录
    btnBrowseEx.onmousedown = function(e) {
		let 
			oldValueList = inputExDir.value.trim() ? inputExDir.value.split(';') : [],
			prefix = inputSrcDir.value;
		oldValueList = oldValueList.map(function(item, index, list) {
			return _pathModule.join(prefix, item);
		});
		let params = {
			oldValueList: oldValueList
		};
		showExplorertreePanel(params, function(arr) {
			inputExDir.value = '';
			let 
				pv,
				rootPath = inputSrcDir.value, // 源根目录
				pathRelativeStr;
			for (let i = 0; i < arr.length; i++) {
				pv = arr[i];
				let exValue = inputExDir.value;
				pathRelativeStr = path.relative(rootPath, pv);
				pathRelativeStr = pathRelativeStr ? pathRelativeStr : '.'; // 如果 from 和 to 是同一路径，赋值为本路径，而不是空
				if (!pv) {
					break;
				}
				inputExDir.value += exValue ? ";" + pathRelativeStr : pathRelativeStr;
			}
		});
        // remote.dialog.showOpenDialog({
        //     properties: ["openDirectory", 'createDirectory']
        // }, function(p) {
        //     if (p) {
        //     	let pv = p[0];
        //     	let exValue = inputExDir.value;
        //     	if (-1 === exValue.indexOf(pv)) {
        //         	inputExDir.value += pv + ";";
        //     	}
        //     }
		// });
	}
	
	// 复制文件列表
	// 脚本路径，相对于源根目录
	btnBrowseCopyDir.onmousedown = function(e) {
		let 
			oldValueList = inputExCopyDir.value.trim() ? inputExCopyDir.value.split(';') : [],
			prefix = inputSrcDir.value;
		oldValueList = oldValueList.map(function(item, index, list) {
			return _pathModule.join(prefix, item);
		});
		let params = {
			oldValueList: oldValueList
		};

		showExplorertreePanel(params, function(p) {
			inputExCopyDir.value = '';
			let 
				length = p.length,
				rootPath = inputSrcDir.value, // 源根目录
				pathStr,
				pathRelativeStr,
				oldValueList;
			for (let i = 0; i < length; i++) {
				pathStr = p[i];
				if (!pathStr) {
					break;
				}
				pathRelativeStr = path.relative(rootPath, pathStr);
				pathRelativeStr = pathRelativeStr ? pathRelativeStr : '.'; // 如果 from 和 to 是同一路径，赋值为本路径，而不是空
				oldValueList = inputExCopyDir.value.split(';');
				inputExCopyDir.value += inputExCopyDir.value ? ';' + pathRelativeStr : pathRelativeStr;
			}
		});
        // remote.dialog.showOpenDialog({
        //     properties: ['openDirectory', 'multiSelections', 'createDirectory']
        // }, function(p) {
        //     if (p) {
		// 		let 
		// 			length = p.length,
		// 			rootPath = inputSrcDir.value, // 源根目录
		// 			pathStr,
		// 			pathRelativeStr,
		// 			oldValueList;
		// 		for (let i = 0; i < length; i++) {
		// 			pathStr = p[i];
		// 			// 如果不是同一盘符，不写入
		// 			if (path.parse(rootPath).root.toLocaleLowerCase() !== path.parse(pathStr).root.toLocaleLowerCase()) {
		// 				alert(getPanelLang(281));
		// 				return;
		// 			}
		// 			pathRelativeStr = path.relative(rootPath, pathStr);
		// 			pathRelativeStr = pathRelativeStr ? pathRelativeStr : '.'; // 如果 from 和 to 是同一路径，赋值为本路径，而不是空
		// 			console.warn('relative path', rootPath, pathStr, pathRelativeStr);
		// 			oldValueList = inputExCopyDir.value.split(';');
		// 			if (-1 === oldValueList.indexOf(pathRelativeStr)) { // 如果目前的路径中没有该路径，添加到input
		// 				inputExCopyDir.value += inputExCopyDir.value ? ';' + pathRelativeStr : pathRelativeStr;
		// 			}
		// 		}
				
		// 	}
        // });
	}
	
	// 复制文件到
	btnBrowseCopyTo.onmousedown = function(e) {
        remote.dialog.showOpenDialog({
			properties: ["openDirectory", 'createDirectory'],
			defaultPath: inputExCopyTo.value
        }, function(p) {
            if (p) {
                inputExCopyTo.value = p[0];
            }
        });
	}
	
	// 后续执行脚本
	btnBrowseScript.onmousedown = function(e) {
        remote.dialog.showOpenDialog({
			properties: ["openFile", 'createDirectory'],
			defaultPath: inputExScript.value
        }, function(p) {
            if (p) {
                inputExScript.value = p[0];
            }
        });
	}

	btnPub.onclick = function() {
		// 如果重新编译，编译成功之后调用ww的方法
		let isReCompile = recompile.checked;
		if (isReCompile) { // 重新编译
			showWaiting(true);
			ipcRenderer.on("codemain:compile", (event, params) => {
				let isSuccess = params.isSuccess;
				if (isSuccess) {
					publish();
				} else {
					alert("编译过程中有报错，请确认!(code 1)");
				}
			});
			ipcRenderer.sendTo(mainRenderId, "publishpro2:compile");
		} else {
			publish();
		}
	}

	btnOpen.onclick = function() {
		console.log("btnOpen onclicked.");
		shell.openExternal('file://' + inputPubDir.value);
	}

	linkHelp.onclick = function() {
		shell.openExternal("https://ldc.layabox.com/doc/?nav=zh-as-2-0-4");
	}

	howToUse.onclick = function() {
		shell.openExternal("https://ldc.layabox.com/doc/?nav=zh-as-2-0-5");
	}
}

function walk(path, floor, arrList, oldValueList) {
	floor++;
	var files = fs.readdirSync(path);
	files.forEach(function(item) {
		var tmpPath = _pathModule.join(path, item);
		if (tmpPath.indexOf(".svn") > -1)
			return;
		if (tmpPath.indexOf(".git") > -1)
			return;
		if (tmpPath.indexOf(".laya") > -1)
			return;
		var stats = fs.statSync(tmpPath);
		let isChecked = Array.isArray(oldValueList) && oldValueList.indexOf(tmpPath) !== -1;
		let pathObj = { // node节点初始化数据
			text: item,
			path: tmpPath
		};
		if (isChecked) {
			pathObj.state = {
				'opened' : true,
				'selected' : true
			  }
		}
		if (stats.isDirectory()) {
			pathObj["li_attr"] =  {
				"data-type": "dir"
			};
			pathObj.children = [];
			arrList.push(pathObj);
			walk(tmpPath, floor, pathObj.children, oldValueList);
		} else {
			pathObj["li_attr"] =  {
				"data-type": "file"
			};
			arrList.push(pathObj);
		}
	});
}
/**获取页面列表*/
function getFileList(path, oldValueList) {
	var arr = [];
	if(!path || !fs.existsSync(path)) return arr;
	walk(path, 0, arr, oldValueList);
	return arr;
}

// 显示文件、文件夹panel
function showExplorertreePanel(info, cb) {
	let 
		oldValueList = info.oldValueList;
	let sourceDir = inputSrcDir.value;
	let selectedList = oldValueList;
	let jstreeData = getFileList(sourceDir, oldValueList);
	let jstreeOpt = {
		"plugins": [ "wholerow", "checkbox" ],
		"core": {
			"data": jstreeData,
			"multiple" : true,
		}
	};
	jQuery(".jstree-title").text(`目录: ${sourceDir}`);
	jQuery(".jstree-wrapper")[0].style.display = "flex";
	jQuery(".jstree-ok").one("click", function() {
		jQuery(".jstree-wrapper")[0].style = "";
		jQuery.jstree.destroy ()
		cb instanceof Function && cb(selectedList);
	});
	jQuery(".jstree-cancel").one("click", function() {
		jQuery.jstree.destroy ()
		jQuery(".jstree-wrapper")[0].style = "";
	});
	jQuery("#jstree")
		.off('changed.jstree')
		.on('changed.jstree', function (e, data) {
			var i, length, nodeIns, nodePath, parentIns, parentId;
			selectedList = [];
			// console.log(data);
			for(i = 0, length = data.selected.length; i < length; i++) {
				nodeIns = data.instance.get_node(data.selected[i]);
				parentId = nodeIns.parent;
				parentIns = data.instance.get_node(parentId);
				if (parentIns.state.selected) { // 父元素被选中，则所有子元素都会被选中
					continue;
				}
				nodePath = nodeIns.original.path;
				selectedList.push(nodePath);
			}
		})
		.jstree(jstreeOpt);
}

function initPanelLang() {
	document.title = getPanelLang(464);
	spanPf.innerHTML = getPanelLang(247);
	setSelPfOpts();
	imgHelp.title = getPanelLang(251);
	spanSrcDir.innerHTML = getPanelLang(252);
	inputSrcDir.placeholder = getPanelLang(253);
	btnBrowseSrc.innerHTML = getPanelLang(22);
	spanPubDir.innerHTML = getPanelLang(254);
	inputPubDir.placeholder = getPanelLang(255);
	btnBrowsePub.innerHTML = getPanelLang(22);
	spanExDir.innerHTML = getPanelLang(256);
	inputExDir.placeholder = getPanelLang(257);
	btnBrowseEx.innerHTML = getPanelLang(22);
	btnBrowseCopyDir.innerHTML = getPanelLang(22); // 浏览
	btnBrowseCopyTo.innerHTML = getPanelLang(22); // 浏览
	btnBrowseScript.innerHTML = getPanelLang(22); // 浏览
	spanrecompile.innerHTML = getPanelLang(364); // 是否重新编译项目
	// spanreWXOpenZone.innerHTML = getPanelLang(365); // 是否为微信开放数据域项目
	spanMergeJs.innerHTML = getPanelLang(258);
	spanonlyIndexJS.innerHTML = getPanelLang(366); // 是否只复制index.html内引用的js文件（其他js文件将忽略）
	spanCompressPng.innerHTML = getPanelLang(259);
	spanQualityPngLow.innerHTML = getPanelLang(260);
	spanQualityPngHigh.innerHTML = getPanelLang(261);
	spanCompressJpg.innerHTML = getPanelLang(262);
	spanQualityJpg.innerHTML = getPanelLang(263);
	spanCompressJson.innerHTML = getPanelLang(264);
	spanSuffix.innerHTML = getPanelLang(265);
	spanCompressJs.innerHTML = getPanelLang(266);
	spanEnableVer.innerHTML = getPanelLang(267);
	spandeleteOldVersionFile.innerHTML = getPanelLang(367); // 是否删除旧的资源文件（启用资源版本管理后生效）
	howToUse.innerHTML = getPanelLang(268);
	spanCopyDir.innerHTML = getPanelLang(368); // 复制文件列表
	spanCopyDirTo.innerHTML = getPanelLang(369); // 复制文件到哪
	spanWxScript.innerHTML = getPanelLang(370); // 后续执行脚本
	compressingId.innerHTML = getPanelLang(374); // 压缩资源
	versionId.innerHTML = getPanelLang(375); // 版本管理
	extractId.innerHTML = getPanelLang(376); // 文件提取
	inputExCopyDir.placeholder = getPanelLang(371); // 需要复制的文件及文件夹，相对于源根目录
	inputExCopyTo.placeholder = getPanelLang(372); // 复制文件到某个文件夹，如果没有可以留空
	inputExScript.placeholder = getPanelLang(373); // 自定义的命令行脚本路径
	btnPub.innerHTML = getPanelLang(116);
	spanWaiting.innerHTML = getPanelLang(269);
	spanResult.innerHTML = getPanelLang(270);
	btnOpen.innerHTML = getPanelLang(271);
	// 小米快游戏
	xm_quickgame.innerHTML = getPanelLang(520); // 小米快游戏配置
	xm_name.getElementsByTagName("span")[0].innerHTML = getPanelLang(497); // 应用名称
    xm_name.getElementsByTagName("span")[0].title = getPanelLang(498); // 应用名称，6 个汉字以内，与应用商店保存的名称一致，用于在桌面图标、弹窗等处显示应用名称
    xm_name.getElementsByTagName("input")[0].placeholder = getPanelLang(498); // 应用名称，6 个汉字以内，与应用商店保存的名称一致，用于在桌面图标、弹窗等处显示应用名称
    xm_projName.getElementsByTagName("span")[0].innerHTML = getPanelLang(508); // 项目名称
    xm_projName.getElementsByTagName("span")[0].title = getPanelLang(509); // 项目名称，只能输入英文字母，30个字母以内
    xm_projName.getElementsByTagName("input")[0].placeholder = getPanelLang(509); // 项目名称，只能输入英文字母，30个字母以内
    xm_package.getElementsByTagName("span")[0].innerHTML = getPanelLang(499); // 包名
    xm_package.getElementsByTagName("span")[0].title = getPanelLang(500); // 应用包名，推荐采用 com.company.module 的格式
    xm_package.getElementsByTagName("input")[0].placeholder = getPanelLang(500); // 应用包名，推荐采用 com.company.module 的格式
    xm_icon.getElementsByTagName("span")[0].innerHTML = "icon"; // icon
    xm_icon.getElementsByTagName("span")[0].title = getPanelLang(501); // 应用图标，提供 192x192 大小的即可
    xm_icon.getElementsByTagName("input")[0].placeholder = getPanelLang(501); // 应用图标，提供 192x192 大小的即可
    xm_versionName.getElementsByTagName("span")[0].innerHTML = getPanelLang(502); // 版本名称
    xm_versionName.getElementsByTagName("span")[0].title = getPanelLang(503); // 应用版本名称，如："1.0"
    xm_versionName.getElementsByTagName("input")[0].placeholder = getPanelLang(503); // 应用版本名称，如："1.0"
    xm_versionCode.getElementsByTagName("span")[0].innerHTML = getPanelLang(504); // 版本号
    xm_versionCode.getElementsByTagName("span")[0].title = getPanelLang(505); // 应用版本号，从1自增，推荐每次重新上传包时versionCode+1
    xm_versionCode.getElementsByTagName("input")[0].placeholder = getPanelLang(505); // 应用版本号，从1自增，推荐每次重新上传包时versionCode+1
    xm_minPlatformVersion.getElementsByTagName("span")[0].innerHTML = getPanelLang(506); // 最小平台号
    xm_minPlatformVersion.getElementsByTagName("span")[0].title = getPanelLang(507); // 支持的最小平台版本号，兼容性检查，避免上线后在低版本平台运行并导致不兼容；如果不填按照内测版本处理
    xm_minPlatformVersion.getElementsByTagName("input")[0].placeholder = getPanelLang(507); // 支持的最小平台版本号，兼容性检查，避免上线后在低版本平台运行并导致不兼容；如果不填按照内测版本处理
    xm_useReleaseSign.getElementsByTagName("span")[0].innerHTML = getPanelLang(510); // 是否使用正式版签名
    xm_useReleaseSign.getElementsByClassName("hint-text")[0].innerHTML = getPanelLang(515); // 1. 已经生成过签名，请将签名文件放到根目录 sign 文件夹中。
    xm_useReleaseSign.getElementsByClassName("hint-text")[1].innerHTML = getPanelLang(516); // 2. 如果还没有生成过签名，可以自己生成签名文件，并放置到项目根目录 sign 文件夹中。
    xm_useReleaseSign.getElementsByClassName("hint-text")[2].innerHTML = getPanelLang(517); // 3. 也可以选中下面的“生成release签名”选项，并填写对应信息，IDE将会生成签名文件并放置到项目根目录 sign 文件夹中。
	xm_useExistProj.getElementsByTagName("span")[0].innerHTML = getPanelLang(519); // 是否使用即存的小米快游戏项目
	xm_generateSign_title.innerHTML = getPanelLang(521); // 生成release签名
	xm_generateSign.getElementsByTagName("span")[0].innerHTML = getPanelLang(521); // 生成release签名
}

function setSelPfOpts() {
	let opts = [getPanelLang(248), getPanelLang(249), getPanelLang(250), getPanelLang(377), getPanelLang(496)];
	let len = selPf.options.length;
	for (let i = 0; i < len; ++i) {
		selPf.options[i].innerHTML = opts[i];
	}
}

function publish() {
	let info = restorePanelInfo();
	if (!info) {
		return;
	}
	showWaiting(true);

	preCompile(function() {
		const paramFilePath = generatePackParamFile();
		exePack(paramFilePath, function(ret) {
			if ("as" === proType && selPf.selectedIndex==2) {
				const pathSrc = path.join(getCrtSrcPath(), "LayaUISample.max.js");
				const pathDest = path.join(workspacePath, ".laya", "LayaUISample.max.js");
				if (fs.existsSync(pathDest)) {
					fs.renameSync(pathDest, pathSrc);
				}
				const pathFile = path.join(getCrtSrcPath(), "laya.js");
				if (fs.existsSync(pathFile)) {
					fs.unlinkSync(pathFile);
				}
			}
			//showWaiting(false);
			if (ret) {
				alert("运行过程中有报错，请确认(code 4)：" + ret);
			} else {
				dataOutput("发布成功！");
			}
		});
	});
}

function preCompile(cb) {
	cb && cb();
		return;
	if ("as" !== proType || selPf.selectedIndex!==2) { // as项目，QQ玩一玩
		cb && cb();
		return;
	}
	const pathSrc = path.join(getCrtSrcPath(), "LayaUISample.max.js");
	const pathDest = path.join(workspacePath, ".laya", "LayaUISample.max.js");
	if (fs.existsSync(pathSrc)) {
		fs.renameSync(pathSrc, pathDest);
	}

	compilePro(function() {
		cb && cb();
	});
}

function compilePro(cb) {
	let ret = 0;
	let pathLayajs = path.join(workspacePath, ".laya", "astool", "layajs");
	if (!fs.existsSync(pathLayajs)) {
		pathLayajs = path.join(workspacePath, ".laya", "layajs");
	}
	let args = [path.join(workspacePath, ".actionScriptProperties") + ";iflash=false;windowshow=false;chromerun=false;quickcompile=true;outlaya=true"];
	let layajs = spawn(pathLayajs, args);

	layajs.stdout.on('data', function (data) {
		console.log(`stdout: ${data}`);
	});

	layajs.stderr.on('data', function (data) {
		console.log(`stderr: ${data}`);
		ret = 1;
	});

	layajs.on('close', function (code) {
		console.log(`child process exited with code ${code}`);
		ret = code;
		cb && cb(code);
	});
	return ret;
}

function initPanel() {
	showWaiting(false);
	// inputSrcDir.value = panelInfo.sourcePath || path.join(workspacePath, "src");
	// inputPubDir.value = panelInfo.outPath || path.join(workspacePath, "bin");
}

function getStorageItem() {
	if (!fs.existsSync(PathPubSet)) {
		return {};
	}

	let fileContent = fs.readFileSync(PathPubSet);
	// let pub2Obj = localStorage.getItem(KeyStore);
	let pub2Obj = fileContent ? JSON.parse(fileContent) : {};
	return pub2Obj;
}

function getPackModPath() {
	return path.join(remote.app.getAppPath(), "out", "layarepublic", "LayaAirProjectPack", "LayaAirProjectPack.max.js");
}

function getPackParamFilePath() {
	return path.join(remote.app.getPath("userData"), "pubParam.json");
}

function getParamObj() {
	let ret = {};
	ret.sourcePath = inputSrcDir.value;
	ret.outPath = inputPubDir.value;
	ret.pngQualityLow = inputCompressPngLow.value;
	ret.pngQualityHigh = inputCompressPngHigh.value;
	ret.jpgQuality = Number(inputCompressJpg.value) > 84 ? inputCompressJpg.value : '84';
	ret.mergeJs = cbMergeJs.checked;
	// ret.isWXOpenZone = isWXOpenZone.checked;
	ret.compressPng = cbCompressPng.checked;
	ret.compressJpg = cbCompressJpg.checked;
	ret.compressJson = cbCompressJson.checked;
	ret.jsontypes = inputJsonTypes.value;
	ret.compressJs = cbCompressJs.checked;
	ret.enableVersion = cbEnableVer.checked;
	ret.onlyIndexJS = onlyIndexJS.checked; // 是否只复制index.html中引用的js文件
	ret.deleteOldVersionFile = deleteOldVersionFile.checked; // 是否删除老版本的文件
	ret.recompile = recompile.checked;
	ret.excludeFiles = inputExDir.value;
	ret.publishType = selPf.selectedIndex;
	ret.projectType = proType;
	ret.copyOutFiles = inputExCopyDir.value;
	ret.copyOutPath = inputExCopyTo.value;
	ret.userCmd = inputExScript.value;

	// 小米快游戏
    if (selPf.selectedIndex === 4) {
		if (!ret.outPath.includes("temprelease")) {
			ret.outPath = path.join(ret.outPath, "temprelease");
		}
        let 
            name = xm_name.getElementsByTagName("input")[0].value,
            projName = xm_projName.getElementsByTagName("input")[0].value,
            package = xm_package.getElementsByTagName("input")[0].value,
            icon = xm_icon.getElementsByTagName("input")[0].value,
            versionName = xm_versionName.getElementsByTagName("input")[0].value,
            versionCode = xm_versionCode.getElementsByTagName("input")[0].value,
            minPlatformVersion = xm_minPlatformVersion.getElementsByTagName("input")[0].value,
			useReleaseSign = xm_useReleaseSign.getElementsByTagName("input")[0].checked;
			useExistProj = xm_useExistProj.getElementsByTagName("input")[0].checked;
        if (!name) {
            xm_name.getElementsByTagName("input")[0].className = "input error-input";
            return;
        }
        if (!projName) {
            xm_projName.getElementsByTagName("input")[0].className = "input error-input";
            return;
        }
        if (!package) {
            xm_package.getElementsByTagName("input")[0].className = "input error-input";
            return;
        }
        if (!icon) {
            xm_icon.getElementsByTagName("input")[0].className = "input error-input";
            return;
        }
        if (!versionName) {
            xm_versionName.getElementsByTagName("input")[0].className = "input error-input";
            return;
        }
        if (!versionCode) {
            xm_versionCode.getElementsByTagName("input")[0].className = "input error-input";
            return;
        }
        // 不需要检查最小平台号，不填按照内测版本处理
        ret.xmInfo = {
            name: name,
            projName: projName,
            package: package,
            icon: icon,
            versionName: versionName,
            versionCode: versionCode,
            minPlatformVersion: minPlatformVersion,
			useReleaseSign: useReleaseSign,
			useExistProj: useExistProj
        };

        // 签名
        let 
            generateSign = xm_generateSign.getElementsByTagName("input")[0].checked,
            countryName = xm_countryName.getElementsByTagName("input")[0].value,
            provinceName = xm_provinceName.getElementsByTagName("input")[0].value,
            localityName = xm_localityName.getElementsByTagName("input")[0].value,
            orgName = xm_orgName.getElementsByTagName("input")[0].value,
            orgUnitName = xm_orgUnitName.getElementsByTagName("input")[0].value,
            commonName = xm_commonName.getElementsByTagName("input")[0].value,
            emailAddr = xm_emailAddr.getElementsByTagName("input")[0].value;
        if (generateSign) { // 生成sign
            if (!countryName) {
                xm_countryName.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
            if (!provinceName) {
                xm_provinceName.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
            if (!localityName) {
                xm_localityName.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
            if (!orgName) {
                xm_orgName.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
            if (!orgUnitName) {
                xm_orgUnitName.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
            if (!commonName) {
                xm_commonName.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
            if (!emailAddr) {
                xm_emailAddr.getElementsByTagName("input")[0].className = "input error-input";
                return;
            }
        }
        ret.xmSign = {
            generateSign: generateSign,
            countryName: countryName,
            provinceName: provinceName,
            localityName: localityName,
            orgName: orgName,
            orgUnitName: orgUnitName,
            commonName: commonName,
            emailAddr: emailAddr
        };
    }
	return ret;
}

function getDftHtmlDir() {
	let ret = "";
	switch (proType) {
		case "as":
			if (projectVersion && Number(projectVersion.substr(0, 1)) && Number(projectVersion.substr(0, 1)) >= 2) {
				ret = path.join(workspacePath, "bin");
			} else {
				ret = path.join(workspacePath, "bin", "h5"); 
			}
			break;
		case "js":
		case "ts":
			ret = path.join(workspacePath, "bin");
			break;
		default:
			console.log("Unexpected Project Type: " + proType);
	}
	return ret;
}

function getDftPublicDir(pf) {
	return path.join(workspacePath, "release", PfSelVal[pf]);
}

function setPanel(pf, panelInfo) {
	// 是否隐藏小米快游戏选项
    if (pf === 4) {
		xm_quickgame.style.display = "block";
		xm_quickgame_wrapper.style.display = "block";
		xm_generateSign_title.style.display = "block";
		xm_generateSign.style.display = "block";
		xm_generateSign_wrapper.style.display = "block";
    } else {
		xm_quickgame.style.display = "none";
		xm_quickgame_wrapper.style.display = "none";
		xm_generateSign_title.style.display = "none";
		xm_generateSign.style.display = "none";
		xm_generateSign_wrapper.style.display = "none";
	}

	if (pf === 4) {
		updatePublishJS();
	}
	
	if (!panelInfo) {
		if (pf === 1 || pf === 3 || pf === 4) { // 微信小游戏 || 百度小游戏
			cbMergeJs.checked = true; // 这里和2.0不一致，1.0必须选择
			cbMergeJs.disabled = true;
			// cbMergeJs.parentElement.parentElement.style.display = "block";
			// isWXOpenZone.checked = false;
			// isWXOpenZone.parentElement.parentElement.style.display = "block";
		} else {
			cbMergeJs.checked = false;
			cbMergeJs.disabled = false;
			// cbMergeJs.parentElement.parentElement.style.display = "block";
			// isWXOpenZone.checked = false;
			// isWXOpenZone.parentElement.parentElement.style.display = "none";
		}
	
		inputSrcDir.value = getDftHtmlDir();
		inputPubDir.value = getDftPublicDir(pf);
		inputJsonTypes.value = DftJsonType;
		return;
	}

	// selPf.value = panelInfo.pf;
	// inputSrcDir.value = panelInfo.sourcePath;
	// inputPubDir.value = panelInfo.outPath;
	if (pf === 1 || pf === 3 || pf === 4) { // 微信小游戏 || 百度小游戏
		cbMergeJs.checked = true; // 这里和2.0不一致，1.0必须选择
		cbMergeJs.disabled = true;
		// cbMergeJs.parentElement.parentElement.style.display = "block";
		// isWXOpenZone.checked = panelInfo.isWXOpenZone;
		// isWXOpenZone.parentElement.parentElement.style.display = "block";
	} else {
		cbMergeJs.checked = panelInfo.mergeJs;
		cbMergeJs.disabled = false;
		// cbMergeJs.parentElement.parentElement.style.display = "block";
		// isWXOpenZone.checked = false;
		// isWXOpenZone.parentElement.parentElement.style.display = "none";
	}
	
	inputSrcDir.value = panelInfo.sourcePath || getDftHtmlDir();
	inputPubDir.value = panelInfo.outPath || getDftPublicDir(pf);
	inputCompressPngLow.value = panelInfo.pngQualityLow;
	inputCompressPngHigh.value = panelInfo.pngQualityHigh;
	inputCompressJpg.value = panelInfo.jpgQuality;
	// cbForce.checked = panelInfo.force;
	cbCompressPng.checked = panelInfo.compressPng;
	cbCompressJpg.checked = panelInfo.compressJpg;
	cbCompressJson.checked = panelInfo.compressJson;
	inputJsonTypes.value = panelInfo.jsontypes || DftJsonType;
	cbCompressJs.checked = panelInfo.compressJs;
	cbEnableVer.checked = panelInfo.enableVersion;
	onlyIndexJS.checked = panelInfo.onlyIndexJS;
	deleteOldVersionFile.checked = panelInfo.deleteOldVersionFile;
	recompile.checked = panelInfo.recompile;
	inputExDir.value = panelInfo.excludeFiles;
	inputExCopyDir.value = panelInfo.copyOutFiles;
	inputExCopyTo.value = panelInfo.copyOutPath;
	inputExScript.value = panelInfo.userCmd;

	if (pf === 4) { // 小米快游戏，设置该平台特有的参数
        if (!panelInfo.xmInfo) {
            panelInfo.xmInfo = {};
        }
        if (!panelInfo.xmSign) {
            panelInfo.xmSign = {};
        }
        xm_name.getElementsByTagName("input")[0].value = panelInfo.xmInfo.name || "";
        xm_projName.getElementsByTagName("input")[0].value = panelInfo.xmInfo.projName || "";
        xm_package.getElementsByTagName("input")[0].value = panelInfo.xmInfo.package || "";
        xm_icon.getElementsByTagName("input")[0].value = panelInfo.xmInfo.icon || "";
        xm_versionName.getElementsByTagName("input")[0].value = panelInfo.xmInfo.versionName || "";
        xm_versionCode.getElementsByTagName("input")[0].value = panelInfo.xmInfo.versionCode || "";
        xm_minPlatformVersion.getElementsByTagName("input")[0].value = panelInfo.xmInfo.minPlatformVersion || "";
        xm_useReleaseSign.getElementsByTagName("input")[0].checked = panelInfo.xmInfo.useReleaseSign;
		xm_useExistProj.getElementsByTagName("input")[0].checked = panelInfo.xmInfo.useExistProj;
		if (panelInfo.xmInfo.useExistProj) {
            xm_projName.getElementsByTagName("input")[0].setAttribute("readonly", "readonly");
        }
        // 签名
        // xm_generateSign.getElementsByTagName("input")[0].checked = panelInfo.xmSign.generateSign; // 注释掉，默认不要创建签名
        xm_countryName.getElementsByTagName("input")[0].value = panelInfo.xmSign.countryName || "";
        xm_provinceName.getElementsByTagName("input")[0].value = panelInfo.xmSign.provinceName || "";
        xm_localityName.getElementsByTagName("input")[0].value = panelInfo.xmSign.localityName || "";
        xm_orgName.getElementsByTagName("input")[0].value = panelInfo.xmSign.orgName || "";
        xm_orgUnitName.getElementsByTagName("input")[0].value = panelInfo.xmSign.orgUnitName || "";
        xm_commonName.getElementsByTagName("input")[0].value = panelInfo.xmSign.commonName || "";
        xm_emailAddr.getElementsByTagName("input")[0].value = panelInfo.xmSign.emailAddr || "";
    }
}

/**
 * 检查publish.js是否需要更新
 * - 1.0 没有publish，检查是否有publish_xmgame.js
 */
function updatePublishJS() {
	// let isVersionPass = getCompareVersion("publish.js", "1.1.0"); // publish.js在1.1.0增加了对小米快游戏的支持，增加了仅发布index.js引用的类库选项
	let isVersionPass = fs.existsSync(path.join(workspacePath, ".laya", "publish_xmgame.js"));
    if (!isVersionPass) { // 比指定的版本小，拷贝最新的publish.js，并重命名旧的publish.js
        // let 
        //     oldPublishJSPath = path.join(workspacePath, ".laya", "publish.js"),
		// 	oldPublishJSNewNamePath = path.join(workspacePath, ".laya", `publish_${Date.now()}.js`);
		// if (fs.existsSync(oldPublishJSPath)) {
		// 	fs.renameSync(oldPublishJSPath, oldPublishJSNewNamePath);
		// }
        let 
            // IDEPublishJSPath = path.join(__dirname, "../", "../", "vs", "layaEditor", "laya", "code", proType, "empty", ".laya", "publish.js"),
            IDEXMPublishJSPath = path.join(__dirname, "../", "../", "codeextension", "createconfig", ".laya", "publish_xmgame.js"),
            // newPublishJSPath = path.join(workspacePath, ".laya", `publish.js`),
            newXMPublishJSPath = path.join(workspacePath, ".laya", `publish_xmgame.js`);
        // let content = fs.readFileSync(IDEPublishJSPath, "utf8");
        // fs.writeFileSync(newPublishJSPath, content, "utf8");
        content = fs.readFileSync(IDEXMPublishJSPath, "utf8");
		fs.writeFileSync(newXMPublishJSPath, content, "utf8");
		// 如果没有compile，拷贝compile.js
		// let 
		// 	IDECompileJSPath = path.join(__dirname, "../", "../", "vs", "layaEditor", "laya", "code", proType, "empty", ".laya", "compile.js"),
		// 	newCompileJSPath = path.join(workspacePath, ".laya", `compile.js`);
		// if (!fs.existsSync(newCompileJSPath)) {
		// 	content = fs.readFileSync(IDECompileJSPath, "utf8");
        // 	fs.writeFileSync(newCompileJSPath, content, "utf8");
		// }
        // alert(getPanelLang(514)); // 最新的publish.js增加了对小米快游戏的支持，IDE已将旧版本publish.js拷贝并重命名，如果您修改了旧版本publish.js的功能，请移植到新版本中
    }
}

/**
 * 如果文件中的version大于等于传过来的version，返回true
 * 其余返回false，包括文件中没有version
 */
function getCompareVersion(fileName, version) {
	let oldPublishJSPath = path.join(workspacePath, ".laya", fileName);
	if (!fs.existsSync(oldPublishJSPath)) {
		return false;
	}
    let content = fs.readFileSync(oldPublishJSPath, "utf8");
    let matchList = content.match(/^\s*\/\/\s*v(\d+)\.(\d+)\.(\d+)/);
    let compileMacthList = version.match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!Array.isArray(matchList)) {
        return false;
    }
    if (matchList[1] > compileMacthList[1]) {
        return true;
    }
    if (matchList[1] === compileMacthList[1] && matchList[2] > compileMacthList[2]) {
        return true;
    }
    if (matchList[1] === compileMacthList[1] && matchList[2] === compileMacthList[2] && matchList[3] >= compileMacthList[3]) {
        return true;
    }
    return false;
}

function getCrtSrcPath() {
	return inputSrcDir.value || getDftHtmlDir();
}

function generatePackParamFile() {
	const filePath = getPackParamFilePath();
	const paramObj = getParamObj();
	const fileContent = JSON.stringify(paramObj);
	fs.writeFileSync(filePath, fileContent);
	console.log(`发布选项:\n %c ${JSON.stringify(paramObj, null, 4)}`, "color: green;");
	return filePath;
}

function restorePanelInfo() {
	const pub2Obj = getStorageItem();
	const pf = selPf.selectedIndex;
	pub2Obj[pf] = getParamObj();
	// 检查是否所有的项都写完了
    if (!pub2Obj[pf]) {
        return;
    }
    // 检查是否通过所有选项检查
    let isPass = getPassCheck(pub2Obj[pf]);
    if (!isPass) {
        return;
    }
	pub2Obj["pf"] = pf;
	const infoStr = JSON.stringify(pub2Obj);
	try
	{
		fs.writeFileSync(PathPubSet, infoStr);
	}catch(e)
	{
		alert("写入文件失败,请将项目移到无空格无特殊字符以及无中文的目录再重试:"+PathPubSet)
	}
	// localStorage.setItem(KeyStore, infoStr);
	return pub2Obj;
}

/**
 * 是否通过发布前检查
 * - 小米快游戏，如果选择了使用release签名，1) 没有选择在IDE里生成签名， 2) 也没有在项目中发现sign文件，提醒开发者需要release签名
 * - 小米快游戏，如果选择了生成release签名，提示先将项目中的sign文件删掉，并提示开发者，一个项目需要保持同一个签名文件
 */
function getPassCheck(infoObj) {
    if (selPf.selectedIndex === 4 && infoObj.xmInfo.useReleaseSign) { // 小米快游戏，使用release签名
        let 
            privatePem = path.join(workspacePath, "sign", "private.pem"),
            certificatePem = path.join(workspacePath, "sign", "certificate.pem");
        let isSignExits = fs.existsSync(privatePem) && fs.existsSync(certificatePem);
        if (!infoObj.xmSign.generateSign && !isSignExits) { // 项目中没有签名，也没有重新生成签名
            alert(getPanelLang(512)); // 没有找到release签名文件，请拷贝签名文件到项目根目录 sign 文件夹中
            return false;
        }
        if (infoObj.xmSign.generateSign && isSignExits) { // 重新生成签名，项目中有签名文件
            alert(getPanelLang(513)); // 项目中已经存在release签名文件，不能重新生成
            return false;
        }
    }
    return true;
}

function exePack(paramFilePath, cb) {
	let ret = 0;
	if (!fs.existsSync(paramFilePath)) {
		ret = 1;
		alert("指定的参数文件不存在：" + paramFilePath);
		return ret;
	}
	const exePath = getPackModPath();
	// const LayaAirProjectPack = spawn("node", [exePath, 'paramFile=' + paramFilePath]);

	var LayaAirProjectPack = child_process.fork(exePath, ['paramFile=' + paramFilePath], {
		silent: true
	});

	let outputStr = "";
	LayaAirProjectPack.stdout.on('data', (data) => {
		outputStr += data + "";
		if (outputStr.indexOf('work done') !== -1) {
			filterInfo(outputStr);
			filterErrInfo(errOutputStr);
			cb && cb('');
		}
	});

	let errOutputStr = ""
	LayaAirProjectPack.stderr.on('data', (data) => {
		errOutputStr += data + "";
		console.log(`stderr: ${data}`);
	});

	LayaAirProjectPack.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		ret = code;
		filterInfo(outputStr);
		filterErrInfo(errOutputStr);
		cb && cb(code);
	});
}

function filterErrInfo(data) {
	if (!data) return;
	const dataLineArr = data.split("\n");
	for (let i = 0; i < dataLineArr.length; ++i) {
		filterErrLine(dataLineArr[i]);
	}
}

function filterErrLine(lineStr) {
	if (!lineStr) return;
	if (0 === lineStr.indexOf("[xmldom warning]")) {
		cmnOutput(lineStr);
	} else if (0 === lineStr.indexOf("@#[line:")) {
		cmnOutput(lineStr);
	} else {
		errOutput(lineStr);
	}
}

function filterInfo(data) {
	if (!data) return;
	clearText();
	const dataLineArr = data.split("\n");
	for (let i = 0; i < dataLineArr.length; ++i) {
		filterLine(dataLineArr[i]);
	}
}

function filterLine(lineStr) {
	if (!lineStr) return;
	if (0 === lineStr.indexOf("[DATA]")) {
		cmnOutput(lineStr);
	} else if (0 === lineStr.indexOf("[ERR]")) {
		errOutput(lineStr);
	} else if (0 === lineStr.indexOf("[PROGRESS]")) {
		cmnOutput(lineStr);
	} else {
		cmnOutput(lineStr);
	}
}

function dataOutput(msg) {
	appendText(msg, '#00FF00');
	console.log(msg);
}

function errOutput(msg) {
	appendText(msg, '#FF0000');
	console.log(msg);
}

function cmnOutput(msg) {
	console.log(msg);
}

function plainOutput(msg) {
	appendText(msg, '#FFFFFF');
	console.log(msg);
}

function appendText(info, color, size) {
	divResult.style.display="block";
	divWaiting.style.display = "none";
	size && (size = 14);
	spanResult.innerHTML += `<font color='${color}' size='${size}'>${info}</font><br/>`;
}

function clearText() {
	spanResult.innerHTML = "";
}

function showWaiting(isShow) {
	// divWaiting.innerText = "";
	if (isShow) {	
		divWaiting.style.display = "block";	
		(divBgWait.style.display === "none") && (divBgWait.style.display = "block");
	} else {
		(!divBgWait.style.display || (divBgWait.style.display === "block")) && (divBgWait.style.display = "none");
	}
}

/**
 * 小米快游戏 检测输入
 * - 只做了最基本的检测，点击“确定”按钮后要做更严格的检测
 */
function checkXMName() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^(.{0,6}).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMProjName() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^(\w{0,30}).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMPackage() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^([\w\.]*).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMVersionName() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^([\d\.]*).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMVersionCode() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^([\d]*).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMMinPFVer() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^([\d]*).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMCountry() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^([\da-zA-z]{0,2}).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function removeErr() {
    let target = event.target;
    // let value = target.value;
    // target.value = value.replace(/^([\da-zA-z]{0, 2}).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function checkXMEmail() {
    let target = event.target;
    let value = target.value;
    target.value = value.replace(/^([\w\.@]*).*$/g, "$1");
    if (target.className.includes("error-input")) {
        target.className = "input";
    }
}

function onChangeUseExistProj(e) {
    let target = event.target;
    let isChecked = target.checked;
    // 小米快游戏，如果使用即存项目，当选中时
	// 名称修改为原来的名称，并且不可改变
    let pubinfoObj = getStorageItem();
    let oldValue = pubinfoObj[4] && pubinfoObj[4].xmInfo && pubinfoObj[4].xmInfo.projName;
    if (isChecked) {
        if (oldValue) {
            xm_projName.getElementsByTagName("input")[0].value = oldValue;
        }
        xm_projName.getElementsByTagName("input")[0].setAttribute("readonly", "readonly");
    } else {
        xm_projName.getElementsByTagName("input")[0].removeAttribute("readonly");
    }
}

function onchangeGenerateSign() {
	let target = event.target;
	let isChecked = target.checked;
	if (isChecked) {
		xm_generateSign.className = xm_generateSign.className + " selected";
	} else {
		xm_generateSign.className = xm_generateSign.className.replace(" selected", "");
	}
}

function selectIcon() {
    let inputEle = xm_icon.getElementsByTagName("input")[0];
    let value = inputEle.value;
    remote.dialog.showOpenDialog({
        properties: ["openFile"],
        defaultPath: value,
        extensions: ['jpg', 'png', 'jpeg', 'gif']
    }, function(val) {
        if (val) {
            inputEle.value = val;
        }
	});
	if (inputEle.className.includes("error-input")) {
        inputEle.className = "input";
    }
}
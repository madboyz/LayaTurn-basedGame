function activate(context)
{
	var ___callback;
	window["_appversionsserver"] = null;
	getappversion("http://ldc.layabox.com/download/LayaAir/runtime/laya_native_config.json?")

	function cretePanel(localversion)
	{
		var popPanel = getElement("div", "menuPanel");
		var localversion = localversion;
		popPanel.style.zIndex = 1000;
		// popPanel.style.width ="402px";
		document.body.appendChild(popPanel);
		var viewPanel = getElement("div", "viewPanel", "", popPanel);
		var titleBackground = getElement("div", "titleBackground", codeMain.panel[149][langindex], viewPanel);
		__Layadrag(popPanel, titleBackground);
		var popPanelBackground = getElement("div", "content", "", viewPanel);
		popPanelBackground.style.width = "403px";
		var itemclassName = getElement("div", "item", "", popPanelBackground);
		var span = getElement("span", "", codeMain.menuList[118][langindex], itemclassName);
		var engineTypeVersion = getElement("select", "", "", itemclassName);
		var option = getElement("option");
		option.text = _appversionsserver.version;
		engineTypeVersion.add(option);
		var btndown = getElement("button", "itemButton", codeMain.panel[42][langindex], itemclassName);
		var loading = getElement("div", "item", "", popPanelBackground);
		var info = getElement("div", "", codeMain.getPanelLang(233), popPanelBackground);
		info.style.position = "absolute";
		info.style.bottom = "3px";
		info.style.width = "403px";
		info.style.textAlign = "center";
		var btnstep = getElement("button", "layaBtnCustum", codeMain.getPanelLang(209));
		var btnok = getElement("button", "layaBtnCustum", codeMain.panel[23][langindex]);
		if (fs.existsSync(path.join(__dirname, "laya_native_config.json")))
		{
			popPanelBackground.appendChild(btnstep)
			btnstep.style.position = "relative";
			btnstep.style.left = "145px";
			btnstep.onclick = function()
			{
				___callback()
			}
		}

		btndown.onclick = function(e)
		{
			btndown.blur();
			var request = require('request');
			var totalLen = 9999;
			var progress = 0;
			loading.parentNode && loading.parentNode.removeChild(loading);
			loading = getElement("div", "item", "", popPanelBackground);
			var loadingprogress = getElement("span", "", codeMain.panel[100][langindex], loading);
			loadingprogress.style.width = "60px"
			var loadingprogress = getElement("span", "", "" + (progress / totalLen).toFixed(3) + "%", loading);
			loadingprogress.style.width = "200px";
			loadingprogress.style.color = "rgb(76, 163, 234)"

			function downloadFile(uri, filename, callback)
			{
				codeMain.mkdirsSync(path.join(__dirname,"appversions"));
				var stream = fs.createWriteStream(filename);
				var layaresponse
				request(uri).on('error', function(err)
				{
					console.log("runtimeversiondown load err:" + err);
					loadingprogress.innerText = codeMain.panel[101][langindex]
					itemclassName.style.pointerEvents = "";
					itemclassName.style.opacity = 1;
					// if(!btnstep.parentNode)
					popPanelBackground.appendChild(btnstep)
					btnstep.style.position = "relative";
					btnstep.style.left = "145px";
					btnstep.onclick = function(err)
					{
						___callback()
					}
				}).on("data", function(data)
				{
					progress += data.length
					loadingprogress.innerText = "" + (progress / totalLen * 100).toFixed(3) + "%" + "";
				}).on("response", function(response)
				{
					if (btnstep.parentNode) btnstep.parentNode.removeChild(btnstep)
					layaresponse = response
					itemclassName.style.pointerEvents = "none";
					itemclassName.style.opacity = 1;
					totalLen = response.caseless.dict['content-length'];
				}).pipe(stream).on('close', function(e, ee, eeee)
				{
					if (layaresponse.statusCode == 200)
					{
						callback();
					}
					else
					{
						loadingprogress.innerText = codeMain.panel[101][langindex]
						itemclassName.style.pointerEvents = "";
						itemclassName.style.opacity = 1;
						// if(!btnstep.parentNode)
						popPanelBackground.appendChild(btnstep)
						btnstep.style.position = "relative";
						btnstep.style.left = "145px";
						btnstep.onclick = function(e)
						{
							___callback()
						}
					}
				});
			}
			var downurl = _appversionsserver.url;
			var exezippath = path.join(__dirname, "appversions", _appversionsserver.version + ".zip");
			downloadFile(downurl, exezippath, function()
			{
				loadingprogress.innerText = codeMain.panel[102][langindex];
				var dirzip = path.dirname(__dirname);
				dirzip = path.dirname(dirzip);
				dirzip = path.join(dirzip, "vs", "layaEditor", "libs", "RuntimePackTools");
				if (process.platform === 'darwin')
				{
					childProcess.exec("rm -r " + "\"" + dirzip + "\"", function()
					{
						layaUnzipFileHandler(exezippath, dirzip, function(e)
						{
							overHandler();
						},function(ee){
							console.log("asdasd")
						})
					})
				}
				else
				{
					childProcess.exec("rd /s /q " + "\"" + dirzip + "\"", function(e)
					{
						layaUnzipFileHandler(exezippath, dirzip, function()
						{
							overHandler();
						})
					});
				}

				console.log(downurl + '下载完毕');


			});

			function overHandler()
			{
				loading.parentNode.removeChild(loading)
				if (popPanel.parentNode)
				{
					___callback();
					document.body.removeChild(popPanel);
					localversion.version = _appversionsserver.version;
					if (localversion.local.indexOf(_appversionsserver.version) == -1)
					{
						localversion.local.unshift(_appversionsserver.version);
					}
					fs.writeFileSync(path.join(__dirname, "laya_native_config.json"), JSON.stringify(localversion));
					itemclassName.style.pointerEvents = "";
					itemclassName.style.opacity = 1;
				}
				else
				{

				}
			}
		}

		function getElement(type, className, innertext, parent)
		{
			var div = document.createElement(type);
			if (className) div.setAttribute("class", className);
			if (innertext) div.innerText = innertext;
			if (parent) parent.appendChild(div);
			return div
		}
		var closeBtn = getElement("div", "closeBtn", "×", viewPanel);
		closeBtn.onclick = function()
		{
			document.body.removeChild(popPanel);
		}
		return popPanel;
	}

	function getappversion(url)
	{
		var versionConfig = new XMLHttpRequest();
		var configVersion;
		versionConfig.open("GET", url + Math.random());
		versionConfig.onreadystatechange = function()
		{
			if (versionConfig.readyState !== 4) return;
			if (versionConfig.status === 200)
			{
				window['_appversionsserver'] = JSON.parse(versionConfig.responseText);
			}
		}

		versionConfig.send(null);
		versionConfig.onerror = function(e) {

		}
	}
}
exports.activate = activate;

function deactivate()
{}
exports.deactivate = deactivate;
function activate(context)
{
	var noAsFilePath;
	var filepathClass;
	var MenuItem =remote.MenuItem
	window.createLayaContextMenu = function(i, t)
	{
		var filepath = t.tree.model.traitsToItems.focused;
		for (var j in filepath)
		{
			if (j)
			{
				noAsFilePath=decodeURIComponent(j).replace("file:///", "").replace("file://", "");
				j = decodeURIComponent(j).replace("file:///", "").replace("file://", "").replace(codeMain.workspacePath.replace(/\\/g, "/"), "");
				break;
			}
		}
		filepathClass = noAsFilePath.replace(codeMain.workspacePath.replace(/\\/g, "/"), "");
		console.log("文件路径" + j);
		if (fs.existsSync(path.join(codeMain.workspacePath, "tsconfig.json")))
		{
			i.append(new MenuItem(
			{
				submenu: [
				{
					label: codeMain.panel[91][langindex],
					click()
					{
						createTsPanel(filepathClass)
					}
				}],
				label: codeMain.panel[92][langindex]
			}));

		}
		else if (fs.existsSync(path.join(codeMain.workspacePath, "jsconfig.json")))
		{
			i.append(new MenuItem(
			{
				submenu: [
				{
					label: codeMain.panel[93][langindex],
					click()
					{
						createJsPanel(filepathClass)
					}
				}],
				label: codeMain.panel[92][langindex]
			}));
		}
		else
		{
			i.append(new MenuItem(
			{
				submenu: [
				{
					label: codeMain.panel[94][langindex],
					click()
					{
						createAsPanel(filepathClass,true)
					}
				},{
					label:codeMain.getPanelLang(155),
					click()
					{
						createAsPanel(filepathClass,false)
					}
				}],
				label: codeMain.panel[92][langindex]
			}));
		}
	}

	function createTsPanel(filepathClass,isClass)
	{
		var panel = new createPanel(codeMain.panel[95][langindex],true);
		panel.btnOK.onclick = function(e)
		{
			if (panel.classInput.value)
			{
				if (panel.packageInput.value)
				{
					var selectfile = "module.ts";
				}
				else
				{
					var selectfile = "class.ts";
				}
				var reg = /^[a-zA-Z]\w{0,100}$/;
				if (reg.test(panel.classInput.value))
				{

					var cont = fs.readFileSync(path.join(__dirname, "model", "ts", selectfile), "utf-8");
					cont = cont.replace(/className/g, panel.classInput.value).replace(/moduleName/g, panel.packageInput.value);
					var tempfilepathClass = path.join(noAsFilePath, panel.classInput.value + ".ts");
					if (fs.existsSync(tempfilepathClass))
					{
						var t = confirm(codeMain.lang(codeMain.getPanelLang(206), panel.classInput.value));
						if (t)
						{
							fs.writeFileSync(tempfilepathClass, cont);
							ipc.send("vscode:openFolderPickerLaya", [tempfilepathClass]);
							codeMain.onOpenFile(tempfilepathClass);
							panel.dispose();
						}
					}
					else
					{
						fs.writeFileSync(tempfilepathClass, cont);
						ipc.send("vscode:openFolderPickerLaya", [tempfilepathClass]);
						codeMain.onOpenFile(tempfilepathClass);
						panel.dispose();
					}

				}

			}

		}
	}

	function createAsPanel(filepathClass,isClass)
	{
		var panel = new createPanel(codeMain.panel[94][langindex],isClass);
		var packagePath = codeMain.workspacePath.replace(/\\/g, "/");
		var index = filepathClass.indexOf("/src");
		if (index != -1)
		{
			packagePath = filepathClass.substr(index).replace("/src/", "").replace("/src", "").replace(/\//g, ".");
			panel.packageInput.value = packagePath;
		}
		panel.btnOK.onclick = function(e)
		{
			if (panel.classInput.value)
			{
				var reg = /^[a-zA-Z]\w{0,100}$/;
				if (reg.test(panel.classInput.value))
				{
					if(isClass)
					{
						var cont = fs.readFileSync(path.join(__dirname, "model", "as", "model.as"), "utf-8");
					}else{
						var cont = fs.readFileSync(path.join(__dirname, "model", "as", "interface.as"), "utf-8");
					}
					
					cont = cont.replace(/className/g, panel.classInput.value).replace(/moduleName/g, panel.packageInput.value);
					// var tempfilepathClass = path.join(filepathClass, panel.classInput.value + ".as");
					var classpathcreat = codeMain.workspacePath.replace(/\\/g, "/") + "/src/" + panel.packageInput.value.replace(/\./g, "/")+"/"+panel.classInput.value+".as";
					if (!fs.existsSync(classpathcreat))
					{
						codeMain.mkdirsSync(path.dirname(classpathcreat));
						fs.writeFileSync(classpathcreat, cont);
						//ipc.send("vscode:openFolderPickerLaya", [classpathcreat]);
						codeMain.onOpenFile(classpathcreat);
						panel.dispose();
					}
					else
					{
						var t = confirm(codeMain.lang(codeMain.getPanelLang(208), panel.classInput.value));
						if (t)
						{
							codeMain.mkdirsSync(path.dirname(classpathcreat));
							fs.writeFileSync(classpathcreat, cont);
							codeMain.onOpenFile(classpathcreat);
							panel.dispose();
						}
						else
						{

						}
					}

				}

			}

		}
	}

	function createJsPanel(filepathClass)
	{
		var panel = new createPanel(codeMain.panel[93][langindex],true);
		panel.btnOK.onclick = function(e)
		{
			if (panel.classInput.value)
			{
				if (panel.packageInput.value)
				{
					var selectfile = "module.js";
				}
				else
				{
					var selectfile = "class.js";
				}
				var reg = /^[a-zA-Z]\w{0,100}$/;
				if (reg.test(panel.classInput.value))
				{

					var cont = fs.readFileSync(path.join(__dirname, "model", "js", selectfile), "utf-8");
					cont = cont.replace(/className/g, panel.classInput.value).replace(/moduleName/g, panel.packageInput.value);
					var tempfilepathClass = path.join(noAsFilePath, panel.classInput.value + ".js");
					if (fs.existsSync(tempfilepathClass))
					{
						var t = confirm(codeMain.lang(codeMain.getPanelLang(207), panel.classInput.value));
						if (t)
						{
							fs.writeFileSync(tempfilepathClass, cont);
							//ipc.send("vscode:openFolderPickerLaya", [tempfilepathClass]);
							codeMain.onOpenFile(tempfilepathClass);
							panel.dispose();
						}
					}
					else
					{
						fs.writeFileSync(tempfilepathClass, cont);
						ipc.send("vscode:openFolderPickerLaya", [tempfilepathClass]);
						codeMain.onOpenFile(tempfilepathClass);
						panel.dispose();
					}

				}
				else
				{
					alert(codeMain.panel[97][langindex])
				}

			}

		}
	}

	function createPanel(title,isClass)
	{
		var classNameTag=isClass?codeMain.panel[98][langindex]:codeMain.panel[156][langindex]
		var popPanel = getElement("div", "menuPanel");
		popPanel.style.zIndex = 1000
		document.body.appendChild(popPanel);
		var viewPanel = getElement("div", "viewPanel", "", popPanel);
		var titleBackground = getElement("div", "titleBackground", title, viewPanel);
		__Layadrag(popPanel, titleBackground);
		/////
		var popPanelBackground = getElement("div", "content", "", viewPanel);
		var itemclassName = getElement("div", "item", "", popPanelBackground);
		var span = getElement("span", "", classNameTag, itemclassName);
		this.classInput = getElement("input", "classInput layaFocusinput", "", itemclassName);
		this.classInput.type = "input";
		this.classInput.focus();
		var _this = this;
		this.classInput.addEventListener("input", function(e)
		{
			var value = _this.classInput.value.replace(/\u2006|\x27/g, "");
			if (/[^\w]/.test(value))
			{
				_this.classInput.value = value.replace(/[^\w]/g, "");
			}
		})
		inputHandler(this.classInput)
			////
		var itempackageName = getElement("div", "item", "", popPanelBackground);
		var span = getElement("span", "", codeMain.panel[99][langindex], itempackageName);
		this.packageInput = getElement("input", "classInput", "", itempackageName);
		this.packageInput.type = "input";
		this.packageInput.addEventListener("input", function(e)
		{
			_this.packageInput.value = (_this.packageInput.value.replace(/[\u4E00-\u9FA5]/g, ""));

		})
		this.packageInput.addEventListener("keyup", function()
		{
			_this.packageInput.value = (_this.packageInput.value.replace(/[^\w.]/g, ""));
		})
		inputHandler(this.packageInput);
		//////
		var itempackageName = getElement("div", "item", "", popPanelBackground);
		this.btnOK = getElement("Button", "menuBtn", codeMain.getPanelLang(23), itempackageName);
		var closeBtn = getElement("div", "closeBtn", "×", viewPanel);
		closeBtn.onclick = function(e)
		{
			document.body.removeChild(popPanel);
		}
		this.dispose = function()
		{
			document.body.removeChild(popPanel);
		}

		function getElement(type, className, innertext, parent)
		{
			var div = document.createElement(type);
			if (className) div.setAttribute("class", className);
			if (innertext) div.innerText = innertext;
			if (parent) parent.appendChild(div);
			return div
		}

		function inputHandler(tar)
		{
			tar.onblur = function()
			{
				tar.className = "classInput"
			}
			tar.onfocus = function()
			{
				tar.className = "classInput layaFocusinput"
			}
		}
	}
}
class CreateClass{
	constructor()
	{

	}
	getASClass(name)
	{
		var classStruct =``
	}
}
exports.activate = activate;

function deactivate()
{}
exports.deactivate = deactivate;
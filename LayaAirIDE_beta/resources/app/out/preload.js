global.layarequire = require;
global.require = null;
delete global.require;
var electron = require("electron");
const remote = electron.remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const ipcRenderer = electron.ipcRenderer;
var fs = require("fs");
var path = require("path");
global.layaideconfig = null;
var debugconfigdata;
try {
	var data = localStorage.getItem("debugconfigdata");
	if (data) {
		debugconfigdata = JSON.parse(data);
	} else {
		debugconfigdata = {
			"width": 320,
			"height": 480,
			"direction": 0
		};
	}
} catch (e) {
	// statements
	debugconfigdata = {
		"width": 320,
		"height": 480,
		"direction": 0
	};
}

document.addEventListener("keydown", function(oEvent) {
	if (oEvent.code == "F5") {
		remote.getCurrentWindow().reload();
	} else if (oEvent.code == "F12") {
		remote.getCurrentWindow().openDevTools();
	}
})
window.addEventListener("resize", function(e) {
	/* body... */
	try {
		// statements
		debugconfigdata.width = remote.getCurrentWindow().getSize()[0];
		debugconfigdata.height = remote.getCurrentWindow().getSize()[1];
		localStorage.setItem("debugconfigdata", JSON.stringify(debugconfigdata));
	} catch (e) {
		// statements

	}


})
window.addEventListener("error", function(event) {
		console.error(event.error.stack);
})
	// process.noAsar = true;
initMenu();

function initMenu() {
	remote.getCurrentWindow().setSize(debugconfigdata.width, debugconfigdata.height);
	remote.getCurrentWindow().show()
	var template = [{
		label: '视图',
		submenu: [{
			label: '重新加载(F5)',
			click: function(item, focusedWindow) {
				remote.getCurrentWindow().reload();
			}
		}, {
			label: '打开开发者工具(F12)',
			accelerator: (function() {
				return 'F12';
			})(),
			click: function(item, focusedWindow) {
				ipcRenderer.sendSync("opendev", "opendev"); //同步消息的方式
				remote.getCurrentWindow().webContents.toggleDevTools();
				//remote.getCurrentWindow().emit("opendev");
			}
		}, ]
	}, {
		label: '分辨率',
		submenu: [{
			label: 'Apple iPhone4',
			checked: false,
			type: "radio",
			click: function() {
				update_debug_w_h(320, 480);

			}
		}, {
			label: 'Apple iPhone5',
			checked: false,
			type: "radio",
			click: function() {
				update_debug_w_h(320, 568);
			}
		}, {
			label: 'Apple iPhone6',
			checked: false,
			type: "radio",
			click: function() {
				update_debug_w_h(375, 627);
			}
		}, {
			label: 'Apple iPhone6 Plus',
			checked: false,
			type: "radio",
			click: function() {
				update_debug_w_h(414, 763);
			}
		}, {
			label: 'Apple iPad',
			checked: false,
			type: "radio",
			click: function() {
				update_debug_w_h(768, 1024);
			}
		}]
	}, {
		label: '屏幕方向',
		submenu: [{
			label: '横屏',
			checked: debugconfigdata.direction,
			type: "radio",
			click: function() {
				debugconfigdata.direction = 0;
				if (remote.getCurrentWindow().getSize()[0] > remote.getCurrentWindow().getSize()[1]) {

				} else {
					remote.getCurrentWindow().setSize(remote.getCurrentWindow().getSize()[1], remote.getCurrentWindow().getSize()[0])
						//update_debug_w_h(remote.getCurrentWindow().getSize()[1], remote.getCurrentWindow().getSize()[0]);
				}
				//update_debug_w_h(remote.getCurrentWindow().getSize()[0], remote.getCurrentWindow().getSize()[1]);


			}
		}, {
			label: '竖屏',
			checked: !debugconfigdata.direction,
			type: "radio",
			click: function() {
				debugconfigdata.direction = 1;
				if (remote.getCurrentWindow().getSize()[0] > remote.getCurrentWindow().getSize()[1]) {
					update_debug_w_h(remote.getCurrentWindow().getSize()[1], remote.getCurrentWindow().getSize()[0]);
				} else {
					//remote.getCurrentWindow().setSize(remote.getCurrentWindow().getSize()[1], remote.getCurrentWindow().getSize()[0])
				}
				//update_debug_w_h(remote.getCurrentWindow().getSize()[0], remote.getCurrentWindow().getSize()[1]);


			}
		}, ]
	}, {
		label: '帮助',
		role: 'help',
		submenu: [{
			label: '问答社区',
			click: function() {
				require('electron').shell.openExternal("http://ask.layabox.com/question")
			}
		}, ]
	}, ];
	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

function update_debug_w_h(w = 320, h = 560) {
	if (debugconfigdata.direction) {
		remote.getCurrentWindow().setSize(w, h);
	} else {
		remote.getCurrentWindow().setSize(h, w);
	}
	debugconfigdata.width = w;
	debugconfigdata.height = h;
	// body... 
}
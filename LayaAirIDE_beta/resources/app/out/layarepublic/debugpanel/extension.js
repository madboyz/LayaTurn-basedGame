var __debugpanel = function()
{
    var _this = this;
    _this.tabBox = [];
    this.leftBox = getElement("div", "debugpanelbar"); //创建容器；
    this.leftBox.style.background = "none";
    this.leftBox.style.top = "4px"
    var src = "res/toolbar/out.png";
    createItem(src, "workbench.action.output.toggleOutput", 20, "输出").className = "debugpanelFocus";
    src = "res/toolbar/error.png";
    createItem(src, "workbench.action.showErrorsWarnings", 20, "问题");
    src = "res/toolbar/debug.png";
    createItem(src, "workbench.debug.action.toggleRepl", 20, "调试");
    src = "res/toolbar/cmd.png";
    createItem(src, "workbench.action.terminal.toggleTerminal", 14, "终端");
    window.layaexecuteCommand = function(e)
    {
        switch (e)
        {
            case "workbench.action.output.toggleOutput":
                reback();
                _this.tabBox[0].className = "debugpanelFocus";
                break;
            case "workbench.action.showErrorsWarnings":
                reback();
                _this.tabBox[1].className = "debugpanelFocus";
                break;
            case "workbench.debug.action.toggleRepl":
            case "workbench.action.debug.restart":
                reback();
                _this.tabBox[2].className = "debugpanelFocus";
                // _this.tabBox[0].className = "debugpanelFocus";
                break;
            case "workbench.action.terminal.toggleTerminal":
                reback();
                _this.tabBox[3].className = "debugpanelFocus";
                break;
        }
    }
    setTimeout(function()
    {
        reback();
        _this.tabBox[0].className = "debugpanelFocus";
        sendMenuHandlerLaya("workbench.action.output.toggleOutput");
        sendMenuHandlerLaya("workbench.action.output.toggleOutput");
    }, 100)

    function getElement(type, className)
    {
        var div = document.createElement(type);
        if (className) div.setAttribute("class", className);
        return div
    }

    function reback()
    {
        for (var i = 0; i < _this.tabBox.length; i++)
        {
            _this.tabBox[i].className = "debugpanel";
        }
    }

    function createItem(src, mesg, size, innerText)
    {
        var item = getElement("li", "debugpanel");
        _this.leftBox.appendChild(item);
        var icon = getElement("img", "imageIcon");
        _this.tabBox.push(item);
        icon.src = src;
        item.appendChild(icon);
        var icon = getElement("span", "together");
        icon.innerText = innerText
        item.appendChild(icon);
        item.onclick = function(e)
        {
            if (item.className == "debugpanelFocus") return;
            sendMenuHandlerLaya(mesg);
        }
        return item
    }
    return this.leftBox;
}
exports.__debugpanel = __debugpanel;
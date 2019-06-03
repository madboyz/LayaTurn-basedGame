var __codeBar = function()
{
    var _this = this;
    _this.tabBox = [];
    codeMain.on("workbench.view.debug", function()
    {
        reback();
        _this.tabBox[3].className = "menutoolFocus";
    });
    codeMain.on("workbench.view.explorer", function()
    {
        reback();
        console.log("codeMain.emit")
        _this.tabBox[0].className = "menutoolFocus";
    });
    codeMain.on("workbench.view.git", function()
    {
        reback();
        console.log("codeMain.emit")
        _this.tabBox[2].className = "menutoolFocus";
    });
    codeMain.on("workbench.view.extensions", function()
    {
        reback();
        console.log("codeMain.emit")
        _this.tabBox[4].className = "menutoolFocus";
    });
    codeMain.on("workbench.view.search", function()
        {
            reback();
            console.log("codeMain.emit")
            _this.tabBox[1].className = "menutoolFocus";
        })

    this.leftBox = getElement("div", "toolMenuBar"); //创建容器；
    var src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTE3LjcwNSA4aC04LjcwNXMtMiAuMDc4LTIgMnYxNXMwIDIgMiAybDExLS4wMDRjMiAuMDA0IDItMS45OTYgMi0xLjk5NnYtMTEuNDkxbC00LjI5NS01LjUwOXptLTEuNzA1IDJ2NWg0djEwaC0xMXYtMTVoN3ptNS41MDktNmgtOC40OTNzLTIuMDE2LjAxNi0yLjAzMSAyaDguMDE1di40NTRsMy45MzEgNC41NDZoMS4wNjl2MTJjMiAwIDItMS45OTUgMi0xLjk5NXYtMTEuMzU3bC00LjQ5MS01LjY0OHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
    createItem(src, "workbench.view.explorer", 25, `${codeMain.panel[127][langindex]}(${codeMain.ctrlreplacecmd}+${codeMain.shiftreplacecmd}+E)`).className = "menutoolFocus";
    src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTE5LjIzIDQuMDk1Yy00Ljg0MiAwLTguNzY5IDMuOTI4LTguNzY5IDguNzcxIDAgMS43ODEuNTM5IDMuNDMgMS40NDkgNC44MTUgMCAwLTUuNDgyIDUuNDU1LTcuMTAyIDcuMTAyLTEuNjIxIDEuNjQ2IDEuMDAxIDQuMDcxIDIuNjAyIDIuNDA5IDEuNjAyLTEuNjU5IDcuMDA2LTcuMDA1IDcuMDA2LTcuMDA1IDEuMzg0LjkxMSAzLjAzNSAxLjQ1IDQuODE0IDEuNDUgNC44NDUgMCA4Ljc3Mi0zLjkzIDguNzcyLTguNzcxLjAwMS00Ljg0NC0zLjkyNy04Ljc3MS04Ljc3Mi04Ljc3MXptMCAxNS4wMzVjLTMuNDU5IDAtNi4yNjUtMi44MDQtNi4yNjUtNi4yNjQgMC0zLjQ2IDIuODA1LTYuMjY1IDYuMjY1LTYuMjY1IDMuNDYyIDAgNi4yNjYgMi44MDQgNi4yNjYgNi4yNjUgMCAzLjQ2LTIuODA0IDYuMjY0LTYuMjY2IDYuMjY0eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";
    createItem(src, "workbench.view.search", 25, `${codeMain.panel[128][langindex]}(${codeMain.ctrlreplacecmd}+${codeMain.shiftreplacecmd}+F)`);
    src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTI3LjQ1OSAxNC45MDJsLTEwLjQzOS0xMC40MzljLS4yOTYtLjI5NC0uNjcyLS40NTItMS4wODktLjQ1Mi0uNDE3IDAtLjc5My4xNTctMS4wODkuNDUybC0yLjI0OCAyLjI0NyAyLjU0OSAyLjU0OWMuMjQ5LS4xMTIuNTIyLS4xNzcuODEzLS4xNzcgMS4xMDYgMCAyLjAwMi44OTYgMi4wMDIgMi4wMDIgMCAuMjkxLS4wNjQuNTY1LS4xNzYuODE0bDIuMzExIDIuMzM2Yy4yNS0uMTExLjYzMy0uMjM0LjkyMy0uMjM0IDEuMTA2IDAgMiAuOTExIDIgMi4wMTZzLS44OTQgMS45NjktMiAxLjk2OWMtMS4xMDUtLjAwMS0yLjAxNi0uNzUxLTIuMDE2LTEuOTg1IDAtLjI4LjAxNi0uNDYyLjExOS0uNzA0bC0yLjM3My0yLjM3NC0uMDIzLjAwN3Y2LjI3NGMuNzQ3LjI5NSAxLjI3NyAxLjAyNiAxLjI3NyAxLjg3NSAwIDEuMTA1LS44NzggMi4wMTYtMS45ODQgMi4wMTYtMS4xMDQgMC0yLjAzMS0uOTI2LTIuMDMxLTIuMDMxIDAtLjg0Ni41MzUtMS41NjQgMS4yOC0xLjg1N2wuMDAxLTYuMjVjLS43NjItLjI4Mi0xLjMwOS0xLjAwOS0xLjMwOS0xLjg3MSAwLS4yOC4wNTktLjU0Ni4xNjItLjc4OGwtMi41NTUtMi41NTctNy4xMTUgNy4xMTRjLS41OTkuNjAxLS42MDEgMS41NzYuMDAxIDIuMTc4bDEwLjQ0IDEwLjUxOGMuMjk2LjI5NS42NzEuNDUgMS4wODkuNDUuNDE1IDAgLjc5Ni0uMTU5IDEuMDg5LS40NWwxMC4zOTEtMTAuNDcxYy42MDEtLjU5OS41OTktMS41NzYgMC0yLjE3N3oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";
    createItem(src, "workbench.view.git", 25, `${codeMain.panel[129][langindex]}(${codeMain.ctrlreplacecmd}+${codeMain.shiftreplacecmd}+G)`);
    src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5pY29uLWNhbnZhcy10cmFuc3BhcmVudHtvcGFjaXR5OjA7ZmlsbDojRjZGNkY2O30gLmljb24td2hpdGV7ZmlsbDojRkZGRkZGO308L3N0eWxlPjxwYXRoIGNsYXNzPSJpY29uLWNhbnZhcy10cmFuc3BhcmVudCIgZD0iTTMyIDMySDBWMGgzMnYzMnoiIGlkPSJjYW52YXMiLz48ZyBpZD0iaWNvbkJnIj48cGF0aCBjbGFzcz0iaWNvbi13aGl0ZSIgZD0iTTE3IDE5LjQ4OHY0LjI0OGMwIC40NjIuMDkgMS4yNjQtLjM3MyAxLjI2NEgxNXYtMWgxdi0zLjE5bC0uMTczLS4xOGMtMS40NTMgMS4yMDUtMy41MjggMS4yNDgtNC42Ny4xMDhDMTAgMTkuNTc4IDEwLjExOCAxOCAxMS4zNzYgMTZIOHYxSDd2LTEuNjI3QzcgMTQuOTEgNy44MDIgMTUgOC4yNjQgMTVoNC4xMDVMMTcgMTkuNDg4ek0xNCA5aC0xVjhoMS45NTVjLjQ2IDAgMS4wNDUuMjIgMS4wNDUuNjgydjMuMzQ1bC43MzYuODc1Yy4xOC0uOTczLjg5LTEuNzEgMS45MTQtMS43MS4xNDMgMCAuMzUuMDE0LjM1LjA0VjloMXYyLjYxOGMwIC4xMTcuMjY1LjM4Mi4zODIuMzgySDIzdjFoLTIuMjMzYy4wMjcgMCAuMDQyLjE1NC4wNDIuMjk4IDAgMS4wMjUtLjc0IDEuNzUzLTEuNzEyIDEuOTMybC44NzUuNzdIMjMuMzE4Yy40NjIgMCAuNjgyLjU4My42ODIgMS4wNDVWMTloLTF2LTFoLTIuNTJMMTQgMTEuNjk4Vjl6TTE2IDRDOS4zNzMgNCA0IDkuMzczIDQgMTZzNS4zNzMgMTIgMTIgMTIgMTItNS4zNzMgMTItMTJTMjIuNjI3IDQgMTYgNHptMTAgMTJjMCAyLjM5Ny0uODUgNC42LTIuMjYyIDYuMzI0TDkuNjc2IDguMjYyQzExLjQgNi44NSAxMy42MDIgNiAxNiA2YzUuNTE0IDAgMTAgNC40ODYgMTAgMTB6TTYgMTZjMC0yLjM5OC44NS00LjYgMi4yNjItNi4zMjRMMjIuMzI0IDIzLjc0QzIwLjYgMjUuMTUgMTguMzk3IDI2IDE2IDI2Yy01LjUxNCAwLTEwLTQuNDg2LTEwLTEweiIvPjwvZz48L3N2Zz4="
    createItem(src, "workbench.view.debug", 25, `${codeMain.panel[130][langindex]}(${codeMain.ctrlreplacecmd}+${codeMain.shiftreplacecmd}+D)`);
    src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA2MCA2MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjAgNjA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJpY29uQmciPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi45LDQ3LjFIMzBWNjBIMFYwaDI1Ljd2MTIuOUgxMi45VjQ3LjF6IE0xNy4xLDQyLjloMjUuN1YxNy4xSDE3LjFWNDIuOXogTTMwLDB2MTIuOWg4LjZWOC42aDEyLjl2MTIuOQ0KCQloLTQuM1YzMEg2MFYwSDMweiBNNDcuMSw0Ny4xSDM0LjNWNjBINjBWMzQuM0g0Ny4xVjQ3LjF6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="
    createItem(src, "workbench.view.extensions", 18, `${codeMain.panel[131][langindex]}(${codeMain.ctrlreplacecmd}+${codeMain.shiftreplacecmd}+X)`);

    function getElement(type, className)
    {
        var div = document.createElement(type);
        if (className) div.setAttribute("class", className);
        return div
    }
    window.addEventListener("keydown", function(e)
    {
        // if(e.code=="F8"){
        //     codeMain.menuclickHandler("workbench.action.debug.continue");
        //     return
        // }
        var ctrlalt = process.platform == "darwin" ? (e.metaKey && e.shiftKey) : (e.ctrlKey && e.shiftKey)
        if (ctrlalt)
        {
            if (e.code == "KeyE")
            {
                reback();
                _this.tabBox[0].className = "menutoolFocus";
                codeMain.menuclickHandler("workbench.view.explorer");
            }
            else if (e.code == "KeyF")
            {
                reback();
                _this.tabBox[1].className = "menutoolFocus";
                codeMain.menuclickHandler("workbench.view.search");
            }
            else if (e.code == "KeyH")
            {
                reback();
                _this.tabBox[1].className = "menutoolFocus";
                codeMain.menuclickHandler("workbench.view.search");
            }
            else if (e.code == "KeyG")
            {
                reback();
                _this.tabBox[2].className = "menutoolFocus";
                codeMain.menuclickHandler("workbench.view.git");
            }
            else if (e.code == "KeyD")
            {
                reback();
                _this.tabBox[3].className = "menutoolFocus";
                codeMain.menuclickHandler("workbench.view.debug")
            }
            else if (e.code == "KeyX")
            {
                reback();
                _this.tabBox[4].className = "menutoolFocus";
                codeMain.menuclickHandler("workbench.view.extensions")
            }
        }
    })

    function reback()
    {
        for (var i = 0; i < _this.tabBox.length; i++)
        {
            _this.tabBox[i].className = "menutool"; 
        }
    }

    function createItem(src, mesg, size, title)
    {
        var item = getElement("li", "menutool");
        _this.leftBox.appendChild(item);
        var icon = getElement("img", "imageIcon");
        _this.tabBox.push(item);
        icon.src = src;
        icon.title = title;
        icon.style.width = icon.style.width = size + "px";
        item.appendChild(icon);
        item.onclick = function(e)
        {
            for (var i = 0; i < _this.tabBox.length; i++)
            {
                _this.tabBox[i].className = "menutool";
            }
            item.className = "menutoolFocus";
            codeMain.menuclickHandler(mesg)
        }
        return item
    }
    return this.leftBox;
}
exports.__codeBar = __codeBar;
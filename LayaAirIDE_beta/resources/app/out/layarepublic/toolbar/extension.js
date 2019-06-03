var __LayaToolBar = function()
{
    console.log("toolbar")
    var _this = this;
    this.tabBox = [];
    this.leftBox = getElement("div", "leftBoxBar"); //创建容器；
    this.layaTabManger = new _layaTabManger__();
    scr = "res/toolbar/view.png"
    var codeItem = createItem("res/toolbar/code.png", "code", codeMain.panel[124][langindex]);
    codeItem.className = "itemFocus";
    window.addEventListener("keyup", function(e)
    {
        if (e.altKey && !e.ctrlKey && !e.shiftKey)
        {
            if (e.code == "KeyQ")
            {
                codeItem.onclick();
            }
            else if (e.code == "KeyW")
            {
                uicodeItem.onclick();
            }
        }
        // console.log(e)
    })
    var uicodeItem = createItem("res/toolbar/view.png", "uicode", codeMain.panel[125][langindex]);
    createItem("res/toolbar/ask.png", "layastore", codeMain.panel[126][langindex] + ``);
    createItem("res/icons/search.png", "layasearch", codeMain.panel[132][langindex]);
    createPop();

    function createPop()
    {
        var xmlhttp = new XMLHttpRequest();
        var url = "http://ldc.layabox.com/download/LayaAir/notice.json?" + Math.random();
        xmlhttp.open("get", url);
        var noticePop = window.localStorage["layanotice-pop"];
        if (noticePop)
        {
            noticePop = JSON.parse(noticePop);
        }
        xmlhttp.onload = function(e)
        {
            if (xmlhttp.readyState == 4)
            { // 4 = "loaded"
                if (xmlhttp.status == 200)
                { // 200 = OK
                    var responseText = JSON.parse(xmlhttp.responseText);
                    if (responseText.url)
                    {
                        createItem(responseText.url)
                    }
                    else
                    {
                        return;
                    }
                    // var localversion = responseText.version;
                    if (responseText.version == noticePop.version)
                    {
                        item.innerHTML = `<div>
                                <img src="res/icons/pop.png" style="width: 22px;height: 26px;position: relative;">
                             </div>`;
                    }
                }
                else
                {
                    console.log("Problem retrieving XML data");
                }
            }
        };
        xmlhttp.onerror = function(e)
        {
            console.log("失败")
        }
        xmlhttp.send();
        // createItem("responseText.url")
        var item = document.createElement("div");

        function createItem(url)
        {

            item.style.left = "12px";
            item.style.width = item.style.height = "25px";
            item.style.bottom = "100px";
            item.style.cursor = "pointer";
            item.style.position = "absolute";
            item.style.zIndex = 10000;
            item.title = codeMain.panel[154][langindex];
            item.innerHTML = `<div>
    <img src="res/icons/pop.png" style="width: 22px;height: 26px;position: relative;">
    <div style="width:10px;height:10px;border-radius:50px;background: red;position:absolute;;top:0px;left:12px"></div>
</div>`;
            var iframe = document.createElement("iframe");
            var divpanel;
            var divpanel = document.createElement("div");
            divpanel.style = "position: absolute;bottom: 20px;left: 58px;z-index:99999999"
            divpanel.innerHTML = `<div class="arrowright"></div>
                    <iframe src=${url} style="height: 400px;width: 400px;border: none;"></iframe>`
            _this.leftBox.appendChild(item);
            document.body.appendChild(divpanel);
            divpanel.style.display = "none";
            item.onclick = function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                item.innerHTML = `<div>
                                <img src="res/icons/pop.png" style="width: 22px;height: 26px;position: relative;">
                             </div>`;
                document.body.appendChild(divpanel);
                divpanel.style.display = "block";
                // window.localStorage["layanotice-version"] = noticePop||"";
                window.localStorage["layanotice-pop"] = xmlhttp.responseText;
            }
            document.addEventListener("click", function(e)
            {
                divpanel.style.display = "none";
            })
        }
    }
    document.body.appendChild(this.leftBox);
    codeMain.on("changeCodeMode", function()
    {
        for (var i = 0; i < _this.tabBox.length; i++)
        {
            _this.tabBox[i].className = "item";
        }
        _this.tabBox[0].className = "itemFocus";
    });

    function getElement(type, className)
    {
        var div = document.createElement(type);
        if (className) div.setAttribute("class", className);
        return div
    }

    function createItem(src, msg, title)
    {
        var item = getElement("li", "item");
        _this.leftBox.appendChild(item);
        var icon = getElement("img", "icon");
        icon.title = title;
        icon.src = src || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTE5LjIzIDQuMDk1Yy00Ljg0MiAwLTguNzY5IDMuOTI4LTguNzY5IDguNzcxIDAgMS43ODEuNTM5IDMuNDMgMS40NDkgNC44MTUgMCAwLTUuNDgyIDUuNDU1LTcuMTAyIDcuMTAyLTEuNjIxIDEuNjQ2IDEuMDAxIDQuMDcxIDIuNjAyIDIuNDA5IDEuNjAyLTEuNjU5IDcuMDA2LTcuMDA1IDcuMDA2LTcuMDA1IDEuMzg0LjkxMSAzLjAzNSAxLjQ1IDQuODE0IDEuNDUgNC44NDUgMCA4Ljc3Mi0zLjkzIDguNzcyLTguNzcxLjAwMS00Ljg0NC0zLjkyNy04Ljc3MS04Ljc3Mi04Ljc3MXptMCAxNS4wMzVjLTMuNDU5IDAtNi4yNjUtMi44MDQtNi4yNjUtNi4yNjQgMC0zLjQ2IDIuODA1LTYuMjY1IDYuMjY1LTYuMjY1IDMuNDYyIDAgNi4yNjYgMi44MDQgNi4yNjYgNi4yNjUgMCAzLjQ2LTIuODA0IDYuMjY0LTYuMjY2IDYuMjY0eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
        icon.style.width = icon.style.height = "22px"
        item.appendChild(icon);
        _this.tabBox.push(item);
        item.onclick = function(e)
        {
            if (!codeMain.workspacePath) return;
            for (var i = 0; i < _this.tabBox.length; i++)
            {
                _this.tabBox[i].className = "item";
            }
            item.className = "itemFocus";
            _this.layaTabManger.changeViewPort(msg);
        }
        return item
    }
}
var _layaTabManger__ = function()
{
    var _this = this;
    _this.popUrl = "";
    _this.searchUrl = "http://sou.layabox.com/"
    codeMain.on("createLayaStore", function()
    {
        createLayaStore("layastoreContainer", "http://ask.layabox.com/");
    });
    codeMain.on("createLayaSearch", function()
    {
        createLayaStore("layasearchContainer", _this.searchUrl)
    });
    this.changeViewPort = function(type)
    {
        codeMain.changeViewMode(type);
    }

    function getElement(type, className)
    {
        var div = document.createElement(type);
        if (className) div.setAttribute("class", className);
        return div
    }

    function createLayaStore(id, src)
    {
        console.log(id, src, "ko")
        var div = getElement("div", "layastoreBox");
        div.id = id;
        window[id] = div;
        var content = div.appendChild(getElement("div", "content"));
        div.appendChild(content);
        var box = getElement("div", "box");
        content.appendChild(box);
        var backBtn = getElement("button", "btncusbackout");
        backBtn.title = codeMain.panel[153][langindex];
        backBtn.onclick = function()
        {
            web.goBack();
        }
        backBtn.onmouseout = function()
        {
            backBtn.className = "btncusbackout";
        }
        backBtn.onmouseover = function()
        {
            backBtn.className = "btncusbackover";
        }
        backBtn.onmousdown = function()
        {
            backBtn.className = "btncusbackdown";
        }
        box.appendChild(backBtn);
        var nextBtn = getElement("button", "btncusnextout");
        nextBtn.title = codeMain.panel[152][langindex]
        box.appendChild(nextBtn);
        nextBtn.onmouseout = function()
        {
            nextBtn.className = "btncusnextout";
        };
        nextBtn.onmouseover = function()
        {
            nextBtn.className = "btncusnextover";
        };
        nextBtn.onmousdown = function()
        {
            nextBtn.className = "btncusnextdown";
        }
        nextBtn.onclick = function(e)
        {
            web.goForward()
            console.log("前进")
        }
        var reBtn = getElement("button", "btncusfreshout");
        reBtn.title = codeMain.panel[151][langindex]
        reBtn.onclick = function()
        {
            web.reloadIgnoringCache();
        }
        reBtn.onmouseover = function()
        {
            this.className = "btncusfreshover";
        }
        reBtn.onmouseout = function()
        {
            this.className = "btncusfreshout";
        }
        console.log("添加组件");
        box.appendChild(reBtn);
        var reBtn = getElement("button", "btncusindexhdown");
        reBtn.title = codeMain.panel[150][langindex]
        reBtn.onmouseover = function()
        {
            this.className = "btncusindexhover";
        }
        reBtn.onmousedown = function()
        {

            this.className = "btncusindexhover";
            web.src = src
        }
        box.appendChild(reBtn);
        var input = getElement("input", "inputSerch");
        input.onfocus = function()
        {
            input.className = "inputSerchFocus";
            input.select()
        }
        input.onblur = function()
        {
            input.className = "inputSerch";
        }
        input.onkeypress = function(e)
        {
            if (event.keyCode == "13")
            {
                //需要处理的事情
                if (input.value.indexOf("http") == -1)
                {
                    web.src = "http://" + input.value;
                }
                else
                {
                    web.src = input.value;
                }
            }
        }
        input.style.width = (window.innerWidth - 300) + "px";
        box.appendChild(input);
        var web = getElement("webview", "layawebview");
        web.style.backgroundColor = "#ffffff"
        web.autosize = "on";
        web.addEventListener('new-window', function(e)
        {
            web.src = e.url;
        })
        backBtn.style.opacity = 0.2;
        nextBtn.style.opacity = 0.2;
        web.addEventListener("did-finish-load", function(e)
        {
            input.value = web.src;
            if (!web.canGoBack())
            {
                backBtn.style.pointerEvents = "none";
                backBtn.style.opacity = 0.2;
            }
            else
            {
                backBtn.style.pointerEvents = "all";
                backBtn.style.opacity = 1;
            }
            if (!web.canGoForward())
            {
                nextBtn.style.pointerEvents = "none";
                nextBtn.style.opacity = 0.2;
            }
            else
            {
                nextBtn.style.pointerEvents = "all";
                nextBtn.style.opacity = 1;
            }
        })
        web.src = src;
        input.value = src;
        web.style.height = (window.innerHeight - 110) + "px";
        web.style.width = (window.innerWidth - 50) + "px";
        div.appendChild(web);
        window.addEventListener("resize", function()
        {
            web.style.height = (window.innerHeight - 110) + "px";
            web.style.width = (window.innerWidth - 50) + "px";
            input.style.width = (window.innerWidth - 300) + "px";
        })
        document.body.appendChild(div);
    }
}
exports.__LayaToolBar = __LayaToolBar;
var ShowPop = function (btnArr,message,result,hidden) {
    var _this = this;
    this.result = result;
    this.hidden=hidden||false;
    this.popPanel = document.createElement("div");
    this.popPanel.className = "popPanel";
    document.body.appendChild(this.popPanel)
    this.info = document.createElement("span");
    this.info.className = "info";
    this.info.innerHTML = codeMain.panel[108][langindex]//"信息"
    this.popPanel.appendChild(this.info);
    this.message = document.createElement("span");
    this.message.className = "message"
    this.message.innerHTML = message;
    this.popPanel.appendChild(this.message);
    this.btncontent = document.createElement("div");
    this.btncontent.className = "btncontent";
    this.message.appendChild(this.btncontent);
    for (var i = 0; i < btnArr.length; i++) {
        var content = document.createElement("div");
        content.className = "content";
        this.btncontent.appendChild(content);
        var a = document.createElement("a");
        a.innerHTML =  "&nbsp&nbsp"+btnArr[i]+"&nbsp&nbsp";
        content.msg = btnArr[i];
        content.appendChild(a);
        content.onclick= function(e)
        {
            if(!_this.hidden){
                document.body.removeChild(_this.popPanel);
            }
            if(_this.result)
            {
                _this.result(e.currentTarget.msg)
            }
        }
    }
    ShowPop.prototype.show= function()
    {

    }
    ShowPop.prototype.dispose = function()
    {
        document.body.removeChild(_this.popPanel);
    }

}
exports.ShowPop = ShowPop;
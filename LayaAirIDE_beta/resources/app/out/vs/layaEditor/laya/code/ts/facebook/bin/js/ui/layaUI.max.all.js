var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var FBGameUI = /** @class */ (function (_super) {
        __extends(FBGameUI, _super);
        function FBGameUI() {
            return _super.call(this) || this;
        }
        FBGameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.FBGameUI.uiView);
        };
        FBGameUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 309, "x": 41, "var": "photo" } }, { "type": "Label", "props": { "y": 30, "x": 35, "width": 236, "var": "id", "text": "ID:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 69, "x": 35, "width": 236, "var": "locale", "text": "Locale:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 262, "x": 35, "width": 236, "var": "gameId", "text": "gameId:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 223, "x": 35, "width": 236, "var": "vision", "text": "Vision:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 185, "x": 35, "width": 236, "var": "type", "text": "Type:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 107, "x": 35, "width": 236, "var": "myName", "text": "Name:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 146, "x": 35, "width": 236, "var": "platform", "text": "Platform:", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#ff110d", "bold": true, "align": "left" } }, { "type": "Image", "props": { "top": 0, "skin": "comp/logo.png", "right": 0 } }, { "type": "Button", "props": { "y": 31, "x": 293, "width": 150, "var": "btnShare", "skin": "comp/button.png", "labelSize": 26, "label": "分享", "height": 45, "centerX": 8 } }, { "type": "Button", "props": { "y": 115, "x": 293, "width": 150, "var": "btnLogout", "skin": "comp/button.png", "label": "退出游戏", "height": 45 } }, { "type": "Button", "props": { "y": 199, "x": 293, "width": 150, "var": "btnSave", "skin": "comp/button.png", "label": "保存数据", "height": 45 } }, { "type": "Button", "props": { "y": 282, "x": 293, "width": 150, "var": "btnLoading", "skin": "comp/button.png", "label": "读取数据", "height": 45 } }, { "type": "Button", "props": { "y": 366, "x": 293, "width": 150, "var": "btnFriend", "skin": "comp/button.png", "label": "获取关系链", "height": 45 } }, { "type": "Button", "props": { "y": 450, "x": 293, "width": 150, "var": "btnChoose", "skin": "comp/button.png", "label": "选择好友同玩", "height": 45 } }] };
        return FBGameUI;
    }(View));
    ui.FBGameUI = FBGameUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
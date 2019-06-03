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
var test = ui.test.TestPageUI;
var Label = Laya.Label;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var Event = Laya.Event;
var TestUI = /** @class */ (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super.call(this) || this;
        that = _this;
        _this.initsdk_btn.on(Event.CLICK, _this, _this.onInitButtonClick);
        _this.login_button.on(Event.CLICK, _this, _this.onLoginButtonClick);
        _this.show_read_view_button.on(Event.CLICK, _this, _this.on_show_button_click);
        _this.contract_return_main.on(Event.CLICK, _this, _this.on_contract_return_main);
        _this.read_contract_action.on(Event.CLICK, _this, _this.on_read_contract_action);
        _this.show_tx_view.on(Event.CLICK, _this, _this.on_show_tx_view);
        _this.invokescript_btn.on(Event.CLICK, _this, _this.on_invokescript_btn);
        _this.result_return_btn.on(Event.CLICK, _this, _this.on_result_return_btn);
        _this.gas_button.on(Event.CLICK, _this, function () {
            that.set_result('请查看函数makeGasTransfer');
        });
        _this.recharge_button.on('click', null, function () {
            that.set_result('请查看函数makerecharge');
        });
        _this.confirm_button.on('click', null, function () {
            that.set_result('请查看函数confirmappnotify');
        });
        _this.userinfo_button.on('click', _this, _this.getUserInfo);
        _this.balance_button.on('click', _this, _this.getbalance);
        _this.nettype_button.on('click', _this, _this.getNetType);
        _this.set_en_button.on('click', _this, function () {
            that.setLang('en');
        });
        _this.set_cn_button.on('click', null, function () {
            that.setLang('cn');
        });
        return _this;
    }
    TestUI.prototype.onInitButtonClick = function (e) {
        console.log('init sdk');
        var appid = "5";
        var appkey = "";
        window.BlackCat.SDK.init(appid, appkey, result_callback, "cn");
    };
    TestUI.prototype.onLoginButtonClick = function (e) {
        window.BlackCat.SDK.login(this.login_callback);
    };
    TestUI.prototype.on_show_button_click = function (e) {
        console.log('change view to read contract');
        this.main_option.visible = false;
        this.read_contract_view.visible = true;
        this.invokescript_btn.visible = false;
        this.read_contract_action.visible = true;
        this.nnc.text = '0x3f7420285874867c30f32e44f304fd62ad1e9573';
        this.sbParamJson.text = '["(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT"]';
        this.sbPushString.text = 'balanceOf';
        this.extString.text = 'invokeScript';
    };
    TestUI.prototype.on_contract_return_main = function (e) {
        this.main_option.visible = true;
        this.read_contract_view.visible = false;
    };
    TestUI.prototype.on_read_contract_action = function (e) {
        console.log('on_read_contract_action');
        var data = {
            nnc: this.nnc.text,
            sbParamJson: this.sbParamJson.text,
            sbPushString: this.sbPushString.text,
            extString: this.extString.text
        };
        console.log(data);
        data.sbParamJson = JSON.parse(data.sbParamJson);
        window.BlackCat.SDK.invokescript(data, function (res) {
            console.log('[BlackCat]', 'invokescript.callback.function.res => ', res);
        });
    };
    TestUI.prototype.on_show_tx_view = function () {
        console.log('open tx view');
        this.main_option.visible = false;
        this.read_contract_view.visible = true;
        this.nnc.text = '0x3f7420285874867c30f32e44f304fd62ad1e9573';
        this.sbParamJson.text = '["(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT","(address)AWPVmAobCJGxrupvQSnovofakaVb2ue65a","(integer)100000"]';
        this.sbPushString.text = 'transfer';
        this.extString.text = 'makeRawTransaction';
        this.invokescript_btn.visible = true;
        this.read_contract_action.visible = false;
    };
    TestUI.prototype.on_invokescript_btn = function () {
        var data = {
            nnc: this.nnc.text,
            sbParamJson: this.sbParamJson.text,
            sbPushString: this.sbPushString.text,
            extString: this.extString.text
        };
        data.sbParamJson = JSON.parse(data.sbParamJson);
        window.BlackCat.SDK.invokescript(data, function (res) {
            console.log('[BlackCat]', 'invokescript.callback.function.res => ', res);
        });
    };
    TestUI.prototype.on_result_return_btn = function () {
        this.main_option.visible = true;
        this.read_contract_view.visible = false;
        this.result_view.visible = false;
    };
    TestUI.prototype.getbalance = function () {
        window.BlackCat.SDK.getBalance(function (res) {
            console.log("getbalance.callback.function.res ", res);
        });
    };
    TestUI.prototype.getUserInfo = function () {
        window.BlackCat.SDK.getUserInfo(function (res) {
            console.log("getUserInfo.callback.function.res ", res);
        });
    };
    TestUI.prototype.getNetType = function () {
        window.BlackCat.SDK.getNetType(function (res) {
            console.log("getNetType.callback.function.res ", res);
        });
    };
    TestUI.prototype.setLang = function (lang) {
        window.BlackCat.SDK.setLang(lang);
    };
    TestUI.prototype.set_result = function (str) {
        this.result_content.text = str;
        this.main_option.visible = false;
        this.read_contract_view.visible = false;
        this.result_view.visible = true;
    };
    return TestUI;
}(ui.test.TestPageUI));
var result_callback = function (data) {
    that.result_content.text = JSON.stringify(JSON.parse(data));
    that.main_option.visible = false;
    that.read_contract_view.visible = false;
    that.result_view.visible = true;
};
// //结果回调
// private function result_callback(data:String):void{
// 	 console.log('result_callback',data);
// }
function login_callback(data) {
    console.log('login callback', data);
}
//程序入口
Laya.init(1280, 720, WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    //实例UI界面
    var testUI = new TestUI();
    Laya.stage.addChild(testUI);
}
//# sourceMappingURL=LayaUISample.js.map
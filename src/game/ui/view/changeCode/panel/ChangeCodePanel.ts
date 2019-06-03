import { MsgManager } from "../../../manager/MsgManager";
import { SdkManager } from "../../../../../net/SdkManager";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class ChangeCodePanel extends ui.main.ChangeCodePanelUI {
    private isRequestIng = false;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.sameLevelEliminate = false;
        this.isShowBg= false;
        this.isShowMask = true;
        this.mResouce = [
        ];
    }
    
    private httpRequest:Laya.HttpRequest = new Laya.HttpRequest();

    public initComp() {
        this.httpRequest.http.timeout = 8000;
        super.initComp();
    }

    public update():void
    {

    }

    public open(...args): void {
        super.open();
        this.codeInput.text = "";
        this.isRequestIng = false;
    }

    public initEvent():void 
    {
        this.OkBtn.on(Laya.Event.CLICK,this,this.OnClickOkBtn);
    }

    public removeEvent():void
    {
        this.OkBtn.off(Laya.Event.CLICK,this,this.OnClickOkBtn);
    }

    private OnClickOkBtn():void
    {
        if(this.codeInput.text == "")
        {
            MsgManager.instance.showRollTipsMsg("请输入兑换码!");
            return;
        }
        if(this.isRequestIng)
        {
            MsgManager.instance.showRollTipsMsg("正在等待网络响应!");
            return;
        }
        var platform = SdkManager.instance.GetPlatform().platform;
        if(SRoleData.instance.roleId == 0||SRoleData.instance.info.Lv == 0)
        {
            return;
        }
        var url = `${GameConfig.GAME_CONTROL_URL}servlet/GetPack?game_mark=${GameConfig.GAME_MARK}&code=${this.codeInput.text}&server_id=${GameConfig.GAME_SERVER_ID}&provider=${GameConfig.GAME_CHANNEL}&account=${GameConfig.REAL_ACCOUNT}&role_id=${SRoleData.instance.roleId}&lv=${SRoleData.instance.info.Lv}`;
        this.isRequestIng = true;
        var THIS = this;
        this.httpRequest.once(Laya.Event.COMPLETE,this,function(data):void{
            data = JSON.parse(data);
            if(THIS.isRequestIng != null)
            {
                THIS.isRequestIng = false;
            }
            if (data.result != 200)
            {
                var str = data.message ?data.message:"兑换失败,请检查兑换码！";
                MsgManager.instance.showRollTipsMsg(str);
            }
            else
            {
                MsgManager.instance.showRollTipsMsg("兑换成功,请查收邮件！");
            }
        });

        this.httpRequest.once(Laya.Event.ERROR,this,function(data):void{
            if(THIS.isRequestIng != null)
            {
                THIS.isRequestIng = false;
            }
            MsgManager.instance.showRollTipsMsg("兑换失败！");
        });
        
        this.httpRequest.send(url);
        this.close();
    }

    public close(): void {
        super.close();
    }
}
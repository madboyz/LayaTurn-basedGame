import { DataManager } from "../../../../../message/manager/DataManager";
import { S13059 } from "../../../../../net/pt/pt_13";
import { LoginRewardPanel } from "../panel/LoginRewardPanel";
import { LoginRewardProtocol } from "../protocol/LoginRewardProtocol";
import { SActiveEvent, SActiveData } from "../../active/data/SActiveData";

export class LoginRewardControl extends BaseControl {

    private protocol: LoginRewardProtocol;

    constructor() {
        super();
        this.panel = new LoginRewardPanel();
        this.protocol = new LoginRewardProtocol();
    }

    public set panel(value: LoginRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): LoginRewardPanel {
        return this.mPanel as LoginRewardPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SActiveData.instance.on(SActiveEvent.ACTIVE_CHECK_LOGINREWARD,this,this.checkLoginReward)
        this.panel.on(SActiveEvent.ACTIVE_GET_LOGINREWARD,this,this.getReward);
    }
    private removeEvent() {
        SActiveData.instance.off(SActiveEvent.ACTIVE_CHECK_LOGINREWARD,this,this.checkLoginReward)
        this.panel.off(SActiveEvent.ACTIVE_GET_LOGINREWARD,this,this.getReward);
    }

    public getReward():void{
        this.onSend13059(1);
    }

    //isGet操作状态（1领取，0查询）
    private onSend13059(isGet: number): void {
        this.protocol.send13059(isGet);
    }

    private checkLoginReward(haveReward: boolean):void{
        if(haveReward == false){
            //已经领取了
            this.panel && this.panel.close();
        }else{
            UIManager.instance.openUI(UIID.SYS_LOGIN_REWARD);
        }
    }

}
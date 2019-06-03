import { SRoleEvent, SRoleData } from './../../../../../net/data/SRoleData';
import { SGameData, SGameEvent } from './../../../../../net/data/SGameData';
import { SelectRolePanel } from './../panel/SelectRolePanel';
import { SelectRoleProtocol } from './../protocol/SelectRoleProtocol';
export class SelectRoleControl extends BaseControl{
    
    private protocol:SelectRoleProtocol;

    constructor() {
        super();
        this.panel = new SelectRolePanel();
        this.protocol = new SelectRoleProtocol();
    }

    public set panel(value: SelectRolePanel) {
        this.mPanel = value;
    }

    public get panel(): SelectRolePanel {
        return this.mPanel as SelectRolePanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SGameData.instance.on(SRoleEvent.ROLE_DELETEROLE_SUCCES,this,this.onDeleteRoleSuc);//删除boss成功

        SRoleData.instance.on(SGameEvent.GAME_REQUEST_ENTERGAME,this,this.onEnterGame);//申请进入游戏        点击登陆的时候派发 this.event(SGameEvent.GAME_REQUEST_ENTERGAME);
        this.panel.on(SRoleEvent.ROLE_REQUEST_DELETEROLE,this,this.onRequestDeleteRole);//申请删除某个玩家
    }
    private removeEvent() {
        SGameData.instance.off(SRoleEvent.ROLE_REQUEST_DELETEROLE,this,this.onRequestDeleteRole);

        SRoleData.instance.off(SGameEvent.GAME_REQUEST_ENTERGAME,this,this.onEnterGame);
        this.panel.off(SRoleEvent.ROLE_REQUEST_DELETEROLE,this,this.onRequestDeleteRole);//申请删除某个玩家
    }

    private onDeleteRoleSuc():void
    {
        this.panel.updateData();
    }

    private onRequestDeleteRole(obj:any):void
    {
        this.protocol.requestDeleteRole.apply(this.protocol,obj);
    }

    private onEnterGame():void
    {
        SGameData.instance.requestEnterGame();
    }
}
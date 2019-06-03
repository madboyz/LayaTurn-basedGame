import { MsgManager } from './../../../manager/MsgManager';
import { SRoleEvent, SRoleData } from './../../../../../net/data/SRoleData';
import { SGameEvent } from './../../../../../net/data/SGameData';
export class SelectRolePanel extends ui.main.SelectRoleUI{
    private readonly mImages = ["humen_men.png","humen_women.png","mo_men.png","mo_women.png","god_men.png","god_women.png"];
    constructor() {
        super();
        this.mResouce = [
            
            { url: "res/atlas/createRole.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.updateData();
    }
    public update()
    {
        this.updateData();
    }
    public open(...args): void {
        super.open();
    }

    private RefreshSelectRoleDisplay()
    {
        var data = SRoleData.instance.roleInfo;
        if(data)
        {
            var name = "createRole/"+this.mImages[data.Faction-1];
            this.PlayerImage.skin = name;
            this.Name.text = data.Name;
            this.PlayerImage.visible = true;
            this.Name.text = SRoleData.instance.roleName;
        }
        else
        {
            this.PlayerImage.visible = false;
            this.Name.text = "";
        }
    }
    public initEvent():void 
    {
        this.startBtn.on(Laya.Event.CLICK,this,this.onEnterGame);
        this.btn_delete.on(Laya.Event.CLICK,this,this.onDeleteRole);
        this.btn_create.on(Laya.Event.CLICK,this,this.onCreateRole);
    }
    public removeEvent():void
    {
        this.startBtn.off(Laya.Event.CLICK,this,this.onEnterGame);
        this.btn_delete.off(Laya.Event.CLICK,this,this.onDeleteRole);
        this.btn_create.off(Laya.Event.CLICK,this,this.onCreateRole);
    }
    public updateData():void
    {
        this.RefreshSelectRoleDisplay();
    }
    private onEnterGame():void
    {
        SRoleData.instance.event(SGameEvent.GAME_REQUEST_ENTERGAME);
    }

    private onDeleteRole() {
        if(SRoleData.instance.roleInfo)
        {
            this.event(SRoleEvent.ROLE_REQUEST_DELETEROLE,[[SRoleData.instance.roleId]]);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("没有角色可以删除!");
        }
    }
    private onCreateRole():void
    {
        this.close();
        UIManager.instance.openUI(UIID.CREATE_ROLE);
    }
    
    public close(): void {
        super.close();
        // for (let i = 0; i < this.mResouce.length; i++) {
        //     Laya.loader.clearRes(this.mResouce[i], true);
        // }
        
    }
}
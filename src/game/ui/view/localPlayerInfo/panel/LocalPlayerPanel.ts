import { MsgManager } from "../../../manager/MsgManager";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { SdkManager } from "../../../../../net/SdkManager";
import { SceneManager, SceneType } from "../../../../battle/scene/SceneManager";
import { CommonControl } from "../../../../common/control/CommonControl";
import { PlayerView } from "../../../../battle/role/PlayerView";

export class LocalPlayerPanel extends ui.main.LocalPlayerPanelUI {
    private role:PlayerView;
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.mResouce = [
            
        ];
    }
    public initComp() {
        super.initComp();
        this.initRole();
        this.updateHead();
        //this.SysBtn.disabled = false;
        this.combat.url = "res/atlas/number/fight.atlas";
    }

    private initRole():void
    {
        this.role = RoleFactory.CreateAOiPlayer(SRoleData.instance.info.Faction , SRoleData.instance.info.Sex);
        this.role.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
        var data = new S12002_1();
        data.Sex = SRoleData.instance.info.Sex;
        data.Faction = SRoleData.instance.info.Faction;
        data.Weapon = FactionVo.get(data.Faction).weapon_anim;
        this.role.info.PlayerInfo = data;
        this.role.scaleX = this.role.scaleY=1.2;
        this.role.x = 290;
        this.role.y = 425;
        this.addChild(this.role);
        this.role.updateSkin();
    }

    public update():void
    {

    }

    public open(...args): void {
        this.initWindow(true,true,"玩家详情",550,750,35);
        super.open();
        this.UpdateInfoText();
        this.updateCombat();
        this.updateHead();
        var info =  this.role.info.getInfo(RoleType.OBJ_PLAYER);
        info.Clothes = SRoleData.instance.info.Clothes;
        this.role.updateSkin();
    }

    public updateHead(): void {
        if (SRoleData.instance.info) {
            this.headImg.skin = FactionVo.get(SRoleData.instance.info.Faction).head_icon[SRoleData.instance.info.Sex-1];
        }
    }

    public updateCombat():void
    {
        if(SRoleData.instance.info)
        {
            this.combat.text = SRoleData.instance.info.BattlePower.toString();
        }
    }

    public UpdateInfoText()
    {
        this.txt_name.text = SRoleData.instance.roleName;
        var sexStr = SRoleData.instance.info.Sex == 1?"男":"女";
        var guildStr = "暂无";
        var infoStr = `昵称:${SRoleData.instance.roleName}\n性别:${sexStr}\n等级:${SRoleData.instance.info.Lv}\n门派:${guildStr}\n`;
        this.txt_info.text = infoStr;
    }

    public close(): void {
        super.close();
    }

    public initEvent():void 
    {
        this.ChangeBtn.on(Laya.Event.CLICK,this,this.OnClickChangeBtn);
        this.RefreshBtn.on(Laya.Event.CLICK,this,this.OnClickRefreshBtn);
        this.SysBtn.on(Laya.Event.CLICK,this,this.OnClickSysBtn);
        this.GMBtn.on(Laya.Event.CLICK,this,this.OnClickGMBtn);
        this.headImg.on(Laya.Event.CLICK,this,this.EnterTestAutoChess);
    }

    public removeEvent():void
    {
        this.ChangeBtn.off(Laya.Event.CLICK,this,this.OnClickChangeBtn);
        this.RefreshBtn.off(Laya.Event.CLICK,this,this.OnClickRefreshBtn);
        this.SysBtn.off(Laya.Event.CLICK,this,this.OnClickSysBtn);
        this.GMBtn.off(Laya.Event.CLICK,this,this.OnClickGMBtn);
        this.headImg.off(Laya.Event.CLICK,this,this.EnterTestAutoChess);
    }

    private EnterTestAutoChess()
    {
        UIManager.instance.openUI(UIID.CATCH_PET_PANEL);
        //SceneManager.instance.EnterSpecialScene(SceneType.AutoChess);
        this.close();
    }

    private OnClickChangeBtn() {
        UIManager.instance.openUI(UIID.SYS_CHANGE_CODE_PANEL);
    }

    private OnClickRefreshBtn() {
        SdkManager.instance.LogOut();
        var location = window["location"];
        location.reload();
    }

    private OnClickSysBtn() {
        MsgManager.instance.showRollTipsMsg("敬请期待");
        //CommonControl.instance.EnterCopy(6001);
        //this.close();
    }

    private OnClickGMBtn() {
        MsgManager.instance.showRollTipsMsg("敬请期待");
    }
}
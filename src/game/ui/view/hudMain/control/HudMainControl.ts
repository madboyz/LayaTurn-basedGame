import { PropertyEnumCode } from './../../../../property/RoleProperty';
import { S13002 } from './../../../../../net/pt/pt_13';
import { SRoleData, SRoleEvent } from './../../../../../net/data/SRoleData';
import { HudMainPanel } from "../panel/HudMainPanel";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { SChapterData, SChapterEvent } from '../../../../chapter/SChapterData';
import { STeamData, STeamEvent } from '../../../../team/STeamData';
import { CommonControl } from '../../../../common/control/CommonControl';
import { SAoiData, SAoiEvent } from '../../../../aoi/SAoiData';
import { S12011 } from '../../../../../net/pt/pt_12';
import { SWorldBossData, SWorldBossEvent } from '../../../../../net/data/SWorldBossData';
import { SActiveRewardData, SActiveRewardEvent } from '../../dayReward/data/SActiveRewardData';
import { ConstVo } from '../../../../../db/sheet/vo/ConstVo';
import { MsgManager } from '../../../manager/MsgManager';
import { SBagData } from '../../../../../net/data/SBagData';

export class HudMainControl extends BaseControl{
    constructor(){
        super();
        this.panel = new HudMainPanel();
    }

    public get getEvent(): Array<any> {
        return [];
    }

    public set panel(value: HudMainPanel) {
        this.mPanel = value;
    }
    public get panel(): HudMainPanel {
        return this.mPanel as HudMainPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SRoleData.instance.on(SRoleEvent.ROLE_BATTLE_POWER_UPDATE,this,this.updateBattlePower);
        SGameData.instance.on(SGameEvent.GAME_SYSTEMOPENLIST,this,this.onUpdateSystemOpen);
        SGameData.instance.on(SGameEvent.GAME_NEWSYSTEMOPEN,this,this.onUpdateSystemOpen);
        SRoleData.instance.on(SRoleEvent.ROLE_GET_ONLINEROLEINFO,this,this.onGetOnLineRoleInfo);
        SRoleData.instance.on(SRoleEvent.ROLE_NAME_CHANGE,this,this.onUpdateRoleName);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_VIPLEVEL,this,this.onUpdateVipLevel);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_PROP,this,this.onUpdateLevel);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_MONEY,this,this.onUpdateMoney);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_LEVEL,this,this.onUpdateLv);
        SChapterData.instance.on(SChapterEvent.CHAPTER_NEW ,this , this.onNewChapter);
        SChapterData.instance.on(SChapterEvent.CHAPTER_UPDATE ,this , this.onUpdateChapter);
        STeamData.instance.on(STeamEvent.TEAM_ROLE_UPDATE ,this , this.onTeamRoleUpdate);
        STeamData.instance.on(STeamEvent.TEAM_BE_REQUSET_INTO_TEAM ,this , this.onTeamRoleUpdate);
        SAoiData.instance.on(SAoiEvent.AOI_CHANGE_SCENE, this, this.onAoiChangeScene);//场景变化
        SWorldBossData.instance.on(SWorldBossEvent.WORLD_BOSS_CAN_FIGHT, this, this.onWorldBossCanFight);//世界boss通知
        SActiveRewardData.instance.on(SActiveRewardEvent.ONLINE_REWARD_UPDATE , this , this.onOnlineRewardUpdate);
        SRoleData.instance.on(SRoleEvent.ROLE_AUTO_MOVE_UPDATE,this,this.UpdateAutoMove);//自动挂机更新
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
        SGameData.instance.on(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
    }
    
    
    private removeEvent() {
        SRoleData.instance.off(SRoleEvent.ROLE_BATTLE_POWER_UPDATE,this,this.updateBattlePower);
        SGameData.instance.off(SGameEvent.GAME_SYSTEMOPENLIST,this,this.onUpdateSystemOpen);
        SGameData.instance.off(SGameEvent.GAME_NEWSYSTEMOPEN,this,this.onUpdateSystemOpen);
        SRoleData.instance.off(SRoleEvent.ROLE_GET_ONLINEROLEINFO,this,this.onGetOnLineRoleInfo);
        SRoleData.instance.off(SRoleEvent.ROLE_NAME_CHANGE,this,this.onUpdateRoleName);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_VIPLEVEL,this,this.onUpdateVipLevel);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_PROP,this,this.onUpdateLevel);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_MONEY,this,this.onUpdateMoney);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_LEVEL,this,this.onUpdateLv);
        SChapterData.instance.off(SChapterEvent.CHAPTER_NEW ,this , this.onNewChapter);
        SChapterData.instance.off(SChapterEvent.CHAPTER_UPDATE ,this , this.onUpdateChapter);
        STeamData.instance.off(STeamEvent.TEAM_ROLE_UPDATE ,this , this.onTeamRoleUpdate);
        STeamData.instance.off(STeamEvent.TEAM_BE_REQUSET_INTO_TEAM ,this , this.onTeamRoleUpdate);
        SAoiData.instance.off(SAoiEvent.AOI_CHANGE_SCENE, this, this.onAoiChangeScene);//场景变化
        SWorldBossData.instance.off(SWorldBossEvent.WORLD_BOSS_CAN_FIGHT, this, this.onWorldBossCanFight);//世界boss通知
        SActiveRewardData.instance.off(SActiveRewardEvent.ONLINE_REWARD_UPDATE , this , this.onOnlineRewardUpdate);
        SRoleData.instance.off(SRoleEvent.ROLE_AUTO_MOVE_UPDATE,this,this.UpdateAutoMove);//自动挂机更新
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
        SGameData.instance.off(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
    }

    private UpdateTime()
    {
        var limt_open_lv = ConstVo.get("AUTO_FT").val;
        if(SRoleData.instance.info.Lv < limt_open_lv)
        {
            SChapterData.instance.openAutoChapter = false;
        }
        if(SRoleData.instance.info.TeamId!=0)
        {
            SChapterData.instance.openAutoChapter = false;
        }
        
        if(SBagData.instance.equip.itemLength >= SBagData.instance.equip.capacity)
        {
            SChapterData.instance.openAutoChapter = false;
        }
        this.panel.updateAutoBoss();
    }

    private UpdateAutoMove(isStart:boolean)
    {
        this.panel.updateAutoMoveAnim(isStart);
    }

    private updateBattlePower()
    {
        this.panel.updateCombat();
    }

    private onAoiChangeScene(data:S12011)
    {
        this.panel.onUpdateFightState();
    }

    private onWorldBossCanFight(currentInfo:any)
    {
        var lvLimite = ConstVo.get("WORLD_BOSS_LIMIT").val;
        if(SRoleData.instance.info.Lv < lvLimite){
            return;
        }
        if(SWorldBossData.instance.NoticeShow)
        UIManager.instance.openUI(UIID.SYS_WORLD_BOSS_NOTICE ,[currentInfo]);//世界boss通知
    }

    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

    private onTeamRoleUpdate()
    {
        if(this.panel.btnLeft)
        {
            this.panel.btnLeft.updateTeam();
        }
    }

    private onOnlineRewardUpdate()
    {
        if(this.panel.btnLeft)
        {
            this.panel.btnLeft.onlineReward();
        }
    }

    private onUpdateChapter()
    {
        this.panel.updateBossBtn();
    }

    private onNewChapter()
    {
        this.panel.NewChapter();
    }

    private onUpdateSystemOpen():void
    {
        this.panel.updateSystemOpen();
    }

    private onGetOnLineRoleInfo(data:S13002) {
        if(data.PlayerId == SRoleData.instance.roleId)
        {
            this.panel.updadeLevel();
            this.panel.updateCombat();
            this.panel.updateExp();
        }
    }
    private onUpdateRoleName():void {
        this.panel.updateName();
    }
    private onUpdateVipLevel():void {
        this.panel.updateVipInfo();
    }
    private onUpdateLevel(type:number):void {
        if(type == PropertyEnumCode.OI_CODE_EXP)
        {
            this.panel.updateExp();
        }
    }

    private onUpdateMoney(type:number):void {
        //if(type == MoneyType.YUANBAO || type == MoneyType.GAMEMONEY || type == MoneyType.PAY_POINT || type == MoneyType.EXP)
        //{
            this.panel.updateMoney();
            this.panel.updateExp();
        //}
    }

    private onUpdateLv():void{
        this.panel.updateFuncOpen();
    }

    private onGameSceneLoading():void{
        this.panel.onUpdateFightState();
    }

}
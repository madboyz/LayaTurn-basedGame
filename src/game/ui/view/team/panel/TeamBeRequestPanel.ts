import { STeamData, STeamEvent } from "../../../../team/STeamData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";

export class TeamBeRequestPanel extends ui.main.TeamBeRequestPanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }
    private noticeList = [];

    public update():void{
        
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList():void {
        this.LeaderList.itemRender = ui.main.TeamItem3UI;
        this.LeaderList.spaceX = 0;
        this.LeaderList.spaceY = -5;
        this.LeaderList.repeatX = 1;
        this.LeaderList.repeatY = 5;
        this.LeaderList.vScrollBarSkin = "";
        this.LeaderList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.LeaderList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离
        this.LeaderList.renderHandler = new Laya.Handler(this, this.onListRender);
    }

    public open(...args): void {
        this.initWindow(true,true,"邀请通知",488,566,27);
        super.open();
        this.noticeList = STeamData.instance.RequsetTeamInfos.values;
        this.LeaderList.array = this.noticeList;
    }

    private onListRender(cell:ui.main.TeamItem3UI,index:number) {
        HtmlUtils.setHtml(cell.NoticeText.style,3,18,"left","middle");
        var noticeContent = this.noticeList[index];
        var playerName = HtmlUtils.addColor(noticeContent.FromPlayerName , "#00b007",18) + HtmlUtils.addColor("邀请你加入","#8e5213" , 18);
        var mapName = "";
        var vo = Chapter_cfgVo.getBySceneNo(noticeContent.SceneNo);
        if(vo)
        {
            mapName =  HtmlUtils.addColor(vo.scene_name , "#00b007",18) + HtmlUtils.addColor("挂机队伍","#8e5213" , 18);
        }
        cell.NoticeText.innerHTML = playerName + mapName;
        cell.LvText.text = `Lv.${noticeContent.FromPlayerLv}`;
        cell.BattlePowerText.text = `战力:${noticeContent.BattlePower}`;
        var detalTime = GameUtils.TimeStamp - noticeContent.Time;
        var mm = "";
        if(detalTime < 60)
        {
            mm = "刚刚";
        }
        else
        {
            mm = `${TimerUtil.mm(detalTime)}分钟前`; 
        }
        cell.TimeText.text = mm;
        cell.AllowBtn.off(Laya.Event.CLICK , this , this.onClickAllowBtn);
        cell.AllowBtn.on(Laya.Event.CLICK , this , this.onClickAllowBtn , [noticeContent.FromPlayerId]);
    }

    private onClickAllowBtn(playerId:number)
    {
        STeamData.instance.protocol.BeRequestAllow(1,playerId);
        this.onClickAllCancelBtn();
        this.close();
    }

    public initEvent():void { 
        this.allCancelBtn.on(Laya.Event.CLICK , this , this.onClickAllCancelBtn)
    }

    public removeEvent():void {
        this.allCancelBtn.off(Laya.Event.CLICK , this , this.onClickAllCancelBtn)
    }

    private onClickAllCancelBtn() {
        this.LeaderList.array = null;
        STeamData.instance.RequsetTeamInfos.clear();
    }

    public close(): void {
        super.close();
        STeamData.instance.event(STeamEvent.TEAM_BE_REQUSET_INTO_TEAM);
    }
}
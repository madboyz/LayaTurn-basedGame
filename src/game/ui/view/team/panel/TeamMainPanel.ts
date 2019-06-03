import { STeamData, STeamEvent } from "../../../../team/STeamData";
import { S24050, S24050_1 } from "../../../../../net/pt/pt_24";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { MsgManager } from "../../../manager/MsgManager";
import { Delay } from "../../../../../framework/utils/Delay";
import { DropDown } from "../../../compent/DropDown";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { SChapterData } from "../../../../chapter/SChapterData";
import { SAoiData, SAoiEvent } from "../../../../aoi/SAoiData";
import { TeamUtil } from "../../../../team/TeamUtil";
import { SGameData } from "../../../../../net/data/SGameData";
import { SFriendData } from "../../../../../net/data/SFriendData";
import { Debug } from "../../../../../debug/Debug";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { RoleTeamState } from "../../../../team/TeamInfo";
import { PortalVo } from "../../../../../db/sheet/vo/PortalVo";

export enum TeamMainListType
{
    INVALID = 0,
    TeamList = 1,
    RoleList = 2,
}

export class TeamMainPanel extends ui.main.TeamMainPanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public ListType = TeamMainListType.INVALID;//0是队伍列表，1是队伍成员
    private TotalPage = 0;//总页数
    private PageIndex = 0;//当前页数
    private TeamListData = [];
    private RoleListData = [];
    private CanRefresh = true;
    private iSwaitTeamDataCallBack = false;//是否要等待下一页回来
    private ChapterList = [];
    private dropDown:DropDown;

    public update():void{
        
    }

    public initComp() {
        super.initComp();
        this.initList();
        HtmlUtils.setHtml(this.TipsTxt.style,3,18,"center","middle");
        if(this.dropDown)
        return;
        
        this.dropDown = new DropDown(this.mapBtn.sizeGrid,"comp/img_combatBg.png",this.mapBtn , 430, 7
        ,new Laya.Handler(this, this.MapSelectMouse),new Laya.Handler(this, this.MapSelectRender),
        ui.main.TeamItem2UI , 1 , 10 , 426 , 53);
        this.addChild(this.dropDown);
        this.ChapterList = Chapter_cfgVo.getAll();
        this.dropDown.array = this.ChapterList;
    }

    private MapSelectMouse(e:Event,index:number) {
        if(e.type != Laya.Event.CLICK)
        return;
        var data:Chapter_cfgVo = this.ChapterList[index];
        this.mapBtn.label = data.scene_name;
        //if(!GameConfig.GAME_DEBUG)
        //{
            var lv = SRoleData.instance.info.Lv;
            var chapterId = data.no;
            if((chapterId <= SChapterData.instance.chapter.chapterId&&SGameData.instance.PLAYFIGHTREPORT == false)&&
            (lv >= SChapterData.instance.chapter.sheetChapterData.lv_limit))
            {
               //if(this.chapterData.scene_no != SChapterData.instance.chapter.sheetChapterData.scene_no)
                this.GotoScene(data.scene_no);
            }
            else
            {
                MsgManager.instance.showRollTipsMsg("进入条件不符合！");
                UIManager.instance.closeUI(UIID.SYS_TEAM);
            }
        //}
        //else
        //this.GotoScene(data.scene_no);
    }

    private GotoScene(scene_no)
    { 
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            MsgManager.instance.showRollTipsMsg("战斗中！");
            return;
        }
        var vo:PortalVo = PortalVo.getBySceneNo(scene_no);
        if(vo&&vo.target_xy)
        {
            var TransferPoint = {x:vo.target_xy[0],y:vo.target_xy[1]};
            SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [scene_no , TransferPoint.x , TransferPoint.y]);
            UIManager.instance.closeUI(this.index);
        }
    } 

    private MapSelectRender(item:ui.main.TeamItem2UI,index:number)
    {
        var cell:component.ScaleButton = item.Btn;
        var data:Chapter_cfgVo = this.ChapterList[index];
        if(data.scene_no == SRoleData.instance.info.SceneNo)
        {
            cell.skin = "comp/btn_bg5.png";
        }
        else
        {
            cell.skin = "comp/btn_bg4.png";
        }
        cell.label = data.scene_name;
    }

    private initList():void {
        this.TeamList.itemRender = ui.main.TeamItem1UI;
        this.TeamList.vScrollBarSkin = "";
        this.TeamList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.TeamList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离
       
    }

    public DisplayerCreateBtn()
    {
        this.CreateBtn.disabled =  SRoleData.instance.info.TeamId != 0? true:false;
    }

    public DisplayerFindBtn()
    {
        var _gray = true;
        if(SRoleData.instance.info.IsLeader == 1&&STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.values.length < 3)
        {
            _gray = false;
        }
        else
        {
            _gray = true;
        }
        this.FindBtn.disabled  = _gray;
    }

    public DisplayerRefreshBtn()
    {
        var IsCreate =  SRoleData.instance.info.TeamId != 0? true:false;
        Laya.timer.clear(this ,this.RefereshCoolDown);
        if(IsCreate)
        {
            if(SRoleData.instance.info.IsLeader)
            {
                this.Refresh.label = "召唤队员";
            }
            else
            {
                this.Refresh.label = "归队";
            }
        }
        else
        {
            this.Refresh.label = "刷新";
        }
    }

    public open(...args): void {
        this.initWindow(true,true,"组队挂机",550,750,35);
        super.open();
        this.TeamList.array = null;
        var vo = Chapter_cfgVo.getBySceneNo(SRoleData.instance.info.SceneNo);
        this.mapBtn.label = vo == null?"":vo.scene_name;

        /**
         * 测试代码 用来测试获取button回调处理
         */
        //var callList = this.FindBtn["_$0__events"][Laya.Event.CLICK];
        //for (let i = 0; i < callList.length; i++) {
        //    const element:laya.events.EventHandler = callList[i];
        //    if(element.caller instanceof UIBase)
        //    {
        //        element.method.apply(element.caller ,element.args);
        //    }
        //}
    }

    public initEvent():void { 
        this.TeamList.renderHandler = new Laya.Handler(this, this.onListRender);
        this.TeamList.scrollBar.changeHandler = new Laya.Handler(this, this.onSelectListIndex)
        this.CreateBtn.on(Laya.Event.CLICK , this , this.onClickCreateTeamBtn);
        this.FindBtn.on(Laya.Event.CLICK , this , this.onClickFindRoleBtn);
        this.Refresh.on(Laya.Event.CLICK , this , this.onClickRefreshBtn);
        this.mapBtn.on(Laya.Event.CLICK , this , this.onClickMapBtn);
    }

    public removeEvent():void {
        this.CreateBtn.off(Laya.Event.CLICK , this , this.onClickCreateTeamBtn);
        this.FindBtn.off(Laya.Event.CLICK , this , this.onClickFindRoleBtn);
        this.Refresh.off(Laya.Event.CLICK , this , this.onClickRefreshBtn);
        this.mapBtn.off(Laya.Event.CLICK , this , this.onClickMapBtn);
        this.TeamList.renderHandler = null;
        this.TeamList.scrollBar.changeHandler = null;
    }

    public onTeamList(data:S24050)
    {
        this.PageIndex = data.PageIndex;
        
        if(data.PageIndex == 1)
        {
            this.TotalPage = 0;//总页数
            this.TeamListData = [];
            this.TeamList.array = null;
        }
        
        
        if(this.TotalPage != data.TotalPage)
        {
            this.TotalPage = data.TotalPage;
            this.TeamListData = [];
            var TeamInfo = {};
            for (let i = 0; i <  data.item_1.length; i++) {
                const element = data.item_1[i];
                TeamInfo = {};
                TeamInfo = {TeamId:element.TeamId , MemberCount:element.MemberCount , LeaderId:element.LeaderId
                        ,SceneNo:element.SceneNo , TeamName:element.TeamName , LeaderName:element.LeaderName , Sex:element.Sex
                    ,Level:element.Level , Faction:element.Faction};
                this.TeamListData.push(TeamInfo);
            }
            this.TeamList.array = this.TeamListData;
        }
        else
        {

            for (let i = 0; i <  data.item_1.length; i++) {
                const element = data.item_1[i];
                TeamInfo = {};
                TeamInfo = {TeamId:element.TeamId , MemberCount:element.MemberCount , LeaderId:element.LeaderId
                        ,SceneNo:element.SceneNo , TeamName:element.TeamName , LeaderName:element.LeaderName , Sex:element.Sex
                    ,Level:element.Level};
                //this.TeamListData.push(TeamInfo);var aoiData = SAoiData.instance.AoiPlayers.get(element.LeaderId);
              
                this.TeamList.addItem(TeamInfo);
                
            }
            this.iSwaitTeamDataCallBack = false;
        }
        
    }
    //更新在队伍内的数据
    public TeamRoleUpdateData()
    {
        this.RoleListData = [];
        for (let i = 0; i < STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.values.length; i++) {
            const element = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.values[i];
            this.RoleListData.push(element);
        }
        var haveCount = 3 - this.RoleListData.length;
        this.RoleListData.sort((a,b):number=>{
            if(a.leader || b.leader)
            {
                if(!a.leader && b.leader)
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            }
            else
            {
                if(a.trainPos < b.trainPos)
                {
                    return -1;
                }
                return 1;
            }
           });
        
        if(this.RoleListData.length == 0)
        {
            this.TipsTxt.visible = false;  
        }
        else
        {
            this.TipsTxt.visible = true;  
            if (this.RoleListData.length == 1)
            {
                this.TipsTxt.innerHTML = HtmlUtils.addColor("(招募队友打怪可获得额外经验加成)","Red",18);
            }
            else
            {   
                var percent = this.RoleListData.length*100;
            
                this.TipsTxt.innerHTML = HtmlUtils.addColor(`(目前${this.RoleListData.length}人组队，获得`,"Red",18)
                +HtmlUtils.addColor(`${percent}%`,"Green",18) + HtmlUtils.addColor("经验加成)","Red",18);
            }
        }
        if(SRoleData.instance.info.IsLeader == 1)
        {
            for (let i = 0; i < haveCount; i++) {
                this.RoleListData.push({});//加入空数据
            }
        }
        this.TeamList.array = this.RoleListData;
    }

    public UpdateOnePlayer(playerId:number)
    {

    }

    private onSelectListIndex(value:number)
    {
        if(this.TeamList.scrollBar.max == 0)
        return;
        if(this.PageIndex == this.TotalPage)
        return;

        if(value > this.TeamList.scrollBar.max&&!this.iSwaitTeamDataCallBack)
        {
            this.iSwaitTeamDataCallBack = true;
            STeamData.instance.protocol.FindSceneTeam(SRoleData.instance.info.SceneNo , 6 , this.PageIndex + 1);
        }
    }

    private onListRender(cell:ui.main.TeamItem1UI,index:number) {
        switch(this.ListType)
        {
            case TeamMainListType.TeamList:
            {
                this.DisplayerTeamList(cell , this.TeamListData[index]);
                break;
            }
            case TeamMainListType.RoleList:
            {
                this.DisPlayerRoleInfo(cell , this.RoleListData[index]);
                break;
            }

        }
    }

    private DisPlayerRoleInfo(cell:ui.main.TeamItem1UI , roleInfo:any)
    {
        cell.TeamCountText.text = "";
        cell.TeamCountText.color = "#14b116";
        if(roleInfo.roleId)
        {
            
            var friend = SFriendData.instance.getFriendInfo(roleInfo.roleId);
            var friendShip = "";
            if(friend)
            {
                friendShip = `亲密度:${friend.Intimacy}`;
            }
            cell.FriendshipText.text = friendShip;
            cell.AddBtn.off(Laya.Event.CLICK , this  ,this.onClickAddBtn);
            cell.AddBtn.visible = false;
            cell.isLeaderFlag.visible = roleInfo.leader;
            cell.NameText.text = roleInfo.name;
            cell.LvText.text = "Lv."+roleInfo.level;
            cell.BattlePowerText.text = `战力:${roleInfo.battlePower}`;
            cell.ActionBtn.off(Laya.Event.CLICK , this  ,this.onClickItemActionBtn);
            cell.ActionBtn.on(Laya.Event.CLICK , this  ,this.onClickItemActionBtn , [roleInfo]);
            cell.RoleIcon.skin = FactionVo.get(roleInfo.faction).head_icon[roleInfo.sex-1];
            if(SRoleData.instance.roleId == roleInfo.roleId)
            {
                cell.ActionBtn.visible = true;
                cell.ActionBtn.label = "离队";
            }
            else
            {
                if( SRoleData.instance.info.IsLeader == 1)
                {
                    cell.ActionBtn.visible = true;
                    cell.ActionBtn.label = "请离";
                }
                else
                {
                    cell.ActionBtn.visible = false;
                }
                if(roleInfo.state == RoleTeamState.MB_STATE_IN) {
                    cell.TeamCountText.text = "在线";
                    cell.TeamCountText.color = "#14b116";
                }else if (roleInfo.state == RoleTeamState.MB_STATE_TEM_LEAVE){
                    cell.TeamCountText.text = "暂离";
                    cell.TeamCountText.color = "#ff0000";
                }else if (roleInfo.state == RoleTeamState.MB_STATE_OFFLINE){
                    cell.TeamCountText.text = "离线";
                    cell.TeamCountText.color = "#a8a8a8";
                }
            }


        }
        else
        {
            cell.isLeaderFlag.visible = false;
            cell.FriendshipText.text = "";
            cell.ActionBtn.visible = false;
            cell.AddBtn.off(Laya.Event.CLICK , this  ,this.onClickAddBtn);
            cell.AddBtn.on(Laya.Event.CLICK , this  ,this.onClickAddBtn);
            cell.AddBtn.visible = true;
            cell.NameText.text = "";
            cell.LvText.text = "点击邀请队员";
            cell.BattlePowerText.text = "";
        }
    }
    //{TeamId:element.TeamId , MemberCount:element.MemberCount , LeaderId:element.LeaderId
    //,SceneNo:element.SceneNo , TeamName:element.TeamName , LeaderName:element.LeaderName , Sex:element.Sex
    //,Level:element.Level};
    private DisplayerTeamList(cell:ui.main.TeamItem1UI , teamInfo:S24050_1)
    {
        cell.isLeaderFlag.visible = false;
        cell.AddBtn.off(Laya.Event.CLICK , this  ,this.onClickAddBtn);
        cell.AddBtn.visible = false;
        if(teamInfo&&teamInfo.TeamName)
        {
            cell.NameText.text = teamInfo.TeamName;
            cell.LvText.text = "Lv."+teamInfo.Level;
            cell.FriendshipText.text = "";
            cell.BattlePowerText.text = "";
            cell.ActionBtn.visible = true;
            cell.ActionBtn.label = "加入";
            cell.ActionBtn.off(Laya.Event.CLICK , this  ,this.onClickItemActionBtn);
            cell.ActionBtn.on(Laya.Event.CLICK , this  ,this.onClickItemActionBtn , [teamInfo]);
            cell.TeamCountText.text = `${teamInfo.MemberCount}/3`;
            cell.TeamCountText.color = "#14b116";
            cell.RoleIcon.skin = FactionVo.get(teamInfo.Faction).head_icon[teamInfo.Sex-1];
        }
    }

    private onClickAddBtn()
    {
        UIManager.instance.openUI(UIID.SYS_TEAM_REQUEST);
    }

    private onClickItemActionBtn(data:any)
    {
        switch(this.ListType)
        {
            case TeamMainListType.TeamList:
            {
                STeamData.instance.protocol.JoinTeam(data.LeaderId);
                break;
            }
            case TeamMainListType.RoleList:
            {
                if(data.roleId == SRoleData.instance.roleId)
                {
                    STeamData.instance.protocol.QuitTeam();
                }
                else
                {
                    STeamData.instance.protocol.LeaderKickPlayer(data.roleId);
                }
                break;
            }

        }
    }

    private onClickCreateTeamBtn()
    {
        if(SRoleData.instance.info.TeamId != 0)
        {
            MsgManager.instance.showRollTipsMsg("已有队伍！");
            return;
        }
        var str = `${SRoleData.instance.roleInfo.Name}的队伍`;
        STeamData.instance.protocol.CreateTeam(SRoleData.instance.info.SceneNo,str);
    }

    private noti: Notice = new Notice();
    private onClickFindRoleBtn(data:any)
    {
        var msg:string =  "#00fff0" + SRoleData.instance.roleInfo.Name + "#ffffff" + "的" + "#00fff0" + this.mapBtn.label
         + "#ffffff" + "的挂机队伍正在招募队员" + "#00ff00"
         + "#00ff00" + "<MsgObj>event," + "joinTeam:" + SRoleData.instance.roleInfo.Name + ":" + this.mapBtn.label + ":" + SRoleData.instance.roleId + ",【加入队伍】</MsgObj>";
        var type:number = ChatChannel.WORLD;
        this.noti.send(NotityData.create(NotityEvents.CHAT_SENDMSG,[msg,type]));
    }

    private onCallAllPlayer()
    {
        for (let i = 0; i < STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.values.length; i++) {
            const element = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.values[i];
            if(element.roleId !=  SRoleData.instance.roleId)
            {
                STeamData.instance.protocol.RequsetCallBackTeam(element.roleId);
            }
        }
    }
    private onClickMapBtn()
    {
        if(SRoleData.instance.info.TeamId != 0 && SRoleData.instance.info.IsLeader == 0)
        {
            MsgManager.instance.showRollTipsMsg("你不是队长，无法切换挂机地图");
            return;
        }
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            MsgManager.instance.showRollTipsMsg("战斗中无法切换场景");
            return;
        }
        var index = 0;
        for (let i = 0; i < this.ChapterList.length; i++) {
            var data:Chapter_cfgVo = this.ChapterList[i];
            if(data.scene_no == SRoleData.instance.info.SceneNo)
            {
                index = i;
                break;
            }
        }

      
    
        this.dropDown.open(index);
    }

    private onClickRefreshBtn()
    {
        switch(this.Refresh.label)
        {
            case "召唤队员":
            {
                this.onCallAllPlayer();
                break;
            }
            case "归队":
            {
                STeamData.instance.protocol.CallBackTeam(SRoleData.instance.info.TeamId);
                break;
            }
            case "刷新":
            {
                if(this.CanRefresh)
                {
                    this.TotalPage = 0;
                    this.PageIndex = 0;
                    STeamData.instance.protocol.FindSceneTeam(SRoleData.instance.info.SceneNo , 6 , 1);
                    Laya.timer.clear(this ,this.RefereshCoolDown);
                    Laya.timer.loop(10000 , this , this.RefereshCoolDown);
                    this.CanRefresh = false;

                }
                else
                {
                    MsgManager.instance.showRollTipsMsg("大侠您手速太快,请稍作休息一会儿！");
                }
                
                break;
            }
        }
    }

    private RefereshCoolDown()
    {
        this.CanRefresh = true;
    }



    public close(): void {
        this.TotalPage = 0;
        this.PageIndex = 0;
        this.TeamList.array = null;
        this.dropDown.Hide();
        Laya.timer.clear(this ,this.RefereshCoolDown);
        super.close();
    }
}   
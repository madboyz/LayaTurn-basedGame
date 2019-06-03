import { TabBar } from "../../../compent/TabBar";
import { SAoiData } from "../../../../aoi/SAoiData";
import { STeamData } from "../../../../team/STeamData";
import { GameUtils } from "../../../../utils/GameUtils";
import { MsgManager } from "../../../manager/MsgManager";
import { Debug } from "../../../../../debug/Debug";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { SFriendData, SFriendEvent } from "../../../../../net/data/SFriendData";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { CommonControl } from "../../../../common/control/CommonControl";
import { SGuildData, SGuildEvent } from "../../guild/data/SGuildData";
import { SRoleData } from "../../../../../net/data/SRoleData";

export enum ListType
{
    Aoi = 0,
    Friends,
    Guild,
}

export class TeamRequsetPanel extends ui.main.TeamRequsetPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private mTab:TabBar;
    private mListType:ListType = ListType.Aoi;
    public readonly RequesetTime = 60;
    public update():void{
        
    }
    private roleList = [];
    public initComp() {
        super.initComp();
        this.initList();
        this.initTab();
    }

    private initList():void {
        this.TeamRequestList.itemRender = ui.main.TeamItem1UI;
        this.TeamRequestList.spaceX = 0;
        this.TeamRequestList.spaceY = -5;
        this.TeamRequestList.repeatX = 1;
        this.TeamRequestList.repeatY = 5;
        this.TeamRequestList.vScrollBarSkin = "";
        this.TeamRequestList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.TeamRequestList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离
        this.TeamRequestList.renderHandler = new Laya.Handler(this, this.onListRender);
    }

    public open(...args): void {
        this.initWindow(true,true,"邀请队员",488,582,135);
        super.open();
        
        this.mListType = ListType.Aoi;
        this.mTab.select = 0;
    }

    private onListRender(cell:ui.main.TeamItem1UI,index:number) {
        var playerName = "";
        var playerLevel  = 0;
        var playerId = 0;
        var faction = 1;
        var sex = 1;
        cell.scaleX = cell.scaleY = 0.92;
        switch(this.mListType)
        {
            case ListType.Aoi:
            {
                playerName = this.roleList[index].PlayerName;
                playerLevel = this.roleList[index].Lv;
                playerId = this.roleList[index].Id;
                faction = this.roleList[index].Faction;
                sex = this.roleList[index].Sex;
                cell.FriendshipText.text = "";
                break;
            }
            case ListType.Friends:
            {
                playerName = this.roleList[index].Name;
                playerLevel = this.roleList[index].Lv;
                playerId = this.roleList[index].PlayerId;
                faction = this.roleList[index].Faction;
                sex = this.roleList[index].Sex;
                cell.FriendshipText.text = `亲密度:${this.roleList[index].Intimacy}`;
                break;
            }
            case ListType.Guild:
            {
                playerName = this.roleList[index].Name;
                playerLevel = this.roleList[index].Lv;
                playerId = this.roleList[index].PlayerId;
                faction = this.roleList[index].Faction;
                sex = this.roleList[index].Sex;
                cell.FriendshipText.text = "";
                break;
            }
        }
        cell.AddBtn.visible = false;
        cell.isLeaderFlag.visible = false;
        cell.TeamCountText.visible = false;
        cell.ActionBtn.label = "邀请";
        cell.NameText.text = playerName;
        cell.LvText.text = `Lv.${playerLevel}`;
        cell.BattlePowerText.text = "";
        cell.RoleIcon.skin = FactionVo.get(faction).head_icon[sex-1];

        cell.ActionBtn.off(Laya.Event.CLICK , this, this.onRequsetBtn);
        cell.ActionBtn.on(Laya.Event.CLICK , this, this.onRequsetBtn , [playerId ,cell.ActionBtn]);
        var time = STeamData.instance.LeaderRequsetTime.get(playerId);
        var canReuset = this.CanRequset(time);
        if(canReuset)
        {
            cell.ActionBtn.disabled = false;
        }
        else
        {
            cell.ActionBtn.disabled = true;
        }
    }

    private CanRequset(time)
    {
        if(!time||(GameUtils.TimeStamp -time >= this.RequesetTime))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private onRequsetBtn(playerId:number  , actionBtn:Laya.Button)
    {
        if(playerId == 0)
        return;
        var time = STeamData.instance.LeaderRequsetTime.get(playerId);
        var canReuset = this.CanRequset(time);
        if(canReuset)
        {
            if(!time)
            {
                STeamData.instance.LeaderRequsetTime.set(playerId , GameUtils.TimeStamp);
            }
            else
            {
                time = GameUtils.TimeStamp;
            }
            STeamData.instance.protocol.RequsetJoinTeam(playerId);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("大侠您休息一会儿吧~");
        }
        actionBtn.disabled = true;
    }

    private initTab():void
    {
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_1,this.btn_2 , this.btn_3]);
            this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        }
    }

    public initEvent():void { 
        this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        SFriendData.instance.on(SFriendEvent.INIT_RRIEND_LIST,this,this.freindDataRefresh);
        SGuildData.instance.on(SGuildEvent.ANS_GUILD_MENBERLIST,this,this.freindDataRefresh);
    }
    
    public removeEvent():void {
        this.mTab.off(Laya.Event.CHANGE,this,this.onTabChange);
        SFriendData.instance.off(SFriendEvent.INIT_RRIEND_LIST,this,this.freindDataRefresh);
        SGuildData.instance.off(SGuildEvent.ANS_GUILD_MENBERLIST,this,this.freindDataRefresh);
    }
    /**
     * 获取aoi中不是队伍的玩家
     */
    private get AoiNoTeamRole():any[]
    {
        var roles = [];
        var length = GameConfig.GAME_AOI_MAX_COUNT;
        if(length > SAoiData.instance.AoiPlayers.values.length)
        {
            length =  SAoiData.instance.AoiPlayers.values.length;
        }
        for (let i = 0; i < length; i++) {
            const element = SAoiData.instance.AoiPlayers.values[i];
            if(element&&element.TeamId == 0)
            {
                roles.push(element);
            }
        }
        //test
        //for (let i = 0; i < GameConfig.GAME_AOI_MAX_COUNT; i++) {
        //    var data:S12002_1 = new S12002_1();
        //    data.PlayerName = "傻屌"+i;
        //    data.Lv = 1;
        //    data.Id = 100000+i;
        //    roles.push(data);
        //}
        return roles;
    }


    private get FriendsRole():any[]
    {
        var roles = [];
        var friendsList = SFriendData.instance.friendList;
        for (let i = 0; i < friendsList.length; i++) {
            const element = friendsList[i];
            if(element.Online == 0){
                roles.push(element);
            }
        }
        return roles;
    }

    private get GuildRole():any[]
    {
        var roles = [];
        if(SRoleData.instance.info.GuildId == 0 ){
            return roles;
        }
        if(!SGuildData.instance.menberList){
            SGuildData.instance.protocol.send40010(1);
            return roles;
        }
        var guildList = SGuildData.instance.menberList.item_1;
        for (let i = 0; i < guildList.length; i++) {
            const element = guildList[i];
            if(element.Online == 0 && element.PlayerId != SRoleData.instance.info.PlayerId){
                roles.push(element);
            }
        }
        return roles;
    }

    public RefreshIndex()
    {
        var index = - 1;
        for (let i = 0; i < this.roleList.length; i++) {
            const data =  this.roleList[i];
            var time = STeamData.instance.LeaderRequsetTime.get(data.Id);
            if(time&&GameUtils.TimeStamp - time == this.RequesetTime)
            {
                index = i;
                break;
            }
        }

        if(index == -1)
        return;
        if(index >=this.TeamRequestList.startIndex && index<= this.TeamRequestList.startIndex + this.TeamRequestList.repeatY)
        {
            this.TeamRequestList.startIndex = this.TeamRequestList.startIndex;
        }
        
    }
    private getPlayerId(info:any)
    {
        var id:number = 0;
        switch(this.mListType)
        {
            case ListType.Aoi:
            {
                id = info.Id;
                break;
            }
            case ListType.Friends:
            {
                id = info.PlayerId;
                break;
            }
            case ListType.Guild:
            {
                id = info.PlayerId;
                break;
            }
        }
        return id;
    }

    private freindDataRefresh():void{
        this.refreshList();
    }

    private onTabChange(index:number) {
        this.mListType = index;
        this.refreshList();
        if(index == ListType.Friends){
            CommonControl.instance.send14000();//好友列表
        }
    }

    private refreshList():void{
        //刷新列表
        this.roleList = [];
        switch(this.mListType)
        {
            case ListType.Aoi:
            {
                this.roleList = this.AoiNoTeamRole;
                break;
            }
            case ListType.Friends:
            {
                this.roleList = this.FriendsRole;
                break;
            }
            case ListType.Guild:
            {
                this.roleList = this.GuildRole;
                break;
            }
        }
        //处理邀请cd
        var length = STeamData.instance.LeaderRequsetTime.keys.length;
        for (let i = 0; i < length; i++) {
            const key = STeamData.instance.LeaderRequsetTime.keys[i];
            if(!key)
            continue;
            var find = false;
            for (let j = 0; j < this.roleList.length; j++) {
                const element = this.roleList[j];
                if(this.getPlayerId(element) == key)
                {
                    find = true;
                    break;
                }
            }
            if(!find)
            {
                STeamData.instance.LeaderRequsetTime.remove(key);
            }
        }
        this.TeamRequestList.array = this.roleList;
        this.noDataBox.visible = this.roleList.length <= 0;
    }

    public close(): void {
        super.close();
        this.TeamRequestList.array = null;
    }
}
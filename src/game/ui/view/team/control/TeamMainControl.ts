import { TeamMainPanel, TeamMainListType } from "../panel/TeamMainPanel";
import { STeamData, STeamEvent } from "../../../../team/STeamData";
import { S24050, S24050_1 } from "../../../../../net/pt/pt_24";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class TeamMainControl extends BaseControl {
    constructor(){
        super();
        this.panel = new TeamMainPanel();
    }
    openView(...args) {
        this.initEvent();
        if(SRoleData.instance.info)
        {
            if(SRoleData.instance.info.TeamId != 0)
            {
                this.onRoleInfoTeam();
            }
            else
            {
                STeamData.instance.protocol.FindSceneTeam(SRoleData.instance.info.SceneNo , 6 , 1);
            }
        }
        
    }

    public set panel(value: TeamMainPanel) {
        this.mPanel = value;
    }
    public get panel(): TeamMainPanel {
        return this.mPanel as TeamMainPanel;
    }
    private initEvent() {
        
        STeamData.instance.on(STeamEvent.TEAM_LIST_UPDATE ,this , this.onTeamList);
        STeamData.instance.on(STeamEvent.TEAM_ROLE_UPDATE ,this , this.onRoleInfoTeam);
    }

    private onRoleInfoTeam()
    {
        
        if(SRoleData.instance.info.TeamId == 0)
        {
            STeamData.instance.protocol.FindSceneTeam(SRoleData.instance.info.SceneNo , 6 , 1);
            return;
        }
        this.panel.DisplayerCreateBtn();
        this.panel.DisplayerRefreshBtn();
        this.panel.DisplayerFindBtn();
        this.panel.ListType = TeamMainListType.RoleList;
        this.panel.TeamRoleUpdateData();

    }

    private onTeamList(data:S24050)
    {
        this.panel.DisplayerCreateBtn();
        this.panel.DisplayerRefreshBtn();
        this.panel.DisplayerFindBtn();
        this.panel.ListType = TeamMainListType.TeamList;
        //测试数据
        //if(data.TotalPage == 0)
        //{
        //    data.TotalPage = 3;
        //    for (let i = 0; i < 6; i++) {
        //        var item:S24050_1 = new S24050_1();
        //        item.TeamId = (data.PageIndex-1)*6+i+1;
        //        item.LeaderId = (data.PageIndex-1)*6+i+1;
        //        item.TeamName = "傻屌的队伍"+item.TeamId;
        //        item.LeaderName = "傻屌"+item.TeamId;
        //        item.Sex = 1;
        //        item.SceneNo = SRoleData.instance.info.SceneNo;
        //        item.Level = 1;
        //        item.MemberCount = 1;
        //        data.item_1.push(item);
        //    }
        //}
        
        this.panel.onTeamList(data);
    }

    private removeEvent() {
        
        STeamData.instance.off(STeamEvent.TEAM_LIST_UPDATE ,this , this.onTeamList);
        STeamData.instance.off(STeamEvent.TEAM_ROLE_UPDATE ,this , this.onRoleInfoTeam);
    }
    closeView() {
        this.removeEvent();
        super.closeView();
    }

}
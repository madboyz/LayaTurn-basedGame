import { BaseItem } from "../../../compent/BaseItem";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { ItemData } from "../../../compent/data/ItemData";
import { AwardUtil } from "../../../../award/AwardUtil";
import { SAoiData, SAoiEvent } from "../../../../aoi/SAoiData";
import { SChapterData } from "../../../../chapter/SChapterData";
import { SGameData } from "../../../../../net/data/SGameData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { Chapter } from "../../../../chapter/Chapter";
import { STeamData } from "../../../../team/STeamData";
import { RoleTeamState } from "../../../../team/TeamInfo";
import { MsgManager } from "../../../manager/MsgManager";
import { PortalVo } from "../../../../../db/sheet/vo/PortalVo";

export class MapSelectPanel extends ui.main.MapSelectPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }
    private chapterId = 0;
    private levelId = 0;
    private goods:Array<ItemData> = [];
    private chapterData:Chapter_cfgVo;

    public initComp() {
        super.initComp();
        this.initList();
        HtmlUtils.setHtml(this.conditionTxt.style,3,20,"center","middle");
    }

    private initList():void
    {
        this.AwardList.itemRender = BaseItem;
        this.AwardList.spaceX = 60;
        this.AwardList.spaceY = 60;
        this.AwardList.repeatX = 4;
        this.AwardList.repeatY = 2;
        this.AwardList.vScrollBarSkin = "";
        this.AwardList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.AwardList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.AwardList.renderHandler = new Laya.Handler(this, this.onListRender);
    }
    

    public update():void
    {
       
    }

    public open(...args): void {
        this.chapterId = args[0];
        //this.levelId = args[1];
        this.chapterData = Chapter_cfgVo.get(this.chapterId);
        var str:string = "挂机奖励";
        if(this.chapterData)
        str = this.chapterData.scene_name;
        this.initWindow(true,true,str,489,509,220);
        this.Title = str;
        super.open();
        this.goods = [];
        this.goods = AwardUtil.GetNormalGoodsList(this.chapterData.show_reward);
        var lv = SRoleData.instance.info.Lv;
        if(this.chapterId > SChapterData.instance.chapter.chapterId)
        {
            str = Chapter.GetconditionText(this.chapterId);
            if(str != "")
            {
                this.conditionTxt.innerHTML = HtmlUtils.addColor(`进入条件：通关${str}`,"#8e5213",20) + HtmlUtils.addColor(`的BOSS`,"Red",20);
            }
            else
            {
                this.conditionTxt.innerHTML = "";
            }
            
        }
        else if(lv < SChapterData.instance.chapter.sheetChapterData.lv_limit)
        {
            this.conditionTxt.innerHTML = HtmlUtils.addColor(`进入条件：需要等级`,"#8e5213",20) + HtmlUtils.addColor(`${SChapterData.instance.chapter.sheetChapterData.lv_limit}级`,"Red",20);
        }
        else
        {
            this.conditionTxt.innerHTML = "";
        }
        this.AwardList.array = this.goods;
        var str:string = this.chapterData.dec;
        var index = str.search("挂机经验");
        var str1 = str.slice(0,index);
        var str2 = str.slice(index,str.length);
        this.DesText.text = str1 + "  "+ str2;
    }

    public initEvent():void {
        this.okBtn.on(Laya.Event.CLICK , this, this.OnClickOKBtn);
    }

    public removeEvent():void {
        this.okBtn.off(Laya.Event.CLICK , this, this.OnClickOKBtn);
    }
    

    private OnClickOKBtn()
    {
        if(!this.chapterData)
        return;
        var lv = SRoleData.instance.info.Lv;
        if(!GameConfig.GAME_DEBUG)
        {
            if( (this.chapterId <= SChapterData.instance.chapter.chapterId&&SGameData.instance.PLAYFIGHTREPORT == false)&&
            (lv >= SChapterData.instance.chapter.sheetChapterData.lv_limit))
            {
               //if(this.chapterData.scene_no != SChapterData.instance.chapter.sheetChapterData.scene_no)
                this.GotoScene();
            }
            else
            {
                MsgManager.instance.showRollTipsMsg("进入条件不符合！");
                UIManager.instance.closeUI(this.index);
                UIManager.instance.closeUI(UIID.SYS_CHAPTER_MAP);
            }
        }
        else
        this.GotoScene();
    }

    private GotoScene()
    {
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            MsgManager.instance.showRollTipsMsg("战斗中无法进行该操作!");
            return;
        }
        var local = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
        if(SRoleData.instance.info.TeamId != 0 && SRoleData.instance.info.IsLeader == 0&&(local&&local.state != RoleTeamState.MB_STATE_TEM_LEAVE))
        {
            STeamData.instance.protocol.TmpLeaveTeam();
        }
        var vo:PortalVo = PortalVo.getBySceneNo(this.chapterData.scene_no);
        if(vo&&vo.target_xy)
        {
            var TransferPoint = {x:vo.target_xy[0],y:vo.target_xy[1]};
            SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [this.chapterData.scene_no , TransferPoint.x , TransferPoint.y]);
            UIManager.instance.closeUI(this.index);
            UIManager.instance.closeUI(UIID.SYS_CHAPTER_MAP);
        }
        
        
    }

    private onListRender(cell:BaseItem,index:number) {
        var item:ItemData = this.goods[index];
        if(!item)
        return;
        cell.setItemStyle(80);
        //去掉掉落物品名字
        // cell.showName(item.clientInfo.name ,18 ,"#8e5213");
        cell.itemData = item;
        cell.isShowToolTip = true;
        cell.toolTipData = item;
    }

    public removeSelf():any
    {
        this.removeEvent();
        super.removeSelf();
    }
}
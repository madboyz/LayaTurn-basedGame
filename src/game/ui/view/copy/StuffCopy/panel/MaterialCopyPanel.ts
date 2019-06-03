import { MsgManager } from "../../../../manager/MsgManager";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { SCopyEvent, SCopyData } from "../../../../../../net/data/SCopyData";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { SGameData } from "../../../../../../net/data/SGameData";
import { StuffCopyItem } from "../item/StuffCopyItem";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { STeamData } from "../../../../../team/STeamData";
import { Alert } from "../../../../compent/Alert";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { SRechargeData } from "../../../recharge/data/SRechargeData";

export class MaterialCopyPanel extends ui.main.MaterialCopyPanelUI{
    constructor() {
        super();
    }

    public initComp():void
    {
        this.initEvent();
        this.initList();
        this.requestInfo();
        this.updateData();
    }

    private initList():void
    {
        this.list.itemRender = StuffCopyItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this.list.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);
        // this.list.array = FbVo.getListByType(CopyType.MATERIAL);
    }

    private requestInfo():void
    {
        CommonControl.instance.send57003(CopyType.MATERIAL);
    }

    private initEvent():void
    {

    }

    private removeEvent():void
    {
        
    }

    public updateData():void
    {
        this.updateList();
    }

    private updateList():void
    {        
        var tempList = FbVo.getListByType(CopyType.MATERIAL);
        var useList = [];
        for (let i = 0; i < tempList.length; i++) {
            var ele = tempList[i];
            if(ele.lv_limit <= SRoleData.instance.info.Lv + 0){
                useList.push(ele);
            }
        }
        this.list.array = useList;
        this.list.refresh();
    }

    private selectInfo:StuffCopyItem;
    private onListChangeHandler():void
    {
        this.selectInfo = this.list.getCell(this.list.selectedIndex) as StuffCopyItem;
    }

    private onClickSkill(e:Laya.Event):void
    {
        if(e.type != Laya.Event.CLICK)
        {
            return;
        }

        if(e.target instanceof component.ScaleButton)
        {
            if(this.selectInfo.canEnter)
            {
                if(this.selectInfo.canSweep == false)
                {
                    if(SRoleData.instance.info.TeamId != 0)
                    {
                        Alert.show(HtmlUtils.addColor("队伍状态无法进入，是否离开队伍？", "#8a5428", 20), this, () => {
                            STeamData.instance.protocol.QuitTeam()
                        }, null, null, null, true, "提示");
                        // MsgManager.instance.showRollTipsMsg("正在组队中不能进入副本！");
                    }
                    else
                    {   
                        SCopyData.instance.copyType = CopyType.MATERIAL;
                        this.parent.event(SCopyEvent.COPY_REQUEST_ENTER,[this.selectInfo.dataSource.no]);
                    }
                }
                else
                {
                    if(SRoleData.instance.info.TeamId != 0)
                    {
                        Alert.show(HtmlUtils.addColor("队伍状态无法进入，是否离开队伍？", "#8a5428", 20), this, () => {
                            STeamData.instance.protocol.QuitTeam()
                        }, null, null, null, true, "提示");
                        // MsgManager.instance.showRollTipsMsg("正在组队中不能进入副本！");
                    }
                    else
                    {   
                        var haveYueka = SRechargeData.instance.haveYueka();
                        if(haveYueka){
                            SCopyData.instance.oneKeyShaodang(CopyType.MATERIAL);
                        }else{
                            this.parent.event(SCopyEvent.COPY_REQUEST_SWEEP,[this.selectInfo.dataSource.no]);
                        }
                    }
                }
            }
            else
            {
                if(this.selectInfo.isLvLimit)
                {
                    MsgManager.instance.showRollTipsMsg("您的等级不足！");
                }
            }
        }
    }

    private clearListData():void
    {
        for (let index = 0; index < this.list.cells.length; index++) {
            var element:StuffCopyItem = this.list.cells[index];
            element.dispose();
            element = null;
        }
    }

    public removeSelf():any
    {
        this.clearListData();
        this.removeEvent();
        super.removeSelf();
    }
}
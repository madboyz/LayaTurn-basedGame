import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { STeamData } from "../../../../../team/STeamData";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { Alert } from "../../../../compent/Alert";
import { MsgManager } from "../../../../manager/MsgManager";
import { PersonBossItem } from "../item/PersonBossItem";
import { SRechargeData } from "../../../recharge/data/SRechargeData";

export class PersonBossPanel extends ui.main.PersonBossPanelUI {
    constructor() {
        super();
    }

    public initComp(): void {
        this.initEvent();
        this.initList();
        this.requestInfo();
        this.updateData();
    }

    private initList(): void {
        this.list.itemRender = PersonBossItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
        this.list.mouseHandler = Laya.Handler.create(this, this.onClickSkill, null, false);
        //this.list.array = FbVo.getListByType(CopyType.PERSON);
    }

    private requestInfo(): void {
        CommonControl.instance.send57003(CopyType.PERSON);
    }

    private initEvent(): void {

    }

    private removeEvent(): void {

    }

    public updateData(): void {
        this.updateList();
    }

    private updateList(): void {
        var tempList = FbVo.getListByType(CopyType.PERSON);
        var useList = [];
        for (let i = 0; i < tempList.length; i++) {
            var ele = tempList[i];
            if (ele.lv_limit <= SRoleData.instance.info.Lv + 0) {
                useList.push(ele);
            }
        }
        this.list.array = useList;
    }

    private selectInfo: PersonBossItem;
    private onListChangeHandler(): void {
        this.selectInfo = this.list.getCell(this.list.selectedIndex) as PersonBossItem;
    }

    private onClickSkill(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }

        if (e.target instanceof component.ScaleButton) {
            if (this.selectInfo.canEnter) {
                if (this.selectInfo.canSweep == false) {
                    if (SRoleData.instance.info.TeamId != 0) {
                        Alert.show(HtmlUtils.addColor("队伍状态无法进入，是否离开队伍？", "#8a5428", 20), this, () => {
                            STeamData.instance.protocol.QuitTeam()
                        }, null, null, null, true, "提示");
                        // MsgManager.instance.showRollTipsMsg("正在组队中不能进入副本！");
                    }
                    else {
                        SCopyData.instance.copyType = CopyType.PERSON;
                        this.parent.event(SCopyEvent.COPY_REQUEST_ENTER, [this.selectInfo.dataSource.no]);
                    }
                }
                else {
                    if (SCopyData.instance.isInCopy) {
                        MsgManager.instance.showRollTipsMsg("副本战斗中，无法进行扫荡！");
                    }
                    else if (SRoleData.instance.info.TeamId != 0) {
                        Alert.show(HtmlUtils.addColor("队伍状态无法进入，是否离开队伍？", "#8a5428", 20), this, () => {
                            STeamData.instance.protocol.QuitTeam()
                        }, null, null, null, true, "提示");
                        // MsgManager.instance.showRollTipsMsg("正在组队中不能进入副本！");
                    }
                    else {
                        var haveYueka = SRechargeData.instance.haveYueka();
                        if (haveYueka) {
                            SCopyData.instance.oneKeyShaodang(CopyType.PERSON);
                        } else {
                            this.parent.event(SCopyEvent.COPY_REQUEST_SWEEP, [this.selectInfo.dataSource.no]);
                        }
                    }
                }
            }
            else {
                if (this.selectInfo.isLvLimit) {
                    MsgManager.instance.showRollTipsMsg("您的等级不足！");
                }
            }
        }
    }

    private clearListData(): void {
        for (let index = 0; index < this.list.cells.length; index++) {
            var element: PersonBossItem = this.list.cells[index];
            element.dispose();
            element = null;
        }
    }

    public removeSelf(): any {
        this.clearListData();
        this.removeEvent();
        super.removeSelf();
    }
}
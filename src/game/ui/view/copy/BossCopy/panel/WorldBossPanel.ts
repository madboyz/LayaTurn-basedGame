import { MsgManager } from "../../../../manager/MsgManager";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { RewardList } from "../../../../compent/RewardList";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { WorldBossItem } from "../item/WorldBossItem";
import { SCopyEvent, SCopyData } from "../../../../../../net/data/SCopyData";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { S57003_2 } from "../../../../../../net/pt/pt_57";
import { SGameData, SGameEvent } from "../../../../../../net/data/SGameData";
import { SWorldBossData } from "../../../../../../net/data/SWorldBossData";
import { Alert } from "../../../../compent/Alert";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { STeamData } from "../../../../../team/STeamData";
import { TimerUtil } from "../../../../../utils/TimerUtil";
import { GameUtils } from "../../../../../utils/GameUtils";
import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";

export class WorldBossPanel extends ui.main.WorldBossPanelUI {
    private CurrentNum = 0;
    private useList = [];
    constructor() {
        super();
    }

    public initComp(): void {
        this.initEvent();
        this.initList();
        this.btn_tip.underline = true;
        CommonControl.instance.send57003(CopyType.WORLD);
        SWorldBossData.instance.requsetWoldBossInfos();
    }

    private initList(): void {
        this.list.itemRender = WorldBossItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
        this.list.mouseHandler = Laya.Handler.create(this, this.onClickItem, null, false);
        
        // this.list.array = FbVo.getListByType(CopyType.WORLD);
    }

    private initEvent(): void {
        this.btn_tip.on(Laya.Event.CLICK, this, this.onClickWoldBossNotice);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE, this, this.textLoop);
    }

    private selectInfo: WorldBossItem;
    private onListChangeHandler(): void {
        this.selectInfo = this.list.getCell(this.list.selectedIndex) as WorldBossItem;
    }

    private onClickItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof component.ScaleButton) {
            if (this.selectInfo.canEnter) {
                if (SRoleData.instance.info.TeamId != 0) {
                    Alert.show(HtmlUtils.addColor("队伍状态无法进入，是否离开队伍？", "#8a5428", 20), this, () => {
                        STeamData.instance.protocol.QuitTeam()
                    }, null, null, null, true, "提示");
                    // MsgManager.instance.showRollTipsMsg("正在组队中不能进入副本！");
                }
                else {
                    SCopyData.instance.copyType = CopyType.WORLD;
                    this.parent.event(SCopyEvent.COPY_REQUEST_ENTER, [this.selectInfo.dataSource.no]);
                }
            }
            else {
                MsgManager.instance.showRollTipsMsg("暂时无法进入！");
            }
        }
        else {
            //UIManager.instance.openUI(UIID.SYS_WORLD_BOSS_DAMAGE_RANK,UILEVEL.POP_3);
        }
    }

    private removeEvent(): void {
        this.btn_tip.off(Laya.Event.CLICK, this, this.onClickWoldBossNotice);
        this.list.selectHandler = null;
        this.list.mouseHandler = null;
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE, this, this.textLoop);
    }

    public updateData(): void {
        var tempList = FbVo.getListByType(CopyType.WORLD);
        this.useList = [];
        for (let i = 0; i < tempList.length; i++) {
            var ele = tempList[i];
            if (ele.lv_limit <= SRoleData.instance.info.Lv + 0) {
                this.useList.push(ele);
            }
        }
        this.list.array = this.useList;
        this.textLoop();
        // //因为共享副本协议所以世界boss次数那第一个就好
        // if (this.list.array.length > 0 && this.list.array[0]) {
        //     var vo: FbVo = this.list.array[0];
        //     var data: S57003_2 = SCopyData.instance.getCopyInfo(vo.no);
        //     if (data) {
        //         this.CurrentNum = data.left_times;//原来自己减，直接改成剩余次数 vo.cd[1] - data.times;
        //     }
        //     else {
        //         this.CurrentNum = vo.cd[1];
        //     }
        //     this.txt_leftNum.text = this.CurrentNum.toString() + (this.CurrentNum >= vo.cd[1] ? "" : "");
        // }
        //this.list.refresh();
    }

    private textLoop(): void {
        //因为共享副本协议所以世界boss次数那第一个就好
        if (this.useList.length > 0) {
            var vo: FbVo = this.useList[0];
            if(!vo)return;
            var data: S57003_2 = SCopyData.instance.getCopyInfo(vo.no);
            if (data) {
                this.CurrentNum = data.left_times;//原来自己减，直接改成剩余次数 vo.cd[1] - data.times;
            } else {
                this.CurrentNum = vo.cd[1];
            }
            var cfgInitTime = vo.cd[1];
            if (this.CurrentNum >= cfgInitTime) {
                this.txt_leftNum.text = this.CurrentNum + "";
                // this.addTimeBtn.x = 220;
            } else {
                var recoverTime = ConstVo.get("WORLD_BOSS_COUNT_RECOVER_INTERVAL").val + (data.time_stamp || GameUtils.TimeStamp);
                var rcLeftTime = recoverTime - GameUtils.TimeStamp;
                if (rcLeftTime < 0) {
                    rcLeftTime = 0;
                    this.request();
                }
                var hh = TimerUtil.hh(rcLeftTime);
                var mm = TimerUtil.mm(rcLeftTime);
                var ss = TimerUtil.ss(rcLeftTime);
                this.txt_leftNum.text = this.CurrentNum + " (" + hh + ":" + mm + ":" + ss + ")";
                // this.addTimeBtn.x = 263;
            }
        }
    }

    private asked: boolean = false;//不知道为什么，服务端，次数总有问题，先屏蔽了重复发请求
    private request(): void {
        if (this.asked) {
            return;
        }
        this.asked = true;
        this.timer.once(10000, this, () => {
            this.asked = false;
        })
        CommonControl.instance.send57003(CopyType.WORLD);
    }

    private onClickWoldBossNotice() {

    }

    private clearListData(): void {
        for (let index = 0; index < this.list.cells.length; index++) {
            var element: WorldBossItem = this.list.cells[index];
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
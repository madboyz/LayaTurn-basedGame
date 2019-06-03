import { TabBar } from "../../../../compent/TabBar";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { MsgManager } from "../../../../manager/MsgManager";
import { Pve_activityVo } from "../../../../../../db/sheet/vo/Pve_activityVo";
import { SBossData } from "../data/SBossData";

export class copyLevelItem extends ui.main.copyLevelItemUI {
    public static selectNo = 0;
    private Info: any = {};//tppe_limt tppe_1 tppe_dec
    constructor() {
        super();
    }

    public set dataSource(data: any) {
        if (data == null) return;
        this.Info = data;
        this.UpdateState();
    }

    public get dataSource(): any {
        return this.Info;
    }

    public UpdateState() {
        var lockType = this.Info.lv_limit <= SRoleData.instance.info.Lv;
        if (lockType) {
            this.nameTxt.color = "#055f1b";
            this.condtionTxt.color = "#055f1b";
            this.condtionTxt.text = `${this.Info.lv_limit}级`;
        }
        else {
            this.nameTxt.color = "#5b5a5a";
            this.condtionTxt.color = "#ff0000";
            this.condtionTxt.text = `${this.Info.lv_limit}级开启`;
        }
        this.nameTxt.text = this.Info.name;
        if (copyLevelItem.selectNo == this.Info.no)
            this.IsSelect = true;
        else
            this.IsSelect = false;
    }

    public set IsSelect(value: boolean) {
        if (!value) {
            var lockType = this.Info.lv_limit <= SRoleData.instance.info.Lv;
            if (lockType)
                this.Btn.skin = "copy/level_normal.png";
            else
                this.Btn.skin = "copy/level_lock.png";

        }
        else {
            this.Btn.skin = "copy/level_select.png";
        }
    }

    public get CanEnter(): boolean {
        if (!this.Info) return false;
        var roleLevel = SRoleData.instance.info.Lv;
        if (this.Info.lv_limit) {
            if (roleLevel < this.Info.lv_limit) {
                var str = `${this.Info.lv_limit}级开启`;
                MsgManager.instance.showRollTipsMsg(str);
                return false;
            }
        }
        switch (this.Info.type) {
            case CopyType.THREE_DUN:
                {
                    var threeVo = Pve_activityVo.getnoByDunNo(this.Info.no);
                    if (threeVo) {
                        SBossData.instance.askIngWJSSId = threeVo.no;
                        SBossData.instance.protocol.send16009(threeVo.no);
                    }
                    break;
                }
            default:
                {
                    CommonControl.instance.EnterCopy(this.Info.no);
                    break;
                }
        }
        return true;
    }
}

export class CopyLevelSelectPanel extends ui.main.GridSceneSelectPanelUI {
    private copyVos = [];
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.LevelList.itemRender = copyLevelItem;
        this.LevelList.hScrollBarSkin = "";
        this.LevelList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.LevelList.scrollBar.elasticDistance = 100;
        this.LevelList.selectEnable = true;
        this.LevelList.selectedIndex = -1;
    }

    public update(): void {
    }

    public open(...args): void {
        this.initWindow(true, true, "难度选择", 505, 350, 255);
        super.open();
        this.copyVos = [];
        this.selectInfo = null;
        var defaultSelectIndex = 0;
        if (this.arg) {

            var roleLevel = SRoleData.instance.info.Lv;
            var list = this.arg[0];
            for (let i = 0; i < list.length; i++) {

                var vo: FbVo = FbVo.get(list[i]);
                if (vo) {
                    if (vo.lv_limit <= roleLevel) {
                        defaultSelectIndex = i;
                        copyLevelItem.selectNo = vo.no;
                    }
                    this.copyVos.push(vo);
                }
            }
        }
        this.LevelList.array = this.copyVos;
        var THIS = this;
        Laya.timer.once(100, this, () => {
            THIS.LevelList.selectedIndex = defaultSelectIndex;
            THIS.LevelList.scrollTo(defaultSelectIndex);
        });
    }

    public initEvent(): void {
        this.EnterBtn.on(Laya.Event.CLICK, this, this.onClickOk);
        this.LevelList.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
        //this.LevelList.mouseHandler = Laya.Handler.create(this, this.onClickItem, null, false);
    }

    public removeEvent(): void {
        this.EnterBtn.off(Laya.Event.CLICK, this, this.onClickOk);
        this.LevelList.selectHandler = null;
        //this.LevelList.mouseHandler = null;
    }

    private selectInfo: copyLevelItem;
    private onListChangeHandler(): void {
        if (this.LevelList.selectedIndex == -1) return;
        if (this.selectInfo)
            this.selectInfo.IsSelect = false;
        this.selectInfo = this.LevelList.getCell(this.LevelList.selectedIndex) as copyLevelItem;
        this.selectInfo.IsSelect = true;
        copyLevelItem.selectNo = this.selectInfo.dataSource.no;
    }

    private onClickItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }

        if (e.target instanceof component.ScaleButton) {
            //if (this.selectInfo.CanEnter) {
            //    UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
            //    UIManager.instance.closeUI(UIID.SYS_MAIN);
            //    this.close();
            //}
        }
    }



    private onClickOk() {
        if (this.selectInfo && this.selectInfo.CanEnter) {
            UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
            UIManager.instance.closeUI(UIID.SYS_MAIN);
            this.close();
        }
    }

    public close(): void {
        this.LevelList.selectedIndex = -1;
        this.LevelList.array = null;
        //this.LevelList.selectedIndex = -1;
        super.close();
    }
}
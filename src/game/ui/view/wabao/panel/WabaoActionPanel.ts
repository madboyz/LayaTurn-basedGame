import { ProgressBar } from "../../../compent/ProgressBar";
import { ItemData } from "../../../compent/data/ItemData";
import { SMachineData, SMachineEvent } from "../../../../machine/SMachineData";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { SBagData } from "../../../../../net/data/SBagData";
import { CommonControl } from "../../../../common/control/CommonControl";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class WabaoActionPanel extends UIBase {
    private taskProgressBar: ProgressBar;
    private progressBg: Laya.Image;
    private useItem: ItemData;

    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.centerX = this.centerY = 0;
        this.width = 300;
        this.height = 80;
        this.initProgressBar();
    }

    private initProgressBar(): void {
        this.progressBg = new Laya.Image;
        this.progressBg.skin = "comp/progressBg_2.png";
        this.progressBg.x = -5;
        this.progressBg.y = 29;
        this.progressBg.width = 310;
        this.progressBg.height = 45;
        this.progressBg.sizeGrid = "0,55,0,55";
        this.addChild(this.progressBg);

        this.taskProgressBar = new ProgressBar();
        this.taskProgressBar.setBg(ResUtils.getCompUIUrl("touming"), ResUtils.getCompUIUrl("img_greenBar"), 250, 24);
        this.taskProgressBar.setLabel(1, 20, "#ffffff");
        this.taskProgressBar.x = 25;
        this.taskProgressBar.y = 40;
        this.addChild(this.taskProgressBar);
        this.taskProgressBar.setValue(10, 100);

        this.progressBg.visible = this.taskProgressBar.visible = false;

    }

    public open(): void {
        super.open();
        this.progressBg.visible = this.taskProgressBar.visible = false;
        this.showWabaoingEff(false);
        this.useItem = this.arg[0];
        this.startWabao();
    }

    public initEvent(): void {
        SMachineData.instance.on(SMachineEvent.Finish_Action_Machine, this, this.toRightPlace);
        SMachineData.instance.on(SMachineEvent.Map_Click, this, this.stopWabao);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.enterBattle);
    }

    public removeEvent(): void {
        SMachineData.instance.off(SMachineEvent.Finish_Action_Machine, this, this.toRightPlace);
        SMachineData.instance.off(SMachineEvent.Map_Click, this, this.stopWabao);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.enterBattle);
    }

    public startWabao(): void {
        var wabaoParam = this.useItem.AllAttr.get(GoodsAttrType.BAOTU);
        if (!wabaoParam) {
            return;
        }
        this.showWabaoingEff(true);
        var scenId = wabaoParam.get(PropertyEnumCode.OI_CODE_DIG_SCENO_NO);
        var px = wabaoParam.get(PropertyEnumCode.OI_CODE_DIG_SCENO_X);
        var py = wabaoParam.get(PropertyEnumCode.OI_CODE_DIG_SCENO_Y);
        SMachineData.instance.event(SMachineEvent.Start_Action_Machine, [scenId, { x: px, y: py }, this, () => {
            // SRoleData.instance.CanAutoMove = true;
            // SMachineData.instance.event(SMachineEvent.Stop_Action_Machine);
        }]);
    }

    public toRightPlace(): void {
        this.progressBg.visible = this.taskProgressBar.visible = true;
        this.startWaing();
    }

    public startWaing(): void {
        this.loopTime = 0;
        this.taskProgressBar.setValue(0, 100);
        this.timer.loop(100, this, this.loop);
    }

    private loopTime: number = 0;
    public loop(): void {
        if (this.loopTime > 30) {
            this.useWabaoItem();
            this.checkNewWabao();
            return;
        }
        this.loopTime++;
        this.taskProgressBar.setValue(Math.ceil(this.loopTime / 30 * 100), 100);
    }

    public useWabaoItem(): void {
        this.loopTime = 0;
        this.timer.clear(this, this.loop);
        this.progressBg.visible = this.taskProgressBar.visible = false;
        CommonControl.instance.send15049(this.useItem.serverInfo.GoodsId, 1);
    }

    public checkNewWabao(): void {
        var newItem: ItemData;
        var bagList = SBagData.instance.prop.allItems;
        for (let i = 0; i < bagList.length; i++) {
            var ele: ItemData = bagList[i];
            if (ele && ele.IsBaotu && ele != this.useItem) {
                newItem = ele;
                break;
            }
        }
        if (newItem) {
            this.useItem = newItem;
            this.startWabao();
        } else {
            this.stopWabao();
        }

    }

    public stopWabao(): void {
        SMachineData.instance.event(SMachineEvent.Stop_Action_Machine);
        SRoleData.instance.isWabaoing = false;
        this.close();
    }

    public enterBattle(): void {
        if (SGameData.instance.PLAYFIGHTREPORT) {
            if (this.loopTime > 0) {
                this.stopWabao();
            }
            this.showWabaoingEff(false);
        } else {
            this.showWabaoingEff(true);
        }
    }

    //任务完成的特效
    private _wabaoingEff: UIeffectLayer;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showWabaoingEff(show: boolean): void {
        if (show) {
            if (!this._wabaoingEff) {
                this._wabaoingEff = new UIeffectLayer;
                this.addChild(this._wabaoingEff);
                this._wabaoingEff.playEffect("ui_effect_24", 140, -165, true, 130);
            }
        } else {
            if (this._wabaoingEff) {
                this._wabaoingEff.destroy();
                this._wabaoingEff = null;
            }
        }
    }


    public close(): void {
        this.loopTime = 0;
        this.timer.clear(this, this.loop);
        this.showWabaoingEff(false);
        super.close();
    }
}
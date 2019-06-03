import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { S57003_2 } from "../../../../../../net/pt/pt_57";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { RewardList } from "../../../../compent/RewardList";
import { RoleView } from "../../../../../battle/role/RoleView";
import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";
import { SRechargeData } from "../../../recharge/data/SRechargeData";

export class StuffCopyItem extends ui.main.StuffCopyItemUI {
    private info: S57003_2;
    private _rewarldList: RewardList;
    private vo: ConstVo;
    constructor() {
        super();
        this.initList();
        this.cacheAs = "bitmap";
    }

    private initList(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.itemStyle = 55;
        this._rewarldList.x = 15;
        this._rewarldList.y = 55;
        this.addChild(this._rewarldList);

        this.vo = ConstVo.get("GAME_DUN_SWEEP_LV_LIMIT");
    }

    private mData: FbVo;

    public set dataSource(data: FbVo) {
        if (!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData(): void {
        this.txt_name.text = this.mData.name;
        this.info = SCopyData.instance.getCopyInfo(this.mData.no);
        var leftNum: number;
        this._rewarldList.updateRewardsByNum(this.mData.final_reward);
        this.overImg.visible = false;
        if (this.info) {
            leftNum = this.mData.cd[1] - this.info.times;
            this.txt_num.text = " " + leftNum;
            this.btn_enter.label = "挑战";
            if (leftNum > 0) {
                this.txt_num.color = "#00b007";
            }
            else {
                this.txt_num.color = "#ff0000";
                this.btn_enter.gray = true;
                this.overImg.visible = true;
            }
            if (this.info.pass == 1 && leftNum > 0) {
                this.btn_enter.visible = true;
                if ((this.vo.val + this.mData.lv_limit) <= SRoleData.instance.info.Lv) {
                    var haveYueka = SRechargeData.instance.haveYueka();
                    this.btn_enter.label = haveYueka ? "一键扫荡" : "扫荡";
                }
                else {
                    this.btn_enter.label = "挑战";
                }
            }
            else if (this.info.pass == 1 && leftNum <= 0) {
                this.btn_enter.visible = false;
                this.btn_enter.label = "挑战";
            }
            else if (this.info.pass == 0) {
                this.btn_enter.visible = true;
                this.btn_enter.label = "挑战";
            }

            if (this.info.state == 1) {
                this.btn_enter.gray = false;
            }
            else {
                this.btn_enter.gray = true;
            }
        }
        else {
            this.txt_num.text = "剩余次数：" + this.mData.cd[1];
            this.txt_num.color = "#00b007";
            this.btn_enter.visible = true;
            this.btn_enter.gray = false;
        }

        if (this.mData.lv_limit > SRoleData.instance.info.Lv) {
            this.txt_tips.text = `(需要角色${this.mData.lv_limit}级)`;
            this.txt_world.visible = false;
            this.txt_num.visible = false;
            this.btn_enter.gray = true;
        }
        else {
            this.txt_world.visible = true;
            this.txt_num.visible = true;
            this.txt_tips.text = "";
        }
    }

    public get isLvLimit(): boolean {
        return SRoleData.instance.info.Lv < this.mData.lv_limit ? true : false
    }

    public get canEnter(): boolean {
        if (this.info) {
            return this.info.state == 1 ? true : false;
        }
        return true;
    }

    public get canSweep(): boolean {
        if ((this.vo.val + this.mData.lv_limit) > SRoleData.instance.info.Lv) {
            return false;
        }
        if (!this.info) {
            return false;
        }
        if (this.info.state != 1 || this.info.pass != 1) {
            return false;
        }
        return true;
    }

    public get dataSource(): FbVo {
        return this.mData;
    }

    public dispose(): void {
        this._rewarldList.dispose();
    }

    public removeSelf(): any {
        super.removeSelf();
    }
}
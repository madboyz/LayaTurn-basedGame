import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { S57003_2 } from "../../../../../../net/pt/pt_57";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { RewardList } from "../../../../compent/RewardList";
import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { SRechargeData } from "../../../recharge/data/SRechargeData";

export class PersonBossItem extends ui.main.PersonBossItemUI {
    private info: S57003_2;
    private _rewarldList: RewardList;
    private role: FightMonsterView;
    private vo: ConstVo;
    constructor() {
        super();
        this.initList();
        this.initRole();
    }

    private initList(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.maxNum = 4;
        this._rewarldList.itemStyle = 55;
        this._rewarldList.x = 136;
        this._rewarldList.y = 73;
        this.bitmapBox.addChild(this._rewarldList);

        this.vo = ConstVo.get("GAME_DUN_SWEEP_LV_LIMIT");
    }

    private initRole(): void {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.7;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.role.x = this.headBg.x + this.headBg.width / 2
        this.role.y = this.headBg.y + this.headBg.height / 2 + 50;
        this.addChild(this.role);
    }

    private mData: FbVo;

    public set dataSource(data: FbVo) {
        if (!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData(): void {
        if (this.role) {
            if (this.role.info == null) {
                this.role.info = {};
            }
            this.role.info.ParentObjId = this.mData.mon_show_no;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
        }
        this.txt_copyName.text = this.mData.name + ` 推荐战力：${this.mData.Combat_power}`;
        this.info = SCopyData.instance.getCopyInfo(this.mData.no);
        var leftNum: number;
        this._rewarldList.updateRewardsByNum(this.mData.final_reward);
        if (this.info) {
            leftNum = this.mData.cd[1] - this.info.times;
            this.txt_leftNum.text = "剩余次数：" + leftNum;
            this.btn.label = "挑战";
            if (leftNum > 0) {
                this.txt_leftNum.color = "#00b007";
            }
            else {
                this.txt_leftNum.color = "#ff0000";
                this.btn.gray = true;
            }
            if (this.info.pass == 1 && leftNum > 0) {
                this.hasKill.visible = false;
                this.btn.visible = true;
                if ((this.vo.val + this.mData.lv_limit) <= SRoleData.instance.info.Lv) {
                    var haveYueka = SRechargeData.instance.haveYueka();
                    this.btn.label = haveYueka ? "一键扫荡" : "扫荡";
                }
                else {
                    this.btn.label = "挑战";
                }
            }
            else if (this.info.pass == 1 && leftNum <= 0) {
                this.hasKill.visible = true;
                this.btn.visible = false;
                this.btn.label = "挑战";
            }
            else if (this.info.pass == 0) {
                this.hasKill.visible = false;
                this.btn.visible = true;
                this.btn.label = "挑战";
            }

            if (this.info.state == 1) {
                this.btn.gray = false;
            }
            else {
                this.btn.gray = true;
            }
        }
        else {
            this.hasKill.visible = false;
            this.txt_leftNum.text = "剩余次数：" + this.mData.cd[1];
            this.txt_leftNum.color = "#00b007";
            this.btn.visible = true;
            this.btn.gray = false;
        }

        if (this.mData.lv_limit > SRoleData.instance.info.Lv) {
            this.txt_tips.text = `(需要角色${this.mData.lv_limit}级)`;
            this.btn.gray = true;
        }
        else {
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
        this.role.dispose();
        this.role = null;
    }

    public removeSelf(): any {
        super.removeSelf();
    }
}
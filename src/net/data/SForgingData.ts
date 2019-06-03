import { SocketManager } from "../SocketManager";
import { C15005, S15005, S15071, S15005_1, S15005_1_1, S15007 } from "../pt/pt_15";
import { DataManager } from "../../message/manager/DataManager";
import { StrengthInfo } from "../../game/ui/compent/data/StrengthInfo";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { RefineInfo } from "../../game/ui/compent/data/RefineInfo";
import { KaiLingInfo } from "../../game/ui/compent/data/KaiLingInfo";
import { GemInfo } from "../../game/ui/compent/data/GemInfo";
import { SRoleData } from "./SRoleData";

export class SForgingData extends Laya.EventDispatcher {
    private _equipStrengs: Array<StrengthInfo> = [];
    private _equipRefines: Array<RefineInfo> = [];
    private _equipKaiLings: Array<KaiLingInfo> = [];
    private _equipGems: Array<GemInfo> = [];
    private static _instance: SForgingData;
    constructor() {
        super();
        this.initLists();
    }

    private initLists(): void {
        for (let index = 0; index < 6; index++) {
            var strInfo: StrengthInfo = new StrengthInfo();
            strInfo.initInfo(index + 1, 0, 0);
            this._equipStrengs.push(strInfo);

            var reInfo: RefineInfo = new RefineInfo();
            reInfo.initInfo(index + 1, 0, 0);
            this._equipRefines.push(reInfo);

            var kaInfo: KaiLingInfo = new KaiLingInfo();
            kaInfo.initInfo(index + 1, 0, 0);
            this._equipKaiLings.push(kaInfo);

            var gemInfo: GemInfo = new GemInfo();
            gemInfo.initInfo(index + 1, 0);
            this._equipGems.push(gemInfo);
        }
    }

    public static get instance(): SForgingData {
        return SForgingData._instance || (SForgingData._instance = new SForgingData());
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E15005, this, this.onS15005);
        DataManager.cancel(PROTOCOL.E15007, this, this.onS15007);
        DataManager.cancel(PROTOCOL.E15071, this, this.onS15071);
        this._equipStrengs = [];
        this._equipRefines = [];
        this._equipKaiLings = [];
        this._equipGems = [];
        this.initLists();
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E15005, this, this.onS15005);
        DataManager.listen(PROTOCOL.E15007, this, this.onS15007);
        DataManager.listen(PROTOCOL.E15071, this, this.onS15071);
    }

    private onS15005(data: S15005): void {
        var arr: Array<S15005_1> = data.item_1;
        var len: number = arr.length;
        for (let index = 0; index < len; index++) {
            var element = arr[index];
            this.initPropInfo(element.Slot, element.item_1);
            this.initGemInfo(element.Slot, element.GenLv);
        }
    }

    private onS15007(data: S15007): void {
        this.updateGem(data.Slot, data.GenLv);
        this.event(SForgingEvent.FORGING0_INLAY_SUCCEFUL, [data.Slot, data.GenLv]);
    }

    private onS15071(data: S15071): void {
        for (let index = 0; index < data.item_1.length; index++) {
            const element = data.item_1[index];
            var nextPos: number = data.Slot;
            if (element.RetCode == 0) {
                nextPos += 1;
                if (data.Sys == StrengthType.STRENGTH) {
                    this.updateStrength(data.Slot, element.StrenLv, element.StrenExp);
                }
                else if (data.Sys == StrengthType.REFINE) {
                    this.updateRefine(data.Slot, element.StrenLv, element.StrenExp);
                }
                else if (data.Sys == StrengthType.KAILING) {
                    this.updateKaiLing(data.Slot, element.StrenLv, element.StrenExp);
                }
                this.event(SForgingEvent.FORGING0_STRENGTH_SUCCEFUL, [data.Slot, nextPos]);
                return;
            }
            else {
                MsgManager.instance.showCommonTips(element.RetCode);
                this.event(SForgingEvent.FORGING0_STRENGTH_SUCCEFUL, [data.Slot, nextPos]);
            }
        }
    }

    /**
     * 初始化 强化。精炼。启灵
     * @private
     * @param {number} pos
     * @param {Array<S15005_1_1>} arr
     * @memberof SForgingData
     */
    private initPropInfo(pos: number, arr: Array<S15005_1_1>): void {
        var len: number = arr.length;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.Sys == StrengthType.STRENGTH) {
                this.updateStrength(pos, element.StrLv, element.StrExp);
            }
            else if (element.Sys == StrengthType.KAILING) {
                this.updateKaiLing(pos, element.StrLv, element.StrExp);
            }
            else if (element.Sys == StrengthType.REFINE) {
                this.updateRefine(pos, element.StrLv, element.StrExp);
            }
        }
        this._equipStrengs.sort(this.sortStrength);
    }

    /**
     * 初始化宝石
     * @private
     * @param {number} pos
     * @param {Array<S15005_1_2>} arr
     * @memberof SForgingData
     */
    private initGemInfo(pos: number, lv: number): void {
        this.updateGem(pos, lv);
    }

    /**
     * 更新强化
     * @private
     * @param {number} pos
     * @param {number} lv
     * @param {number} exp
     * @memberof SForgingData
     */
    private updateStrength(pos: number, lv: number, exp: number): void {
        for (let index = 0; index < this._equipStrengs.length; index++) {
            const element = this._equipStrengs[index];
            if (element.Slot == pos) {
                element.initInfo(pos, lv, exp);
            }
        }
    }

    /**
     * 跟新精炼
     * @private
     * @param {number} pos
     * @param {number} lv
     * @param {number} exp
     * @memberof SForgingData
     */
    private updateRefine(pos: number, lv: number, exp: number): void {
        for (let index = 0; index < this._equipRefines.length; index++) {
            const element = this._equipRefines[index];
            if (element.Slot == pos) {
                element.initInfo(pos, lv, exp);
            }
        }
    }

    /**
     * 更新启灵
     * @private
     * @param {number} pos
     * @param {number} lv
     * @param {number} exp
     * @memberof SForgingData
     */
    private updateKaiLing(pos: number, lv: number, exp: number): void {
        for (let index = 0; index < this._equipKaiLings.length; index++) {
            const element = this._equipKaiLings[index];
            if (element.Slot == pos) {
                element.initInfo(pos, lv, exp);
            }
        }
    }

    /**
     * 更新宝石
     * @private
     * @param {number} pos
     * @param {number} lv
     * @memberof SForgingData
     */
    private updateGem(pos: number, lv: number): void {
        for (let index = 0; index < this._equipGems.length; index++) {
            const element = this._equipGems[index];
            if (element.Slot == pos) {
                element.initInfo(pos, lv);
            }
        }
    }

    /**
     * 根据格子类型获得强化数据
     * @param {number} pos
     * @returns {StrengthInfo}
     * @memberof SForgingData
     */
    public getStrengthInfoByPos(pos: number): StrengthInfo {
        for (let index = 0; index < this._equipStrengs.length; index++) {
            const element: StrengthInfo = this._equipStrengs[index];
            if (element.Slot == pos) {
                return element;
            }
        }
        return null;
    }

    /**
     * 获得精炼得信息
     * @param {number} pos
     * @returns {RefineInfo}
     * @memberof SForgingData
     */
    public getRefineInfoByPos(pos: number): RefineInfo {
        for (let index = 0; index < this._equipRefines.length; index++) {
            const element: RefineInfo = this._equipRefines[index];
            if (element.Slot == pos) {
                return element;
            }
        }
        return null;
    }

    /**
     * 获得启灵得信息
     * @param {number} pos
     * @returns {KaiLingInfo}
     * @memberof SForgingData
     */
    public getKailingInfoByPos(pos: number): KaiLingInfo {
        for (let index = 0; index < this._equipKaiLings.length; index++) {
            const element: KaiLingInfo = this._equipKaiLings[index];
            if (element.Slot == pos) {
                return element;
            }
        }
        return null;
    }

    /**
     * 获得某个格子得宝石信息
     * @param {number} pos
     * @returns {GemInfo}
     * @memberof SForgingData
     */
    public getGemInfoByPos(pos: number): GemInfo {
        for (let index = 0; index < this._equipGems.length; index++) {
            const element: GemInfo = this._equipGems[index];
            if (element.Slot == pos) {
                return element;
            }
        }
        return null;
    }


    /**
     * 排序
     * @private
     */
    private sortStrength(a: any, b: any): number {
        if (a.StrLv < b.StrLv) {
            return -1;
        }
        else if (a.StrLv > b.StrLv) {
            return 1;
        }
        else {
            //位置的先后顺序，小的在前面
            var sortArr = [5, 6, 1, 2, 3, 4];
            if (sortArr[a.Slot - 1] < sortArr[b.Slot - 1]) {
                return -1;
            }
            else if (sortArr[a.Slot - 1] > sortArr[b.Slot - 1]) {
                return 1
            }
        }
    }

    private sortGem(a: GemInfo, b: GemInfo): number {
        if (a.StrLv % 4 != 0 && b.StrLv % 4 == 0) {
            return -1;
        }
        else if (a.StrLv % 4 == 0 && b.StrLv % 4 != 0) {
            return 1;
        }
        else if (a.StrLv % 4 != 0 && b.StrLv % 4 != 0) {
            if (a.Slot < b.Slot) {
                return -1;
            }
            else if (a.Slot > b.Slot) {
                return 1;
            }
        }
        else if (a.StrLv % 4 == 0 && b.StrLv % 4 == 0) {
            if (a.StrLv == 0 && b.StrLv != 0) {
                return -1;
            }
            else if (a.StrLv != 0 && b.StrLv == 0) {
                return 1;
            }
            else {
                if (a.StrLv < b.StrLv) {
                    return -1;
                }
                else if (a.StrLv > b.StrLv) {
                    return 1;
                }
                else {
                    //位置的先后顺序，小的在前面
                    var sortArr = [5, 6, 1, 2, 3, 4];
                    if (sortArr[a.Slot - 1] < sortArr[b.Slot - 1]) {
                        return -1;
                    }
                    else if (sortArr[a.Slot - 1] > sortArr[b.Slot - 1]) {
                        return 1
                    }
                }
            }
        }
        return 1;
    }

    /**
     * 当前需要强化的部位
     * @returns {StrengthInfo}
     * @memberof SForgingData
     */
    public get curStrengthInfo(): StrengthInfo {
        this._equipStrengs.sort(this.sortStrength);
        return this._equipStrengs[0];
    }

    /**
     * 当前需要精炼得部位
     * @readonly
     * @type {RefineInfo}
     * @memberof SForgingData
     */
    public get curRefineInfo(): RefineInfo {
        this._equipRefines.sort(this.sortStrength);
        return this._equipRefines[0];
    }

    /**
     * 当前需要启灵得部位
     * @readonly
     * @type {KaiLingInfo}
     * @memberof SForgingData
     */
    public get curKaiLingInfo(): KaiLingInfo {
        this._equipKaiLings.sort(this.sortStrength);
        return this._equipKaiLings[0];
    }

    public get curGemInfo(): GemInfo {
        this._equipGems.sort(this.sortGem);
        return this._equipGems[0];
    }

    public get showRed(): boolean {
        if (this.showStrengRed || this.showRefineRed || this.showKailingRed || this.showGemRed) {
            return true;
        }
        return false;
    }

    /**
     * 强化红点
     * @readonly
     * @type {boolean}
     * @memberof SForgingData
     */
    public get showStrengRed(): boolean {
        if(this.curStrengthInfo.needEquipLv > SRoleData.instance.info.Lv) {
            //等级超过了
            return false;
        }
        if (this.curStrengthInfo && !this.curStrengthInfo.max) {
            if (this.curStrengthInfo.materials.length > 2) {
                if ((this.curStrengthInfo.propNum >= this.curStrengthInfo.needPropNum) && (this.curStrengthInfo.moneyNum >= this.curStrengthInfo.needMoney)) {
                    return true;
                }
            }
            else {
                if (this.curStrengthInfo.propNum >= this.curStrengthInfo.needPropNum) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 精炼红点
     * @readonly
     * @type {boolean}
     * @memberof SForgingData
     */
    public get showRefineRed(): boolean {
        if(this.curRefineInfo.needEquipLv > SRoleData.instance.info.Lv) {
            //等级超过了
            return false;
        }
        if (this.curRefineInfo && !this.curRefineInfo.max) {
            if (this.curRefineInfo.materials.length > 2) {
                if ((this.curRefineInfo.propNum >= this.curRefineInfo.needPropNum) && (this.curRefineInfo.moneyNum >= this.curRefineInfo.needMoney)) {
                    return true;
                }
            }
            else {
                if (this.curRefineInfo.propNum >= this.curRefineInfo.needPropNum) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 启灵红点显示
     * @readonly
     * @type {boolean}
     * @memberof SForgingData
     */
    public get showKailingRed(): boolean {
        if(this.curRefineInfo.needEquipLv > SRoleData.instance.info.Lv) {
            //等级超过了
            return false;
        }
        if (this.curKaiLingInfo && !this.curKaiLingInfo.max) {
            if (this.curKaiLingInfo.materials.length > 2) {
                if ((this.curKaiLingInfo.propNum >= this.curKaiLingInfo.needPropNum) && (this.curKaiLingInfo.moneyNum >= this.curKaiLingInfo.needMoney)) {
                    return true;
                }
            }
            else {
                if (this.curKaiLingInfo.propNum >= this.curKaiLingInfo.needPropNum) {
                    return true;
                }
            }
        }
        return false;
    }

    public get showGemRed(): boolean {
        if (this.curGemInfo.needs && this.curGemInfo.needs.length > 2) {
            if ((this.curGemInfo.needs[0]["hasNum"] >= this.curGemInfo.needs[0]["needNum"]) && (this.curGemInfo.needs[1]["hasNum"] >= this.curGemInfo.needs[1]["needNum"])) {
                return true;
            }
        }
        else {
            if (this.curGemInfo.needs && (this.curGemInfo.needs[0]["hasNum"] >= this.curGemInfo.needs[0]["needNum"])) {
                return true;
            }
        }
        return false;
    }
}

export enum SForgingEvent {
    FORGING_REQUEST_STRENGTH = "goods_request_strength",//申请强化部位
    FORGING_REQUEST_INLAY = "goods_request_inlay",//申请镶嵌宝石
    FORGING0_STRENGTH_SUCCEFUL = "goods_strength_succeful",//强化部位成功
    FORGING0_INLAY_SUCCEFUL = "goods_inlay_succeful",//镶嵌宝石成功
}
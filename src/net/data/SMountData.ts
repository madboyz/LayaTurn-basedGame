import { DataManager } from "../../message/manager/DataManager";
import { MountInfo } from "../../game/ui/compent/data/MountInfo";
import { S60001, S60005, S60008, S60001_3 } from "../pt/pt_60";
import { Aerocraft_starVo } from "../../db/sheet/vo/Aerocraft_starVo";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { ConstVo } from "../../db/sheet/vo/ConstVo";
import { SBagData } from "./SBagData";
import { MountProtocol } from "../../game/ui/view/mount/protocol/MountProtocol";

export class SMountData extends Laya.EventDispatcher {
    private static _instance: SMountData;
    public protocol: MountProtocol;

    private _curInfo: MountInfo;
    constructor() {
        super();
        this.protocol = new MountProtocol;
    }

    public static get instance(): SMountData {
        return SMountData._instance || (SMountData._instance = new SMountData());
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E60001, this, this.onS66001);
        DataManager.cancel(PROTOCOL.E60005, this, this.onS66005);
        DataManager.cancel(PROTOCOL.E60008, this, this.onS60008);
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E60001, this, this.onS66001);
        DataManager.listen(PROTOCOL.E60005, this, this.onS66005);
        DataManager.listen(PROTOCOL.E60008, this, this.onS60008);
    }

    private onS66001(data: S60001): void {
        if (this._curInfo) {
            if (this._curInfo.AerocraftNo != data.AerocraftNo) {
                this._curInfo.oldLv = data.AerocraftLv;
                this._curInfo.update66001(data);
                this.event(SMountEvent.MOUNT_STAR_LEVEL);
                this.event(SMountEvent.MOUNT_UPDATE_INFO);
                return;
            }
        }
        if (!this._curInfo) {
            this._curInfo = new MountInfo();
        }
        this._curInfo.update66001(data);
        this.event(SMountEvent.MOUNT_UPDATE_INFO);
    }

    private onS66005(data: S60005): void {
        if (this._curInfo.ShowNo != data.No || data.No == 0) {

            // }

            // if(Aerocraft_starVo.canTrans(data.No) || data.No == 0)
            // {
            this._curInfo.ShowNo = data.No;
            if (data.No == 0) {
                MsgManager.instance.showRollTipsMsg("下坐骑成功！");
                this.event(SMountEvent.MOUNT_RIDE_STATE, [0]);
            }
            else {
                MsgManager.instance.showRollTipsMsg("幻化" + SMountData.instance.curInfo.showNoInfo.name + "成功！");
                this.event(SMountEvent.MOUNT_RIDE_STATE, [1]);
            }
        }
        this.event(SMountEvent.MOUNT_UPDATE_INFO);
    }


    //宠物点化技能
    private onS60008(data: S60008): void {
        var info: MountInfo = this.curInfo;
        if (info && info.item_3) {
            var change = false;
            for (let i = 0; i < info.item_3.length; i++) {
                const element = info.item_3[i];
                if(element.SkillNo == data.SkillNo){
                    change = true;
                    element.SkillLv = data.SkillLv;
                    break;
                }
            }
            if(change == false){
                var newData = new S60001_3;
                newData.SkillType = 2;
                newData.SkillNo = data.SkillNo;
                newData.SkillLv = data.SkillLv;
                info.item_3.push(newData);
            }
        }
        this.event(SMountEvent.MOUNT_BIANYI_SKILL_UP);
    }

    public get curStar(): number {
        return this._curInfo.AerocraftNo;
    }

    /**
     * 获得当前得幻化编号
     * @readonly
     * @type {number}
     * @memberof SMountData
     */
    public get curShowNo(): number {
        if (!this._curInfo) return 0;
        else return this._curInfo.ShowNo;
    }

    private _allData: Array<Aerocraft_starVo>
    /**
     * 获得幻化得位置
     * @readonly
     * @type {number}
     * @memberof SMountData
     */
    public get curPage(): number {
        if (!this._allData) {
            this._allData = Aerocraft_starVo.getAll;
        }
        var len: number = this._allData.length;
        for (let index = 0; index < this._allData.length; index++) {
            var element = this._allData[index];
            if (this.checkIsSameModel(element.no, this.curShowNo)) {
                return index;
            }
        }
        return 0;
    }

    //判断两个坐骑，是不是同一个幻化
    public checkIsSameModel(showNo1: number, showNo2: number): boolean {
        // var name1 = Aerocraft_starVo.get(showNo1) && Aerocraft_starVo.get(showNo1).name || "";
        // var name2 = Aerocraft_starVo.get(showNo2) && Aerocraft_starVo.get(showNo2).name || "";
        // while((name1 == "" || name1 == null) && showNo1> 0){
        //     showNo1--;
        //     name1 = Aerocraft_starVo.get(showNo1).name;
        // }
        // while((name2 == "" || name2 == null) && showNo2> 0){
        //     showNo2--;
        //     name2 = Aerocraft_starVo.get(showNo2).name;
        // }
        // if(name1 == name2){
        //     return true
        // }else{
        //     return false;
        // }
        if (showNo1 == showNo2) {
            return true
        } else {
            return false;
        }
    }

    public haveMount(mount: number): boolean {
        var skins = this.curInfo.item_2;
        for (let i = 0; i < skins.length; i++) {
            var skin = skins[i];
            if (skin.Skins == mount) {
                return true;
            }
        }
        return false;
    }

    public get curInfo(): MountInfo {
        return this._curInfo;
    }

    public get canLevel(): boolean {
        if (this.curInfo && this.curInfo) {
            if (this.curInfo.needFeed) {
                if (SMountData.instance.curInfo.leftFeedNum > 0) {
                    var costVo: ConstVo = ConstVo.get("AEROCAFT_FEED_GOODS_NO");
                    var count: number;
                    var goodsNo = costVo.val[0];
                    count = SBagData.instance.prop.getItemCountByGoodsNo(goodsNo);
                    if (count > 0 && !this.curInfo.isLimtLV && !this.curInfo.isLimitExp) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 是否可以升星
     * @readonly
     * @type {boolean}
     * @memberof SMountData
     */
    public get canStar(): boolean {
        if (this.curInfo && this.curInfo.needLvStar) {
            if (this.curInfo.lvStarCode > 0) {
                if (this.curInfo.lvStarNum >= this.curInfo.needLvStarNum) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 是否可以飞升
     * @readonly
     * @type {boolean}
     * @memberof SMountData
     */
    public get canFly(): boolean {
        if (this.curInfo && this.curInfo.needFly) {
            if (this.curInfo.flyCode > 0) {
                if (this.curInfo.flyNum >= this.curInfo.needFlyNum) {
                    return true;
                }
            }
        }
        return false;
    }

    public get showRed(): boolean {
        if (this.canLevel || this.canStar || this.canFly) {
            return true;
        }
        return false;
    }
}

export enum SMountEvent {
    MOUNT_REQUEST_FEED = "mount_request_feed",//坐骑申请喂养
    MOUNT_REQUEST_ADVANCE = "mount_request_advance",//坐骑申请进阶
    MOUNT_REQUEST_SOARING = "mount_request_soaring",//坐骑申请飞升
    MOUNT_REQUEST_TRANSMOGRIFICATION = "mount_request_transmogrification",//坐骑幻化
    MOUNT_UPDATE_INFO = "mount_update_info",//坐骑信息更新
    MOUNT_STAR_LEVEL = "mount_star_level",//坐骑升星
    MOUNT_RIDE_STATE = "mount_ride_state",//坐骑骑乘状态

    MOUNT_LINGJING_UP_SUCCEFUL = "MOUNT_LINGJING_UP_SUCCEFUL",//灵境升级成功
    MOUNT_BIANYI_UP_SUCCEFUL = "MOUNT_LINGJING_UP_SUCCEFUL",//变异升级成功
    MOUNT_BIANYI_SKILL_UP = "MOUNT_BIANYI_SKILL_UP",//变异技能升级成功
    MOUNT_EQUIP_REFRESH = "MOUNT_EQUIP_REFRESH",//坐骑装备更新
}
import { DataManager } from "../../message/manager/DataManager";
import { S17000, S17001, S17002, S17003, S17004, S17007, S17008, S17009, S17011, S17019, S17015, S17040, S17033, S17041, S17036, S17048, S17050, S17049, S17051, S17009_4 } from "../pt/pt_17";
import { PetInfo } from "../../game/ui/compent/data/PetInfo";
import { PetVo } from "../../db/sheet/vo/PetVo";
import { CommonControl } from "../../game/common/control/CommonControl";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { PetProtocol } from "../../game/ui/view/pet/protocol/PetProtocol";

export class SPetData extends Laya.EventDispatcher {
    private static _instance: SPetData;
    public protocol: PetProtocol;

    private _allData: Array<PetInfo>;
    private _fightList: Array<PetInfo>;
    public curInfo: PetInfo;//当前选着得宠物
    public count: number = 3;//开启宠物携带数量 携带数量：（记在人物表）以通过使用道具女妖栏来扩充此数量，最大上限为8个，初始默认为3个
    constructor() {
        super();
        this.protocol = new PetProtocol;
        this._fightList = [];
        this.initAllPet();
    }

    public static get instance(): SPetData {
        return SPetData._instance || (SPetData._instance = new SPetData());
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E17000, this, this.onS17000);//获得一个宠物
        DataManager.listen(PROTOCOL.E17001, this, this.onS17001);//设置宠物出战、休息、锁定 状态
        DataManager.listen(PROTOCOL.E17002, this, this.onS17002);//开启宠物携带数量 携带数量：（记在人物表）以通过使用道具女妖栏来扩充此数量，最大上限为8个，初始默认为3个
        DataManager.listen(PROTOCOL.E17003, this, this.onS17003);//设置宠物为主宠
        DataManager.listen(PROTOCOL.E17004, this, this.onS17004);//洗隋成功
        DataManager.listen(PROTOCOL.E17007, this, this.onS17007);//宠物改名 名字的长度最多为6个汉字
        DataManager.listen(PROTOCOL.E17008, this, this.onS17008);//获取玩家携带中的武将列表
        DataManager.listen(PROTOCOL.E17009, this, this.onS17009);//获取玩家自己的单个武将的属性信息
        // DataManager.listen(PROTOCOL.E17010, this, this.onS17010);//获取武将的装备列表
        DataManager.listen(PROTOCOL.E17011, this, this.onS17011);//更新宠物的一个或多个信息
        DataManager.listen(PROTOCOL.E17015, this, this.onS17015);//宠物修炼成功
        DataManager.listen(PROTOCOL.E17019, this, this.onS17019);//改变宠物支援出战排序值
        DataManager.listen(PROTOCOL.E17036, this, this.onS17036);//宠物遗忘技能
        DataManager.listen(PROTOCOL.E17040, this, this.onS17040);//宠物炼化成功
        DataManager.listen(PROTOCOL.E17041, this, this.onS17041);//宠物学习技能
        DataManager.listen(PROTOCOL.E17048, this, this.onS17048);//宠物点化成功
        DataManager.listen(PROTOCOL.E17049, this, this.onS17049);//宠物兽灵升级
        DataManager.listen(PROTOCOL.E17050, this, this.onS17050);//宠物图鉴升级
        DataManager.listen(PROTOCOL.E17051, this, this.onS17051);//宠物点化技能升级
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E17000, this, this.onS17000);//获得一个宠物
        DataManager.cancel(PROTOCOL.E17001, this, this.onS17001);//设置宠物出战、休息、锁定 状态
        DataManager.cancel(PROTOCOL.E17002, this, this.onS17002);//开启宠物携带数量 携带数量：（记在人物表）以通过使用道具女妖栏来扩充此数量，最大上限为8个，初始默认为3个
        DataManager.cancel(PROTOCOL.E17003, this, this.onS17003);//设置宠物为主宠
        DataManager.cancel(PROTOCOL.E17004, this, this.onS17004);//洗隋成功
        DataManager.cancel(PROTOCOL.E17007, this, this.onS17007);//宠物改名 名字的长度最多为6个汉字
        DataManager.cancel(PROTOCOL.E17008, this, this.onS17008);//获取玩家携带中的武将列表
        DataManager.cancel(PROTOCOL.E17009, this, this.onS17009);//获取玩家自己的单个武将的属性信息
        // DataManagcancelten(PROTOCOL.E17010, this, this.onS17010);//获取武将的装备列表
        DataManager.cancel(PROTOCOL.E17011, this, this.onS17011);//更新宠物的一个或多个信息
        DataManager.cancel(PROTOCOL.E17015, this, this.onS17015);//宠物修炼成功
        DataManager.cancel(PROTOCOL.E17019, this, this.onS17019);//改变宠物支援出战排序值
        DataManager.cancel(PROTOCOL.E17036, this, this.onS17036);//宠物遗忘技能
        DataManager.cancel(PROTOCOL.E17040, this, this.onS17040);//宠物炼化成功
        DataManager.cancel(PROTOCOL.E17041, this, this.onS17041);//宠物学习技能
        DataManager.cancel(PROTOCOL.E17048, this, this.onS17048);//宠物点化成功
        DataManager.cancel(PROTOCOL.E17049, this, this.onS17049);//宠物兽灵升级
        DataManager.cancel(PROTOCOL.E17050, this, this.onS17050);//宠物图鉴升级
        DataManager.cancel(PROTOCOL.E17051, this, this.onS17051);//宠物点化技能升级

        this._allData = null;
        this._fightList = [];
        this.initAllPet();
    }

    private onS17000(data: S17000): void {
        this.updatePetInfo(true, false, false, data);
        CommonControl.instance.send17009(data.PartnerId);
        this.event(SPetEvent.PET_ACTIVE_SUCCEFUL);
    }

    private onS17001(data: S17001): void {
        if (this.getPetInfo(data.PartnerId)) {
            this.getPetInfo(data.PartnerId).State = data.State;
        }
        this.event(SPetEvent.PET_FIGHTSTATE_SUCCEFUL);
    }

    private onS17002(data: S17002): void {
        if (data.RetCode == 0) {
            this.count = data.CurNum;
            this.event(SPetEvent.PET_BUYCOUNT_SUCCEFUL);
        }
    }

    private onS17003(data: S17003): void {
        if (data.RetCode == 0) {
            var info: PetInfo = this.getPetInfo(data.PartnerId);
            if (info) {
                info.Position = 1;
                this._fightList[0] = info;
            }
            this.event(SPetEvent.PET_MAINPET_SUCCEFUL);
        }
    }

    private onS17004(data: S17004): void {
        this.event(SPetEvent.PET_XISUI_SUCCEFUL);
    }

    private onS17007(data: S17007): void {
        if (data.RetCode == 0) {
            if (this.getPetInfo(data.PartnerId)) {
                this.getPetInfo(data.PartnerId).Name = data.NewName;
            }
            this.event(SPetEvent.PET_CHANGENAME_SUCCEFUL);
        }
    }

    private onS17008(data: S17008): void {
        for (let index = 0; index < data.item_1.length; index++) {
            var element = data.item_1[index];
            CommonControl.instance.send17009(element.PartnerId);
            this.updatePetInfo(false, true, false, element);
        }
        this.initFightList();
    }

    private onS17009(data: S17009): void {
        var info: PetInfo = this.getPetInfo(data.PartnerId);
        if (info) {
            info.init17009(data);
            this.checkInFightList(info, data.Order);
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_PARTNER_EQP, data.PartnerId);//请求宠物装备
        }
        this.event(SPetEvent.PET_PETINFO_SUCCEFUL);
    }

    // private onS17010(data:S17010):void
    // {
    //     if(this.getPetInfo(data.PartnerId))
    //     {
    //         this.getPetInfo(data.PartnerId).equipList = data.item_1;
    //     }
    //     this.event(SPetEvent.PET_PETEQUIPLIST_SUCCEFUL);
    // }

    private onS17011(data: S17011): void {
        if (this.getPetInfo(data.PartnerId)) {
            this.getPetInfo(data.PartnerId).updateAttrs(data.item_1);
        }
        this.event(SPetEvent.PET_PROPUPDATE);
    }

    private onS17015(data: S17015): void {
        if (data.Ret == 0) {
            this.event(SPetEvent.PET_TRAIN_SUCCEFUL);
        }
    }

    private onS17019(data: S17019): void {
        if (this.getPetInfo(data.PartnerId)) {
            this.getPetInfo(data.PartnerId).Order = data.Order;
        }
        this.checkInFightList(this.getPetInfo(data.PartnerId), data.Order);
        this.event(SPetEvent.PET_PETEORDECHANGE_SUCCEFUL);
    }

    private onS17036(data: S17036): void {
        this.event(SPetEvent.PET_FORGETSKILL_SUCCEFUL);
    }

    private onS17040(data: S17040): void {
        this.event(SPetEvent.PET_REFINE_SUCCEFUL);
    }

    private onS17041(data: S17041): void {
        this.event(SPetEvent.PET_LEARNSKILL_SUCCEFUL);
    }

    private onS17048(data: S17048): void {
        if (data.Code == 0) {
            this.event(SPetEvent.PET_DIANHUA_SUCCEFUL);
        } else if (data.Code == 1) {
            MsgManager.instance.showRollTipsMsg("点化失败");
        }
    }

    private onS17049(data: S17049): void {
        if (data.Code == 0) {
            this.event(SPetEvent.PET_SHOULING_UP_SUCCEFUL);
        } else if (data.Code == 1) {
            MsgManager.instance.showRollTipsMsg("升级失败");
        }
    }

    private onS17050(data: S17050): void {
        if (data.Code == 0) {
            this.event(SPetEvent.ANS_PET_TUJIAN_UP);
        }
    }

    //宠物点化技能
    private onS17051(data: S17051): void {
        var info: PetInfo = this.getPetInfo(data.PartnerId);
        if (info && info.item_4) {
            var change = false;
            for (let i = 0; i < info.item_4.length; i++) {
                const element = info.item_4[i];
                if(element.SkillNo == data.SkillNo){
                    change = true;
                    element.SkillLv = data.SkillLv;
                    break;
                }
            }
            if(change == false){
                var newData = new S17009_4;
                newData.SkillType = 2;
                newData.SkillNo = data.SkillNo;
                newData.SkillLv = data.SkillLv;
                info.item_4.push(newData);
            }
        }
        this.event(SPetEvent.PET_DIANHUA_SKILL_UP);
    }

    /**
     * 初始化所有数据
     * @memberof SPetData
     */
    public initAllPet(): void {
        if (!this._allData) {
            this._allData = [];
            var list: Array<PetVo> = PetVo.getAll;
            var info: PetInfo;
            for (let index = 0; index < list.length; index++) {
                var element = list[index];
                info = new PetInfo();
                info.vo = element;
                this._allData.push(info);
            }
        }
    }

    /**
     * 初始化宠物战斗列表
     * @private
     * @memberof SPetData
     */
    private initFightList(): void {
        for (let index = 0; index < this._allData.length; index++) {
            var element = this._allData[index];
            if (element.State == 110 || (element.State == 100 && element.Order != 0)) {
                this._fightList.push(element);
            }
        }
    }

    private checkInFightList(info: PetInfo, order: number): void {
        if (info.Position == 1) {
            this._fightList[0] = info;
            //if(info.Follow == 0)
            //CommonControl.instance.send17031(info.PartnerId,1);
        }
        else {
            if (this.checkIsInFightList(info.PartnerId) == -1) {
                if (order > 0) {
                    this._fightList[order] = info;
                }
            }
            else {
                if (order <= 0) {
                    var index = this.checkIsInFightList(info.PartnerId);
                    if (index >= 0) {
                        this._fightList[index] = null;
                    }
                }
            }
        }
    }

    public get allData(): Array<PetInfo> {
        this._allData.sort(this.petSort);
        return this._allData;
    }

    /**
     * 获得宠物的位置
     * @param {number} id
     * @returns {number}
     * @memberof SPetData
     */
    public getPetIndex(id: number, isActive: boolean = true): number {
        var arr: Array<PetInfo> = this.allData;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (isActive) {
                if (element.PartnerId == id) {
                    return index;
                }
            }
            else {
                if (element.vo.no == id) {
                    return index;
                }
            }
        }
        return 0;
    }

    /**
     * 宠物排序
     * @private
     * @param {PetInfo} a
     * @param {PetInfo} b
     * @returns {number}
     * @memberof SPetData
     */
    private petSort(a: PetInfo, b: PetInfo): number {
        var qulityD = b.vo.grade - a.vo.grade ;
        var noD = a.vo.no - b.vo.no;
        if (a.active && b.active) {
            if (a.State == 110 && b.State != 110) {
                return -1;
            } else if (a.State != 110 && b.State == 110) {
                return 1;
            } else {
                if (a.Order != 0 && b.Order != 0) {
                    if (a.Order < b.Order) {
                        return -1;
                    } else if (a.Order > b.Order) {
                        return 1;
                    }
                } else if (a.Order != 0 && b.Order == 0) {
                    return -1;
                } else if (a.Order == 0 && b.Order != 0) {
                    return 1;
                } else {
                    if (qulityD != 0) {
                        return qulityD;
                    } else {
                        return noD;
                    }
                }
            }
        } else if (!a.active && !b.active) {
            if(a.canActive && !b.canActive){
                return -1;
            }else if (!a.canActive && b.canActive){
                return 1;
            }else {
                if (qulityD != 0) {
                    return qulityD;
                } else {
                    return noD;
                }
            }
        } else if (a.active && !b.active) {
            return -1;
        } else if (!a.active && b.active) {
            return 1;
        }

    }

    /**
     * 更新宠物属性
     * @param {boolean} is17000
     * @param {boolean} is17008
     * @param {boolean} is17009
     * @param {*} data
     * @returns {void}
     * @memberof SPetData
     */
    public updatePetInfo(is17000: boolean, is17008: boolean, is17009: boolean, data: any): void {
        if (this._allData) {
            for (let index = 0; index < this._allData.length; index++) {
                var element = this._allData[index];
                if (element.vo.no == data.PartnerNo) {
                    if (is17000) {
                        element.init17000(data);
                        return;
                    }
                    if (is17008) {
                        element.init17008(data);
                        return;
                    }
                    if (is17009) {
                        element.init17009(data);
                        return;
                    }
                }
            }
        }
    }

    /**
     * 获得宠物属性
     * @param {number} id 宠物唯一id
     * @param {boolean} [isNo=false] 是否用宠物编号查找
     * @returns {*}
     * @memberof SPetData
     */
    public getPetInfo(id: number, isNo: boolean = false): PetInfo {
        for (let index = 0; index < this._allData.length; index++) {
            var element: PetInfo = this._allData[index];
            if (!isNo) {
                if (element.PartnerId == id) {
                    return element;
                }
            }
            else {
                if (element.vo.no == id) {
                    return element;
                }
            }
        }
        return null;
    }

    /**
     * 获得已激活的宠物列表
     * @readonly
     * @type {Array<PetInfo>}
     * @memberof SPetData
     */
    public get hasActivePet(): Array<PetInfo> {
        var arr: Array<PetInfo> = [];
        for (let index = 0; index < this._allData.length; index++) {
            var element = this._allData[index];
            if (element.active) {
                arr.push(element);
            }
        }
        return arr;
    }

    /**
     * 获得已激活宠物信息
     * @param {number} id
     * @returns {PetInfo}
     * @memberof SPetData
     */
    public getPetInfoByPartnerId(id: number): PetInfo {
        var arr: Array<PetInfo> = this.hasActivePet;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.PartnerId == id) {
                return element;
            }
        }
        return null;
    }

    /**
     * 更新战斗列表
     * @memberof SPetData
     */
    public updateFightList(arr: Array<PetInfo>): void {
        this._fightList = arr;
    }

    private checkIsInFightList(id: number): number {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if (element && element.PartnerId == id) {
                return index;
            }
        }
        return -1;
    }

    public get fightList(): Array<PetInfo> {
        return this._fightList;
    }

    public get canAddPoint(): boolean {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if (element && element.canAddPoint) {
                return true;
            }
        }
        return false;
    }


    /**
     * 出战和备战宠物是否可以升级
     * @readonly
     * @type {boolean}
     * @memberof SPetData
     */
    public get canLevel(): boolean {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if (element && element.canLevel) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否可以修炼
     * @readonly
     * @type {boolean}
     * @memberof SPetData
     */
    public get canTrain(): boolean {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if (element && element.canTrain) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否可以学习技能书
     * @readonly
     * @type {boolean}
     * @memberof SPetData
     */
    public get canLearnSkill(): boolean {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if (element && element.canLearSkill) {
                return true;
            }
        }
        return false;
    }

    public get canRefine(): boolean {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if (element && element.canRefine) {
                return true;
            }
        }
        return false;
    }

    public get showRed(): boolean {
        if (this.canLevel || this.canRefine || this.canTrain || this.canLearnSkill) {
            return true;
        }
        return false;
    }
}

export enum SPetEvent {
    PET_REQURST_ACTIVE = "pet_request_active",//激活一个宠物
    PET_REQUEST_FIGHTSTATE = "pet_request_fightState",//申请设置宠物出战、休息、锁定 状态
    PET_REQUEST_BUYCOUNT = "pet_request_buyCount",//申请购买宠物携带数量
    PET_REQUEST_MAINPET = "pet_request_mainPet",//申请设置主宠物
    PET_REQUEST_XISUI = "pet_request_xisui",//申请洗隋
    PET_REQUEST_CHANGENAME = "pet_request_changeName",//申请改名
    PET_REQUEST_PETINFO = "pet_request_petInfo",//申请宠物信息
    PET_REQUEST_PETEQUIPLIST = "pet_request_petEquipList",//申请宠物装备
    PET_REQUEST_PETEORDECHANGE = "pet_request_petOrdeChange",//申请宠物支援改变
    PET_REQUEST_WASHPOINT = "pet_request_washPoint",//申请宠物洗点
    PET_REQUEST_ADDPOINT = "pet_request_addPoint",//申请宠物加点
    PET_REQUEST_USEGODDS = "pet_request_useGoods",//为宠物使用物品
    PET_REQUEST_TRAIN = "pet_request_train",//申请宠物修炼
    PET_REQUEST_REFINE = "pet_request_refine",//申请炼化
    PET_REQUEST_LEARNSKILL = "pet_request_learnSkill",//学习技能
    PET_REQUEST_FORGETSKILL = "pet_request_forgetSkill",//遗忘节能
    PET_ACTIVE_SUCCEFUL = "pet_active_succeful",//成功激活一个宠物
    PET_FIGHTSTATE_SUCCEFUL = "pet_fightState_succeful",//设置宠物出战、休息、锁定 状态成功
    PET_BUYCOUNT_SUCCEFUL = "pet_buyCount_succeful",//购买宠物携带数量成功
    PET_MAINPET_SUCCEFUL = "pet_mainPet_succeful",//设置主宠物成功
    PET_XISUI_SUCCEFUL = "pet_xisui_succeful",//洗隋成功
    PET_CHANGENAME_SUCCEFUL = "pet_changeName_succeful",//改名成功
    PET_PETINFO_SUCCEFUL = "pet_petInfo_succeful",//宠物信息成功
    PET_PETEQUIPLIST_SUCCEFUL = "pet_petEquipList_succeful",//宠物装备成功
    PET_PROPUPDATE = "pet_propUpdate",//宠物属性更新
    PET_PETEORDECHANGE_SUCCEFUL = "pet_petOrdeChange_succeful",//申请宠物支援改变成功
    PET_USEGODDS_SUCCEFUL = "pet_useGoods_succeful",//申请为宠物使用物品成功
    PET_TRAIN_SUCCEFUL = "pet_train_succeful",//申请宠物修炼成功
    PET_REFINE_SUCCEFUL = "pet_refine_succeful",//申请宠物炼化成功
    PET_LEARNSKILL_SUCCEFUL = "pet_learnSkill_succeful",//申请学习技能成功
    PET_FORGETSKILL_SUCCEFUL = "pet_forgetSkill_succeful",//申请遗忘技能成功
    PET_REQUEST_DIANHUA = "pet_request_dianhua",//申请点化宠物
    PET_DIANHUA_SUCCEFUL = "pet_dianhua_succeful",//宠物点化成功
    PET_REQUEST_SHOULING_UP = "pet_request_shouling_up",//申请宠物兽灵升级
    PET_SHOULING_UP_SUCCEFUL = "pet_shouling_up_succeful",//宠物兽灵升级成功
    ASK_PET_TUJIAN_UP = "ask_pet_tujian_up",//申请宠物图鉴升级
    ANS_PET_TUJIAN_UP = "ans_pet_tujian_up",//返回宠物图鉴升级
    PET_UPDATE_PANEL_SELECT = "pet_update_panel_select",//改变面板选中的宠物
    PET_EQUIP_REFRESH = "pet_equip_refresh",//宠物装备更新
    PET_DIANHUA_SKILL_UP = "PET_DIANHUA_SKILL_UP",//宠物点化技能升级
}
import { Comate_attrVo } from "../../../../../db/sheet/vo/Comate_attrVo";
import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { Comate_starVo } from "../../../../../db/sheet/vo/Comate_starVo";
import { Comate_talentVo } from "../../../../../db/sheet/vo/Comate_talentVo";
import { DataManager } from "../../../../../message/manager/DataManager";
import { SBagData } from "../../../../../net/data/SBagData";
import { S37001, S37001_3, S37001_4, S37003, S37004, S37005, S37006, S37007, S37008, S37009, S37010, S37011, S37012, S37012_1, S37013, S37014, S37015, S37016, S37019, S37021, S37022, S37025, S37025_1, S37026, S37027, S37029, S37024 } from "../../../../../net/pt/pt_37";
import { CommonControl } from "../../../../common/control/CommonControl";
import { MsgManager } from "../../../manager/MsgManager";
import { ComatemainProtocol } from "../protocol/ComatemainProtocol";
import { ComateInfo } from "./ComateInfo";
import { MinggeInfo } from "./MinggeInfo";
export class SComateData extends Laya.EventDispatcher {
    private static _instance: SComateData;
    public Comates: Array<ComateInfo> = new Array<ComateInfo>();//所有宠物集合
    public CurrentComate: ComateInfo = null;
    public CurrentLine: Laya.Dictionary = new Laya.Dictionary()//当前阵容
    public protocol: ComatemainProtocol = new ComatemainProtocol();//协议
    public static get instance(): SComateData {
        return SComateData._instance || (SComateData._instance = new SComateData());
    }

    constructor() {
        super();
    }
    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E37001, this, this.onS37001);
        DataManager.cancel(PROTOCOL.E37003, this, this.onS37003);
        DataManager.cancel(PROTOCOL.E37004, this, this.onS37004);
        DataManager.cancel(PROTOCOL.E37005, this, this.onS37005);
        DataManager.cancel(PROTOCOL.E37006, this, this.onS37006);
        DataManager.cancel(PROTOCOL.E37007, this, this.onS37007);
        DataManager.cancel(PROTOCOL.E37008, this, this.onS37008);
        DataManager.cancel(PROTOCOL.E37009, this, this.onS37009);
        DataManager.cancel(PROTOCOL.E37010, this, this.onS37010);
        DataManager.cancel(PROTOCOL.E37011, this, this.onS37011);
        DataManager.cancel(PROTOCOL.E37012, this, this.onS37012);
        DataManager.cancel(PROTOCOL.E37013, this, this.onS37013);
        DataManager.cancel(PROTOCOL.E37014, this, this.onS37014);
        DataManager.cancel(PROTOCOL.E37015, this, this.onS37015);
        DataManager.cancel(PROTOCOL.E37016, this, this.onS37016);
        DataManager.cancel(PROTOCOL.E37019, this, this.onS37019);
        DataManager.cancel(PROTOCOL.E37021, this, this.onS37021);
        DataManager.cancel(PROTOCOL.E37022, this, this.onS37022);
        DataManager.cancel(PROTOCOL.E37024, this, this.onS37024);
        DataManager.cancel(PROTOCOL.E37025, this, this.onS37025);
        DataManager.cancel(PROTOCOL.E37026, this, this.onS37026);
        DataManager.cancel(PROTOCOL.E37027, this, this.onS37027);
        DataManager.cancel(PROTOCOL.E37029, this, this.onS37029);
    }

    public registerEvent() {
        this.initAllComate();
        DataManager.listen(PROTOCOL.E37001, this, this.onS37001);
        DataManager.listen(PROTOCOL.E37003, this, this.onS37003);
        DataManager.listen(PROTOCOL.E37004, this, this.onS37004);
        DataManager.listen(PROTOCOL.E37005, this, this.onS37005);
        DataManager.listen(PROTOCOL.E37006, this, this.onS37006);
        DataManager.listen(PROTOCOL.E37007, this, this.onS37007);
        DataManager.listen(PROTOCOL.E37008, this, this.onS37008);
        DataManager.listen(PROTOCOL.E37009, this, this.onS37009);
        DataManager.listen(PROTOCOL.E37010, this, this.onS37010);
        DataManager.listen(PROTOCOL.E37011, this, this.onS37011);
        DataManager.listen(PROTOCOL.E37012, this, this.onS37012);
        DataManager.listen(PROTOCOL.E37013, this, this.onS37013);
        DataManager.listen(PROTOCOL.E37014, this, this.onS37014);
        DataManager.listen(PROTOCOL.E37015, this, this.onS37015);
        DataManager.listen(PROTOCOL.E37016, this, this.onS37016);
        DataManager.listen(PROTOCOL.E37019, this, this.onS37019);
        DataManager.listen(PROTOCOL.E37021, this, this.onS37021);
        DataManager.listen(PROTOCOL.E37022, this, this.onS37022);
        DataManager.listen(PROTOCOL.E37024, this, this.onS37024);
        DataManager.listen(PROTOCOL.E37025, this, this.onS37025);
        DataManager.listen(PROTOCOL.E37026, this, this.onS37026);
        DataManager.listen(PROTOCOL.E37027, this, this.onS37027);
        DataManager.listen(PROTOCOL.E37029, this, this.onS37029);
    }
    private initAllComate() {
        if (this.Comates.length == 0) {
            var list: Array<Comate_cfgVo> = Comate_cfgVo.getAll;
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                var info: ComateInfo = new ComateInfo();
                info.Sheet = element;
                info.No = element.no;
                this.Comates.push(info);
            }
        }
    }


    public get allData(): Array<ComateInfo> {
        this.Comates.sort((a, b): number => {

            if (a.IsHave == b.IsHave) {
                if (a.IsHave == true) {
                    if (a.IsSet == b.IsSet) {
                        if (a.IsSet == true) {
                            if (a.No < b.No) {
                                return 1;
                            }
                            return -1;
                        }
                        else {
                            if (a.No < b.No) {
                                return 1;
                            }
                            return -1;
                        }
                    }
                    else {
                        if (!a.IsSet && b.IsSet) {
                            return 1;
                        }
                        else if (a.IsSet && !b.IsSet) {
                            return -1;
                        }
                    }
                }
                else {
                    if (!a.canActive && b.canActive) {
                        return 1;
                    }
                    else if (a.canActive && !b.canActive) {
                        return -1;
                    }
                    if (a.No < b.No) {
                        return -1;
                    }
                    return 1;
                }

            }
            else {
                if (!a.IsHave && b.IsHave) {
                    return 1;
                }
                else if (a.IsHave && !b.IsHave) {
                    return -1;
                }
            }
        });
        return this.Comates;
    }

    // public get showRed():boolean
    // {
    //     var isShow = false;
    //     for (let i = 0; i < this.Comates.length; i++) {
    //         const info:ComateInfo = this.Comates[i];
    //         if(info.IsHave)
    //         {
    //             isShow = this.refreshStarRed(info);
    //             if(isShow)
    //             {
    //                 break;
    //             }
    //             else
    //             {
    //                 isShow = this.refreshTalentRed(info);
    //                 if(isShow)
    //                 {
    //                     break;
    //                 }
    //                 else
    //                 {
    //                     isShow = this.LvRed;
    //                     if(isShow)
    //                     {
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //         else
    //         {
    //             this.refreshComateActiveRed(info);
    //         }
    //     }
    //     return isShow;
    // }

    public get InfoRed(): boolean {
        var isShow = false;
        for (let i = 0; i < this.Comates.length; i++) {
            const info: ComateInfo = this.Comates[i];
            if (!info.IsHave) {
                isShow = this.refreshComateActiveRed(info);
                if (isShow) {
                    return true;
                }
            }
        }
        return isShow;
    }

    public get StarRed(): boolean {
        var isShow = false;
        for (let i = 0; i < this.Comates.length; i++) {
            const info: ComateInfo = this.Comates[i];
            if (info.IsHave) {
                isShow = this.refreshStarRed(info);
                if (isShow) {
                    break;
                }
            }
        }
        return isShow;
    }

    public get TalentRed(): boolean {
        var isShow = false;
        for (let i = 0; i < this.Comates.length; i++) {
            const info: ComateInfo = this.Comates[i];
            if (info.IsHave) {
                isShow = this.refreshTalentRed(info);
                if (isShow) {
                    break;
                }
            }
        }
        return isShow;
    }

    public get TalentChangeRed(): boolean {
        var isShow = false;
        for (let i = 0; i < this.Comates.length; i++) {
            const info: ComateInfo = this.Comates[i];
            if (info.IsHave) {
                isShow = this.refreshTalentChange(info);
                if (isShow) {
                    break;
                }
            }
        }
        return isShow;
    }

    public refreshTalentChange(comateInfo: ComateInfo): boolean {
        var isRed: boolean = false;
        //这个红点是非常耗性能的，如果卡请叫策划取消该红点
        var totalPoint = comateInfo.UsePoint + comateInfo.TalentPoint;
        var nextPoint = totalPoint + 1;
        var costValue: number = 0;
        var goodsiD: number = 0;
        var max = false;
        for (let i = totalPoint + 1; i <= nextPoint; i++) {
            var vo: Comate_talentVo = Comate_talentVo.get(i);
            if (vo == null || (vo && vo.price == null)) {
                max = true;
                break;
            }
            goodsiD = vo.price_type;
            costValue += vo.price;
        }
        var bagnum = SBagData.instance.prop.getItemCountByGoodsNo(goodsiD);
        if (!max && goodsiD > 0 && bagnum >= costValue) {
            isRed = true;
        }
        else
            isRed = false;

        return isRed;
    }

    public refreshStarRed(comateInfo: ComateInfo): boolean {
        var isRed: boolean = false;
        var startNextLv = comateInfo.StarLv + 1;
        var vo: Comate_starVo = Comate_starVo.getComateStarCost(comateInfo.No, startNextLv);
        if (vo != null) {
            var costTable = vo.costs[0];
            var goodsId = costTable[0];
            var goodsNum = costTable[1];
            var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
            if (num >= goodsNum) {
                isRed = true;
            }
        }
        return isRed;
    }

    public refreshComateActiveRed(comateInfo: ComateInfo): boolean {
        if (comateInfo.IsHave) return false;
        var costData = comateInfo.Sheet.unlock_condition[0];
        if (costData[1] == null) return false;
        var goodsId = costData[0];
        var goodsNum = costData[1];
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        return num >= goodsNum;
    }

    public refreshTalentRed(comateInfo: ComateInfo): boolean {
        var isRed: boolean = false;
        var noUsePoint = comateInfo.TalentPoint;
        var usePointProject: Laya.Dictionary = comateInfo.AddPoint;
        if (noUsePoint > 0) {
            if (usePointProject.values.length == 12) {
                var vos: Array<Comate_attrVo> = Comate_attrVo.getComateAttr(comateInfo.No);
                for (let i = 0; i < vos.length; i++) {
                    const vo: Comate_attrVo = vos[i];
                    var curPoint = usePointProject.get(vo.attr_no);
                    if (curPoint && curPoint < vo.max_point) {
                        isRed = true;
                        break;
                    }
                }
            }
            else {
                isRed = true;
            }
        }
        else {

        }

        return isRed;
    }



    public get LvRed(): boolean {
        var isShow = false;
        for (let i = 0; i < this.Comates.length; i++) {
            const info: ComateInfo = this.Comates[i];
            if (info.canLevel) {
                return true;
            }
        }
        return isShow;
    }


    /**
     * 根据编号查找
     * @param no 
     */
    public getComateByNo(no: number): ComateInfo {
        var info: ComateInfo = null;
        for (let i = 0; i < this.Comates.length; i++) {
            const data = this.Comates[i];
            if (data.No == no) {
                info = data;
                break;
            }
        }
        return info;
    }
    /**
     * 根据id查找
     * @param Id 
     */
    public getComateById(Id: number): ComateInfo {
        var info: ComateInfo = null;
        for (let i = 0; i < this.Comates.length; i++) {
            const data = this.Comates[i];
            if (data.Id == Id) {
                info = data;
                break;
            }
        }
        return info;
    }

    private onS37001(data: S37001) {
        var info: ComateInfo = this.getComateByNo(data.No);
        if (info == null)
            return;
        info.Id = data.Id;
        info.StarLv = data.StarLv;
        info.StarSoul = data.StarSoul;
        info.BreakLv = data.BreakLv;
        info.BreakExp = data.BreakExp;
        info.SpiritLv = data.SpiritLv;
        info.SpiritExp = data.SpiritExp;
        info.item_3 = data.item_3;
        info.item_4 = data.item_4;
        info.TalentPoint = data.TalentPoint;
        info.AddPoint.clear();
        for (let j = 0; j < data.item_1.length; j++) {
            const element1 = data.item_1[j];
            info.AddPoint.set(element1.No, element1.Point);
        }

        for (let j = 0; j < data.item_2.length; j++) {
            const element1 = data.item_2[j];
            info.BaseAttribute.set(element1.Key, element1.NewValue);
        }
        this.event(SComateEvent.COMATE_HAVE_NEW, [data.Id]);
    }

    //重新设置属性
    private onS37019(data: S37019) {
        var info: ComateInfo = this.getComateByNo(data.No);
        if (info == null)
            return;
        info.Id = data.Id;
        info.StarLv = data.StarLv;
        info.StarSoul = data.StarSoul;
        info.BreakLv = data.BreakLv;
        info.BreakExp = data.BreakExp;
        info.SpiritLv = data.SpiritLv;
        info.SpiritExp = data.SpiritExp;
        info.item_3 = data.item_3;
        info.item_4 = data.item_4;
        info.TalentPoint = data.TalentPoint;
        info.AddPoint.clear();
        for (let j = 0; j < data.item_1.length; j++) {
            const element1 = data.item_1[j];
            info.AddPoint.set(element1.No, element1.Point);
        }
        info.BaseAttribute.clear()
        for (let j = 0; j < data.item_2.length; j++) {
            const element1 = data.item_2[j];
            info.BaseAttribute.set(element1.Key, element1.NewValue);
        }
        this.event(SComateEvent.COMATE_ATTR_UPDATE, [data.Id]);
    }

    private onS37003(data: S37003) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        info.StarLv = data.StarLv;
        info.StarSoul = data.StarSoul;
        this.event(SComateEvent.COMATE_ATTR_UPDATE, [info.Id]);
    }

    private onS37004(data: S37004) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        info.TalentPoint = data.CurPoint;
        this.event(SComateEvent.COMATE_TALENT_UPDATE, [info.Id]);
    }

    private onS37005(data: S37005) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        info.TalentPoint = data.CurPoint;
        info.AddPoint.clear();
        this.event(SComateEvent.COMATE_TALENT_UPDATE, [info.Id]);
    }
    /**
     * 分配点最终值
     * @param data 
     */
    private onS37006(data: S37006) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        info.TalentPoint = data.CurPoint;
        for (let j = 0; j < data.item_2.length; j++) {
            const element = data.item_2[j];
            info.AddPoint.set(element.No, element.Point);
        }
        this.event(SComateEvent.COMATE_TALENT_UPDATE, [info.Id]);
    }

    private onS37007(data: S37007) {
        var _data = data.item_1;
        for (let i = 0; i < _data.length; i++) {
            const element = _data[i];
            var info: ComateInfo = this.getComateByNo(element.No);
            if (info == null)
                continue;
            info.Id = element.Id;
            info.StarLv = element.StarLv;
            info.StarSoul = element.StarSoul;
            info.BreakLv = element.BreakLv;
            info.BreakExp = element.BreakExp;
            info.SpiritLv = element.SpiritLv;
            info.SpiritExp = element.SpiritExp;
            info.TalentPoint = element.TalentPoint;
            info.item_4 = element.item_4;
            info.AddPoint.clear();
            for (let j = 0; j < element.item_1.length; j++) {
                const element1 = element.item_1[j];
                info.AddPoint.set(element1.No, element1.Point);
            }

            for (let j = 0; j < element.item_2.length; j++) {
                const element1 = element.item_2[j];
                info.BaseAttribute.set(element1.Key, element1.NewValue);
            }
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_COMRADE_EQP, info.Id, 2);//请求伙伴装备
        }
    }

    private onS37008(data: S37008) {
        this.CurrentLine.clear();
        for (let i = 0; i < this.Comates.length; i++) {
            const info: ComateInfo = this.Comates[i];
            info.Pos = 0;
        }
        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            this.CurrentLine.set(element.Pos, element.ObjNo);
            if (element.ObjNo != 0) {
                var info: ComateInfo = this.getComateByNo(element.ObjNo);
                if (info != null)
                    info.Pos = element.Pos;
            }
        }
        this.event(SComateEvent.COMATE_LINE_UPDATE);
    }

    private onS37009(data: S37009) {
        this.CurrentLine.clear();
        var LineupData = data.item_1[0];//默认只有一个阵容
        if (!LineupData)
            return;
        for (let i = 0; i < LineupData.item_1.length; i++) {
            const element = LineupData.item_1[i];
            this.CurrentLine.set(element.Pos, element.ObjNo);
            if (element.ObjNo != 0) {
                var info: ComateInfo = this.getComateByNo(element.ObjNo);
                if (info != null)
                    info.Pos = element.Pos;
            }
        }
    }

    public getCanSetPos(): number {
        var pos = 0;
        for (let i = 1; i <= 3; i++) {
            const no = this.CurrentLine.get(i);
            if (no == null) {
                pos = i
                break;
            }
        }
        return pos
    }

    private onS37010(data: S37010) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var value = info.BaseAttribute.get(element.Key);
            info.BaseAttribute.set(element.Key, element.NewValue);
        }
        this.event(SComateEvent.COMATE_ATTR_UPDATE, [info.Id]);
    }

    private onS37011(data: S37011) {
        if (data.RetCode != 0) {
            MsgManager.instance.showRollTipsMsg("升级失败");
            return;
        }
        this.event(SComateEvent.COMATE_LVUP_SUCCESS);
    }

    //伙伴缘分数据
    public yuanfenData: S37012;
    private onS37012(data: S37012) {
        this.yuanfenData = data;
        this.event(SComateEvent.ANS_COMATE_YUANFEN);
    }

    private onS37013(data: S37013) {
        var getData = false;
        for (let i = 0; i < this.yuanfenData.item_1.length; i++) {
            const element = this.yuanfenData.item_1[i];
            if (data.No == element.No) {
                element.Lv = data.Lv;
                getData = true;
                break;
            }
        }
        if (!getData) {
            var newData = new S37012_1;
            newData.No = data.No;
            newData.Lv = data.Lv;
            this.yuanfenData.item_1.push(newData);
        }

        this.event(SComateEvent.ANS_COMATE_YUANFEN);
    }

    public getYuanfenStarLv(comateNo: number) {
        if (!this.yuanfenData) {
            return 0;
        }
        for (let i = 0; i < this.yuanfenData.item_1.length; i++) {
            const element = this.yuanfenData.item_1[i];
            if (comateNo == element.No) {
                return element.Lv;
            }
        }
        return 0;
    }

    //伙伴突破
    private onS37014(data: S37014) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        info.BreakLv = data.BreakLv;
        info.BreakExp = data.BreakExp;
        this.event(SComateEvent.COMATE_ATTR_UPDATE, [info.Id]);
    }

    //伙伴突破
    private onS37015(data: S37015) {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info == null)
            return;
        info.SpiritLv = data.SpiritLv;
        info.SpiritExp = data.SpiritExp;
        this.event(SComateEvent.COMATE_ATTR_UPDATE, [info.Id]);
    }


    //宠物点化技能
    private onS37016(data: S37016): void {
        var info: ComateInfo = this.getComateById(data.Id);
        if (info && info.item_3) {
            var change = false;
            for (let i = 0; i < info.item_3.length; i++) {
                const element = info.item_3[i];
                if (element.SkillNo == data.SkillNo) {
                    change = true;
                    element.SkillLv = data.SkillLv;
                    break;
                }
            }
            if (change == false) {
                var newData = new S37001_3;
                newData.SkillType = 2;
                newData.SkillNo = data.SkillNo;
                newData.SkillLv = data.SkillLv;
                info.item_3.push(newData);
            }
        }
        this.event(SComateEvent.COMATE_YUANSHEN_SKILL_UP);
    }

    //==============================伙伴命格=================================================
    public minggeBagList: MinggeInfo[];
    public minggePoolList: MinggeInfo[];
    public minggeDic: Laya.Dictionary = new Laya.Dictionary;//原始的数据列表
    //吞噬命格
    private onS37024(data: S37024): void {
        if (data.ComradeId > 0 ) {
            var comateInfo = this.getComateById(data.ComradeId);
            for (let i = 0; i < comateInfo.item_4.length; i++) {
                const element = comateInfo.item_4[i];
                if(element && element.Id == data.YaoDanId){
                    element.TotalExp += data.AddExp;
                    break;
                }
            }
        } else  {
            for (let i = 0; i < this.minggeBagList.length; i++) {
                const element = this.minggeBagList[i];
                if(element && element.serverInfo.Id == data.YaoDanId){
                    element.serverInfo.TotalExp += data.AddExp;
                    break;
                }
            }
        }
        this.event(SComateEvent.MINGGE_ITEM_CHANGE);
    }
    //命格列表
    private onS37025(data: S37025): void {
        if (data.Location == 1) {
            this.minggeBagList = [];
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                var minggeData = new MinggeInfo(element);
                this.minggeBagList.push(minggeData);
            }
        } else if (data.Location == 3) {
            this.minggePoolList = [];
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                var minggeData = new MinggeInfo(element);
                this.minggePoolList.push(minggeData);
            }
        }
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            this.minggeDic.set(element.Id, element);
        }
        this.event(SComateEvent.MINGGE_ITEM_CHANGE);
    }

    //装备命格
    private onS37021(data: S37021): void {
        var comateInfo = this.getComateById(data.ComradeId)
        var item_4 = comateInfo.item_4;
        var saveData: S37025_1 = this.minggeDic.get(data.YaoDanId);
        // var equipData: S37001_4 = new S37001_4;
        var equiped: boolean = false;
        for (let i = 0; i < item_4.length; i++) {
            const element = item_4[i];
            if (element.HoleNo == data.HoleNo) {
                element.Id = saveData.Id;
                element.No = saveData.No;
                element.Lv = saveData.Lv;
                element.TotalExp = saveData.TotalExp;
                equiped = true;
            }
        }
        if(!equiped){
            var newData = new S37001_4;
            newData.HoleNo = data.HoleNo;
            newData.Id = saveData.Id;
            newData.No = saveData.No;
            newData.Lv = saveData.Lv;
            newData.TotalExp = saveData.TotalExp;
            item_4.push(newData);
        }
        comateInfo.item_4 = item_4;
        this.event(SComateEvent.MINGGE_ITEM_CHANGE);
    }

    //脱掉命格
    private onS37022(data: S37022): void {
        var comateInfo = this.getComateById(data.ComradeId)
        var item_4 = comateInfo.item_4;
        for (let i = 0; i < item_4.length; i++) {
            const element = item_4[i];
            if (element.HoleNo == data.HoleNo) {
                var datatemp = item_4.splice(i, 1)[0] as S37001_4;
                datatemp.HoleNo = 0;
                comateInfo.item_4 = item_4;
                break;
            }
        }
        // comateInfo.minggeHoleList[data.HoleNo] = null;
        // for (let i = comateInfo.minggeTypeList.length - 1; i >=0 ; i--) {
        //     if(comateInfo.minggeTypeList[i].HoleNo == data.HoleNo){
        //         comateInfo.minggeTypeList.splice(i,1);
        //         break;
        //     }
        // }
        this.event(SComateEvent.MINGGE_ITEM_CHANGE);
    }

    //命格增加
    private onS37026(data: S37026): void {
        if (data.Location == 1) {
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                var minggeData = new MinggeInfo(element);
                this.minggeBagList.push(minggeData);
            }
        }
        if (data.Location == 3) {
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                var minggeData = new MinggeInfo(element);
                this.minggePoolList.push(minggeData);
                this.event(SComateEvent.LIEMING_ITEM_INFO_BACK, [minggeData]);
            }
        }
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            this.minggeDic.set(element.Id, element);
        }
        this.event(SComateEvent.MINGGE_ITEM_CHANGE);
    }

    //命格删除
    private onS37027(data: S37027): void {
        if (data.Location == 1) {
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                for (let j = this.minggeBagList.length - 1; j >= 0; j--) {
                    const element2 = this.minggeBagList[j];
                    if (element.Id == element2.serverInfo.Id) {
                        this.minggeBagList.splice(j, 1);
                        break;
                    }
                }
            }
        }
        if (data.Location == 3) {
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                for (let j = this.minggePoolList.length - 1; j >= 0; j--) {
                    const element2 = this.minggePoolList[j];
                    if (element.Id == element2.serverInfo.Id) {
                        this.minggePoolList.splice(j, 1);
                        break;
                    }
                }
            }
            this.event(SComateEvent.LIEMING_POOL_CHANGE);
        }
        this.event(SComateEvent.MINGGE_ITEM_CHANGE);
    }

    //返回可以
    public maxLiemingCanClick: number = 0;
    private liemingClickInfo:S37029;
    private onS37029(data: S37029): void {
        this.liemingClickInfo = data;
        var maxNum = 0;
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            maxNum = Math.max(maxNum, element.No);
        }
        this.maxLiemingCanClick = maxNum;
        this.event(SComateEvent.LIEMING_CAN_CLICK_CHANGE);
    }

    public checkCanClickLieming(index:number):boolean{
        if(!this.liemingClickInfo){
            return false;
        }
        for (let i = 0; i < this.liemingClickInfo.item_1.length; i++) {
            const element = this.liemingClickInfo.item_1[i];
            if(element.No == index){
                return true;
            }
        }
        return false;
    }

    public getOneKeyList(comateInfo: ComateInfo): MinggeInfo[] {
        if(!this.minggeBagList){
            return [];
        }
        var typeList = comateInfo.minggeTypeList;
        var changeHoleList: MinggeInfo[] = [];//按类型放的列表
        for (let i = 0; i < this.minggeBagList.length; i++) {
            const element = this.minggeBagList[i];
            if (changeHoleList[element.cfg.type]) {
                if (changeHoleList[element.cfg.type].battlePower < element.battlePower) {
                    changeHoleList[element.cfg.type] = element;
                }
            } else {
                if (typeList[element.cfg.type]) {
                    if (typeList[element.cfg.type].battlePower < element.battlePower) {
                        changeHoleList[element.cfg.type] = element;
                    }
                } else {
                    changeHoleList[element.cfg.type] = element;
                }
            }
        }
        return changeHoleList;
    }

    public unEquipMingge(data: MinggeInfo): void {
        var index: number = -1;
        for (let i = 0; i < this.CurrentComate.minggeHoleList.length; i++) {
            if (this.CurrentComate.minggeHoleList[i] == data) {
                index = i;
                break;
            }
        }
        (index > 0) && (this.protocol.send37022(this.CurrentComate.Id, index));
    }


}

export enum SComateEvent {
    COMATE_ATTR_UPDATE = "comate_attr_update",//某个伙伴属性更新
    COMATE_LINE_UPDATE = "comate_line_update",//阵容更新
    COMATE_STAR_UPDATE = "comate_star_update",//升星更新
    COMATE_HAVE_NEW = "comate_have_new",//新伙伴通知
    COMATE_TALENT_UPDATE = "comate_talent_update",//天赋分配
    COMATE_SELECT_UPDATE = "comate_select_update",//选择伙伴更新
    COMATE_REQUEST_LINE = "comate_request_line",//请求上阵
    COMATE_REQUEST_STAR = "comate_request_star",//请求升星
    COMATE_REQUEST_EXCHANGE = "comate_request_exchange",//请求兑换
    COMATE_REQUEST_LVUP = "comate_request_lvup",//请求升级
    COMATE_LVUP_SUCCESS = "comate_lvup_SUCCESS",//请求升级成功
    ANS_COMATE_YUANFEN = "ANS_COMATE_YUANFEN",//伙伴缘分数据返回
    COMATE_EQUIP_REFRESH = "comate_equip_refresh",//伙伴装备更新
    COMATE_YUANSHEN_UP_SUCCEFUL = "COMATE_YUANSHEN_UP_SUCCEFUL",//伙伴元神升级
    COMATE_YUANSHEN_SKILL_UP = "COMATE_YUANSHEN_SKILL_UP",//伙伴元神技能升级

    MINGGE_ITEM_CHANGE = "MINGGE_ITEM_CHANGE",//命格道具变化
    LIEMING_CAN_CLICK_CHANGE = "LIEMING_CAN_CLICK_CHANGE",//猎命可点变化
    LIEMING_ITEM_INFO_BACK = "LIEMING_ITEM_INFO_BACK",//通过猎命获得道具
    LIEMING_POOL_CHANGE = "LIEMING_POOL_CHANGE",//猎命池直接发生改变

}
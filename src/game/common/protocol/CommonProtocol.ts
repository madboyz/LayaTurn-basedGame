import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { FbVo } from "../../../db/sheet/vo/FbVo";
import { SMailData } from "../../../net/data/SMailData";
import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C13002, C13046, C13047, C13059, C13070, C13090, C13091, C13092, C13053, C13030, C13300, C13095 } from "../../../net/pt/pt_13";
import { C14000, C14011 } from "../../../net/pt/pt_14";
import { C15000, C15001, C15030, C15031, C15050, C15054, C15005, C15049 } from "../../../net/pt/pt_15";
import { C17009, C17008, C17031 } from "../../../net/pt/pt_17";
import { C19002, C19007, C19007_1, S19005 } from "../../../net/pt/pt_19";
import { C20002, C20001 } from "../../../net/pt/pt_20";
import { C21001 } from "../../../net/pt/pt_21";
import { C22005 } from "../../../net/pt/pt_22";
import { C32010, C32050 } from "../../../net/pt/pt_32";
import { C37007, C37009 } from "../../../net/pt/pt_37";
import { C52001, C52002 } from "../../../net/pt/pt_52";
import { C57003, C57003_1, C57018, C57019, C57002, C57001, C57017, C57022 } from "../../../net/pt/pt_57";
import { C58001 } from "../../../net/pt/pt_58";
import { C60001 } from "../../../net/pt/pt_60";
import { C10002 } from "../../../net/pt/pt_10";
import { SRoleData } from "../../../net/data/SRoleData";
import { MsgManager } from "../../ui/manager/MsgManager";
import { Debug } from "../../../debug/Debug";
import { C40055 } from "../../../net/pt/pt_40";
import { SChaosBattleData } from "../../activity/data/SChaosBattleData";
import { SCopyData } from "../../../net/data/SCopyData";
import { SGameData } from "../../../net/data/SGameData";
import { SNewBattleData } from "../../../net/data/SNewBattleData";
import { C16000, C16008 } from "../../../net/pt/pt_16";

export class CommonProtocol extends BaseProtocol {
    /**
     * 请求所有时装
     */
    public send13300() {
        var msg: C13300 = new C13300();
        this.send(msg);
    }
    /**
     * 请求所用称号
     */
    public send13030(): void {
        var msg: C13030 = new C13030();
        this.send(msg);
    }

    public send57002(): void {
        var msg: C57002 = new C57002();
        this.send(msg);
    }
    /**
     * 进入三界
     */
    public send16000(lvStep: number, IsSkip: number = 0): void {
        var msg: C16000 = new C16000();
        msg.LvStep = lvStep;
        msg.IsSkip = IsSkip;
        this.send(msg);
    }
    /**
     * 退出三界
     */
    public send16008(): void {
        var msg: C16008 = new C16008();
        this.send(msg);
    }


    public send57001(no: number): void {
        if (SGameData.instance.PLAYFIGHTREPORT) {
            if (SNewBattleData.instance.CurrentBattleType == BattleMainType.PVP) {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
            else if (SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.OffLineArena) {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
        }
        if (SRoleData.instance.info.TeamId != 0) {
            if (FbVo.get(no).role_num != 0) {
                MsgManager.instance.showRollTipsMsg("组队中无法进行该操作");
                return;
            }
        }
        if (SChaosBattleData.instance.isChaoScene()) {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if (SCopyData.instance.isInCopy) {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        var msg: C57001 = new C57001()
        msg.no = no;
        this.send(msg);
    }

    public send57017(no: number): void {
        if (SGameData.instance.PLAYFIGHTREPORT) {
            if (SNewBattleData.instance.CurrentBattleType == BattleMainType.PVP) {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
            else if (SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.OffLineArena) {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
        }
        if (SRoleData.instance.info.TeamId != 0) {
            MsgManager.instance.showRollTipsMsg("组队中无法进行该操作");
            return;
        }
        if (SChaosBattleData.instance.isChaoScene()) {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if (SCopyData.instance.isInCopy) {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        SCopyData.instance.copyType = 0;//重新打开面板扫荡清空
        var msg: C57017 = new C57017()
        msg.no = no;
        this.send(msg);
    }

    /**
     * 申请角色列表 
     * @private
     * @memberof SLogin
     */
    public send10002(): void {
        var msg: C10002 = new C10002();
        this.send(msg);
    }
    /**
     * 查询当前活动
     */
    public send58001() {
        var msg: C58001 = new C58001();
        this.send(msg);
    }

    /**
    * 兑换物品
    * @param {number} id
    * @memberof PetProtocol
    */
    public send32010(id: number): void {
        var msg: C32010 = new C32010();
        msg.NpcId = 0;
        msg.No = id;
        this.send(msg);
    }
    /**
     * 查询经脉
     */
    public send13046() {
        var msg: C13046 = new C13046();
        this.send(msg);
    }
    /**
     * 请求已获得伙伴
     */
    public send37007() {
        var msg: C37007 = new C37007();
        this.send(msg);
    }

    /**
     * 请求阵容信息
     */
    public send37009() {
        var msg: C37009 = new C37009();
        this.send(msg);
    }

    /**
     * 查询心法
     */
    public send13047() {
        var msg: C13047 = new C13047();
        this.send(msg);
    }

    public send13002(roleId: number): void {
        var msg: C13002 = new C13002();
        msg.PlayerId = roleId;
        this.send(msg);
    }

    public send14000(): void {
        var msg: C14000 = new C14000();
        this.send(msg);
    }

    public send32050(id: number): void {
        var msg: C32050 = new C32050();
        msg.MonId = id;
        this.send(msg);
    }

    public send20001(id: number): void {
        var msg: C20001 = new C20001();
        msg.MonId = id;
        this.send(msg);
    }

    public send14011(): void {
        var msg: C14011 = new C14011();
        this.send(msg);
    }

    public send15000(location: number, partnerId: number = 0, type = 1): void {
        var msg: C15000 = new C15000();
        msg.Location = location;
        msg.PartnerId = partnerId;
        msg.Type = type;
        this.send(msg);
    }

    public send15001(id: number): void {
        var msg: C15001 = new C15001();
        msg.GoodsId = id;
        this.send(msg);
    }

    public send15030(goodsId: number, partnerId: number = 0, type = 1): void {
        var msg: C15030 = new C15030();
        msg.GoodsId = goodsId;
        msg.PartnerId = partnerId;
        msg.Type = type;//传的类型，默认1宠物
        this.send(msg);
    }

    public send15031(slot: number, partnerId: number = 0, type = 1): void {
        var msg: C15031 = new C15031();
        msg.EquipPos = slot;
        msg.PartnerId = partnerId;
        msg.Type = type;//传的类型，默认1宠物
        this.send(msg);
    }

    public send15050(goodsId: number): void {
        var msg: C15050 = new C15050();
        msg.GoodsId = goodsId;
        this.send(msg);
    }

    public send15054(goodsId: number, effectNo: number): void {
        var msg: C15054 = new C15054();
        msg.GoodsId = goodsId;
        msg.EffNo = effectNo;
        this.send(msg);
    }

    public send13092() {
        var msg: C13092 = new C13092();
        this.send(msg);
    }

    public send13091(): void {
        var msg: C13091 = new C13091();
        this.send(msg);
        Debug.serverLog("请求离线挂机");
    }

    public send13090(): void {
        var msg: C13090 = new C13090();
        this.send(msg);
        Debug.serverLog("请求离线挂机状态");
    }

    public send20002(playerId: number, pkType: number) {
        var msg: C20002 = new C20002();
        msg.TargetPlayerId = playerId;
        msg.PK_Type = pkType;
        this.send(msg);
    }

    /**
     * 查询自身的已开放的系统列表
     * @memberof HudMainProtocol
     */
    public send13070(): void {
        var msg: C13070 = new C13070();
        this.send(msg);
    }

    public send21001(): void {
        var msg: C21001 = new C21001();
        this.send(msg);
    }

    //帮派技能
    public send40055(): void {
        var msg: C40055 = new C40055();
        this.send(msg);
    }

    /**
     * 获得宠物详细信息
     * @param {number} id
     * @memberof CommonProtocol
     */
    public send17009(id: number): void {
        var msg: C17009 = new C17009();
        msg.PartnerId = id;
        this.send(msg);
    }


    /**
     * 宠物跟随
     * @param id 
     */
    public send17031(id: number, follow: number): void {
        var msg: C17031 = new C17031();
        msg.PartnerId = id;
        msg.Follow = follow;
        this.send(msg);
    }

    /**
     * 查看邮件列表简要信息
     * @param {number} type
     * @memberof CommonProtocol
     */
    public send19002(type: number): void {
        var msg: C19002 = new C19002();
        msg.Type = type;
        this.send(msg);
    }

    /**
     * 删除领取了的邮件列表
     */
    public send19007(mailList: S19005): void {
        //收到奖励的邮件，加上直接删除
        var arr: Array<C19007_1> = [];
        for (let i = 0; i < mailList.item_2.length; i++) {
            const element = mailList.item_2[i];
            if (SMailData.instance.getMailInfo(element.MailId)) {
                var mail: C19007_1 = new C19007_1();
                mail.MailId = element.MailId;
                arr.push(mail);
            }
        }
        if (arr.length <= 0) {
            return;
        }
        var msg: C19007 = new C19007();
        msg.item_1 = arr;
        this.send(msg);
    }


    /**
     * 通用排行榜
     * @param {number} type
     * @memberof CommonProtocol
     */
    public send22005(type: number): void {
        var msg: C22005 = new C22005();
        msg.RankType = type;
        msg.Page = 1;
        this.send(msg);
    }

    public send52001(no: number, count: number): void {
        var msg: C52001 = new C52001();
        msg.No = no;
        msg.Count = count;
        this.send(msg);
    }

    public send52002(): void {
        var msg: C52002 = new C52002();
        this.send(msg);
    }

    /**
     * 查询副本信息
     * @memberof CommonProtocol
     */
    public send57003(type: number): void {
        var arr: Array<FbVo> = FbVo.getListByType(type);
        var msg: C57003 = new C57003();
        var info: C57003_1;
        var poins: Array<C57003_1> = [];
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            info = new C57003_1();
            info.no = element.no;
            poins.push(info);
        }
        msg.item_1 = poins;
        this.send(msg);
    }

    /**
     * 秘境章节副本进度查询,当前可以挑战的未通关的章节和副本编号
     * @memberof CommonProtocol
     */
    public send57018(): void {
        var msg: C57018 = new C57018();
        this.send(msg);
    }

    /**
     * 秘境章节副本信息查询
     * @param {number} no
     * @memberof CommonProtocol
     */
    public send57019(no: number): void {
        var msg: C57019 = new C57019();
        msg.ChapterID = no;
        this.send(msg);
    }

    /**
     * 获得坐骑信息
     * @memberof CommonProtocol
     */
    public send66001(): void {
        var msg: C60001 = new C60001();
        this.send(msg);
    }

    /**
     * 查询登录奖励是否已领
     * @param {number} IsGet//操作状态（1领取，0查询）
     * @memberof PetProtocol
     */
    public send13059(IsGet: number): void {
        var msg: C13059 = new C13059();
        msg.No = ConstVo.get("PLYR_START_REWARD").val;
        msg.IsGet = IsGet;
        this.send(msg);
    }

    /**
     * 获得已激活宠物列表
     * @memberof HudMainProtocol
     */
    public send17008(): void {
        var msg: C17008 = new C17008();
        this.send(msg);
    }

    /**
     * 初始化强化信息和宝石镶嵌信息
     * @private
     * @memberof SForgingData
     */
    public send15005(): void {
        var msg: C15005 = new C15005();
        this.send(msg);
    }

    /**
     * 使用物品
     * @private
     */
    public send15049(GoodsId: number, Count: number): void {
        var msg: C15049 = new C15049();
        msg.GoodsId = GoodsId;
        msg.Count = Count;
        this.send(msg);
    }

    /**
     * 查看各档充值状态
     */
    public send13095(): void {
        var msg: C13095 = new C13095();
        this.send(msg);
    }

    /**
     * 一键扫荡
     */
    public send57022(Type: CopyType): void {
        var msg: C57022 = new C57022();
        msg.Type = Type;
        this.send(msg);
    }
}
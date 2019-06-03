import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C23001, C23005, C23010, S23005_1, C23008, C23013, C23002 } from "../../../../../net/pt/pt_23";
import { C40017, C40001, C40003, C40010, C40012, C40016, C40013, C40011, C40006, C40004, C40008, C40007, C40014, C40062, C40061, C40059, C40054, C40035, C40037 } from "../../../../../net/pt/pt_40";
import { SGuildData } from "../data/SGuildData";
import { FbVo } from "../../../../../db/sheet/vo/FbVo";
import { C57102, C57102_1, C57016, C57105 } from "../../../../../net/pt/pt_57";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class GuildProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 请求联盟列表的基本信息
     */
    public send40017(pageIdx: number, SearchName: string): void {
        var msg: C40017 = new C40017();
        msg.PageSize = 9;
        msg.NotFull = 0;
        msg.PageNum = pageIdx;
        msg.SearchName = SearchName;
        this.send(msg);
    }

    /**
     * 创建联盟
     */
    public send40001(GuildName: string): void {
        var msg: C40001 = new C40001();
        msg.Lv = 1;
        msg.Brief = "";
        msg.GuildName = GuildName;
        this.send(msg);
    }

    /**
     * 申请加入帮派
     */
    public send40003(GuildId: number): void {
        var msg: C40003 = new C40003();
        msg.GuildId = GuildId;
        this.send(msg);
    }

    /**
     * 请求帮派的完整信息
     */
    public send40012(GuildId: number): void {
        var msg: C40012 = new C40012();
        msg.GuildId = GuildId;
        this.send(msg);
    }

    /**
     * 个人在帮派中的相关信息
     */
    public send40016(): void {
        var msg: C40016 = new C40016();
        this.send(msg);
    }

    /**
     * 修改帮派公告
     */
    public send40013(Tenet: string): void {
        var msg: C40013 = new C40013();
        msg.Tenet = Tenet;
        msg.GuildId = SGuildData.instance.myGuildData.GuildId;
        this.send(msg);
    }

    /**
     * 请求帮派申请列表
     */
    public send40011(): void {
        var msg: C40011 = new C40011();
        msg.GuildId = SGuildData.instance.myGuildData.GuildId;
        msg.PageSize = 50;
        msg.PageNum = 1;
        this.send(msg);
    }

    /**
     * 处理申请加入帮派
     */
    public send40004(PlayerId: number, Choise: number): void {
        var msg: C40004 = new C40004();
        msg.PlayerId = PlayerId;
        msg.Choise = Choise;
        this.send(msg);
    }

    /**
     * 请求帮派成员列表
     */
    public send40010(pageIdx: number): void {
        var msg: C40010 = new C40010();
        msg.PageNum = pageIdx;
        msg.GuildId = SGuildData.instance.myGuildData.GuildId;
        msg.PageSize = 10;
        this.send(msg);
    }

    /**
     * 请求退出帮派
     */
    public send40008(): void {
        var msg: C40008 = new C40008();
        msg.GuildId = SGuildData.instance.myGuildData.GuildId;
        this.send(msg);
    }

    /**
     * 请求剔除别人
     */
    public send40007(PlayerId: number): void {
        var msg: C40007 = new C40007();
        msg.GuildId = SGuildData.instance.myGuildData.GuildId;
        msg.PlayerId = PlayerId;
        this.send(msg);
    }

    /**
     * 修改帮派别人职位
     */
    public send40014(PlayerId: number, position: number): void {
        var msg: C40014 = new C40014();
        msg.Position = position;
        msg.PlayerId = PlayerId;
        this.send(msg);
    }

    /**
     * 修改帮派管理方式
     */
    public send40062(HandleApplyState: number): void {
        var msg: C40062 = new C40062();
        msg.GuildId = SGuildData.instance.myGuildData.GuildId;
        msg.HandleApplyState = HandleApplyState;
        this.send(msg);
    }

    /**
     * 升级技能
     */
    public send40059(skillId: number): void {
        var msg: C40054 = new C40054();
        msg.No = skillId;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 一键升级技能
     */
    public send40061(): void {
        var msg: C40061 = new C40061();
        this.send(msg);
    }

    /**
     * 进行捐献
     * @param IsPay 是否花费元宝捐赠1-是，0-否
     */
    public send40035(IsPay:number): void {
        var msg: C40035 = new C40035();
        msg.IsPay = IsPay;
        this.send(msg);
    }

    /**
     * 查询捐献情况
     * @param IsRefresh //是否花费元宝刷新1-是，0-否
     */
    public send40037(IsRefresh): void {
        var msg: C40037 = new C40037();
        msg.IsRefresh = IsRefresh;
        this.send(msg);
    }

    public requsetGuildBossInfos() {
        var arr: Array<FbVo> = FbVo.getListByType(CopyType.GUILD_BOSS);
        var msg: C57102 = new C57102;
        msg.item_1 = new Array<C57102_1>();
        for (let i = 0; i < arr.length; i++) {
            const no = arr[i].no;
            var _data: C57102_1 = new C57102_1();
            _data.DunNo = no;
            msg.item_1.push(_data);
        }
        this.send(msg);
    }

    /**
     * 进行翻牌
     * @param  
     */
    public send57105(DunNo:number , DrawTimes:number): void {
        var msg: C57105 = new C57105();
        msg.DunNo = DunNo;
        msg.DrawTimes = DrawTimes;
        this.send(msg);
    }



}
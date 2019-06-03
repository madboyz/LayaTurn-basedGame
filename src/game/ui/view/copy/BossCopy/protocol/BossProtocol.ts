import { Super_boss_chap_cfgVo } from "../../../../../../db/sheet/vo/Super_boss_chap_cfgVo";
import { BaseProtocol } from "../../../../../../net/protocol/BaseProtocol";
import { C16009 } from "../../../../../../net/pt/pt_16";
import { C57023, C57024, C57024_1, C57025, C57026, C57027, C57028, C57029, C57029_1, C57030, C57031, C57032, C57033, C57033_1, C57034, C57035 } from "../../../../../../net/pt/pt_57";

export class BossProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    //至尊BOSS==============================================================
    //请求至尊所有信息
    public askSuperBossInfo(): void {
        this.send57023();
        this.send57024();
    }

    //至尊BOSS基本信息
    public send57023(): void {
        var msg: C57023 = new C57023();
        this.send(msg);
    }

    //至尊BOSS列表信息
    public send57024(): void {
        var msg: C57024 = new C57024();
        var item1: C57024_1[] = [];
        var cfgs = Super_boss_chap_cfgVo.getAll();
        for (let i = 0; i < cfgs.length; i++) {
            const element = cfgs[i];
            var item = new C57024_1;
            item.ChapterID = element.no;
            item1.push(item);
        }
        msg.item_1 = item1;
        this.send(msg);
    }

    //开启至尊BOSS宝箱
    public send57026(DunNo: number): void {
        var msg: C57026 = new C57026();
        msg.DunNo = DunNo;
        this.send(msg);
    }

    //扫荡至尊BOSS宝箱
    public send57025(DunNo: number): void {
        var msg: C57025 = new C57025();
        msg.DunNo = DunNo;
        this.send(msg);
    }

    //领取首通章节奖励
    public send57027(ChapterID: number): void {
        var msg: C57027 = new C57027();
        msg.ChapterID = ChapterID;
        this.send(msg);
    }

    //三界副本======================================================================================
    //三界副本基本信息
    public send57028(): void {
        var msg: C57028 = new C57028();
        this.send(msg);
    }

    //请求三界副本所有信息
    public send57029(item1: C57029_1[]): void {
        var msg: C57029 = new C57029();
        msg.item_1 = item1;
        this.send(msg);
    }

    //请求单个三界信息
    public askSenjieDunnoInfo(DunNo: number): void {
        var msg: C57029 = new C57029();
        var itemList: C57029_1[] = [];
        var item = new C57029_1;
        item.DunNo = DunNo;
        itemList.push(item);
        msg.item_1 = itemList;
        this.send(msg);
    }

    //开启三界副本宝箱
    public send57031(DunNo: number): void {
        var msg: C57031 = new C57031();
        msg.DunNo = DunNo;
        this.send(msg);
    }

    //扫荡三界副本
    public send57030(DunNo: number): void {
        var msg: C57030 = new C57030();
        msg.DunNo = DunNo;
        this.send(msg);
    }

    //勇闯天宫======================================================================================
    //勇闯天宫基本信息
    public send57032(): void {
        var msg: C57032 = new C57032();
        this.send(msg);
    }

    //请求勇闯天宫所有信息
    public send57033(item1: C57033_1[]): void {
        var msg: C57033 = new C57033();
        msg.item_1 = item1;
        this.send(msg);
    }

    //请求单个勇闯天宫信息
    public askChuangTiangongInfo(DunNo: number): void {
        var msg: C57033 = new C57033();
        var itemList: C57033_1[] = [];
        var item = new C57033_1;
        item.DunNo = DunNo;
        itemList.push(item);
        msg.item_1 = itemList;
        this.send(msg);
    }

    //开启勇闯天宫宝箱
    public send57035(DunNo: number): void {
        var msg: C57035 = new C57035();
        msg.DunNo = DunNo;
        this.send(msg);
    }

    //扫荡勇闯天宫
    public send57034(DunNo: number): void {
        var msg: C57034 = new C57034();
        msg.DunNo = DunNo;
        this.send(msg);
    }

    //无尽试炼天宫======================================================================================
    public send16009(LvStep:number):void{
        var msg: C16009 = new C16009();
        msg.LvStep = LvStep;
        this.send(msg);
    }

    
}
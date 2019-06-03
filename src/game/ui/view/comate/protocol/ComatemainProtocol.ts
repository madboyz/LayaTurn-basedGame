import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C37003, C37004, C37005, C37006, C37006_1, C37008, C37008_1, C37001, C37011, C37012, C37013, C37014, C37015, C37016, C37025, C37021, C37022, C37023, C37028, C37029, C37024, C37024_1 } from "../../../../../net/pt/pt_37";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../../../net/data/SBagData";

export class ComatemainProtocol extends BaseProtocol {

    constructor() {
        super();
    }

    /**
     *激活伙伴 
     */
    public send37001(no: number) {
        var msg: C37001 = new C37001();
        msg.No = no;
        this.send(msg);
    }

    public send37003(id: number) {
        var msg: C37003 = new C37003();
        msg.Id = id;
        this.send(msg);
    }

    /**
     * 兑换天赋点
     */
    public send37004(id: number, point: number) {
        var msg: C37004 = new C37004();
        msg.Id = id;
        msg.Point = point;
        this.send(msg);
    }
    /**
     * 重置
     * @param id 
     */
    public send37005(id: number) {
        var msg: C37005 = new C37005();
        msg.Id = id;
        this.send(msg);
    }
    /**
     * 天赋点
     * @param data 
     */
    public send37006(id: number, data: Array<any>) {
        var msg: C37006 = new C37006();
        msg.Id = id;
        msg.item_1 = new Array<C37006_1>();
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                var _data: C37006_1 = new C37006_1();
                _data.No = item.No;
                _data.Point = item.Point;
                msg.item_1.push(_data);
            }
        }
        this.send(msg);
    }


    /**
     * 设置阵容默认要数组是5个
     */
    public send37008(data: Array<any>) {
        var msg: C37008 = new C37008();
        msg.Id = 1;
        msg.zf_no = 1;
        msg.item_1 = new Array<C37008_1>();
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                var _data: C37008_1 = new C37008_1();
                _data.ObjNo = item.ObjNo;
                _data.Pos = item.Pos;
                msg.item_1.push(_data);
            }
        }
        this.send(msg);
    }

    /**
     * 伙伴升级
     */
    public send37011(comateId: number) {
        var msg: C37011 = new C37011();
        msg.Id = comateId;
        var item_cfgid = ConstVo.get("GAME_COMRADE_GOODS_TO_EXP").val[0];
        msg.GoodsId = SBagData.instance.prop.getItemDataByGoodsNo(item_cfgid).GoodsId;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 查询伙伴缘分
     */
    public send37012() {
        var msg: C37012 = new C37012();
        this.send(msg);
    }
    /**
     * 伙伴缘分升级
     */
    public send37013(comateNo: number) {
        var msg: C37013 = new C37013();
        msg.No = comateNo;
        this.send(msg);
    }
    /**
     * 伙伴突破
     */
    public send37014(comateId: number) {
        var msg: C37014 = new C37014();
        msg.Id = comateId;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 伙伴元神
     */
    public send37015(Id: number): void {
        var msg: C37015 = new C37015();
        msg.Id = Id;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 伙伴元神技能进阶
     */
    public send37016(Id: number, SkillNo: number): void {
        var msg: C37016 = new C37016();
        msg.Id = Id;
        msg.SkillNo = SkillNo;
        this.send(msg);
    }

    //命格相关协议=========================
    public askMinggeInfo(): void {
        var msg: C37025 = new C37025();
        msg.Location = 1;
        this.send(msg);
    }

    public askMinggePoolInfo(): void {
        var msg: C37025 = new C37025();
        msg.Location = 3;
        this.send(msg);
    }

    /**
     * 装备命格
     */
    public send37021(ComradeId: number, YaoDanId: number, HoleNo: number): void {
        var msg: C37021 = new C37021();
        msg.ComradeId = ComradeId;
        msg.YaoDanId = YaoDanId;
        msg.HoleNo = HoleNo;
        this.send(msg);
    }

    /**
     * 卸下命格
     */
    public send37022(ComradeId: number, HoleNo: number): void {
        var msg: C37022 = new C37022();
        msg.ComradeId = ComradeId;
        msg.HoleNo = HoleNo;
        this.send(msg);
    }

    /**
     * 进行猎命
     */
    public send37023(No: number, UseYuanBao: number): void {
        var msg: C37023 = new C37023();
        msg.No = No;
        msg.UseYuanBao = UseYuanBao;
        this.send(msg);
    }

    /**
     * 一键领取
     */
    public send37028(): void {
        var msg: C37028 = new C37028();
        this.send(msg);
    }

    /**
     * 查询炼妖次数
     */
    public send37029(): void {
        var msg: C37029 = new C37029();
        this.send(msg);
    }

    /**
     * 吞噬妖丹
     */
    public send37024(Quality: number, YaoDanId: number, ComradeId: number, item_1: C37024_1[]): void {
        var msg: C37024 = new C37024();
        msg.Quality = Quality;
        msg.YaoDanId = YaoDanId;
        msg.ComradeId = ComradeId;
        msg.item_1 = item_1;
        this.send(msg);
    }

}
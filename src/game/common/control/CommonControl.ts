import { S19005 } from "../../../net/pt/pt_19";
import { CommonProtocol } from "../protocol/CommonProtocol";

export class CommonControl extends BaseControl {
    private protocol: CommonProtocol = new CommonProtocol();
    constructor() {
        super();
    }

    private static _instance: CommonControl;
    public static get instance(): CommonControl {
        this._instance = this._instance || new CommonControl();
        return this._instance;
    }


    public onGoodsCheckStroage(location: number, partnerId: number = 0, type = 1): void {
        this.protocol.send15000(location, partnerId, type);

    }
    public requestRoleList(): void {
        this.protocol.send10002();
    }

    public requestAllTitle() {
        this.protocol.send13030();
    }

    public requestAllFashion() {
        this.protocol.send13300();
    }

    /**
     * 活动查询
     */
    public send58001() {
        this.protocol.send58001();
    }


    public EnterThreeCopy(lvstep: number, IsSkip: number = 0) {
        this.protocol.send16000(lvstep, IsSkip);
    }

    public ExitThreeCopy() {
        this.protocol.send16008();
    }


    /**
     * 退出副本
     */
    public ExitCopy() {
        this.protocol.send57002();
    }

    /**
     * 进入副本
     * @param No 
     */
    public EnterCopy(No: number) {
        this.protocol.send57001(No);
    }

    /**
     * 扫荡副本
     * @param No 
     */
    public OneKeyCopy(No: number) {
        this.protocol.send57017(No);
    }

    /**
     * 兑换物品
     * @param {number} id
     * @memberof PetProtocol
     */
    public send32010(id: number): void {
        this.protocol.send32010(id);
    }

    public send13002(roleId: number): void {
        this.protocol.send13002(roleId);
    }

    public send14000(): void {
        this.protocol.send14000();
    }

    public send14011(): void {
        this.protocol.send14011();
    }

    public checkFightSceneObj(id: number) {
        this.protocol.send32050(id);
    }

    /**
     * 挑战场景怪
     */
    public gotoFightSceneObj(id: number) {
        this.protocol.send20001(id);
    }

    /**
     * 查询经脉
     */
    public send13046() {
        this.protocol.send13046();
    }

    public send37007() {
        this.protocol.send37007();
    }


    public send37009() {
        this.protocol.send37009();
    }

    /**
     * 查询心法
     */
    public send13047() {
        this.protocol.send13047();
    }

    public send15001(id: number): void {
        this.protocol.send15001(id);
    }

    public onEquipInstall(goodsId: number, partnerId: number = 0, type = 1): void {
        this.protocol.send15030(goodsId, partnerId, type);
    }

    public onEquipUnInstall(slot: number, partnerId: number = 0, type = 1): void {
        this.protocol.send15031(slot, partnerId, type);
    }

    public onGoodsUse(goodsId: number, useType: number, effectNo: number = 0) {
        if (useType == 0)
            return;
        switch (useType) {
            case 1:
                {
                    this.protocol.send15050(goodsId);
                    break;
                }
            case 2:
                {
                    this.protocol.send15054(goodsId, effectNo);
                    break;
                }
        }
    }

    public send13090(): void {
        this.protocol.send13090();
    }

    public send13091(): void {
        this.protocol.send13091();
    }

    public send13092() {
        this.protocol.send13092();
    }

    public send13070(): void {
        this.protocol.send13070();//查询已经开放的系统列表
    }

    public SendPk(palyerId: number, pkType: number) {
        this.protocol.send20002(palyerId, pkType);
    }

    public send17009(id: number): void {
        this.protocol.send17009(id);//获得宠物详细信息
    }

    public send17031(id: number, follow: number): void {
        this.protocol.send17031(id, follow);//宠物跟随
    }
    /**
     * 查询技能
     */
    public send21001(): void {
        this.protocol.send21001();
    }
    /**
     * 查询帮派
     */
    public send40055(): void {
        this.protocol.send40055();
    }

    public send19002(type: number): void {
        this.protocol.send19002(type);//查看邮件简要信息列表
    }

    public send19007(mailList: S19005): void {
        this.protocol.send19007(mailList);//已经领取的邮件列表
    }


    public send22005(type: number): void {
        //this.protocol.send22005(type);//通用排行榜
    }

    public send52001(no: number, count: number): void {
        this.protocol.send52001(no, count);
    }

    public send52002(): void {
        this.protocol.send52002();
    }

    public send57003(type: number): void {
        this.protocol.send57003(type);//查询副本信息
    }

    public send57018(): void {
        this.protocol.send57018();//查询副本信息
    }

    public send57019(no: number): void {
        this.protocol.send57019(no);//查询副本信息
    }

    public send66001(): void {
        this.protocol.send66001();//获得坐骑信息
    }

    public send13059(): void {
        this.protocol.send13059(0);//查询登录奖励是否领取
    }

    public send17008(): void {
        this.protocol.send17008();//获得已激活宠物列表
    }

    public send15005(): void {
        this.protocol.send15005();//初始化强化信息和宝石镶嵌信息
    }

    public send15049(GoodsId: number, Count: number): void {
        this.protocol.send15049(GoodsId, Count);//使用物品
    }

    public send13095(): void {
        this.protocol.send13095();//请求各档位充值状态
    }

    public send57022(Type: CopyType): void {
        this.protocol.send57022(Type);//一键扫荡
    }
}
import { S57103 } from "../../../../../../net/pt/pt_57";

export class WorldBossDamageRankPanel extends ui.main.WorldBossDamageRankPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public update(): void {

    }

    public initComp() {
        super.initComp();
        this.itemList.renderHandler = new Laya.Handler(this, this.updateItem)
        this.itemList.vScrollBarSkin = "";
    }

    public updateBossRank(data: S57103) {
        this.itemList.array = data.item_1;
    }


    //属性列表
    private updateItem(cell: Laya.View, index: number, data: any): void {
        var data = cell.dataSource;
        var rankLb = (cell.getChildByName("rankLb") as Laya.Label);
        var nameLb = (cell.getChildByName("nameLb") as Laya.Label);
        var damageLb = (cell.getChildByName("damageLb") as Laya.Label);
        rankLb.text = (index +1) + "";
        nameLb.text = data.roleName;
        damageLb.text = data.damage;
    }



    public open(...args): void {
        this.initWindow(true, true, "伤害排名", 490, 460, 225);
        super.open();
    }

    public initEvent(): void {
    }

    public removeEvent(): void {

    }

    public close(): void {
        super.close();
    }
}
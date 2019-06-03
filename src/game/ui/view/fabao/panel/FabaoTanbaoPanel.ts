import { ItemData } from "../../../compent/data/ItemData";
import { Fabao_find_cfgVo } from "../../../../../db/sheet/vo/Fabao_find_cfgVo";
import { SFabaoData } from "../data/SFabaoData";

export class FabaoTanbaoPanel extends ui.main.FabaoTanbaoPanelUI {
    constructor() {
        super();
        this.initComp();
    }

    public initComp() {
        this.initEvent();
        this.initList();
        this.open();
    }

    private initList(): void {
    }

    public open(): void {
        this.updateData();
    }

    public initEvent(): void {
        this.type1OneBtn.on(Laya.Event.CLICK, this, this.type1OneBtnClick);
        this.type2OneBtn.on(Laya.Event.CLICK, this, this.type2OneBtnClick);
        this.type2TenBtn.on(Laya.Event.CLICK, this, this.type2TenBtnClick);
    }
    public removeEvent(): void {
        this.type1OneBtn.off(Laya.Event.CLICK, this, this.type1OneBtnClick);
        this.type2OneBtn.off(Laya.Event.CLICK, this, this.type2OneBtnClick);
        this.type2TenBtn.off(Laya.Event.CLICK, this, this.type2TenBtnClick);
    }

    public updateData(): void {
        var cfg1 = Fabao_find_cfgVo.get(1).consume[0];
        var cfg2 = Fabao_find_cfgVo.get(2).consume[0];
        var cfg3 = Fabao_find_cfgVo.get(3).consume[0];
        var type1OneItem = new ItemData(cfg1[0]);
        this.type1OneIcon.skin = ResUtils.getItemIcon(type1OneItem.clientInfo.icon);
        this.type1OneLb.text = "x" + cfg1[1];

        var type2OneItem = new ItemData(cfg2[0]);
        this.type2OneIcon.skin = ResUtils.getItemIcon(type2OneItem.clientInfo.icon);
        this.type2OneLb.text = "x" + cfg2[1];

        var type2tenItem = new ItemData(cfg3[0]);
        this.type2TenIcon.skin = ResUtils.getItemIcon(type2tenItem.clientInfo.icon);
        this.type2TenLb.text = "x" + cfg2[1] * 10;
    }

    public type1OneBtnClick(): void {
        SFabaoData.instance.protocol.send15176(1);
    }

    public type2OneBtnClick(): void {
        SFabaoData.instance.protocol.send15176(2);
    }

    public type2TenBtnClick(): void {
        SFabaoData.instance.protocol.send15176(3);
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }


}

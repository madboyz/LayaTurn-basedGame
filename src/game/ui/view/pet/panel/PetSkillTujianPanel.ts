import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { PetSkillItem } from "../item/PetSkillItem";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";

export class PetSkillTujianPanel extends ui.main.PetTujianEnterPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
    }

    private initList(): void {
        this.itemList.itemRender = PetSkillTujianItem;
        this.itemList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "宠物技能图鉴", 486, 500, 170);
        super.open();
    }

    public update(): void {
        var cfgs = ConstVo.get("PARTNER_SHOW_SKILL").val;
        cfgs.sort((a: number, b: number): any => {
            var aQuilit = SkillVo.get(a).quality;
            var bQuilit = SkillVo.get(b).quality;
            if(aQuilit != bQuilit){
                return bQuilit - aQuilit;
            }
            return a - b;
        });
        this.itemList.array = cfgs;
    }

    public close(): void {
        super.close();
    }

}

//道具的奖励ITEM
export class PetSkillTujianItem extends Laya.View {
    private petSkillItem: PetSkillItem;

    constructor() {
        super();
        this.init();
    }

    init(): void {
        this.petSkillItem = new PetSkillItem();
        this.petSkillItem.setItemStyle(80);
        this.petSkillItem.x = 20;
        this.addChild(this.petSkillItem);
        this.size(120, 100);
    }

    private _mdata: number;
    public set dataSource(data: number) {
        if (!data) {
            return;
        }
        this._mdata = data;
        var cfg = SkillVo.get(data);
        this.petSkillItem.info = cfg
        this.petSkillItem.toolTipData = cfg;
        this.petSkillItem.showName(cfg.name, 18, "#b2660d");
    }

}
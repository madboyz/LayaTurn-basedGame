import { Aerocraft_skinVo } from "../../../../../db/sheet/vo/Aerocraft_skinVo";
import { SMountData } from "../../../../../net/data/SmountData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";

export class MountTujianEnterPanel extends ui.main.PetTujianEnterPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
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
        this.itemList.itemRender = MountTujianEnterItem;
        this.itemList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "坐骑皮肤图鉴", 486, 500, 170);
        super.open();
    }

    public update(): void {
        var cfgs = Aerocraft_skinVo.getAll().concat();
        cfgs.sort((a: Aerocraft_skinVo, b: Aerocraft_skinVo): any => {
            var aHave = SMountData.instance.haveMount(a.no);
            var bHave = SMountData.instance.haveMount(b.no);
            if (aHave && !bHave) {
                return -1;
            } else if (!aHave && bHave) {
                return 1;
            }
            return a.no - b.no;
        });
        this.itemList.array = cfgs;
    }

    public close(): void {
        super.close();
    }

}


//道具的奖励ITEM
export class MountTujianEnterItem extends Laya.View {
    private mountItem: BaseItem;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
        this.init();
    }

    init(): void {
        this.mountItem = new BaseItem();
        this.mountItem.setItemStyle(80);
        this.mountItem.x = 20;
        this.addChild(this.mountItem);
        this.size(120, 100);
    }

    private _mdata: Aerocraft_skinVo;
    public set dataSource(data: Aerocraft_skinVo) {
        if (!data) {
            return;
        }
        this._mdata = data;
        var isHave = SMountData.instance.haveMount(data.no);
        this.mountItem._bitmap.gray = !isHave;
        this.mountItem._bg.gray = !isHave;
        //显示道具
        this.mountItem.setSource(data.icon);
        this.mountItem.bgName = ResUtils.getItemBg(data.quality);
        this.mountItem.showName(data.name, 18, "#b2660d");
    }

    private thisClick(): void {
        UIManager.instance.openUI(UIID.MOUNT_TUJIAN_PANEL, [this._mdata]);
    }

}
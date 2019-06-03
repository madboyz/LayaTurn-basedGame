import { GoodsItem } from "../item/GoodsItem";
import { TabBar } from "../../../compent/TabBar";
import { MallVo } from "../../../../../db/sheet/vo/MallVo";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { ScrollList } from "../../../compent/ScrollList";
import { ShopTabItem } from "../item/ShopTabItem";
import { SShopData } from "../../../../../net/data/SShopData";
import { SChapterData } from "../../../../chapter/SChapterData";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { MsgManager } from "../../../manager/MsgManager";
import { SdkManager } from "../../../../../net/SdkManager";
import { ItemData } from "../../../compent/data/ItemData";
import { SBagData } from "../../../../../net/data/SBagData";
import { SRechargeData } from "../../recharge/data/SRechargeData";
export class ShopSubTypeItem extends ui.main.ShopSubItemUI {
    public static selectIndex = -1;
    private Info: any = {};//tppe_limt tppe_1 tppe_dec
    constructor() {
        super();
    }

    public set dataSource(data: any) {
        if (data == null) return;
        this.Info = data;
        this.UpdateState();
    }

    public get dataSource(): any {
        return this.Info;
    }

    public UpdateState() {
        var limtType = this.Info.tppe_limt[0];
        if (limtType == 1) {
            var LimtChapterId = this.Info.tppe_limt[1];
            //if(LimtChapterId <= SChapterData.instance.chapter.chapterId)
            //{
            this.Btn.labelColors = "#8e5213";
            this.Btn.label = this.Info.tppe_dec;
            //}
            //else
            //{
            //    this.Btn.labelColors = "#ff0000";
            //    var vo:Chapter_cfgVo = Chapter_cfgVo.get(LimtChapterId);
            //    this.Btn.label = "需要解锁:"+vo.scene_name;
            //}
        }
        if (ShopSubTypeItem.selectIndex == this.Info.tppe_1)
            this.IsSelect = true;
        else
            this.IsSelect = false;
    }

    public set IsSelect(value: boolean) {
        var skinStr = value == false ? ResUtils.getCompUIUrl("btn_bg4") : ResUtils.getCompUIUrl("btn_bg5");
        this.Btn.skin = skinStr;
    }
}


export class ShopMallPanel extends ui.main.ShopMallPanelUI {
    // private mTab:TabBar;
    public curIndex: number = -1;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public open(...args): void {
        this.initWindow(true, true, "商城", 486, 557, 45);
        super.open();
        // if(this.mTab)
        // this.mTab.select = 0;
        this.btnList.selectedIndex = this.tabIndex;
        if ((this.tabIndex + 1) * 83 > 517) {
            this.btnList.scrollBar.value = (this.tabIndex + 1) * 83 - 517;
        }
    }

    public update(): void {
    }

    public initComp() {
        super.initComp();
        // if(!this.mTab)
        // {
        //     this.mTab = new TabBar([this.btn_0,this.btn_1,this.btn_2,this.btn_3,this.btn_4]);
        //     this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        // }
        // this.mTab.select = this.curIndex;
        this.initShopList();
    }

    private initShopList(): void {
        this.btnList.itemRender = ShopTabItem;
        this.btnList.hScrollBarSkin = "";
        this.btnList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
        this.btnList.scrollBar.elasticDistance = 0;//设置橡皮筋极限距离。
        this.btnList.selectEnable = true;
        this.btnList.selectedIndex = -1;

        this.Sublist.itemRender = ShopSubTypeItem;
        this.Sublist.vScrollBarSkin = "";
        this.Sublist.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.Sublist.scrollBar.elasticDistance = 100;
        this.Sublist.selectEnable = true;
        this.Sublist.selectedIndex = -1;

        this.list.itemRender = GoodsItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.array = null;

        this.list1.itemRender = GoodsItem;
        this.list1.vScrollBarSkin = "";
        this.list1.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list1.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list1.selectEnable = true;
        this.list1.array = null;
        this.btnList.array = SShopData.instance.ShopList.keys;
    }

    public initEvent(): void {
        this.btn_recharge.on(Laya.Event.CLICK, this, this.rechargeClick);
        this.btnList.selectHandler = Laya.Handler.create(this, this.onChange, null, false);
        this.Sublist.selectHandler = Laya.Handler.create(this, this.onSubTypeListSelect, null, false);
        this.list.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
        this.list.mouseHandler = Laya.Handler.create(this, this.onClickItem, null, false);
        this.list1.selectHandler = Laya.Handler.create(this, this.onListChangeHandler1, null, false);
        this.list1.mouseHandler = Laya.Handler.create(this, this.onClickItem1, null, false);
    }

    public removeEvent(): void {
        this.btn_recharge.off(Laya.Event.CLICK, this, this.rechargeClick);
        this.btnList.selectHandler = null;
        this.Sublist.selectHandler = null;
        this.list.selectHandler = null;
        this.list.mouseHandler = null;
        this.list1.selectHandler = null;
        this.list1.mouseHandler = null;
    }

    private selectInfo1: GoodsItem;
    private onListChangeHandler1(): void {
        if (this.list1.selectedIndex == -1) return;
        this.selectInfo1 = this.list1.getCell(this.list1.selectedIndex) as GoodsItem;
    }

    private onClickItem1(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof GoodsItem && e.target.dataSource) {

            if (this.selectSubTypeInfo && !this.selectInfo1.CanEnter) {
                MsgManager.instance.showRollTipsMsg(this.selectInfo1.txt_leftNum.text);
                return;
            }
            UIManager.instance.openUI(UIID.SYS_BUYGODDS, [e.target.dataSource]);
        }
    }

    private rechargeClick() {
        SRechargeData.instance.checkOpenRecharge();
    }

    private selectSubTypeInfo: ShopSubTypeItem
    public onSubTypeListSelect() {
        if (this.Sublist.selectedIndex == -1) return;
        this.list.scrollBar.value = 0;
        if (this.selectSubTypeInfo) {
            this.selectSubTypeInfo.IsSelect = false;
        }
        this.selectSubTypeInfo = this.Sublist.getCell(this.Sublist.selectedIndex) as ShopSubTypeItem;
        this.selectSubTypeInfo.IsSelect = true;
        if (!this.selectSubTypeInfo.dataSource) return;
        ShopSubTypeItem.selectIndex = this.selectSubTypeInfo.dataSource.tppe_1;
        var shopType = this.btnList.array[this.btnList.selectedIndex];
        var subType = this.selectSubTypeInfo.dataSource.tppe_1;
        this.list1.array = SShopData.instance.getShopList(shopType, subType);
    }

    private CurrentTabItem: ShopTabItem;
    public onChange(): void {
        if (this.btnList.selectedIndex == -1) return;
        if (this.CurrentTabItem) {
            this.CurrentTabItem.IsSelect = false;
        }
        this.CurrentTabItem = this.btnList.getCell(this.btnList.selectedIndex) as ShopTabItem;
        if (!this.CurrentTabItem) return;
        this.CurrentTabItem.IsSelect = true;

        var shopType = this.btnList.array[this.btnList.selectedIndex];
        var AllSubTypeList = SShopData.instance.getShopAllSubType(shopType);
        if (AllSubTypeList != null) {
            this.equipBox.visible = true;
            this.list.visible = false;
            this.Sublist.scrollBar.value = 0;
            this.Sublist.selectedIndex = -1;
            this.Sublist.array = AllSubTypeList;
            Laya.timer.once(100, this, () => {
                this.Sublist.selectedIndex = 0;
            });
        }
        else {
            this.list.scrollBar.value = 0;
            this.list.selectedIndex = -1;
            this.equipBox.visible = false;
            this.list.visible = true;
            if (this.selectSubTypeInfo) {
                this.selectSubTypeInfo.IsSelect = false;
            }
            this.selectSubTypeInfo = null;
            this.list.array = SShopData.instance.ShopList.get(shopType).values;
            this.BG.x = 40;
            this.BG.width = 495;
            Laya.timer.once(100, this, () => {
                this.list.selectedIndex = 0;
            });
        }
        this.updateMoney();
    }

    public updateList(): void {
        this.list.refresh();
    }

    public updateMoney(): void {
        var shopType = this.btnList.array[this.btnList.selectedIndex];
        var price_type = MallVo.getPriceTypeByShopType(shopType);

        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(price_type);
        if (!itemdata) {
            itemdata = new ItemData(price_type);
            itemdata.Count = 0;
        }
        this.icon.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);
        if (price_type == MoneyType.YUANBAO) {
            this.txt_money.text = GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(MoneyType.YUANBAO));
        } else if (price_type == MoneyType.BIND_YUANBAO) {
            this.txt_money.text = GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(MoneyType.BIND_YUANBAO));
        } else if (price_type == MoneyType.LOVE) {
            this.txt_money.text = GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(MoneyType.LOVE));
        } else if (price_type == MoneyType.BIND_GAMEMONEY) {
            this.txt_money.text = GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(MoneyType.BIND_GAMEMONEY));
        } else if (price_type == MoneyType.GUILD_CONTRI) {
            this.txt_money.text = GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(MoneyType.GUILD_CONTRI));
        } else {
            this.txt_money.text = GMath.GetChineseNumber(itemdata.Count);
        }
    }

    private selectInfo: GoodsItem;
    private onListChangeHandler(): void {
        if (this.list.selectedIndex == -1) return;
        this.selectInfo = this.list.getCell(this.list.selectedIndex) as GoodsItem;
    }

    private onClickItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof GoodsItem && e.target.dataSource) {
            UIManager.instance.openUI(UIID.SYS_BUYGODDS, [e.target.dataSource]);
        }
    }

    public close(): void {
        if (this.CurrentTabItem) {
            this.CurrentTabItem.IsSelect = false;
        }
        this.curIndex = -1;
        this.btnList.scrollBar.value = 0;
        this.btnList.selectedIndex = -1;
        this.list.scrollBar.value = 0;
        // this.mTab.select = this.curIndex;
        super.close();
    }

}
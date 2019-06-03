import { SRoleEvent, SRoleData } from "../../../../../net/data/SRoleData";
import { Soaring_configVo } from "../../../../../db/sheet/vo/Soaring_configVo";
import { MsgManager } from "../../../manager/MsgManager";
import { RewardList } from "../../../compent/RewardList";
import { ItemData } from "../../../compent/data/ItemData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SBagData } from "../../../../../net/data/SBagData";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";

export class RoleSoarPanel extends ui.main.RoleSoarPanelUI {
    private soarVo: Soaring_configVo;
    // private goodsList:RewardList;
    private item: BaseItem;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        // this.goodsList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        // this.goodsList.showNameNum = false;
        // this.goodsList.rowCount = 4;
        // this.goodsList.maxNum = 4;
        // this.goodsList.itemStyle = 80;
        // this.goodsList.x = 248;
        // this.goodsList.y = 355;
        // this.addChild(this.goodsList);
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.addChild(this.item);
            this.item.x = 248;
            this.item.y = 355;
        }


        HtmlUtils.setHtml(this.TipsText.style, 10, 22, "left", "middle");
    }

    public open(...args): void {
        this.initWindow(true, true, "人物飞升", 486, 320, 235);
        super.open();
        var soarLv = SRoleData.instance.info.Soaring;
        this.soarVo = Soaring_configVo.get(soarLv + 1);
        if (this.soarVo == null || (this.soarVo && this.soarVo.need_lv == null))
            this.soarVo = Soaring_configVo.get(soarLv);
        try {
            var itemdataList = new Array<ItemData>();
            for (let i = 0; i < this.soarVo.goods.length; i++) {
                const data = this.soarVo.goods[i];
                var item: ItemData = new ItemData(data[0]);
                item.Count = data[1];
                itemdataList.push(item);
            }
            var itemData = new ItemData(itemdataList[0].GoodsNo);
            var itemNum = itemdataList[0].Count;
            this.item.itemData = itemData;
            this.item.toolTipData = itemData;
            var bagnum = SBagData.instance.prop.getItemCountByGoodsNo(itemData.GoodsNo);
            this.item.showName(bagnum + "/" + itemNum, 18, bagnum >= itemNum ? "#4e17cd" : "#ff0000");
            // this.goodsList.updateRewards(itemdataList);
            var str1 = HtmlUtils.addColor("飞升效果1:人物等级上限提升至", "#8e5213", 20) +
                HtmlUtils.addColor(`${this.soarVo.lv_limit}`, "#ff0000", 20) +
                HtmlUtils.addColor("级", "#8e5213", 20) +
                "<br/>" +
                HtmlUtils.addColor("飞升效果2:飞升强化技能点数", "#8e5213", 20) +
                HtmlUtils.addColor(`+1`, "#ff0000", 20);
                this.TipsText.innerHTML = str1;
        }
        catch (e) {

        }
    }

    public initEvent(): void {
        this.UpGradeBtn.on(Laya.Event.CLICK, this, this.onClickUpGradeBtn);
    }

    public removeEvent(): void {
        this.UpGradeBtn.off(Laya.Event.CLICK, this, this.onClickUpGradeBtn);
    }

    private onClickUpGradeBtn() {
        var soarLv = SRoleData.instance.info.Soaring;
        var nextVo = Soaring_configVo.get(soarLv + 1);
        if (nextVo == null || (nextVo && nextVo.lv_limit == null)) {
            MsgManager.instance.showRollTipsMsg("飞升次数已满");
            return;
        }
        if (this.soarVo.need_lv > SRoleData.instance.info.Lv) {
            MsgManager.instance.showRollTipsMsg("未达到飞升等级");
            return;
        }
        var isOk = true;
        var needGoodId = 0
        var needGoodsNum = 0;
        for (let i = 0; i < this.soarVo.goods.length; i++) {
            const data = this.soarVo.goods[i];
            var goodsId = data[0];
            var num = data[1];
            var bagnum = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
            if (bagnum < num) {
                needGoodId = goodsId;
                needGoodsNum = num;
                isOk = false;
                break;
            }
        }
        if (!isOk) {
            var bagnum = SBagData.instance.prop.getItemCountByGoodsNo(needGoodId);
            var needNum = needGoodsNum - bagnum;
            GoodsUtils.CheckGotoShopByGoodsNo(needGoodId, needNum);
            MsgManager.instance.showRollTipsMsg("物品不足！");
            return;
        }

        this.event(SRoleEvent.ROLE_REQUEST_SOAR);
        this.close();
    }

    public close(): void {
        super.close();
    }
}
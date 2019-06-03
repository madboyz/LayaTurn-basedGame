import { SShopData } from "../../net/data/SShopData";
import { MallVo } from "../../db/sheet/vo/MallVo";
import { ConstVo } from "../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../net/data/SRoleData";

export class GoodsUtils {

    public static CheckGotoShopByGoodsNo(goodsNo:number , needNum:number)
    {
        var vo:MallVo = SShopData.instance.getShopItemByGoodsNo(goodsNo);
        if(!vo||(vo&&vo.no == null))
        return;
        var lvLimit  = ConstVo.get("CONVENIENT_PURCHASE").val
        if(SRoleData.instance.info.Lv < lvLimit){
            return;
        }
        UIManager.instance.openUI(UIID.SYS_GETWAY,[goodsNo ,vo ,needNum]);
    }
}
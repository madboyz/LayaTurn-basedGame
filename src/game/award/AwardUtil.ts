import { Award_cfgVo } from "../../db/sheet/vo/Award_cfgVo";
import { SRoleData } from "../../net/data/SRoleData";
import { ItemData } from "../ui/compent/data/ItemData";

export class AwardUtil {
  /**
   * 获得奖励金钱描述
   * @param awardId 
   */
  public static GetAwardMoneyDesc(awardId: number): string {
    var desc = "";
    var data = Award_cfgVo.get(awardId);
    if (!data || (data && !data.no))
      return desc;
    //有展示道具的用展示道具
    if (data.extra_reward.length > 0 && data.extra_reward[0][0] == "lv_range") {
      var lv = SRoleData.instance.info.Lv;
      var vipLv = SRoleData.instance.info.VipLv;
      var lvData = data.extra_reward[0][1];
      for (let i = 0; i < lvData.length; i++) {
        var lvRangeData = lvData[i];
        if (lvRangeData[0] <= lv && lv <= lvRangeData[1]) {
          return this.GetAwardMoneyDesc(lvRangeData[2]);
        }
      }
    }
    //----
    if (data.money instanceof Array && data.money.length > 0) {
      var item = data.money[0];
      var moneystr = SRoleData.instance.getMoneyStrByType(item[1]);
      desc = `${moneystr}:${item[2]}`;
    }

    return desc;
  }
  /**
   * 获得奖励经验
   * @param awardId 
   */
  public static GetAwardExpDesc(awardId: number): string {
    var desc = "";
    var data = Award_cfgVo.get(awardId);
    if (!data || (data && !data.no))
      return desc;
    //有展示道具的用展示道具
    if (data.extra_reward.length > 0 && data.extra_reward[0][0] == "lv_range") {
      var lv = SRoleData.instance.info.Lv;
      var vipLv = SRoleData.instance.info.VipLv;
      var lvData = data.extra_reward[0][1];
      for (let i = 0; i < lvData.length; i++) {
        var lvRangeData = lvData[i];
        if (lvRangeData[0] <= lv && lv <= lvRangeData[1]) {
          return this.GetAwardExpDesc(lvRangeData[2]);
        }
      }
    }
    //----
    if (data.exp instanceof Array && data.exp.length > 0) {
      var expStr = GMath.GetChineseNumber(data.exp[1]);
      desc = `经验x${expStr}`;
    }
    return desc;
  }
  /**
   * 普通概率奖励列表
   * @param awardId 
   */
  public static GetNormalGoodsList(awardId: number, withExp: boolean = true, onlyMyJob: boolean = false): Array<ItemData> {
    var itemdataList = new Array<ItemData>();
    if (awardId == 0)
      return itemdataList;
    var data = Award_cfgVo.get(awardId);
    if (!data || (data && !data.no))
      return itemdataList;
    var item: ItemData;
    //有展示道具的用展示道具
    if (data.extra_reward.length > 0 && data.extra_reward[0][0] == "lv_range") {
      var lv = SRoleData.instance.info.Lv;
      var vipLv = SRoleData.instance.info.VipLv;
      var lvData = data.extra_reward[0][1];
      for (let i = 0; i < lvData.length; i++) {
        var lvRangeData = lvData[i];
        if (lvRangeData[0] <= lv && lv <= lvRangeData[1]) {
          var packReward = this.GetNormalGoodsList(lvRangeData[2], withExp, onlyMyJob);
          itemdataList = itemdataList.concat(packReward);
          break;
        }
      }
    } else {
      if (data.money != null) {
        for (let index = 0; index < data.money.length; index++) {
          var element = data.money[index];
          if (element[0] == 1) {
            item = new ItemData(element[1]);
            item.Count = element[2];
            itemdataList.push(item);
          }
        }
      }
      if (data.exp != null && withExp) {
        var element = data.exp;
        if (element[0] == 1) {
          item = new ItemData(MoneyType.EXP);
          item.Count = element[1];
          itemdataList.push(item);
        }
      }
      for (let i = 0; i < data.goods_list.length; i++) {
        const element = data.goods_list[i];
        var goodsid = element[1];
        var num = element[2];
        var bind = element[4];
        item = new ItemData(goodsid);
        var quality = element[3] == 0 ? item.clientInfo.quality : element[3];
        item.Count = num;
        item.serverInfo.Quality = quality;
        item.serverInfo.BindState = bind;
        if (onlyMyJob) {
          if (item.isJobEquip) {
            itemdataList.push(item);
          }
        } else {
          itemdataList.push(item);
        }

      }
    }


    return itemdataList;
  }


  public static combineSameItem(itemList: Array<ItemData>): Array<ItemData> {
    var newList = []
    for (let i = 0; i < itemList.length; i++) {
      var itemData = itemList[i];
      var haveSame = false;
      for (let j = 0; j < newList.length; j++) {
        var newData: ItemData = newList[j];
        if (itemData.GoodsNo == newData.GoodsNo) {
          newData.Count = newData.Count + itemData.Count;
          haveSame = true;
        }
      }
      if (!haveSame) {
        newList.push(itemData);
      }
    }
    return newList;
  }

}
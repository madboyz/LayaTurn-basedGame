import { S13093, S13093_1 } from "../../../../../net/pt/pt_13";
import { SGameData } from "../../../../../net/data/SGameData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { CommonControl } from "../../../../common/control/CommonControl";
import { SBagData } from "../../../../../net/data/SBagData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { OffLIneRewardItem } from "./OffLIneRewardItem";

export class OfflineRewardPanel extends ui.main.OfflineRewardPanelUI {
    private _data:S13093;
    private goods:Array<S13093_1> = null;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowClose = false;
        this.isCloseByNull = false;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.mouseThrough = false;
        this.updateData();
    }

    private initList():void {
        this.list.itemRender = OffLIneRewardItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
    }

    public updateData():void
    {
        this.goods = this._data.item_1;
        var itemdataList = [];
        for (let i = 0; i < this._data.item_1.length; i++) {
            var item = this._data.item_1[i] as S13093_1;
            if(item.GoodsNo != 99){
                //策划让把99ID的道具，临时屏蔽掉
                itemdataList.push(item);
            }
        }
        this.list.array = itemdataList;
        this.noDataBox.visible = itemdataList.length <= 0;
        this.txt_level.text = "角色等级:" + SRoleData.instance.info.Lv + "级";
        this.txt_time.text = "离线时间:" + TimerUtil.getLeftTimeStr(this._data.Second);
        var config:ConstVo = ConstVo.get("GAME_MAX_OFFLINE_CALC_TIME");
        if(this._data.Second >= config.val*60)
        {
            this.txt_timeTips.visible = true;
        }
        else
        {
            this.txt_timeTips.visible = false;
        }
        this.txt_timeTips.x = this.txt_time.x + this.txt_time.textWidth + 5;
        this.txt_exp.text = GMath.GetChineseNumber(this._data.Exp);
        this.txt_money.text = GMath.GetChineseNumber(this._data.Money);
    }

    public update():void
    {
        this.updateData();
    }

    public open(...args): void {
        this.initWindow(true,false,"离线收益",485,447,166);
        this._data = args[0];
        super.open();
    }
    public initEvent():void 
    {
        this.btn_reward.on(Laya.Event.MOUSE_DOWN,this,this.onReceivedReward);
    }
    public removeEvent():void
    {
        this.btn_reward.off(Laya.Event.MOUSE_DOWN,this,this.onReceivedReward);
    }

    private onReceivedReward():void
    {
        CommonControl.instance.send13092();
        this.close();
    }

    public close(): void {
        super.close();
    }
}
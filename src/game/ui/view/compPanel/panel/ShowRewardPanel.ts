import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";

export class ShowRewardPanel extends ui.main.ShowRewardPanelUI {
    private param;//第一个参数为奖励列表，第二个为点击确定回调，第三个为一级标题，第四个为二级表弟，第五个为确定的文本

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.btn_ok.on(Laya.Event.CLICK, this, this.btnokClick);
    }

    public removeEvent(): void {
        this.btn_ok.off(Laya.Event.CLICK, this, this.btnokClick);
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList():void    {
        this.rewardList.itemRender = BaseItem;
        this.rewardList.spaceX = 60;
        this.rewardList.spaceY = 60;
        this.rewardList.repeatX = 4;
        this.rewardList.repeatY = 2;
        this.rewardList.vScrollBarSkin = "";
        this.rewardList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.rewardList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.rewardList.renderHandler = new Laya.Handler(this, this.onListRender);
    }

    public open(...args): void {
        this.param = this.arg;
        this.initWindow(true, true, this.param[2], 486, 390, 170);
        this.Title = this.param[2];
        super.open();
        this.update();
    }

    public update(): void {
        this.rewardList.array = this.param[0];
        this.subTitle.text = this.param[3];
        this.btn_ok.label =  this.param[4];
    }

    private onListRender(cell:BaseItem,index:number) {
        var item:ItemData = this.param[0][index];
        if(!item)
        return;
        cell.setItemStyle(80);
        cell.itemData = item;
        cell.isShowToolTip = true;
        cell.toolTipData = item;
    }

    //点击领取
    private btnokClick(): void {
        if(this.param[1])
        (this.param[1] as Laya.Handler).run();
        this.close();
    }


    public close(): void {
        super.close();
    }
}